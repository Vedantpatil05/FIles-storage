# 🚀 DriveCloud – File Upload and Storage App (Node.js + EJS)

DriveCloud is a clean and professional web application that allows users to securely register, log in, upload files, and view/download them in a structured dashboard. Built using the Node.js stack with EJS templating and styled using Bootstrap 5.

---

## 🖼️ Preview

![DriveCloud Screenshot](https://via.placeholder.com/800x400.png?text=Add+Your+Screenshot+Here)

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Styling**: Bootstrap 5 + Google Fonts (`Inter`)
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (stored in cookies)
- **File Upload**: Multer (currently stored locally)
- **Environment Config**: `dotenv`

---

## 📁 Features

- ✅ User Registration with Validation
- ✅ Secure Login with JWT Auth (stored in HTTP-only cookies)
- ✅ File Upload with UI Feedback
- ✅ Downloadable File List
- ✅ Protected Routes (Middleware-based)
- ✅ Polished UI with consistent color palette
- ✅ Responsive and clean design (interview-friendly!)

---

## 📂 Project Structure

drivecloud/
├── routes/
│ ├── user.routes.js # Auth routes (login, register, logout)
│ ├── upload.routes.js # Upload page + POST handling
│
├── views/
│ ├── login.ejs
│ ├── register.ejs
│ ├── home.ejs
│ ├── upload.ejs
│
├── models/
│ └── user.model.js
│
├── middleware/
│ └── auth.js # JWT middleware
│
├── config/
│ └── db.js # MongoDB connection
│
├── public/ # Static assets (if any)
├── .env # Environment variables
├── .gitignore
├── app.js # Express App Entry Point
└── package.json

yaml
Copy
Edit

---

## 🛠️ Getting Started (Run Locally)

### 1. Clone the Repo

1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/drivecloud-professional.git
cd drivecloud-professional
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file in the root folder and add:

env
Copy
Edit
PORT=3000
MONGO_URI=mongodb://localhost:27017/drivecloud
JWT_SECRET=your-secret-key
4. Start the Server
bash
Copy
Edit
npm run dev
# or
node app.js
Now open your browser at:
👉 http://localhost:3000

✨ Future Enhancements
☁️ Cloud file storage (e.g., Cloudinary, AWS S3, Appwrite)

📦 File metadata display with pagination

🧑‍💼 Admin dashboard to manage users/files

📱 Fully mobile responsive design

🔐 Email-based password reset

🌍 Deployment to Render / Railway / Heroku

📄 License
This project is licensed under the MIT License.
Feel free to fork, use, and build on it — especially for your portfolio or internship projects.

💡 Author
Vedant Patil
