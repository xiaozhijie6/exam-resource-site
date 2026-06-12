import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileText, Lightbulb, GraduationCap, CreditCard } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ExamOverview from '@/components/exam/ExamOverview';
import ResourceList from '@/components/resource/ResourceList';
import type { ExamModule, Resource } from '@/types';
import { examModules } from '@/data/exams';
import { cet4Resources } from '@/data/cet4';
import { cet6Resources } from '@/data/cet6';
import { kaoyanResources } from '@/data/kaoyan';
import { gongkaoResources } from '@/data/gongkao';
import { useFilter } from '@/hooks/useFilter';
import { ENABLE_PRICING } from '@/config/features';

const allResourcesMap: Record<string, Resource[]> = {
  cet4: cet4Resources,
  cet6: cet6Resources,
  kaoyan: kaoyanResources,
  gongkao: gongkaoResources,
};

export default function ExamHomePage() {
  const { examId } = useParams<{ examId: string }>();
  const exam: ExamModule | undefined = examModules.find((e) => e.id === examId);
  const resources = examId ? allResourcesMap[examId] || [] : [];

  const { filter, updateFilter, paginatedResources, totalCount, totalPages } = useFilter(resources);

  if (!exam) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">考试模块未找到</h2>
        <Link to="/" className="text-academic-600 hover:underline">返回首页</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{exam.name} — Everyone is great</title>
        <meta name="description" content={exam.description} />
      </Helmet>

      <div className="space-y-8">
        <Breadcrumb items={[{ label: exam.name }]} />
        <ExamOverview exam={exam} />

        {/* 快捷入口 */}
        <div className={`grid gap-4 ${ENABLE_PRICING ? 'grid-cols-4' : 'grid-cols-3'}`}>
          {[
            { label: '真题试卷', icon: FileText, path: `/exam/${examId}/papers` },
            { label: '学习方法', icon: Lightbulb, path: `/exam/${examId}/methods` },
            { label: '名师推荐', icon: GraduationCap, path: `/exam/${examId}/teachers` },
            ...(ENABLE_PRICING ? [{ label: '收费方案', icon: CreditCard, path: `/exam/${examId}/pricing` }] : []),
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-4 hover:border-academic-200 hover:shadow-sm transition-all"
            >
              <item.icon className="h-6 w-6 text-academic-600" />
              <span className="text-xs font-medium text-slate-700">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* 资源列表 */}
        <ResourceList
          resources={paginatedResources}
          totalCount={totalCount}
          currentPage={filter.page}
          totalPages={totalPages}
          sort={filter.sort}
          onSortChange={(sort) => updateFilter({ sort, page: 1 })}
          onPageChange={(page) => updateFilter({ page })}
        />
      </div>
    </>
  );
}
