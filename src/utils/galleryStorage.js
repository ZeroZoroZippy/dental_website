// Hybrid gallery storage utility - supports both localStorage and Firebase
import { getGalleryItems as getFirebaseItems } from '../services/galleryApi';

// Configuration flag - set to true to use Firebase, false for localStorage
export const USE_FIREBASE = true; // Toggle this for production

const STORAGE_KEY = 'gallery_items';

// Default gallery items (your existing images)
import hero from '../assets/hero.jpeg';
import preventiveCare from '../assets/preventive_care_1.png';
import cosmeticCare from '../assets/cosmetic_care.png';
import orthodontics from '../assets/Orthodontics.png';
import restoration from '../assets/restorative_dentistry.png';
import emergency from '../assets/Emergency_Care.png';
import specialityService from '../assets/speciality_service.png';
import bannerDesktop from '../assets/banner_desktop.png';
import bannerMobile from '../assets/banner_mobile.png';

const defaultGalleryItems = [
    {
        id: 1,
        image: hero,
        title: "Modern Dental Office",
        category: "Facility",
        description: "Our state-of-the-art facility designed for comfort and advanced care",
        order: 1,
        isDefault: true
    },
    {
        id: 2,
        image: preventiveCare,
        title: "Preventive Care",
        category: "Treatment",
        description: "Regular cleanings and checkups to maintain optimal oral health",
        order: 2,
        isDefault: true
    },
    {
        id: 3,
        image: cosmeticCare,
        title: "Smile Makeovers",
        category: "Cosmetic",
        description: "Beautiful results with our cosmetic dentistry services",
        order: 3,
        isDefault: true
    },
    {
        id: 4,
        image: orthodontics,
        title: "Orthodontics",
        category: "Treatment",
        description: "Straight teeth solutions for all ages",
        order: 4,
        isDefault: true
    },
    {
        id: 5,
        image: restoration,
        title: "Restorative Work",
        category: "Treatment",
        description: "Expert dental restoration and repair services",
        order: 5,
        isDefault: true
    },
    {
        id: 6,
        image: emergency,
        title: "Emergency Care",
        category: "Emergency",
        description: "Immediate dental care when you need it most",
        order: 6,
        isDefault: true
    },
    {
        id: 7,
        image: specialityService,
        title: "Specialty Services",
        category: "Treatment",
        description: "Advanced specialized dental procedures",
        order: 7,
        isDefault: true
    },
    {
        id: 8,
        image: bannerDesktop,
        title: "Patient Comfort",
        category: "Facility",
        description: "Comfortable environment for all our patients",
        order: 8,
        isDefault: true
    },
    {
        id: 9,
        image: bannerMobile,
        title: "Modern Equipment",
        category: "Facility",
        description: "Latest technology for precise treatments",
        order: 9,
        isDefault: true
    }
];

// Get all gallery items (hybrid approach)
export const getGalleryItems = async () => {
    if (USE_FIREBASE) {
        try {
            return await getFirebaseItems();
        } catch (error) {
            console.error('Firebase error, falling back to localStorage:', error);
            return getLocalStorageItems();
        }
    }
    // For localStorage, return synchronously but wrapped in Promise.resolve for consistency
    return Promise.resolve(getLocalStorageItems());
};

// Get items from localStorage
const getLocalStorageItems = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        // If no stored data, initialize with defaults
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGalleryItems));
        return defaultGalleryItems;
    } catch (error) {
        console.error('Error loading gallery items:', error);
        return defaultGalleryItems;
    }
};

// Save gallery items (localStorage only - Firebase uses its own methods)
export const saveGalleryItems = (items) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('galleryUpdated'));
        return true;
    } catch (error) {
        console.error('Error saving gallery items:', error);
        return false;
    }
};

// Legacy localStorage methods (kept for backward compatibility) - now async for consistency
export const addGalleryItem = async (item) => {
    const items = getLocalStorageItems();
    const newItem = {
        ...item,
        id: Date.now(),
        order: items.length + 1,
        uploadedAt: new Date().toISOString(),
        isDefault: false
    };
    items.push(newItem);
    return saveGalleryItems(items) ? newItem : null;
};

export const updateGalleryItem = async (id, updates) => {
    const items = getLocalStorageItems();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = { ...items[index], ...updates };
        return saveGalleryItems(items) ? items[index] : null;
    }
    return null;
};

export const deleteGalleryItem = async (id) => {
    const items = getLocalStorageItems();
    const filteredItems = items.filter(item => item.id !== id);
    return saveGalleryItems(filteredItems);
};

export const reorderGalleryItems = async (reorderedItems) => {
    const itemsWithOrder = reorderedItems.map((item, index) => ({
        ...item,
        order: index + 1
    }));
    return saveGalleryItems(itemsWithOrder);
};

// Utility functions
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

export const validateImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = USE_FIREBASE ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB for Firebase, 5MB for localStorage

    if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)' };
    }

    if (file.size > maxSize) {
        const sizeMB = USE_FIREBASE ? '10MB' : '5MB';
        return { valid: false, error: `Image size must be less than ${sizeMB}` };
    }

    return { valid: true };
};