# WorkHub – Freelancing Marketplace

WorkHub is a MERN-stack freelancing marketplace developed as part of the **Zynvex Solutions MERN Stack Web Development Internship**.

The platform is designed to connect **clients** and **freelancers** through a simple and secure web application. Clients can create and manage projects, while freelancers can discover projects and submit proposals according to their skills and interests.

---

## Internship Information

| Field | Details |
|---|---|
| **Organization** | Zynvex Solutions |
| **Program** | MERN Stack Web Development Internship |
| **Intern Name** | Muhammad Hussain Lodhra |
| **Internship ID** | ZYNVEX-CERT-1352 |
| **Project Title** | WorkHub – Freelancing Marketplace |

---

## Project Overview

WorkHub provides a centralized platform where clients can post freelance projects and freelancers can search for suitable opportunities and submit proposals.

The project was developed using the **MERN stack** with role-based functionality for clients and freelancers.

### Main Roles

**Client**
- Register and login securely
- Manage personal profile
- Create projects
- Set project budget and deadline
- Edit and delete owned projects
- Search and filter projects
- View proposals submitted for projects
- Accept or reject freelancer proposals

**Freelancer**
- Register and login securely
- Manage personal profile
- Add skills, location, bio and profile image
- Browse available projects
- Search and filter projects
- View project details
- Submit proposals
- Specify bid amount and estimated delivery time
- Add a proposal cover letter
- View submitted proposals and their status

---

# Technologies Used

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- CORS

---

# Project Modules

## Module 1 – Authentication & User Profiles

The first module focuses on authentication, authorization and user profile management.

### Features

- User registration
- User login
- Secure password hashing using bcryptjs
- JWT-based authentication
- HTTP-only authentication cookie
- Authentication middleware
- Current user authentication
- User logout
- Role-based access for clients and freelancers
- Protected routes
- User profile retrieval
- User profile editing
- Profile image support
- Bio and skills management
- Location management

### Authentication Flow

1. User creates an account.
2. Password is securely hashed before storage.
3. User logs in using email and password.
4. Server verifies the credentials.
5. JWT token is generated.
6. Token is stored in an HTTP-only cookie.
7. Protected routes verify the token using authentication middleware.
8. User can access authorized resources based on their role.

---

# Module 2 – Project Management

Module 2 introduces the core project management functionality of WorkHub.

## Client Project Features

- Create a new project
- Add project title
- Add project description
- Set project budget
- Set project deadline
- Select project category
- Manage project status
- View project details
- Edit owned projects
- Delete owned projects
- View personal projects

## Project Discovery

Freelancers can browse projects through the project listing interface.

The system supports:

- Project search
- Category filtering
- Status filtering
- Combined search and filtering
- Clearing applied filters
- Responsive project listing

## Project Statuses

Projects can have the following statuses:

- `open`
- `in-progress`
- `completed`
- `cancelled`

## Project Authorization

Only authenticated users with the appropriate role can perform project-related actions.

Clients can manage their own projects, while other users cannot modify projects that do not belong to them.

---

# Module 3 – Proposals & Bidding

Module 3 adds the proposal and bidding system that connects freelancers with client projects.

## Freelancer Proposal Features

Freelancers can submit proposals for open projects.

Each proposal can contain:

- Cover letter
- Bid amount
- Estimated delivery time
- Project reference
- Freelancer reference
- Proposal status

## Proposal Validation

The system validates proposal submissions by checking:

- User authentication
- Freelancer role
- Project existence
- Project availability
- Project status
- Duplicate proposals

A freelancer cannot submit multiple proposals for the same project.

## Proposal Status

Proposals use the following statuses:

- `pending`
- `accepted`
- `rejected`

## Client Proposal Management

Clients can view proposals submitted to their own projects.

Clients can:

- View project proposals
- Review freelancer proposals
- Accept proposals
- Reject proposals

When a proposal is accepted:

- The selected proposal becomes accepted.
- The related project changes to `in-progress`.
- Other pending proposals for the same project are rejected.

## Freelancer Proposal Management

Freelancers can view their submitted proposals and monitor their proposal status.

Freelancers can delete their own pending proposals.

---

# Module 4 – Final Integration & Documentation

Module 4 represents the final stage of the internship project and focuses on bringing the implemented modules together into the complete WorkHub project structure.

The final stage includes:

- Integration of authentication and user profiles
- Integration of project management
- Integration of proposal and bidding functionality
- Role-based access control
- Protected routes
- Frontend and backend communication
- API integration
- Responsive user interfaces
- Project testing
- Project documentation
- Final README preparation
- Final internship submission preparation

> The implemented application functionality is primarily covered by Modules 1–3, while Module 4 serves as the final integration and documentation stage.

---

# Key Features

- Secure user authentication
- Role-based authorization
- Client and freelancer accounts
- User profile management
- Client project creation
- Project editing and deletion
- Project discovery
- Project search
- Category filtering
- Status filtering
- Freelancer proposals
- Proposal bidding
- Proposal cover letters
- Estimated delivery time
- Proposal status tracking
- Client proposal management
- Accept/reject proposal functionality
- Protected API routes
- Responsive frontend
- RESTful API architecture

---

# Database Design

WorkHub uses **MongoDB** as the primary database with **Mongoose** for schema and model management.

## User Collection

Main fields include:

- `_id`
- `name`
- `email`
- `password`
- `role`
- `profileImage`
- `bio`
- `skills`
- `location`
- `createdAt`
- `updatedAt`

## Project Collection

Main fields include:

- `_id`
- `title`
- `description`
- `budget`
- `deadline`
- `category`
- `status`
- `client`
- `createdAt`
- `updatedAt`

## Proposal Collection

Main fields include:

- `_id`
- `project`
- `freelancer`
- `coverLetter`
- `bidAmount`
- `estimatedDays`
- `status`
- `createdAt`
- `updatedAt`

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get authenticated user |
| POST | `/api/auth/logout` | Logout user |

## User Profiles

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update user profile |

## Projects

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/projects` | Create project |
| GET | `/api/projects` | Get projects |
| GET | `/api/projects/:id` | Get project by ID |
| GET | `/api/projects/my/projects` | Get client's projects |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

## Proposals

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/proposals` | Submit proposal |
| GET | `/api/proposals/my` | Get freelancer's proposals |
| GET | `/api/proposals/project/:projectId` | Get proposals for a project |
| GET | `/api/proposals/:id` | Get proposal by ID |
| PUT | `/api/proposals/:id/status` | Accept or reject proposal |
| DELETE | `/api/proposals/:id` | Delete proposal |

---

# Project Structure

```text
WorkHub/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── EditProfile.jsx
│   │   ├── Projects.jsx
│   │   ├── CreateProject.jsx
│   │   ├── ProjectDetails.jsx
│   │   ├── EditProject.jsx
│   │   ├── SubmitProposal.jsx
│   │   ├── MyProposals.jsx
│   │   └── ProjectProposals.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── projectController.js
│   │   └── proposalController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Proposal.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── projectRoutes.js
│   │   └── proposalRoutes.js
│   │
│   ├── utils/
│   └── server.js
│
├── .env
├── package.json
└── README.md`