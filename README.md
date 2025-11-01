# 🏛️ SanskritiAR

**SanskritiAR** is a cutting-edge Augmented Reality (AR) mobile application ecosystem designed to showcase and immerse users in India's rich cultural heritage and historical Points of Interest (POIs). By leveraging modern multi-platform development, the project offers both **Flutter** and **React Native** implementations, backed by a powerful Python FastAPI backend with AI-powered features.

> **Mission:** Preserve and promote Indian cultural heritage through immersive AR experiences, making history accessible and engaging for everyone.

## 🌟 Features

### Core AR Capabilities
- **📍 Location-Based AR:** Accurately places and orients 3D cultural models using device GPS and compass
- **🗺️ Dynamic POI Discovery:** Real-time fetching of heritage sites and monuments from centralized API
- **🤖 AI-Powered Insights:** Google Generative AI integration for context-aware narration and information
- **📱 Multi-Platform Support:** Available as both Flutter and React Native applications
- **🔐 User Authentication:** Firebase-based authentication system
- **⭐ Favorites & Bookmarks:** Save and manage your favorite heritage sites
- **🎨 Modern UI/UX:** Beautiful, culturally-inspired interface with smooth animations
- **💾 Offline Support:** Cached content for areas with limited connectivity

### Technical Features
- Cross-platform mobile apps (iOS & Android)
- RESTful API with FastAPI
- MySQL database with SQLAlchemy ORM
- Firebase integration for authentication and storage
- Retrieval-Augmented Generation (RAG) for enhanced AI responses
- 3D model rendering with AR visualization

## 🛠️ Technology Stack

### 📱 Mobile Applications

#### Flutter App (`sanskritiar_app/`)
| Component | Technology | Purpose |
|-----------|-----------|----------|
| **Framework** | Flutter (Dart SDK >=3.4.1) | Cross-platform mobile development |
| **AR Engine** | `ar_flutter_plugin` | Core AR visualization and 3D model rendering |
| **Location** | `geolocator`, `flutter_compass` | GPS positioning and device orientation |
| **Networking** | `http` | REST API communication |
| **Math** | `vector_math` | 3D transformations and calculations |
| **Permissions** | `permission_handler` | Camera, location, and storage access |

#### React Native App (`sanskritiar_reactnative/SanskritiAR/`)
| Component | Technology | Purpose |
|-----------|-----------|----------|
| **Framework** | React Native with TypeScript | Modern JavaScript-based mobile development |
| **Navigation** | React Navigation | Screen routing and navigation |
| **UI Framework** | Gluestack UI | Modern component library |
| **State Management** | React Context API | Global state management |
| **Authentication** | Firebase Auth | User authentication and management |
| **Styling** | Custom theme system | Culturally-inspired design system |
| **Testing** | Jest | Unit and integration testing |

### 🖥️ Backend (`SanskritiAR_Backend/`)
| Component | Technology | Purpose |
|-----------|-----------|----------|
| **Web Framework** | FastAPI | High-performance async API framework |
| **Server** | Uvicorn [standard] | ASGI server with HTTP/2 support |
| **Database** | MySQL + SQLAlchemy | Persistent data storage with ORM |
| **AI/ML** | Google Generative AI | AI-powered content generation |
| **Authentication** | Firebase Admin SDK | Backend authentication verification |
| **Config** | python-dotenv | Environment variable management |
| **API Docs** | OpenAPI/Swagger | Auto-generated API documentation |

