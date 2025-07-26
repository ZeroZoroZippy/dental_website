// Firebase API service for gallery operations
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot,
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';

const COLLECTION_NAME = 'gallery_items';

// Get all gallery items
export const getGalleryItems = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    throw error;
  }
};

// Subscribe to real-time gallery updates
export const subscribeToGalleryItems = (callback) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(items);
  }, (error) => {
    console.error('Error in gallery subscription:', error);
  });
};

// Upload image to Firebase Storage
export const uploadImage = async (file, fileName) => {
  try {
    const storageRef = ref(storage, `gallery/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      url: downloadURL,
      path: snapshot.ref.fullPath
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Add new gallery item
export const addGalleryItem = async (itemData, imageFile) => {
  try {
    let imageUrl = itemData.image;
    let imagePath = null;

    // If there's a new image file, upload it
    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const uploadResult = await uploadImage(imageFile, fileName);
      imageUrl = uploadResult.url;
      imagePath = uploadResult.path;
    }

    // Get current max order
    const items = await getGalleryItems();
    const maxOrder = items.length > 0 ? Math.max(...items.map(item => item.order || 0)) : 0;

    const newItem = {
      title: itemData.title,
      description: itemData.description,
      category: itemData.category,
      image: imageUrl,
      imagePath: imagePath,
      order: maxOrder + 1,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), newItem);
    
    return {
      id: docRef.id,
      ...newItem
    };
  } catch (error) {
    console.error('Error adding gallery item:', error);
    throw error;
  }
};

// Update gallery item
export const updateGalleryItem = async (id, updates, newImageFile = null) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    let updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };

    // If there's a new image, upload it and delete the old one
    if (newImageFile) {
      const fileName = `${Date.now()}_${newImageFile.name}`;
      const uploadResult = await uploadImage(newImageFile, fileName);
      
      // Delete old image if it exists
      if (updates.imagePath) {
        try {
          const oldImageRef = ref(storage, updates.imagePath);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.warn('Could not delete old image:', error);
        }
      }

      updateData.image = uploadResult.url;
      updateData.imagePath = uploadResult.path;
    }

    await updateDoc(docRef, updateData);
    
    return {
      id,
      ...updateData
    };
  } catch (error) {
    console.error('Error updating gallery item:', error);
    throw error;
  }
};

// Delete gallery item
export const deleteGalleryItem = async (id, imagePath) => {
  try {
    // Delete the document
    await deleteDoc(doc(db, COLLECTION_NAME, id));

    // Delete the image from storage if it exists
    if (imagePath) {
      try {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
      } catch (error) {
        console.warn('Could not delete image from storage:', error);
      }
    }

    return true;
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
};

// Reorder gallery items
export const reorderGalleryItems = async (items) => {
  try {
    const batch = writeBatch(db);

    items.forEach((item, index) => {
      const docRef = doc(db, COLLECTION_NAME, item.id);
      batch.update(docRef, { 
        order: index + 1,
        updatedAt: serverTimestamp()
      });
    });

    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error reordering gallery items:', error);
    throw error;
  }
};

// Validate image file
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB for Firebase

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 10MB' };
  }

  return { valid: true };
};

// Migrate localStorage data to Firebase
export const migrateLocalStorageToFirebase = async () => {
  try {
    const localData = localStorage.getItem('gallery_items');
    if (!localData) return { success: true, message: 'No local data to migrate' };

    const items = JSON.parse(localData);
    const migratedItems = [];

    for (const item of items) {
      try {
        // Skip if it's a default item with asset import (these will be handled separately)
        if (item.isDefault && !item.image.startsWith('data:')) {
          continue;
        }

        // For base64 images, convert to blob and upload
        if (item.image.startsWith('data:')) {
          const response = await fetch(item.image);
          const blob = await response.blob();
          const file = new File([blob], `migrated_${item.id}.jpg`, { type: 'image/jpeg' });
          
          const newItem = await addGalleryItem({
            title: item.title,
            description: item.description,
            category: item.category
          }, file);
          
          migratedItems.push(newItem);
        }
      } catch (error) {
        console.error(`Error migrating item ${item.id}:`, error);
      }
    }

    return { 
      success: true, 
      message: `Successfully migrated ${migratedItems.length} items`,
      items: migratedItems
    };
  } catch (error) {
    console.error('Error during migration:', error);
    return { success: false, error: error.message };
  }
};