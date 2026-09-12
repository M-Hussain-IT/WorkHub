import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

import api from "../services/api";

function ProjectProposals() {
  const { projectId } = useParams();

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProposals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/proposals/project/${projectId}`
      );

      if (response.data.success) {
        setProposals(response.data.proposals);
      }
    } catch (error) {
      console.error("Failed to load proposals:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load proposals."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [projectId]);

  const updateStatus = async (proposalId, status) => {
    try {
      await api.put(
        `/proposals/${proposalId}/status`,
        { status }
      );

      fetchProposals();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update proposal."
      );
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
          Loading proposals...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-3xl font-bold">
          Project Proposals
        </h1>

        <p className="mt-2 text-slate-400">
          Review freelancers who applied to your project.
        </p>

        {error && (
          <div className="mt-6 rounded-lg bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-5">

          {proposals.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
              No proposals yet.
            </div>
          ) : (
            proposals.map((proposal) => (
              <div
                key={proposal._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>
                    <h2 className="text-xl font-semibold">
                      {proposal.freelancer?.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {proposal.freelancer?.email}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm capitalize text-blue-400">
                    {proposal.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-slate-500">
                      Bid
                    </p>

                    <p className="mt-1 font-medium">
                      PKR{" "}
                      {Number(
                        proposal.bidAmount
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Estimated Time
                    </p>

                    <p className="mt-1 font-medium">
                      {proposal.estimatedDays} days
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-800 pt-5">

                  <p className="text-sm text-slate-500">
                    Cover Letter
                  </p>

                  <p className="mt-2 leading-7 text-slate-300">
                    {proposal.coverLetter}
                  </p>
                </div>

                {proposal.status === "pending" && (
                  <div className="mt-6 flex flex-wrap gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(
                          proposal._id,
                          "accepted"
                        )
                      }
                      className="rounded-lg bg-green-600 px-5 py-2.5 font-medium hover:bg-green-700"
                    >
                      Accept
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(
                          proposal._id,
                          "rejected"
                        )
                      }
                      className="rounded-lg border border-red-500/30 px-5 py-2.5 font-medium text-red-400 hover:bg-red-500/10"
                    >
                      Reject
                    </button>

                  </div>
                )}

              </div>
            ))
          )}

        </div>
      </div>
    </main>
  );
}

export default ProjectProposals;