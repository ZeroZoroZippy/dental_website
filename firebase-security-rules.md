# Production Firebase Security Rules

## Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Gallery items - public read, no authentication required for write (for now)
    match /gallery_items/{document} {
      allow read: if true;
      allow write: if true; // In future, add: request.auth != null
    }
  }
}
```

## Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Gallery images - public read, allow uploads
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if true; // In future, add: request.auth != null
    }
  }
}
```

## Future Authentication Enhancement
When you're ready to add proper authentication:

1. Enable Firebase Authentication in console
2. Update rules to require authentication:
   ```javascript
   allow write: if request.auth != null;
   ```
3. Implement Firebase Auth in the CMS dashboard
4. Replace password protection with proper user management

## Security Considerations
- Current setup allows anyone to upload if they know the URL
- Password protection is client-side only
- For high-security needs, implement server-side validation
- Consider rate limiting for uploads
- Monitor Firebase usage and costs