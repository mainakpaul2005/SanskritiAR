# Firebase + .env Quick Reference

## 📋 Checklist

- [ ] Create Firebase project at https://console.firebase.google.com
- [ ] Enable Email/Password authentication in Firebase
- [ ] Get Firebase config credentials
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in `.env` with your Firebase credentials
- [ ] Run `npm start -- --reset-cache`
- [ ] Test login/signup functionality

## 🔑 Getting Firebase Credentials

1. Go to **Firebase Console** → Your Project
2. Click **Settings** ⚙️ → **Project Settings**
3. Scroll to **Your apps** section
4. Click your web app (or create one)
5. Copy the configuration object:

```javascript
// Find these values in Firebase console:
{
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_AUTH_DOMAIN",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
  appId: "FIREBASE_APP_ID",
  measurementId: "FIREBASE_MEASUREMENT_ID"
}
```

## 📝 Environment Variables

### .env File Location
```
/SanskritiAR/.env  ← Your local file (DO NOT commit)
```

### .env File Format
```env
FIREBASE_API_KEY=your_value_here
FIREBASE_AUTH_DOMAIN=your_value_here
FIREBASE_PROJECT_ID=your_value_here
FIREBASE_STORAGE_BUCKET=your_value_here
FIREBASE_MESSAGING_SENDER_ID=your_value_here
FIREBASE_APP_ID=your_value_here
FIREBASE_MEASUREMENT_ID=your_value_here
GOOGLE_MAPS_API_KEY=your_value_here
HERITAGE_API_KEY=your_value_here
```

## 💻 Code Examples

### Use Auth in Any Component
```tsx
import { useAuth } from '../context/AuthContext';

export const MyComponent = () => {
  const { user, login, logout, isLoading } = useAuth();

  return (
    <>
      {user ? (
        <button onClick={logout}>Logout {user.name}</button>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </>
  );
};
```

### Use Environment Variables
```tsx
import { GOOGLE_MAPS_API_KEY } from '@env';

const API_KEY = GOOGLE_MAPS_API_KEY;
```

## 🚀 Commands

```bash
# Start with cache reset (needed after .env changes)
npm start -- --reset-cache

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 🔗 File Structure

```
SanskritiAR/
├── .env                          ← Your secrets (DON'T commit)
├── .env.example                  ← Template (commit this)
├── babel.config.js               ← Has dotenv plugin
├── src/
│   ├── services/
│   │   └── firebase.ts           ← Firebase init
│   ├── context/
│   │   └── AuthContext.tsx       ← Auth provider
│   ├── config/
│   │   └── env.ts                ← Env reference
│   └── types/
│       └── env.d.ts              ← Type definitions
├── FIREBASE_SETUP.md             ← Detailed guide
└── FIREBASE_AUTH_SETUP_COMPLETE.md ← Full setup summary
```

## ❌ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot find module '@env'" | Run `npm start -- --reset-cache` |
| Auth not working | Check `.env` file has all credentials |
| Variables undefined | Restart dev server after `.env` changes |
| Firebase init errors | Verify project ID and API key |

## 🔐 Security Reminders

✅ **DO:**
- Use `.env.example` as template
- Store actual values in `.env` (local only)
- Commit `.env.example` to git
- Rotate credentials regularly

❌ **DON'T:**
- Commit `.env` file
- Share Firebase credentials
- Use production keys in development
- Store secrets in code

## 📞 Support Files

- **Full Setup**: `FIREBASE_SETUP.md`
- **Implementation Summary**: `FIREBASE_AUTH_SETUP_COMPLETE.md`
- **Type Definitions**: `src/types/env.d.ts`

---

**Last Updated**: November 1, 2025
**Status**: ✅ Ready to configure
