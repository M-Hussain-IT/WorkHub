import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Tag,
} from "lucide-react";

function ProjectCard({ project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-slate-700">

      {/* Title + status */}
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            <Tag size={14} />
            {project.category}
          </span>

          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium capitalize text-green-400">
            {project.status}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-white">
          {project.title}
        </h2>
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">
        {project.description}
      </p>

      {/* Project info */}
      <div className="mt-6 space-y-3 border-t border-slate-800 pt-5">

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-2 text-slate-500">
            <CircleDollarSign size={18} />
            Budget
          </span>

          <span className="font-medium text-slate-200">
            PKR {Number(project.budget).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-2 text-slate-500">
            <CalendarDays size={18} />
            Deadline
          </span>

          <span className="text-slate-200">
            {new Date(project.deadline).toLocaleDateString()}
          </span>
        </div>

        {project.client?.name && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">
              Posted by
            </span>

            <span className="text-slate-200">
              {project.client.name}
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <Link
        to={`/projects/${project._id}`}
        className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
      >
        View Details
        <ArrowRight size={17} />
      </Link>
    </article>
  );
}

export default ProjectCard;