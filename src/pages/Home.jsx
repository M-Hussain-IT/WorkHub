import {
  ArrowRight,
  BriefcaseBusiness,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  console.log("Auth State:", {
    user,
    loading,
    isAuthenticated,
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-500">
            Freelancing Marketplace
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-tight sm:text-6xl">
            Find the right talent.
            <br />
            <span className="text-blue-500">Build great work.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            WorkHub connects clients with skilled freelancers to turn ideas
            into successful projects.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-900"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          <Feature
            icon={<BriefcaseBusiness size={24} />}
            title="Find Projects"
            description="Discover projects that match your skills and experience."
          />

          <Feature
            icon={<Users size={24} />}
            title="Connect & Collaborate"
            description="Bring clients and freelancers together in one platform."
          />

          <Feature
            icon={<ShieldCheck size={24} />}
            title="Secure Platform"
            description="Built with secure authentication and role-based access."
          />
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="mb-4 inline-flex rounded-lg bg-blue-500/10 p-3 text-blue-500">
        {icon}
      </div>

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default Home;