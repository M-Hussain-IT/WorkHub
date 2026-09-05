import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  LoaderCircle,
} from "lucide-react";

import api from "../services/api";

function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.budget ||
      !formData.deadline ||
      !formData.category.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (Number(formData.budget) <= 0) {
      setError("Budget must be greater than zero.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/projects", {
        title: formData.title.trim(),
        description: formData.description.trim(),
        budget: Number(formData.budget),
        deadline: formData.deadline,
        category: formData.category.trim(),
      });

      if (response.data.success) {
        navigate("/projects");
      }
    } catch (error) {
      console.error("Create project failed:", error);

      setError(
        error.response?.data?.message ||
          "Unable to create project."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
            Project Management
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Create a Project
          </h1>

          <p className="mt-2 text-slate-400">
            Post your project and find the right freelancer.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
        >
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Project Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Build a MERN ecommerce website"
              maxLength={150}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Project Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="7"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the project requirements, goals and expected outcome..."
              maxLength={5000}
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <p className="mt-2 text-right text-xs text-slate-500">
              {formData.description.length}/5000
            </p>
          </div>

          {/* Budget + Category */}
          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <label
                htmlFor="budget"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Budget (PKR)
              </label>

              <input
                id="budget"
                name="budget"
                type="number"
                min="1"
                value={formData.budget}
                onChange={handleChange}
                placeholder="50000"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Category
              </label>

              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                placeholder="Web Development"
                maxLength={100}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label
              htmlFor="deadline"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Project Deadline
            </label>

            <input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
                Creating Project...
              </>
            ) : (
              <>
                <Plus size={18} />
                Create Project
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreateProject;