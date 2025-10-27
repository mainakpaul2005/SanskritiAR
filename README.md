# SanskritiAR

**SanskritiAR** is a cutting-edge Augmented Reality (AR) mobile application designed to showcase and immerse users in cultural and historical Points of Interest (POIs). By leveraging a robust modern tech stack, the application seamlessly blends the physical world with rich digital content, providing an interactive and educational experience tied to location.

## ✨ Features

The application is built around core capabilities that enable a dynamic AR experience:

  * **Location-Based AR:** Utilizes the device's compass and location data to accurately place and orient 3D cultural models in the user's immediate environment.
  * **Dynamic POI Management:** Fetches up-to-date Points of Interest (POIs) and their associated AR model links from a centralized backend API.
  * **Generative AI Integration:** The backend incorporates Google Generative AI to potentially provide rich, context-aware information or interactive narration about the displayed cultural artifacts.
  * **Cross-Platform Mobile App:** Developed with Flutter for a consistent experience across iOS and Android devices.
  * **Persistent Data Storage:** Uses a MySQL database managed via SQLAlchemy to reliably store and serve POI data, user information, and AR model locations.

## 🛠️ Technology Stack

The project is divided into a mobile frontend application and a scalable Python backend API.

### Frontend (Mobile Application)

The client application is built using the Flutter framework, enabling cross-platform development.

| Component | Technology | Description | Source |
| :--- | :--- | :--- | :--- |
| **Framework** | Flutter (Dart SDK \>=3.4.1) | Primary mobile development framework. | |
| **Augmented Reality** | `ar_flutter_plugin` | Core library for AR visualization and interaction. | |
| **Location/Orientation** | `flutter_compass` | Used for capturing device orientation relative to magnetic North, critical for location-based AR object placement. | |
| **Networking** | `http` | Used for making API calls to the SanskritiAR Backend. | |
| **Mathematics** | `vector_math` | Used for handling 3D vector and matrix calculations essential for AR. | |

### Backend (API Server)

The backend is a high-performance Python application providing the necessary APIs, database interface, and generative AI features.

| Component | Technology | Description | Source |
| :--- | :--- | :--- | :--- |
| **Web Framework** | FastAPI | High-performance, asynchronous Python web framework for API development. | |
| **ASGI Server** | Uvicorn (`[standard]`) | ASGI server used to run the FastAPI application. | |
| **ORM** | SQLAlchemy | Python SQL Toolkit and Object Relational Mapper for interacting with the database. | |
| **Database Connector** | `mysql-connector-python` | Driver for connecting SQLAlchemy to the MySQL database. | |
| **Generative AI** | `google-generativeai` | Integration point for AI models to enrich content or enable conversational features. | |
| **Authentication/Services** | `firebase-admin` | Used for integrating backend services with Google Firebase (e.g., Auth, Storage, Messaging). | |
| **Environment** | `python-dotenv` | Used for managing configuration variables (e.g., database credentials, API keys). | |

## 🚀 Getting Started

Follow these steps to get a copy of the project up and running on your local machine for development and testing.

### 1\. Prerequisites

You will need the following installed:

  * [Python 3.x](https://www.python.org/downloads/)
  * [Flutter SDK](https://flutter.dev/docs/get-started/install)
  * A running **MySQL** database instance.
  * A configured **Firebase** project for the `firebase-admin` integration.

### 2\. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd SanskritiAR_Backend
    ```
2.  Create a virtual environment and install dependencies:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use: .\venv\Scripts\activate
    pip install -r requirements.txt
    ```
3.  Set up environment variables:
      * Create a `.env` file in the `SanskritiAR_Backend` directory and populate it with your database credentials, Firebase configuration details, and Google Generative AI API key.
4.  Run the database migrations (if database initialization scripts exist, otherwise manually create tables as defined by SQLAlchemy models).
5.  Start the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

### 3\. Frontend Setup

1.  Navigate to the mobile application directory:
    ```bash
    cd ../sanskritiar_app
    ```
2.  Fetch all dependencies:
    ```bash
    flutter pub get
    ```
3.  Verify the Flutter setup:
    ```bash
    flutter doctor
    ```
4.  Ensure your AR-compatible device (iOS or Android) is connected, or an emulator is running.
5.  Run the application:
    ```bash
    flutter run
    ```

## 📂 Project Structure

The repository follows a clean separation between the mobile application and the backend API.

```
SanskritiAR/
├── SanskritiAR_Backend/
│   ├── api/             # FastAPI routers (e.g., pois.py), database models, schemas
│   ├── static/models/   # 3D AR Models (.glb files)
│   ├── requirements.txt # Python dependencies
│   └── main.py          # FastAPI application entry point
└── sanskritiar_app/
    ├── lib/             # Dart/Flutter source code (screens, services)
    ├── pubspec.yaml     # Flutter dependencies and project metadata
    └── ...              # Platform-specific folders (android, ios, web)
```

## 📝 License

This project is licensed under the **MIT License** License - see the `LICENSE` file for details.
