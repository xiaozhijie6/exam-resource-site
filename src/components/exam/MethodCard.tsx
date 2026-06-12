import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';
import type { LearningMethod } from '@/types';

export default function MethodCard({ method }: { method: LearningMethod }) {
  return (
    <Link
      to={`/exam/${method.examId}/method/${method.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-academic-200 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
            {method.category}
          </span>
          {method.author && (
            <span className="text-xs text-slate-400">by {method.author}</span>
          )}
        </div>
        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-academic-500 group-hover:translate-x-1 transition-all shrink-0" />
      </div>

      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-academic-700 transition-colors line-clamp-1">
        {method.title}
      </h3>
      <p className="text-sm text-slate-500 mb-3 line-clamp-2">{method.summary}</p>

      <div className="flex flex-wrap items-center gap-1.5">
        <Tag className="h-3.5 w-3.5 text-slate-300" />
        {method.tags.map((tag) => (
          <span key={tag} className="text-xs text-slate-400">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
