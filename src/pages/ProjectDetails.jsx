import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  User,
  Tag,
  LoaderCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/projects/${id}`);

        if (response.data.success) {
          setProject(response.data.project);
        } else {
          setError("Project not found.");
        }
      } catch (error) {
        console.error("Failed to load project:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load project."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      const response = await api.delete(`/projects/${id}`);

      if (response.data.success) {
        alert("Project deleted successfully.");

        navigate("/projects");
      }
    } catch (error) {
      console.error("Failed to delete project:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete project."
      );

      setDeleting(false);
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
          Loading project...
        </div>
      </main>
    );
  }

  if (error && !project) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">

          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
            {error}
          </div>

          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </Link>

        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">

          <p className="text-slate-400">
            Project not found.
          </p>

          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </Link>

        </div>
      </main>
    );
  }

  const isOwner =
    user?._id &&
    project.client?._id &&
    user._id === project.client._id;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Projects
        </Link>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Project Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">

          {/* Header */}
          <div className="border-b border-slate-800 p-8">

            <div className="mb-4 flex flex-wrap items-center gap-2">

              {/* Category */}
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
                <Tag size={15} />
                {project.category}
              </span>

              {/* Status */}
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm capitalize text-green-400">
                {project.status}
              </span>

            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold">
              {project.title}
            </h1>

            {/* Owner Actions */}
            {isOwner && (
              <div className="mt-6 flex flex-wrap gap-3">

                {/* Edit */}
                <Link
                  to={`/projects/${project._id}/edit`}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
                >
                  <Pencil size={18} />
                  Edit Project
                </Link>

                {/* Delete */}
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete Project
                    </>
                  )}
                </button>

              </div>
            )}

          </div>

          {/* Description */}
          <div className="p-8">

            <h2 className="text-xl font-semibold">
              Project Description
            </h2>

            <p className="mt-4 whitespace-pre-wrap leading-8 text-slate-400">
              {project.description}
            </p>

            {/* Project Information */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <InfoCard
                icon={<CircleDollarSign size={20} />}
                label="Budget"
                value={`PKR ${Number(
                  project.budget
                ).toLocaleString()}`}
              />

              <InfoCard
                icon={<CalendarDays size={20} />}
                label="Deadline"
                value={
                  project.deadline
                    ? new Date(
                        project.deadline
                      ).toLocaleDateString()
                    : "Not specified"
                }
              />

              <InfoCard
                icon={<User size={20} />}
                label="Client"
                value={
                  project.client?.name ||
                  "Unknown"
                }
              />

            </div>

          </div>

          {/* Client Information */}
          {project.client && (
            <div className="border-t border-slate-800 p-8">

              <h2 className="text-xl font-semibold">
                Posted By
              </h2>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-5">

                <p className="font-medium text-white">
                  {project.client.name}
                </p>

                {project.client.email && (
                  <p className="mt-1 text-sm text-slate-400">
                    {project.client.email}
                  </p>
                )}

              </div>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

      <div className="flex items-center gap-2 text-blue-500">
        {icon}

        <span className="text-sm text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-3 font-medium text-slate-200">
        {value}
      </p>

    </div>
  );
}

export default ProjectDetails;