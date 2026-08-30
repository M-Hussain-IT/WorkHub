# WorkHub – Freelancing Marketplace

WorkHub is a MERN Stack freelancing marketplace that connects clients with freelancers. Clients can manage their projects, while freelancers can discover opportunities and submit proposals.

This project is being developed as part of the **Zynvex Solutions MERN Stack Web Development Internship**.

## 🚀 Project Overview

WorkHub provides a platform where:

* Clients can create and manage projects.
* Freelancers can find suitable projects.
* Users can create and manage their profiles.
* Authentication is secured using JWT and HTTP-only cookies.
* Different user roles are supported: Client and Freelancer.

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Tailwind CSS
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

## 🔐 Module 1 – Authentication & User Profiles

Module 1 focuses on secure authentication and user profile management.

### Authentication

* User Registration
* User Login
* Password Hashing with bcrypt
* JWT Authentication
* HTTP-only JWT Cookie
* Authentication Middleware
* `/api/auth/me`
* User Logout
* React Authentication Context
* Protected Routes

### User Profiles

* View Profile
* Edit Profile
* Update Name
* Update Bio
* Update Skills
* Update Location
* Update Profile Image URL
* Client/Freelancer User Roles

### Frontend Authentication

* Auth-aware Navbar
* Login/Logout state
* Protected Profile Routes
* Authentication loading states
* Error and success messages

## 📁 Project Structure

```text
WorkHub/
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   └── server.js
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   └── EditProfile.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/M-Hussain-IT/WorkHub.git
```

Navigate into the project:

```bash
cd WorkHub
```

Install dependencies:

```bash
npm install
```

Install backend dependencies if the backend has its own package configuration:

```bash
cd server
npm install
```

## 🔑 Environment Variables

Create a `.env` file for sensitive configuration.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Never commit the `.env` file to GitHub.**

## ▶️ Running the Project

Start the backend:

```bash
node server/server.js
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 🔗 Repository

GitHub:

https://github.com/M-Hussain-IT/WorkHub

## 📌 Internship

**Organization:** Zynvex Solutions
**Program:** MERN Stack Web Development
**Project:** WorkHub – Freelancing Marketplace
**Internship ID:** ZYNVEX-CERT-1352

## 📅 Module 1

**Module:** Authentication & User Profiles
**Status:** Completed

### Completed Features

* Registration
* Login
* Password hashing
* JWT authentication
* Cookie-based authentication
* Authentication middleware
* `/api/auth/me`
* Logout
* User profile API
* Profile update API
* AuthContext
* ProtectedRoute
* Profile UI
* Edit Profile UI
* Auth-aware Navbar
* Client/Freelancer role handling

---

## 👨‍💻 Developer

**Hussain**

Built as part of the Zynvex Solutions MERN Stack Web Development Internship.
