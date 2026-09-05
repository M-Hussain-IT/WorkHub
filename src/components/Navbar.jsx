import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  LogIn,
  UserPlus,
  UserCircle,
  LogOut,
  FolderOpen,
  LayoutDashboard,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BriefcaseBusiness
            className="text-blue-500"
            size={26}
          />

          <span className="text-2xl font-bold text-white">
            Work<span className="text-blue-500">Hub</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">

          {loading ? (
            <span className="text-sm text-slate-500">
              Loading...
            </span>
          ) : user ? (
            <>
              {/* All Projects */}
              <Link
                to="/projects"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <FolderOpen size={18} />
                Projects
              </Link>

              {/* My Projects */}
              <Link
                to="/my-projects"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <LayoutDashboard size={18} />
                My Projects
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <UserCircle size={18} />
                {user.name}
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <LogIn size={18} />
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                <UserPlus size={18} />
                Get Started
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;