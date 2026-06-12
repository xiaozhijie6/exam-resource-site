import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ResourceCard from './ResourceCard';
import type { Resource } from '@/types';

interface ResourceListProps {
  resources: Resource[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  sort: string;
  onSortChange: (sort: 'newest' | 'popular' | 'free') => void;
  onPageChange: (page: number) => void;
}

export default function ResourceList({
  resources,
  totalCount,
  currentPage,
  totalPages,
  sort,
  onSortChange,
  onPageChange,
}: ResourceListProps) {
  const sortOptions = [
    { key: 'newest', label: '最新' },
    { key: 'popular', label: '最热' },
    { key: 'free', label: '免费优先' },
  ] as const;

  return (
    <div>
      {/* 排序栏 */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm text-slate-500">
          共 <span className="font-medium text-slate-700">{totalCount}</span> 份资源
        </span>
        <div className="flex items-center gap-1">
          <ArrowUpDown className="h-4 w-4 text-slate-400" />
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => onSortChange(option.key)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                sort === option.key
                  ? 'bg-academic-100 text-academic-700'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 资源卡片网格 */}
      {resources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-slate-500 mb-1">当前筛选条件下没有找到资源</p>
          <p className="text-slate-400 text-sm">试试切换左侧的资源类型，或清除年份/价格筛选</p>
        </div>
      )}

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-academic-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
