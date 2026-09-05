import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import EditProject from "./pages/EditProject";
import MyProjects from "./pages/MyProjects";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />

          <Route path="/projects" element={<Projects />} />

          <Route
            path="/projects/create"
            element={<CreateProject />}
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="/projects/:id/edit"
            element={<EditProject />}
          />

          <Route
            path="/my-projects"
            element={<MyProjects />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;