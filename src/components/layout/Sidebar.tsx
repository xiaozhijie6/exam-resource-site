import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Lightbulb, GraduationCap, Calendar, BookOpen, Filter, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import type { ResourceType, ResourceStatus, ExamModule } from '@/types';
import { ResourceTypeLabel } from '@/types';
import { useState } from 'react';
import { ENABLE_PRICING } from '@/config/features';

const resourceTypeIcons: Record<string, React.ReactNode> = {
  paper: <FileText className="h-4 w-4" />,
  answer: <CheckCircle className="h-4 w-4" />,
  method: <Lightbulb className="h-4 w-4" />,
  teacher: <GraduationCap className="h-4 w-4" />,
  plan: <Calendar className="h-4 w-4" />,
  guide: <BookOpen className="h-4 w-4" />,
};

/** 哪些 type 有独立页面，点击时直接导航而非筛选 */
const TYPE_PAGE_MAP: Partial<Record<ResourceType, string>> = {
  paper: 'papers',
  answer: 'papers',
  method: 'methods',
  teacher: 'teachers',
  // plan / guide 没有独立页面 → 留在当前页用 type filter 筛选
};

/** 从 URL path 反推当前页面对应的 type */
function pathToActiveType(pathname: string): ResourceType | 'all' {
  if (pathname.includes('/papers')) return 'paper';      // papers 页也把 answer 视为同道
  if (pathname.includes('/methods')) return 'method';
  if (pathname.includes('/teachers')) return 'teacher';
  if (pathname.includes('/pricing')) return 'all';       // pricing 页不属于任何 resource type
  // 详情页 /paper/xxx /method/xxx 也用路径区分
  if (pathname.includes('/paper/')) return 'paper';
  if (pathname.includes('/method/')) return 'method';
  return 'all';                                          // 考试首页 → "全部资源"
}

interface SidebarProps {
  examModule: ExamModule;
  selectedType: ResourceType | 'all';
  selectedYear: number | 'all';
  selectedStatus: ResourceStatus | 'all';
  selectedCategory: string;
  availableYears: number[];
  onTypeChange: (type: ResourceType | 'all') => void;
  onYearChange: (year: number | 'all') => void;
  onStatusChange: (status: ResourceStatus | 'all') => void;
  onCategoryChange: (category: string) => void;
}

