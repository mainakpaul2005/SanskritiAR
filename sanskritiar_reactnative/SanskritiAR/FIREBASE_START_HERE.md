# 🎯 Firebase Setup - Start Here

## You have 3 minutes? ⏱️

1. **Get credentials**: Go to https://console.firebase.google.com → Create project → Enable Email/Password auth → Copy config
2. **Edit `.env`**: Fill in `FIREBASE_API_KEY`, `FIREBASE_PROJECT_ID`, etc.
3. **Run app**: `npm start -- --reset-cache`
4. **Done!** Your app now has real authentication ✅

---

## File Structure

```
SanskritiAR/
├── 📄 FIREBASE_COMPLETE_GUIDE.md          ← Overview (this file!)
├── 📄 FIREBASE_ENV_QUICK_START.md         ← Quick reference
├── 📄 FIREBASE_SETUP.md                   ← Detailed guide
├── 📄 FIREBASE_ARCHITECTURE.md            ← How it works
├── 📄 FIREBASE_IMPLEMENTATION_CHECKLIST.md ← Pre-launch checklist
│
├── .env                                   ← Your secrets (edit this!)
├── .env.example                           ← Template
│
├── src/services/firebase.ts               ← Firebase init
├── src/context/AuthContext.tsx            ← Auth provider
├── src/config/env.ts                      ← Env reference
└── src/types/env.d.ts                     ← Type definitions
```

---

## What You Can Do Now

✅ **Sign up new users** with email/password  
✅ **Log in** existing users  
✅ **Log out** and clear sessions  
✅ **Persist sessions** across app restarts  
✅ **Access auth state** in any component  
✅ **Handle errors** from Firebase  

---

## Setup Steps

### 1️⃣ Firebase Setup (5 min)

```
https://console.firebase.google.com/
  → Create new project (pick a name)
  → Go to Authentication
  → Enable "Email/Password"
  → Go to Settings → Project Settings
  → Copy your credentials (shown below)
```

You'll need these values:
- `apiKey`
- `authDomain`
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`
- `measurementId` (optional)

### 2️⃣ Add Credentials (2 min)

Edit `.env` file and fill in:

```env
FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxx
FIREBASE_AUTH_DOMAIN=myproject.firebaseapp.com
FIREBASE_PROJECT_ID=myproject-12345
FIREBASE_STORAGE_BUCKET=myproject-12345.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxx
FIREBASE_MEASUREMENT_ID=G-xxxxxxxxxx

# Optional - add other API keys
GOOGLE_MAPS_API_KEY=your_key_here
HERITAGE_API_KEY=your_key_here
```

⚠️ **Important**: Never commit this file! It's in `.gitignore`.

### 3️⃣ Restart App (1 min)

```bash
npm start -- --reset-cache
```

The `--reset-cache` flag is important after changing `.env`!

---

## Using Authentication

### In Your Components

```tsx
import { useAuth } from '../context/AuthContext';

export const MyScreen = () => {
  const { user, login, logout, isLoading } = useAuth();

  // User object
  if (user) {
    console.log(user.name);      // "John"
    console.log(user.email);     // "john@example.com"
  }

  // Login
  const handleLogin = async () => {
    try {
      await login('john@example.com', 'password123');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Signup
  const handleSignup = async () => {
    try {
      await signup('John Doe', 'john@example.com', 'password123');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  // Logout
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View>
      {user ? (
        <>
          <Text>Welcome, {user.name}!</Text>
          <Button title="Logout" onPress={handleLogout} disabled={isLoading} />
        </>
      ) : (
        <>
          <Button title="Login" onPress={handleLogin} disabled={isLoading} />
          <Button title="Signup" onPress={handleSignup} disabled={isLoading} />
        </>
      )}
    </View>
  );
};
```

### Get Auth State

```tsx
const { user, isLoading, isInitialized } = useAuth();

// Check if app is still initializing
if (!isInitialized) {
  return <LoadingScreen />;
}

// Check if user is logged in
if (user) {
  return <Dashboard user={user} />;
} else {
  return <LoginScreen />;
}
```

---

## Environment Variables Available

| Variable | Use For |
|----------|---------|
| `FIREBASE_API_KEY` | Firebase authentication |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_AUTH_DOMAIN` | Firebase domain |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage |
| `FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging |
| `FIREBASE_APP_ID` | Firebase app ID |
| `FIREBASE_MEASUREMENT_ID` | Google Analytics |
| `GOOGLE_MAPS_API_KEY` | Google Maps |
| `HERITAGE_API_KEY` | Your heritage API |

To use them:
```tsx
import { GOOGLE_MAPS_API_KEY } from '@env';

const apiKey = GOOGLE_MAPS_API_KEY;
```

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "Cannot find module '@env'" | Run `npm start -- --reset-cache` |
| "Firebase configuration error" | Check all `.env` values are correct |
| "auth/weak-password" | Password must be 6+ characters |
| "auth/email-already-in-use" | Email already has account |
| "auth/user-not-found" | Email not registered |

---

## Security Notes

✅ **DO:**
- Keep `.env` file local only
- Use `.env.example` as template
- Rotate credentials periodically
- Use different Firebase projects for dev/prod

❌ **DON'T:**
- Commit `.env` to git (it's in `.gitignore`)
- Share Firebase keys with others
- Use production keys in development
- Hardcode API keys in code

---

## Documentation

Choose your level:

| Need | Read This |
|------|-----------|
| Quick answers | `FIREBASE_ENV_QUICK_START.md` |
| Full details | `FIREBASE_SETUP.md` |
| Code examples | `FIREBASE_AUTH_SETUP_COMPLETE.md` |
| How it works | `FIREBASE_ARCHITECTURE.md` |
| Pre-launch checklist | `FIREBASE_IMPLEMENTATION_CHECKLIST.md` |

---

## Dependencies Installed

```json
{
  "firebase": "latest",
  "react-native-dotenv": "latest"
}
```

Already included:
- `@react-native-async-storage/async-storage` (session caching)
- `@react-navigation` (routing)
- `react-native-safe-area-context` (safe areas)

---

## What's Included

✅ Real Firebase authentication  
✅ Email/password login & signup  
✅ Session persistence  
✅ Automatic session restore  
✅ Error handling  
✅ TypeScript support  
✅ Environment variables  
✅ Security best practices  

---

## Next Steps

1. **Now**: Fill in `.env` file
2. **Next**: Test login/signup
3. **Later**: 
   - Add password reset
   - Add social login
   - Add email verification
   - Add user profiles
   - Deploy to production

---

## Let's Go! 🚀

```bash
# 1. Edit .env with your Firebase credentials

# 2. Start the app
npm start -- --reset-cache

# 3. Test signup/login
# 4. Build something awesome!
```

---

**Questions?** See the full guides above.  
**Ready?** Start with Step 1: Firebase Setup

Happy coding! 🎉
