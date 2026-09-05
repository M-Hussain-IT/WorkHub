import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  FolderOpen,
  Eye,
  Pencil,
  Trash2,
  LoaderCircle,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";

import api from "../services/api";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const fetchMyProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/projects/my-projects");

      if (response.data.success) {
        setProjects(response.data.projects || []);
      }
    } catch (error) {
      console.error("Failed to load my projects:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(projectId);
      setError("");

      const response = await api.delete(
        `/projects/${projectId}`
      );

      if (response.data.success) {
        setProjects((previousProjects) =>
          previousProjects.filter(
            (project) => project._id !== projectId
          )
        );
      }
    } catch (error) {
      console.error("Failed to delete project:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex items-center gap-3 text-slate-400">
          <LoaderCircle
            size={22}
            className="animate-spin"
          />
          Loading your projects...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-3xl font-bold">
              My Projects
            </h1>

            <p className="mt-2 text-slate-400">
              Manage the projects you have posted.
            </p>
          </div>

          <Link
            to="/projects/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
          >
            <Plus size={18} />
            Create Project
          </Link>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Empty State */}
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
              <FolderOpen
                size={30}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No projects yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-400">
              You haven't created any projects yet.
              Create your first project to get started.
            </p>

            <Link
              to="/projects/create"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              <Plus size={18} />
              Create Your First Project
            </Link>

          </div>
        ) : (
          <>
            {/* Project Count */}
            <div className="mb-6 text-sm text-slate-400">
              {projects.length}{" "}
              {projects.length === 1
                ? "project"
                : "projects"}
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {projects.map((project) => (
                <div
                  key={project._id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition hover:border-slate-700"
                >

                  {/* Card Header */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-3">

                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                        {project.category}
                      </span>

                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs capitalize text-green-400">
                        {project.status}
                      </span>

                    </div>

                    <h2 className="mt-4 line-clamp-2 text-xl font-semibold">
                      {project.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                      {project.description}
                    </p>

                  </div>

                  {/* Information */}
                  <div className="border-t border-slate-800 px-6 py-5">

                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CircleDollarSign size={15} />
                          Budget
                        </div>

                        <p className="mt-1 text-sm font-medium text-slate-200">
                          PKR{" "}
                          {Number(
                            project.budget
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays size={15} />
                          Deadline
                        </div>

                        <p className="mt-1 text-sm font-medium text-slate-200">
                          {project.deadline
                            ? new Date(
                                project.deadline
                              ).toLocaleDateString()
                            : "Not set"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="mt-auto border-t border-slate-800 p-5">

                    <div className="flex flex-wrap gap-2">

                      {/* View */}
                      <Link
                        to={`/projects/${project._id}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                      >
                        <Eye size={16} />
                        View
                      </Link>

                      {/* Edit */}
                      <Link
                        to={`/projects/${project._id}/edit`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(project._id)
                        }
                        disabled={
                          deletingId === project._id
                        }
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === project._id ? (
                          <>
                            <LoaderCircle
                              size={16}
                              className="animate-spin"
                            />
                            Deleting
                          </>
                        ) : (
                          <>
                            <Trash2 size={16} />
                            Delete
                          </>
                        )}
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </main>
  );
}

export default MyProjects;