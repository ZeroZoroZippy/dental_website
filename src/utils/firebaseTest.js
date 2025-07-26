// Simple Firebase connection test
import { db, storage } from '../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Test Firestore connection
export const testFirestore = async () => {
  try {
    console.log('Testing Firestore connection...');
    
    // Try to read from gallery_items collection
    const querySnapshot = await getDocs(collection(db, 'gallery_items'));
    console.log('Firestore read successful. Documents:', querySnapshot.size);
    
    // Try to write a test document
    const testDoc = {
      test: true,
      timestamp: new Date(),
      message: 'Firebase connection test'
    };
    
    const docRef = await addDoc(collection(db, 'gallery_items'), testDoc);
    console.log('Firestore write successful. Document ID:', docRef.id);
    
    return { success: true, message: 'Firestore connection working' };
  } catch (error) {
    console.error('Firestore test failed:', error);
    return { success: false, error: error.message };
  }
};

// Test Firebase Storage connection
export const testStorage = async () => {
  try {
    console.log('Testing Firebase Storage connection...');
    
    // Create a simple test file
    const testContent = 'Firebase Storage test';
    const testFile = new Blob([testContent], { type: 'text/plain' });
    
    // Upload test file
    const storageRef = ref(storage, `gallery/${Date.now()}_test.txt`);
    const snapshot = await uploadBytes(storageRef, testFile);
    console.log('Storage upload successful:', snapshot.ref.fullPath);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Storage download URL:', downloadURL);
    
    return { success: true, message: 'Firebase Storage connection working', url: downloadURL };
  } catch (error) {
    console.error('Storage test failed:', error);
    return { success: false, error: error.message };
  }
};

// Run both tests
export const testFirebaseConnection = async () => {
  console.log('=== Firebase Connection Test ===');
  
  const firestoreResult = await testFirestore();
  const storageResult = await testStorage();
  
  console.log('Firestore test:', firestoreResult);
  console.log('Storage test:', storageResult);
  
  return {
    firestore: firestoreResult,
    storage: storageResult,
    overall: firestoreResult.success && storageResult.success
  };
};