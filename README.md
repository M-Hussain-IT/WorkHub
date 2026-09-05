# WorkHub – Freelancing Marketplace

WorkHub is a MERN-stack freelancing marketplace developed as part of the Zynvex Solutions MERN Stack Web Development Internship.

The platform connects clients and freelancers and provides authentication, user profiles, project management, and project discovery features.

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

## Completed Modules

### Module 1 – Authentication & User Profiles

* User registration
* User login
* Password hashing with bcrypt
* JWT authentication
* HTTP-only authentication cookie
* Authentication middleware
* `/api/auth/me`
* Logout
* User profile
* Edit profile
* Protected routes
* Client and freelancer roles
* Role-based access

### Module 2 – Project Management

* Create projects
* View all projects
* View project details
* View user's own projects
* Edit projects
* Delete projects
* Project validation
* Client authorization
* Protected project routes
* Project cards
* Search projects
* Filter projects by category
* Filter projects by status
* Combined search and filtering
* Clear filters
* Responsive project management interface

## Main Features

* Secure authentication
* Role-based access control
* Client project management
* Project discovery
* Project search
* Project filtering
* Project details
* User profiles
* Responsive UI

## Project Structure

```text
WorkHub/
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   └── server.js
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── services/
│
├── package.json
└── README.md
```

## Running the Project

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
node server.js
```

The frontend and backend should be configured with the required environment variables.

## Internship

**Organization:** Zynvex Solutions
**Program:** MERN Stack Web Development Internship
**Project:** WorkHub – Freelancing Marketplace