export default function Sidebar({
  examModule,
  selectedType,
  selectedYear,
  selectedStatus,
  selectedCategory,
  availableYears,
  onTypeChange,
  onYearChange,
  onStatusChange,
  onCategoryChange,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeType = pathToActiveType(location.pathname);

  // 只在首页和真题页显示年份/价格/题型筛选（这些页面使用 useFilter）
  const showFilters = !location.pathname.includes('/methods') && !location.pathname.includes('/teachers') && !location.pathname.includes('/pricing');

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    type: true,
    year: true,
    status: true,
    category: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /** 处理资源类型点击：有独立页面的导航过去，没有的留在当前页筛选 */
  function handleTypeClick(type: ResourceType | 'all') {
    if (type === 'all') {
      navigate(`/exam/${examModule.id}`);
      return;
    }
    const subPage = TYPE_PAGE_MAP[type];
    if (subPage) {
      navigate(`/exam/${examModule.id}/${subPage}`);
    } else {
      // plan / guide 没有独立页面 → 如果当前页不支持筛选则回首页；否则原地筛选
      if (showFilters) {
        onTypeChange(type);
      } else {
        navigate(`/exam/${examModule.id}?type=${type}`);
      }
    }
  }

  const typeOptions: Array<{ key: ResourceType | 'all'; label: string; icon: React.ReactNode }> = [
    { key: 'all', label: '全部资源', icon: <Filter className="h-4 w-4" /> },
    ...Object.entries(ResourceTypeLabel).map(([key, label]) => ({
      key: key as ResourceType,
      label,
      icon: resourceTypeIcons[key] || <FileText className="h-4 w-4" />,
    })),
  ];

  return (
    <aside className="w-60 lg:w-64 shrink-0 space-y-4">
      {/* 资源类型 */}
      <div className="sidebar-section">
        <button
          onClick={() => toggleSection('type')}
          className="flex items-center justify-between w-full text-left mb-2"
        >
          <span className="text-sm font-semibold text-slate-700">资源类型</span>
          <ChevronDown
            className={clsx('h-4 w-4 text-slate-400 transition-transform', openSections.type && 'rotate-180')}
          />
        </button>
        {openSections.type && (
          <div className="space-y-0.5">
            {typeOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleTypeClick(option.key)}
                className={clsx(
                  'flex items-center gap-2 w-full rounded-lg px-3 py-1.5 text-sm transition-colors text-left',
                  activeType === option.key || (option.key === 'answer' && activeType === 'paper')
                    ? 'bg-academic-50 text-academic-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                <span className="shrink-0">{option.icon}</span>
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 年份/价格/题型筛选 — 仅首页和真题页显示 */}
      {showFilters && (
        <>
          {/* 年份筛选 */}
          <div className="sidebar-section">
            <button
              onClick={() => toggleSection('year')}
              className="flex items-center justify-between w-full text-left mb-2"
            >
              <span className="text-sm font-semibold text-slate-700">年份</span>
              <ChevronDown
                className={clsx('h-4 w-4 text-slate-400 transition-transform', openSections.year && 'rotate-180')}
              />
            </button>
            {openSections.year && (
              <div className="space-y-0.5">
                <button
                  onClick={() => onYearChange('all')}
                  className={clsx(
                    'w-full rounded-lg px-3 py-1.5 text-sm text-left transition-colors',
                    selectedYear === 'all'
                      ? 'bg-academic-50 text-academic-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  全部年份
                </button>
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => onYearChange(year)}
                    className={clsx(
                      'w-full rounded-lg px-3 py-1.5 text-sm text-left transition-colors',
                      selectedYear === year
                        ? 'bg-academic-50 text-academic-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    {year}年
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 价格筛选 */}
          {ENABLE_PRICING && (
          <div className="sidebar-section">
            <button
              onClick={() => toggleSection('status')}
              className="flex items-center justify-between w-full text-left mb-2"
            >
              <span className="text-sm font-semibold text-slate-700">价格</span>
              <ChevronDown
                className={clsx('h-4 w-4 text-slate-400 transition-transform', openSections.status && 'rotate-180')}
              />
            </button>
            {openSections.status && (
              <div className="space-y-0.5">
                {([
                  { key: 'all', label: '全部' },
                  { key: 'free', label: '🆓 免费' },
                  { key: 'member', label: '💎 会员专享' },
                  { key: 'premium', label: '👑 付费精品' },
                ] as const).map((option) => (
                  <button
                    key={option.key}
                    onClick={() => onStatusChange(option.key as ResourceStatus | 'all')}
                    className={clsx(
                      'w-full rounded-lg px-3 py-1.5 text-sm text-left transition-colors',
                      selectedStatus === option.key
                        ? 'bg-academic-50 text-academic-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          )}

          {/* 题型/科目筛选 */}
          {examModule.subCategories.length > 0 && (
            <div className="sidebar-section">
              <button
                onClick={() => toggleSection('category')}
                className="flex items-center justify-between w-full text-left mb-2"
              >
                <span className="text-sm font-semibold text-slate-700">
                  {examModule.id === 'gongkao' || examModule.id === 'kaoyan' ? '科目' : '题型'}
                </span>
                <ChevronDown
                  className={clsx('h-4 w-4 text-slate-400 transition-transform', openSections.category && 'rotate-180')}
                />
              </button>
              {openSections.category && (
                <div className="space-y-0.5">
                  <button
                    onClick={() => onCategoryChange('')}
                    className={clsx(
                      'w-full rounded-lg px-3 py-1.5 text-sm text-left transition-colors',
                      selectedCategory === ''
                        ? 'bg-academic-50 text-academic-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    全部
                  </button>
                  {examModule.subCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => onCategoryChange(cat.name)}
                      className={clsx(
                        'w-full rounded-lg px-3 py-1.5 text-sm text-left transition-colors',
                        selectedCategory === cat.name
                          ? 'bg-academic-50 text-academic-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </aside>
  );
}
