# StudyHub - Collaborative Study Platform

## 🔗 Live Links

- **Live Website:** [https://study-hub-khokan.web.app/](https://study-hub-khokan.web.app)
- **Server URL:** [https://study-hub-khokan.vercel.app/](https://study-hub-khokan.vercel.app)

## 📁 Project Repositories

- **Client:** [StudyHub Client](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-khokan)
- **Server:** [StudyHub Server](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-khokan)

---

## 🧪 How to Run Locally

To run the project locally, follow these steps:

### 🚀 1. Clone & Run the Client

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-khokan.git
cd studyhub-client
npm install
npm run dev
```

### 🛠️ 2. Clone & Run the Server

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-khokan.git
cd studyhub-server
npm install
npm run dev
```

> ✅ **Note:** The client requires the server to be running at the specified `VITE_API_URL` for full functionality.

---

### 🔐 3. Setup `.env` Files

Create a `.env` file in both the client and server directories.

#### Client `.env`:

```
VITE_API_URL=http://localhost:5000
VITE_IMGBB_API_KEY=your_imgbb_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_IMGBB_API_KEY=your_VITE_IMGBB_API_KEY
VITE_payment_Key=your_VITE_payment_Key
```

#### Server `.env`:

```
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_pass
JWT_SERVICE_KEY=base64_encoded_service_account_json
```

---

## 📅 Project Description

**StudyHub** is a full-stack collaborative learning platform where students and tutors can create, discover, and join study sessions. It features session booking, real-time material sharing, and personalized dashboards for tutors, students, and admins.

## 🎯 Project Goals

- Simulate a real-world collaborative education system.
- Practice full-stack development using **React**, **Node.js**, **MongoDB**, and **JWT Auth**.
- Role-based access: admin, tutor, and student dashboards.
- CRUD operations for study sessions and materials.
- Real-time feedback and review system.
- Dynamic routing, protected routes, and form validations.

---

## 🌟 Key Features

- 🔐 Firebase Authentication (Email/Password + Google)
- 👨‍🏫 Tutor: Create & manage study sessions, upload materials
- 🎓 Student: Book sessions, manage notes, access tutor materials
- 🧑‍💼 Admin: Manage users, sessions, materials, and analytics
- 📁 Upload & access study materials via Imgbb
- ✍️ Create, Edit, Delete personal notes
- 🔍 Search, Filter, and Paginate sessions
- 📊 Dashboard Analytics & Role-based Navigation
- 🖥️ Responsive UI using TailwindCSS + DaisyUI
- ✅ Form validation, loading states, toast notifications

---

## 🚀 Functional Routes

### Public Routes

- `/` - Home
- `/login` - Login page
- `/register` - Register page
- `/sessions` - All Study Sessions
- `/session-details/:id` - Session Info Page

### Protected Routes

- `/dashboard` - Role-based overview
- `/dashboard/create-study-session` - Tutor only
- `/dashboard/my-sessions` - Tutor only
- `/dashboard/upload-materials` - Tutor only
- `/dashboard/my-materials` - Tutor only
- `/dashboard/booked-sessions` - Student only
- `/dashboard/view-materials` - Student only
- `/dashboard/create-note` - Student only
- `/dashboard/manage-notes` - Student only
- `/dashboard/manage-users` - Admin only
- `/dashboard/manage-sessions` - Admin only
- `/dashboard/manage-materials` - Admin only

---

## 🔐 Authentication & Authorization

- JWT cookie Auth + Context API for global auth state
- Role-based access control using `verifyToken` middleware
- Conditional rendering and route protection based on user role

---

## 📄 Tech Stack

### 🧑‍💻 Client

- React (with Vite)
- React Router
- JWT Authentication
- React Hook Form
- Axios + Custom Axios Hook
- Imgbb Image Upload
- React sweetAlert
- DaisyUI & TailwindCSS
- React Icons
- stripe payment gateway

### 🧑‍💻 Server

- Node.js & Express
- MongoDB & Mongoose
- JWT cookies
- Dotenv
- Cors
- stripe

---

### 🧪 Server Setup

```js
const jwt = require("jsonwebtoken");
const token = jwt.sign(email, process.env.JWT_ACCESS_TOKEN, {
  expiresIn: "365d",
});
const stripe = require("stripe")(process.env.PAYMENT_GATEWAY_KEY);
```

---

## 📊 API Endpoints

### Users

- `POST /api/users` — Register or update user info
- `GET /api/users/:email` — Get user role
- `GET /api/all-users` — Admin: fetch all users

### Sessions

- `GET /api/sessions` — Get all study sessions
- `POST /api/sessions` — Tutor: create session
- `PATCH /api/sessions/:id` — Update session status
- `GET /api/sessions/:id` — Get session details
- `GET /api/sessions/search` — Filter & paginate

### Bookings

- `POST /api/book-session` — Student: book session
- `GET /api/booked-sessions/:email` — Student’s bookings
- `GET /api/enrollment-count` — Admin: session-wise enrollments

### Notes

- `POST /api/notes` — Add personal note
- `GET /api/notes/:email` — Get student notes
- `DELETE /api/notes/:id` — Delete note

### Materials

- `POST /api/materials` — Tutor: upload material
- `GET /api/materials/:email` — View materials
- `GET /api/materials/session/:id` — Materials by session

---

## 🌞 Developer Info

**Sakhawat Hossain**  
📧 khokon@gmail.com  
Collaborative Study Platform - Final Project

---

## 🚀 Deployment Notes

- SPA with persistent routing support
- JWT auth domain whitelisted
- Mobile responsive layout
- No CORS or API-related errors in production
- stripe financial protocol

---

> ⚡ Inspired by modern EdTech tools like Google Classroom, Zoom Classes, and Notion.
