import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Plus,
  LoaderCircle,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "../context/AuthContext";

function Projects() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/projects");

      if (response.data.success) {
        setProjects(response.data.projects || []);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Get unique categories from projects
  const categories = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.category)
          .filter(Boolean)
      ),
    ];
  }, [projects]);

  // Get unique statuses from projects
  const statuses = useMemo(() => {
    return [
      ...new Set(
        projects
          .map((project) => project.status)
          .filter(Boolean)
      ),
    ];
  }, [projects]);

  // Search + filter projects
  const filteredProjects = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !searchText ||
        project.title?.toLowerCase().includes(searchText) ||
        project.description?.toLowerCase().includes(searchText) ||
        project.category?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "all" ||
        project.category === category;

      const matchesStatus =
        status === "all" ||
        project.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [projects, search, category, status]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setStatus("all");
  };

  const hasFilters =
    search.trim() !== "" ||
    category !== "all" ||
    status !== "all";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
                <BriefcaseBusiness size={25} />
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
                  WorkHub
                </p>

                <h1 className="text-3xl font-bold">
                  Browse Projects
                </h1>
              </div>
            </div>

            <p className="mt-3 text-slate-400">
              Discover projects posted by clients.
            </p>
          </div>

          {/* Only clients can create projects */}
          {user?.role === "client" && (
            <Link
              to="/projects/create"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Post Project
            </Link>
          )}
        </div>

        {/* Search + Filters */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal
              size={18}
              className="text-blue-500"
            />

            <h2 className="font-semibold">
              Search & Filter
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search projects..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="all">
                All Categories
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="all">
                All Statuses
              </option>

              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

          {/* Clear filters */}
          {hasFilters && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={16} />
                Clear Filters
              </button>
            </div>
          )}

        </div>

        {/* Refresh */}
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={fetchProjects}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-slate-400">
              <LoaderCircle
                size={22}
                className="animate-spin"
              />
              Loading projects...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
            <p>{error}</p>

            <button
              type="button"
              onClick={fetchProjects}
              className="mt-4 rounded-lg border border-red-500/30 px-4 py-2 text-sm hover:bg-red-500/10"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No projects at all */}
        {!loading &&
          !error &&
          projects.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
              <BriefcaseBusiness
                size={38}
                className="mx-auto text-slate-600"
              />

              <h2 className="mt-5 text-xl font-semibold">
                No open projects
              </h2>

              <p className="mt-2 text-slate-400">
                There are currently no projects available.
              </p>

              {user?.role === "client" && (
                <Link
                  to="/projects/create"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
                >
                  <Plus size={18} />
                  Create Your First Project
                </Link>
              )}
            </div>
          )}

        {/* Filtered results */}
        {!loading &&
          !error &&
          projects.length > 0 && (
            <>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  Showing{" "}
                  <span className="font-medium text-slate-200">
                    {filteredProjects.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-200">
                    {projects.length}
                  </span>{" "}
                  projects
                </p>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
                  <Search
                    size={38}
                    className="mx-auto text-slate-600"
                  />

                  <h2 className="mt-5 text-xl font-semibold">
                    No matching projects
                  </h2>

                  <p className="mt-2 text-slate-400">
                    Try changing your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
                  >
                    <X size={18} />
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                    />
                  ))}
                </div>
              )}
            </>
          )}

      </div>
    </main>
  );
}

export default Projects;