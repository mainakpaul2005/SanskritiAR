# Firebase Authentication Flow Diagram

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SanskritiAR App                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  App.tsx                                             │  │
│  │  - AuthProvider (initialized here)                  │  │
│  │  - Listens to Firebase auth state                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           ▼                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AuthContext.tsx                                     │  │
│  │  - Manages user state                               │  │
│  │  - Handles login/signup/logout                      │  │
│  │  - Persists to AsyncStorage                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                    ┌──────┴──────┐                          │
│                    ▼             ▼                          │
│           LoginScreen        ProfileScreen                  │
│           (useAuth)          (useAuth)                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
         │                           │
         └─────────────┬─────────────┘
                       ▼
         ┌─────────────────────────┐
         │   .env (Environment)    │
         ├─────────────────────────┤
         │ FIREBASE_API_KEY        │
         │ FIREBASE_PROJECT_ID     │
         │ FIREBASE_AUTH_DOMAIN    │
         │ ...etc                  │
         └─────────────────────────┘
                       │
                       ▼
         ┌─────────────────────────┐
         │  firebase.ts            │
         │  (Initialize Firebase)  │
         │  auth = getAuth(app)    │
         │  db = getFirestore(app) │
         └─────────────────────────┘
                       │
                       ▼
         ┌─────────────────────────┐
         │  Firebase Backend       │
         ├─────────────────────────┤
         │ Authentication          │
         │ Firestore Database      │
         │ Cloud Storage           │
         └─────────────────────────┘
```

## Authentication Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       │ Email + Password
       ▼
┌──────────────────────────────┐
│  LoginScreen Component       │
│  - Gets email & password     │
│  - Validates input           │
│  - Calls login()             │
└──────┬───────────────────────┘
       │
       │ useAuth().login(email, password)
       ▼
┌──────────────────────────────┐
│  AuthContext.login()         │
│  - Calls Firebase            │
│  - signInWithEmailAndPassword│
└──────┬───────────────────────┘
       │
       │ Firebase Authentication Request
       ▼
┌──────────────────────────────┐
│  Firebase Backend            │
│  - Validates credentials     │
│  - Returns auth token        │
└──────┬───────────────────────┘
       │
       │ User object + Token
       ▼
┌──────────────────────────────┐
│  AuthContext                 │
│  - Save user state           │
│  - Cache to AsyncStorage     │
│  - Set firebaseUser          │
└──────┬───────────────────────┘
       │
       │ Update UI
       ▼
┌──────────────────────────────┐
│  User Logged In             │
│  - Components get user       │
│  - Protected routes show     │
│  - Dashboard available       │
└──────────────────────────────┘
```

## File Organization

```
src/
├── services/
│   └── firebase.ts                  ← Firebase SDK Init
│       - initializeApp()
│       - getAuth()
│       - getFirestore()
│
├── context/
│   └── AuthContext.tsx              ← Auth State & Logic
│       - useAuth() hook
│       - login/signup/logout
│       - Firebase integration
│
├── config/
│   └── env.ts                       ← Env Variables Reference
│
├── types/
│   └── env.d.ts                     ← Type Definitions
│
├── screens/
│   ├── LoginScreen.tsx              ← Uses useAuth()
│   ├── SignupScreen.tsx             ← Uses useAuth()
│   ├── ProfileScreen.tsx            ← Uses useAuth()
│   └── ...
│
└── components/
    ├── Button.tsx
    └── Input.tsx

Root Directory:
├── .env                             ← Secrets (DON'T COMMIT)
├── .env.example                     ← Template (COMMIT)
├── babel.config.js                  ← Has dotenv plugin
│
└── Documentation:
    ├── FIREBASE_SETUP.md            ← Detailed Setup
    ├── FIREBASE_AUTH_SETUP_COMPLETE.md ← Summary
    └── FIREBASE_ENV_QUICK_START.md  ← Quick Ref
```

## Data Flow

```
┌─────────────────────────────────┐
│  .env File                      │
│  (React Native Dotenv)          │
├─────────────────────────────────┤
│ FIREBASE_API_KEY=xxx            │
│ FIREBASE_PROJECT_ID=yyy         │
│ ...                             │
└────────┬────────────────────────┘
         │
         │ Babel Transforms
         │ (babel-plugin-dotenv)
         ▼
┌─────────────────────────────────┐
│  src/services/firebase.ts       │
│  (Gets env vars)                │
├─────────────────────────────────┤
│ import {                        │
│   FIREBASE_API_KEY,             │
│   FIREBASE_PROJECT_ID           │
│ } from '@env'                   │
│                                 │
│ initializeApp(firebaseConfig)   │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Auth Object                    │
│  - export auth = getAuth(app)   │
│  - Used in AuthContext          │
└─────────────────────────────────┘
```

## Security Model

```
┌──────────────────────────────────────┐
│  Development Machine                 │
│  .env (LOCAL ONLY)                   │
│  ├── Actual secrets                  │
│  └── Never committed to git          │
│                                      │
│  Git Repository                      │
│  ├── .env → in .gitignore            │
│  └── .env.example → Template only    │
│                                      │
│  npm Package                         │
│  ├── No secrets embedded             │
│  └── Users provide own .env          │
└──────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Security Best Practices:            │
│  ✓ Different keys per environment    │
│  ✓ Rotate credentials regularly      │
│  ✓ Restrict API keys in Firebase    │
│  ✓ Use separate projects for dev/prod│
│  ✓ Never share .env files            │
└──────────────────────────────────────┘
```

---

## Process Summary

1. **Development**: Developer creates `.env` with their credentials
2. **Build Time**: Babel reads `.env` and injects values
3. **Runtime**: Firebase is initialized with these values
4. **Authentication**: User logs in via Firebase
5. **State Management**: AuthContext stores user state
6. **Components**: useAuth() provides auth state to components
7. **Security**: Credentials never leave device, never committed to git
