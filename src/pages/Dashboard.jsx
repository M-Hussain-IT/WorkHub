import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  FolderOpen,
  Clock3,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        if (user?.role === "freelancer") {
          const response = await api.get("/proposals/my");

          if (response.data.success) {
            setProposals(response.data.proposals || []);
          }
        }

        if (user?.role === "client") {
          const response = await api.get("/projects/my");

          if (response.data.success) {
            setProjects(response.data.projects || []);
          }
        }
      } catch (error) {
        console.error("Dashboard error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex items-center gap-3 text-slate-400">
          <LoaderCircle
            size={22}
            className="animate-spin"
          />
          Loading dashboard...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
            {error}
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // FREELANCER DASHBOARD
  // =========================

  if (user?.role === "freelancer") {
    const totalProposals = proposals.length;

    const pendingProposals = proposals.filter(
      (proposal) => proposal.status === "pending"
    ).length;

    const acceptedProposals = proposals.filter(
      (proposal) => proposal.status === "accepted"
    ).length;

    const rejectedProposals = proposals.filter(
      (proposal) => proposal.status === "rejected"
    ).length;

    const recentProposals = proposals.slice(0, 5);

    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <h1 className="text-3xl font-bold">
              Freelancer Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Welcome back, {user.name}.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-5 md:grid-cols-4">

            <StatCard
              icon={<BriefcaseBusiness size={24} />}
              title="Total Proposals"
              value={totalProposals}
            />

            <StatCard
              icon={<Clock3 size={24} />}
              title="Pending"
              value={pendingProposals}
            />

            <StatCard
              icon={<CheckCircle2 size={24} />}
              title="Accepted"
              value={acceptedProposals}
            />

            <StatCard
              icon={<XCircle size={24} />}
              title="Rejected"
              value={rejectedProposals}
            />

          </div>

          {/* Quick Actions */}
          <div className="mt-10">

            <h2 className="text-xl font-semibold">
              Quick Actions
            </h2>

            <div className="mt-4 flex flex-wrap gap-4">

              <Link
                to="/projects"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
              >
                <FolderOpen size={18} />
                Browse Projects
              </Link>

              <Link
                to="/proposals"
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <BriefcaseBusiness size={18} />
                My Proposals
              </Link>

            </div>

          </div>

          {/* Recent Proposals */}
          <div className="mt-10">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-semibold">
                  Recent Proposals
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest submitted proposals.
                </p>
              </div>

              <Link
                to="/proposals"
                className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
              >
                View all
                <ArrowRight size={16} />
              </Link>

            </div>

            <div className="mt-5 space-y-4">

              {recentProposals.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
                  No proposals submitted yet.
                </div>
              ) : (
                recentProposals.map((proposal) => (
                  <div
                    key={proposal._id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <h3 className="font-semibold text-white">
                          {proposal.project?.title || "Project"}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Bid: PKR{" "}
                          {Number(
                            proposal.bidAmount || 0
                          ).toLocaleString()}
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-sm capitalize text-blue-400">
                        {proposal.status}
                      </span>

                    </div>
                  </div>
                ))
              )}

            </div>

          </div>

        </div>
      </main>
    );
  }

  // =========================
  // CLIENT DASHBOARD
  // =========================

  const totalProjects = projects.length;

  const openProjects = projects.filter(
    (project) => project.status === "open"
  ).length;

  const inProgressProjects = projects.filter(
    (project) => project.status === "in-progress"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  ).length;

  const recentProjects = projects.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Client Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Welcome back, {user?.name}.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-4">

          <StatCard
            icon={<FolderOpen size={24} />}
            title="Total Projects"
            value={totalProjects}
          />

          <StatCard
            icon={<Clock3 size={24} />}
            title="Open Projects"
            value={openProjects}
          />

          <StatCard
            icon={<BriefcaseBusiness size={24} />}
            title="In Progress"
            value={inProgressProjects}
          />

          <StatCard
            icon={<CheckCircle2 size={24} />}
            title="Completed"
            value={completedProjects}
          />

        </div>

        {/* Quick Actions */}
        <div className="mt-10">

          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="mt-4 flex flex-wrap gap-4">

            <Link
              to="/projects/create"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
            >
              <Plus size={18} />
              Post Project
            </Link>

            <Link
              to="/my-projects"
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <FolderOpen size={18} />
              My Projects
            </Link>

          </div>

        </div>

        {/* Recent Projects */}
        <div className="mt-10">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                Recent Projects
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your recently created projects.
              </p>
            </div>

            <Link
              to="/my-projects"
              className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
            >
              View all
              <ArrowRight size={16} />
            </Link>

          </div>

          <div className="mt-5 space-y-4">

            {recentProjects.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
                No projects created yet.
              </div>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <h3 className="font-semibold text-white">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Budget: PKR{" "}
                        {Number(
                          project.budget || 0
                        ).toLocaleString()}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-sm capitalize text-blue-400">
                      {project.status}
                    </span>

                  </div>
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </main>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <div className="text-blue-400">
          {icon}
        </div>

        <span className="text-3xl font-bold text-white">
          {value}
        </span>

      </div>

      <p className="mt-4 text-sm text-slate-400">
        {title}
      </p>

    </div>
  );
}

export default Dashboard;