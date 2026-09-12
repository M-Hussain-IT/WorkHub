import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  LoaderCircle,
} from "lucide-react";

import api from "../services/api";

function SubmitProposal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coverLetter: "",
    bidAmount: "",
    estimatedDays: "",
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
      !formData.coverLetter.trim() ||
      !formData.bidAmount ||
      !formData.estimatedDays
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (Number(formData.bidAmount) <= 0) {
      setError("Bid amount must be greater than zero.");
      return;
    }

    if (Number(formData.estimatedDays) <= 0) {
      setError("Estimated days must be greater than zero.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/proposals", {
        project: id,
        coverLetter: formData.coverLetter.trim(),
        bidAmount: Number(formData.bidAmount),
        estimatedDays: Number(formData.estimatedDays),
      });

      if (response.data.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Submit proposal failed:", error);

      setError(
        error.response?.data?.message ||
          "Unable to submit proposal."
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
            Proposal
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Submit a Proposal
          </h1>

          <p className="mt-2 text-slate-400">
            Tell the client why you're the right freelancer for this project.
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

          <div>
            <label
              htmlFor="coverLetter"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Cover Letter
            </label>

            <textarea
              id="coverLetter"
              name="coverLetter"
              rows="7"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Explain your experience, approach and why you are a good fit..."
              maxLength={3000}
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <p className="mt-2 text-right text-xs text-slate-500">
              {formData.coverLetter.length}/3000
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <label
                htmlFor="bidAmount"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Your Bid (PKR)
              </label>

              <input
                id="bidAmount"
                name="bidAmount"
                type="number"
                min="1"
                value={formData.bidAmount}
                onChange={handleChange}
                placeholder="45000"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="estimatedDays"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Estimated Completion (Days)
              </label>

              <input
                id="estimatedDays"
                name="estimatedDays"
                type="number"
                min="1"
                value={formData.estimatedDays}
                onChange={handleChange}
                placeholder="10"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

          </div>

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
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Proposal
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default SubmitProposal;