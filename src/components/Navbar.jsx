import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  LogIn,
  UserPlus,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <BriefcaseBusiness className="text-blue-500" size={26} />

          <span className="text-2xl font-bold text-white">
            Work<span className="text-blue-500">Hub</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <LogIn size={18} />
            Login
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            <UserPlus size={18} />
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;