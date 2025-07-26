# Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "dental-gallery-cms")
4. Enable Google Analytics (optional)
5. Create project

## 2. Enable Required Services

### Firestore Database
1. Go to "Firestore Database" in the sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select your preferred location
5. Click "Done"

### Firebase Storage
1. Go to "Storage" in the sidebar
2. Click "Get started"
3. Choose "Start in test mode"
4. Select same location as Firestore
5. Click "Done"

### Authentication (Optional)
1. Go to "Authentication" in the sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

## 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) to add web app
4. Enter app nickname (e.g., "Gallery CMS")
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the configuration object

## 4. Update Firebase Config

Replace the config in `src/services/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## 5. Set Up Security Rules

### Firestore Rules
Go to Firestore → Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to gallery items for everyone
    match /gallery_items/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

### Storage Rules
Go to Storage → Rules and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can upload
    }
  }
}
```

## 6. Enable Firebase in Your App

In `src/utils/galleryStorage.js`, change:
```javascript
export const USE_FIREBASE = true;
```

## 7. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `/gallery/edit` and try uploading an image
3. Check Firebase Console to see if data appears in Firestore and Storage

## 8. Production Deployment

### Environment Variables
For production, use environment variables:

```javascript
// In src/services/firebase.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

Create `.env` file:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

## 9. Migration from localStorage

The app includes a migration utility. After setting up Firebase:

1. Go to `/gallery/edit`
2. Open browser console
3. Run: `window.migrateToFirebase()` (we'll add this function)
4. Your localStorage data will be migrated to Firebase

## Troubleshooting

### Common Issues:
- **Permission denied**: Check Firestore/Storage rules
- **Network error**: Verify Firebase config
- **Quota exceeded**: Check Firebase usage limits
- **CORS errors**: Ensure proper domain configuration

### Support:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guides](https://firebase.google.com/docs/firestore)
- [Storage Guides](https://firebase.google.com/docs/storage)