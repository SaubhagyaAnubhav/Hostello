# Hostello – Student Hostel Management System 🏠

**Hostello** is a full-stack **MERN-based hostel management web application** designed to digitize and streamline student hostel operations. The platform enables students to explore hostel facilities, view food menus, access notices, and manage their profiles through a secure, role-protected dashboard.

This project showcases **production-ready architecture**, **JWT-based authentication**, and **scalable frontend–backend integration**.

---

## 🚀 Tech Stack

### Frontend
- **React (Vite)** – Component-based UI architecture
- **Tailwind CSS** – Utility-first responsive styling
- **React Router DOM v7** – Client-side routing
- **Axios** – REST API integration
- **Lucide React** – Icon system

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – RESTful API framework
- **MongoDB Atlas** – Cloud NoSQL database
- **Mongoose** – ODM for schema modeling
- **JWT Authentication** – Secure token-based access control

---

## ✨ Key Features

### Public Module
- Responsive landing page with feature highlights
- Secure authentication (Login / Signup)
- College email validation (`@adypu.edu.in`)
- Mobile-first navigation

### Student Dashboard (Protected Routes)
- **Profile Management** – View student details
- **Room Information** – Assigned room number display
- **Food Menu** – Daily hostel meal plan
- **Notices Board** – Latest hostel announcements
- **Complaints Module** – Complaint tracking (UI implementation)

---

## 🛠️ Installation & Local Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account

---

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd HostellO

## 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev


Create .env inside backend/:
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

Frontend Setup
cd frontend
npm install
npm run dev


📂 Project Folder Structure (Backend + Frontend)
HostellO/
├── backend/
│   ├── config/                  # Database configuration
│   ├── controllers/             # Business logic
│   │   └── authController.js
│   ├── middleware/              # Auth & error handling
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # REST API routes
│   ├── .env.example             # Environment variables template
│   ├── server.js                # Backend entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── context/             # Global state management
│   │   ├── layouts/             # Layout wrappers
│   │   ├── pages/               # Public & dashboard pages
│   │   ├── services/            # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── README.md
└── .gitignore



🔐 Authentication & Security

JWT-based authentication

Protected routes via middleware

College-restricted email validation

Secure environment variable handling



📌 Future Enhancements

Admin dashboard

Backend complaint system

Room allocation automation

Notification system

Role-based access control
