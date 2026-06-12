import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-slate-500 overflow-x-auto scrollbar-thin py-2">
      <Link
        to="/"
        className="flex items-center gap-1 text-slate-400 hover:text-academic-600 transition-colors shrink-0"
      >
        <Home className="h-3.5 w-3.5" />
        首页
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5 shrink-0">
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          {item.path ? (
            <Link to={item.path} className="hover:text-academic-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
