import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  LoaderCircle,
} from "lucide-react";

import api from "../services/api";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/projects/${id}`);

        if (response.data.success) {
          const project = response.data.project;

          setFormData({
            title: project.title || "",
            description: project.description || "",
            category: project.category || "",
            budget: project.budget || "",
            deadline: project.deadline
              ? new Date(project.deadline)
                  .toISOString()
                  .split("T")[0]
              : "",
          });
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put(
        `/projects/${id}`,
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          budget: Number(formData.budget),
          deadline: formData.deadline,
        }
      );

      if (response.data.success) {
        setSuccess("Project updated successfully.");

        setTimeout(() => {
          navigate(`/projects/${id}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to update project:", error);

      setError(
        error.response?.data?.message ||
          "Unable to update project."
      );
    } finally {
      setSaving(false);
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

  if (error && !formData.title) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
            {error}
          </div>

          <Link
            to={`/projects/${id}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Project
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">

        <Link
          to={`/projects/${id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Project
        </Link>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

          <h1 className="text-3xl font-bold">
            Edit Project
          </h1>

          <p className="mt-2 text-slate-400">
            Update your project information.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Budget (PKR)
              </label>

              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                min="0"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>

              <Link
                to={`/projects/${id}`}
                className="inline-flex items-center rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </Link>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
}

export default EditProject;