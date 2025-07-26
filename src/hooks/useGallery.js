// Custom hook for gallery data management
import { useState, useEffect } from 'react';
import { 
  subscribeToGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  reorderGalleryItems,
  validateImageFile
} from '../services/galleryApi';

export const useGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    // Subscribe to real-time updates
    const unsubscribe = subscribeToGalleryItems((newItems) => {
      setItems(newItems);
      setLoading(false);
      setError(null);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const addItem = async (itemData, imageFile) => {
    try {
      setError(null);
      
      if (imageFile) {
        const validation = validateImageFile(imageFile);
        if (!validation.valid) {
          throw new Error(validation.error);
        }
      }

      const newItem = await addGalleryItem(itemData, imageFile);
      return { success: true, item: newItem };
    } catch (error) {
      console.error('Error adding gallery item:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const updateItem = async (id, updates, newImageFile = null) => {
    try {
      setError(null);
      
      if (newImageFile) {
        const validation = validateImageFile(newImageFile);
        if (!validation.valid) {
          throw new Error(validation.error);
        }
      }

      const updatedItem = await updateGalleryItem(id, updates, newImageFile);
      return { success: true, item: updatedItem };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const deleteItem = async (id) => {
    try {
      setError(null);
      const item = items.find(item => item.id === id);
      await deleteGalleryItem(id, item?.imagePath);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const reorderItems = async (reorderedItems) => {
    try {
      setError(null);
      await reorderGalleryItems(reorderedItems);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    reorderItems
  };
};