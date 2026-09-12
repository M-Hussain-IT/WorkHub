import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  LoaderCircle,
} from "lucide-react";

import api from "../services/api";

function MyProposals() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/proposals/my");

        console.log("MY PROPOSALS:", response.data);

        if (response.data.success) {
          setProposals(response.data.proposals || []);
        } else {
          setError("Unable to load proposals.");
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

    fetchProposals();
  }, []);

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

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Proposals
          </h1>

          <p className="mt-2 text-slate-400">
            Track the proposals you have submitted.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {!error && proposals.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <BriefcaseBusiness
              className="mx-auto text-slate-600"
              size={40}
            />

            <h2 className="mt-4 text-xl font-semibold">
              No proposals yet
            </h2>

            <p className="mt-2 text-slate-400">
              Submit a proposal on an open project to see it here.
            </p>
          </div>
        )}

        {proposals.length > 0 && (
          <div className="space-y-5">
            {proposals.map((proposal) => (
              <div
                key={proposal._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                {/* Project title */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      Project
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-white">
                      {proposal.project?.title || "Unknown Project"}
                    </h2>
                  </div>

                  <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-sm capitalize text-blue-400">
                    {proposal.status || "pending"}
                  </span>
                </div>

                {/* Project information */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <p className="text-sm text-slate-500">
                      Project Budget
                    </p>

                    <p className="mt-1 font-medium text-white">
                      PKR{" "}
                      {Number(
                        proposal.project?.budget || 0
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <p className="text-sm text-slate-500">
                      Your Bid
                    </p>

                    <p className="mt-1 font-medium text-white">
                      PKR{" "}
                      {Number(
                        proposal.bidAmount || 0
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <p className="text-sm text-slate-500">
                      Estimated Time
                    </p>

                    <p className="mt-1 font-medium text-white">
                      {proposal.estimatedDays} days
                    </p>
                  </div>
                </div>

                {/* Category + deadline */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">
                      Category
                    </p>

                    <p className="mt-1 text-slate-300">
                      {proposal.project?.category || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Deadline
                    </p>

                    <p className="mt-1 text-slate-300">
                      {proposal.project?.deadline
                        ? new Date(
                            proposal.project.deadline
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Cover letter */}
                <div className="mt-6 border-t border-slate-800 pt-5">
                  <p className="text-sm text-slate-500">
                    Cover Letter
                  </p>

                  <p className="mt-2 leading-7 text-slate-300">
                    {proposal.coverLetter}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default MyProposals;