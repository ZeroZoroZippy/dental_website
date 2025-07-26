# Production Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
- [ ] Copy `.env.example` to `.env`
- [ ] Update all Firebase config values in `.env`
- [ ] Set a secure admin password in `VITE_ADMIN_PASSWORD`
- [ ] Verify all environment variables are set

### 2. Firebase Configuration
- [ ] Update Firebase Security Rules (see `firebase-security-rules.md`)
- [ ] Test Firebase connection in development
- [ ] Verify image uploads work correctly
- [ ] Check Firestore data structure

### 3. Build and Test
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm run preview
```

### 4. Deployment Options

#### Option A: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Option B: Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Option C: Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy
```

## Post-Deployment Steps

### 1. Test Production Site
- [ ] Visit your deployed site
- [ ] Test gallery display on homepage
- [ ] Test full gallery page
- [ ] Test CMS login at `/gallery/edit`
- [ ] Upload test images
- [ ] Test image reordering
- [ ] Test image editing/deletion

### 2. Security Hardening
- [ ] Change default admin password
- [ ] Consider implementing Firebase Authentication
- [ ] Monitor Firebase usage and costs
- [ ] Set up Firebase security alerts

### 3. Performance Optimization
- [ ] Enable image compression in Firebase Storage
- [ ] Set up CDN caching rules
- [ ] Monitor Core Web Vitals
- [ ] Optimize image loading

## Environment Variables Reference

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Admin Configuration
VITE_ADMIN_PASSWORD=your-secure-password
```

## Troubleshooting

### Common Issues:
1. **Images not loading**: Check Firebase Storage rules
2. **Upload failures**: Verify Firebase Storage permissions
3. **Data not syncing**: Check Firestore rules
4. **Build failures**: Verify all environment variables are set

### Support:
- Check browser console for errors
- Monitor Firebase console for usage/errors
- Review deployment logs for build issues