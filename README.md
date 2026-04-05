<h1 align="center">Hostello - Full-Stack Student Hostel Management System</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
</p>

## Overview
**Hostello** is a production-ready, full-stack (**MERN**) web application engineered to digitize and automate manual hostel administration. By providing a secure, centralized platform, Hostello streamlines complex workflows including student onboarding, automated room allocation, and dynamic daily menu distribution.

Designed with scalability and security in mind, this project demonstrates real-world application of **RESTful API design**, **stateless authentication**, and **component-driven UI architecture**.

##  Key Engineering Achievements

* **Institutional-Grade Authentication Pipeline:** Architected a secure registration flow using **JSON Web Tokens (JWT)** and **Bcrypt hashing** for stateless user sessions. Enforced strict database-level domain validation (`@adypu.edu.in`) to ensure exclusive institutional access and prevent unauthorized sign-ups.
* **Responsive Single Page Application (SPA):** Delivered a high-performance frontend using **React (Vite)** and **Tailwind CSS**. Implemented a mobile-first design system that provides students with real-time visibility into mission-critical data: assigned rooms, roommate profiles, and daily notices.
* **Scalable Data Architecture:** Designed a robust cloud data layer using **MongoDB Atlas** and **Mongoose ORM**. Engineered complex, relational NoSQL schemas to effectively connect students, rooms, and administrative notices.
* **Secure & Modular API Design:** Developed a decoupled **Node.js/Express.js** backend featuring custom middleware. Enforced route protection mechanisms to safeguard sensitive student data and maintain a strict separation of concerns across the system.

##  Technology Stack

**Frontend Architecture**
* **Framework:** React.js (Vite Build System)
* **Styling & UI:** Tailwind CSS, Lucide React (Iconography)
* **State & Routing:** Context API, React Router DOM v7
* **Data Fetching:** Axios (Configured with Axios Interceptors for automated JWT header injection)

**Backend Architecture**
* **Runtime & Framework:** Node.js, Express.js
* **Database & ORM:** MongoDB Atlas (Cloud NoSQL), Mongoose
* **Security & Auth:** JWT (JSON Web Tokens), Bcrypt.js, CORS
* **Architecture Pattern:** MVC (Model-View-Controller)

##  Local Development Setup

### System Prerequisites
* **Node.js** (v14.0.0+)
* **MongoDB** Account & local/cloud Connection URI
* **Git** installed on your local machine

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/HostellO.git
   cd HostellO
   ```

2. **Backend Initialization**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   *Configure your `.env` variables:*
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
   *Start the Express server:*
   ```bash
   npm run dev
   ```

3. **Frontend Initialization**
   *Open a new terminal window at the project root:*
   ```bash
   cd frontend
   npm install
   # Launches Vite dev server with Hot Module Replacement (HMR)
   npm run dev 
   ```

4. **Access the Build**
   * **Client Interface:** `http://localhost:5173`
   * **API Base URL:** `http://localhost:5001/api`

##  Core Directory Structure

```text
HostellO/
├── frontend/                     # React UI Layer
│   ├── src/
│   │   ├── components/           # Reusable, atomic UI components
│   │   ├── context/              # Global state management
│   │   ├── pages/                # Route-level view components
│   │   ├── services/             # Axios API encapsulation layer
│   │   └── main.jsx              # React mounting root
│   └── tailwind.config.js
│
├── backend/                      # Express API Layer
│   ├── controllers/              # Core business & request logic
│   ├── models/                   # Mongoose schemas & invariants
│   ├── routes/                   # API endpoint definitions 
│   ├── middleware/               # Auth verification & error handling
│   └── server.js                 # App initialization & DB connection
```

##  System Roadmap

- **Phase 1: Core Foundation (MVP) **
  Domain-restricted Auth, Dynamic Student Dashboard, Responsive UX.
- **Phase 2: Administrative Control **
  Global Admin Dashboard, comprehensive CRUD for users/rooms, and an automated Complaint Ticketing System.
- **Phase 3: Automated Scaling **
  Algorithmic room allocation mapping student preferences, and real-time WebSocket notifications.

##  Let's Connect
Feel free to explore the codebase. If you have any questions or wish to discuss the implementational details, reach out or open an issue!

##  License
Released under the **MIT License**.

---
*Developed with a focus on clean code and system scalability by the Hostello Team.*
