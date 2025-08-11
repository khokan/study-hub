# StudyHub Server - Collaborative Study Platform Backend

## 🚀 Live Links

- **Client Website:** [https://study-hub-khokan.web.app/](https://study-hub-khokan.web.app)
- **Server API:** [https://study-hub-khokan.vercel.app/](https://study-hub-khokan.vercel.app)

## 📁 GitHub Repositories

-- **Client:** [StudyHub Client](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-khokan)
-- **Server:** [StudyHub Server](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-khokan)

## 🧪 How to Run Locally

To run the project locally on your machine, follow these steps carefully:

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

✅ **Note:** The client will not function properly unless the server is running.  
So make sure the server is started **before** using the client.

---

### 🔐 3. Setup `.env` Files

Create a `.env` file in both the client and server directories.

For **client**:

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

For **server**:

```
PORT=5000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_pass
JWT_SERVICE_KEY=your_JWT_SERVICE_KEY
PAYMENT_GATEWAY_KEY=your_PAYMENT_GATEWAY_KEY
```

If there are `.env.example` files, copy them as `.env` and fill in the correct values.

---

Now you're all set!

- Server should run at `http://localhost:5000`
- Client should run at `http://localhost:5173`

---

## 🔧 Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT cookies
- **Environment Config:** dotenv
- **Deployment:** Vercel
- **Payment:** stripe

## 📦 Installed Packages

```json
"dependencies": {
  "cors": "^2.8.5",
  "dotenv": "^16.5.0",
  "express": "^5.1.0",
  "firebase-admin": "^13.4.0",
  "mongodb": "^6.17.0"
}
```

## 📂 Project Structure

```
studyhub-server/
├── index.js
├── .env
├── package.json
├── package-lock.json
└── node_modules/
```

## 📃 Environment Variables (.env)

```
PORT=5000
DB_USER=yourMongoUser
DB_PASS=yourMongoPass
FB_SERVICE_KEY=yourBase64EncodedServiceAccountJSON
```

## 🔐 Firebase Admin Setup

```js
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf8"
);
const serviceAccount = JSON.parse(decoded);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
```

## ✅ Token Middleware

```js
const verifyFirebaseToken = async (req, res, next) => {
  /* ... */
};
const verifyTokenEmail = async (req, res, next) => {
  /* ... */
};
```

## 🔢 API Endpoints

### Public:

- `POST /api/users` - Register user
- `GET /api/sessions` - Fetch available study sessions

### Protected (with Firebase Token):

> All protected routes require Firebase ID token in Authorization header:
> `Authorization: Bearer <token>`

- `GET /api/my-sessions` - Get sessions by tutor
- `POST /api/sessions` - Add new study session
- `PATCH /api/sessions/:id` - Update session (tutor)
- `DELETE /api/sessions/:id` - Delete session (tutor)
- `GET /api/booked-sessions` - View booked sessions by student
- `POST /api/booked-sessions` - Book a study session
- `GET /api/my-materials` - View uploaded materials (tutor/student)
- `POST /api/materials` - Upload new materials

## 🛡️ Security Notes

- Tutor can edit/delete only their sessions
- Admins can approve/reject sessions and manage users/materials
- JWT token verifies route access and user role

## 🚨 Deployment

- Platform: Vercel
- Includes environment setup via `.env` file

## 👨‍💼 Developer Info

**Your Name**  
📧 khokon@gmail.com
StudyHub Project - Full Stack Development Assignment
