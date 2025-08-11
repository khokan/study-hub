# 📚 StudyHub – Online Learning & Enrollment Platform

## 📌 Project Name
**StudyHub**

---

## 🎯 Project Purpose
StudyHub is a modern full-stack online learning platform where students can browse courses, enroll in sessions, and connect with classmates. It provides a seamless experience for both learners and educators, combining intuitive UI, secure authentication, and powerful backend APIs.

This project demonstrates hands-on experience with:

- Authentication (Firebase)
- RESTful API integration
- MongoDB database management
- Protected routes
- State management
- Responsive UI/UX with Tailwind CSS

---

## 🌐 Live Links
- **Live Client:** [https://studyhub.web.app](https://studyhub.web.app)
- **Live Server API:** [https://studyhub-server.vercel.app](https://studyhub-server.vercel.app)

---

## 📁 GitHub Repositories
- **Client:**  [https://github.com/khokan/studyhub/tree/main/client](https://github.com/khokan/studyhub/tree/main/client)
- **Server:** [https://github.com/khokan/studyhub/tree/main/server](https://github.com/khokan/studyhub/tree/main/server)

---

## ✨ Key Features
- ✅ User authentication with Firebase (Email + Social login)
- ✅ Role-based access (Student/Instructor)
- ✅ Course creation and management by instructors
- ✅ Student enrollment in courses with session management
- ✅ Real-time course search and filtering
- ✅ Classmate listing for enrolled courses
- ✅ Responsive design with Tailwind CSS and DaisyUI
- ✅ Protected routes with JWT and Firebase ID token validation
- ✅ Toast notifications for user actions
- ✅ Loading spinners for async operations
- ✅ Responsive layout for all devices
- ✅ Course listing and search functionality
- ✅ Enroll in sessions with seat availability checks
- ✅ View and manage enrolled courses
- ✅ Protected routes with JWT and Firebase ID token
- ✅ Instructor dashboard to manage courses
- ✅ Classmate listing for enrolled sessions
- ✅ Toast notifications and loading spinners
- ✅ Secure environment variable usage
- ✅ Optimized UI with Tailwind CSS + DaisyUI

---

## 📦 NPM Packages Used

### 🔧 Frontend (Client)
- **React** – UI framework
- **React Router DOM** – Client-side routing
- **Firebase** – Authentication
- **Axios** – API calls
- **React Icons** – Icon library
- **React Toastify** – Notifications
- **Framer Motion** – Animations
- **Tailwind CSS** – Styling
- **DaisyUI** – UI components

### ⚙️ Backend (Server)
- **Express.js** – Web framework
- **Cors** – Middleware for cross-origin requests
- **Dotenv** – Environment variable loader
- **MongoDB** – Database
- **firebase-admin** – Server-side Firebase authentication
- **jsonwebtoken** – JWT authentication

---

## 🚀 Quick Start

### 1️⃣ Clone & Run Client
```bash
git clone https://github.com/khokan/study-hub.gitt
cd client
npm install
npm run dev
```

### 2️⃣ Clone & Run Server
```bash
git clone https://github.com/khokan/study-hub.git
cd server
npm install
npm run dev
```

> **Note:** Start the server before the client to ensure API functionality.

---

### 3️⃣ Environment Variables

#### Client `.env`
```ini
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Server `.env`
```ini
PORT=5000
DB_USER=your_mongo_user
DB_PASS=your_mongo_pass
FB_SERVICE_KEY=base64_encoded_service_account_json
```

---

## 📂 Project Structure
```plaintext
StudyHub/
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── routes/        # Protected/Public routes
│   │   └── App.jsx
│   └── package.json
│
└── server/                # Express backend
    ├── index.js
    ├── routes/            # API route handlers
    ├── middlewares/       # Authentication & error handling
    ├── controllers/       # Business logic
    └── package.json
```

---

## 🛡️ Security Notes
- Firebase token validation on protected routes
- Course enrollment prevents duplicates
- Role-based access for instructors and students
- Environment variables secured in `.env` files

---

## 👨‍💻 Developer Info
**Your Name**  
📧 your.email@example.com