### 🤖 RAG System (`RAG/`)
| Component | Technology | Purpose |
|-----------|-----------|----------|
| **Framework** | LangChain / Custom | Retrieval-Augmented Generation pipeline |
| **Embeddings** | Sentence Transformers | Vector embeddings for semantic search |
| **Vector Store** | FAISS / ChromaDB | Efficient similarity search |
| **LLM** | Google Gemini | Large language model integration |

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **[Python 3.8+](https://www.python.org/downloads/)** - For backend development
- **[Node.js 18+](https://nodejs.org/)** - For React Native development
- **[Flutter SDK 3.4.1+](https://flutter.dev/docs/get-started/install)** - For Flutter development
- **[MySQL 8.0+](https://dev.mysql.com/downloads/)** - Database server
- **[Git](https://git-scm.com/)** - Version control
- **Firebase Project** - For authentication and storage
- **Google AI API Key** - For Generative AI features

### 🐍 Backend Setup

1. **Clone and navigate to backend:**
   ```bash
   cd SanskritiAR_Backend
   ```

2. **Create virtual environment:**
   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # macOS/Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   Create a `.env` file in `SanskritiAR_Backend/`:
   ```env
   DATABASE_URL=mysql+mysqlconnector://user:password@localhost:3306/sanskritiar
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   FIREBASE_CREDENTIALS_PATH=./firebase-service-account.json
   SECRET_KEY=your_secret_key_here
   ```

5. **Place Firebase credentials:**
   - Download `firebase-service-account.json` from Firebase Console
   - Place it in `SanskritiAR_Backend/` directory

6. **Initialize database:**
   ```bash
   # Create tables
   python -c "from api.database import engine, Base; Base.metadata.create_all(bind=engine)"
   ```

7. **Start the server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   
   API will be available at: `http://localhost:8000`
   
   Swagger docs: `http://localhost:8000/docs`

### 📱 Flutter App Setup

1. **Navigate to Flutter app:**
   ```bash
   cd sanskritiar_app
   ```

2. **Install dependencies:**
   ```bash
   flutter pub get
   ```

3. **Verify Flutter installation:**
   ```bash
   flutter doctor
   ```

4. **Configure Firebase:**
   - Add `google-services.json` (Android) to `android/app/`
   - Add `GoogleService-Info.plist` (iOS) to `ios/Runner/`

5. **Update API endpoint:**
   Edit `lib/services/api_service.dart` with your backend URL

6. **Run the app:**
   ```bash
   # Connect device or start emulator, then:
   flutter run
   
   # For specific platform:
   flutter run -d android
   flutter run -d ios
   ```

### ⚛️ React Native App Setup

1. **Navigate to React Native app:**
   ```bash
   cd sanskritiar_reactnative/SanskritiAR
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment:**
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   API_BASE_URL=http://localhost:8000
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   FIREBASE_PROJECT_ID=your-project-id
   # ... other Firebase config
   ```

4. **Install pods (iOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

5. **Run the app:**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Start Metro bundler separately
   npm start
   ```

### 🤖 RAG System Setup

1. **Navigate to RAG directory:**
   ```bash
   cd RAG
   ```

2. **Follow RAG-specific instructions:**
   See `RAG/README.md` for detailed setup instructions

## 📂 Project Structure

```
SanskritiAR/
│
├── 📱 sanskritiar_app/              # Flutter Application
│   ├── lib/
│   │   ├── main.dart               # App entry point
│   │   ├── models/                 # Data models
│   │   ├── screens/                # UI screens
│   │   └── services/               # API and utility services
│   ├── android/                    # Android-specific config
│   ├── ios/                        # iOS-specific config
│   ├── assets/                     # Images, fonts, etc.
│   └── pubspec.yaml                # Flutter dependencies
│
├── ⚛️ sanskritiar_reactnative/      # React Native Application
│   └── SanskritiAR/
│       ├── src/
│       │   ├── components/         # Reusable UI components
│       │   ├── screens/            # App screens
│       │   ├── navigation/         # Navigation setup
│       │   ├── context/            # Context providers (Auth, Theme)
│       │   ├── services/           # Firebase and API services
│       │   ├── styles/             # Theme and styling
│       │   └── types/              # TypeScript type definitions
│       ├── android/                # Android native code
│       ├── ios/                    # iOS native code
│       ├── assets/                 # Images and resources
│       ├── App.tsx                 # Root component
│       └── package.json            # npm dependencies
│
├── 🐍 SanskritiAR_Backend/          # FastAPI Backend
│   ├── api/
│   │   ├── __init__.py
│   │   ├── database.py             # Database connection
│   │   ├── models.py               # SQLAlchemy models
│   │   ├── schemas.py              # Pydantic schemas
│   │   └── routers/                # API route handlers
│   │       ├── pois.py             # POI endpoints
│   │       ├── auth.py             # Authentication
│   │       └── ai.py               # AI/RAG endpoints
│   ├── static/
│   │   └── models/                 # 3D model files (.glb, .gltf)
│   ├── main.py                     # FastAPI app entry point
│   ├── requirements.txt            # Python dependencies
│   └── firebase-service-account.json  # Firebase credentials (gitignored)
│
├── 🤖 RAG/                          # RAG System
│   ├── embeddings/                 # Vector embeddings
│   ├── models/                     # ML models
│   └── README.md                   # RAG documentation
│
├── 📄 Documentation
│   ├── .gitignore                  # Git ignore rules
│   ├── .gitattributes              # Git attributes
│   ├── LICENSE                     # MIT License
│   └── README.md                   # This file
```

## � Development Workflow

### Running All Services

1. **Start Backend:**
   ```bash
   cd SanskritiAR_Backend
   .venv\Scripts\activate  # Windows
   uvicorn main:app --reload
   ```

2. **Start Flutter App:**
   ```bash
   cd sanskritiar_app
   flutter run
   ```

3. **Start React Native App:**
   ```bash
   cd sanskritiar_reactnative/SanskritiAR
   npm start
   # In another terminal:
   npm run android  # or npm run ios
   ```

### Testing

#### Backend Tests
```bash
cd SanskritiAR_Backend
pytest
```

#### Flutter Tests
```bash
cd sanskritiar_app
flutter test
```

#### React Native Tests
```bash
cd sanskritiar_reactnative/SanskritiAR
npm test
```

## 🗺️ Roadmap

- [x] Flutter app with AR capabilities
- [x] React Native app with modern UI
- [x] FastAPI backend with MySQL
- [x] Firebase authentication
- [x] Google Generative AI integration
- [ ] RAG system for enhanced AI responses
- [ ] Offline mode with local caching
- [ ] Multi-language support (Hindi, English, regional languages)
- [ ] Social sharing features
- [ ] User-generated content
- [ ] AR navigation between POIs
- [ ] Virtual tours and guided experiences
- [ ] 360° panoramic views
- [ ] Audio guides in multiple languages

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 🐛 Known Issues

- AR features require device with ARCore (Android) or ARKit (iOS) support
- Large 3D models may take time to load on slower connections
- Location accuracy depends on device GPS capabilities

## 📧 Contact & Support

- **Project Maintainer:** [mainakpaul2005](https://github.com/mainakpaul2005)
- **Repository:** [SanskritiAR](https://github.com/mainakpaul2005/SanskritiAR)
- **Issues:** [Report a bug](https://github.com/mainakpaul2005/SanskritiAR/issues)

## 🙏 Acknowledgments

- Archaeological Survey of India (ASI) for heritage site data
- Google for Generative AI and Firebase services
- Flutter and React Native communities
- All contributors to this project

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for preserving Indian cultural heritage**

⭐ Star this repo if you find it useful!

</div>
