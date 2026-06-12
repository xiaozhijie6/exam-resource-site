import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ResourceList from '@/components/resource/ResourceList';
import type { Resource, ExamModule } from '@/types';
import { examModules } from '@/data/exams';
import { cet4Resources } from '@/data/cet4';
import { cet6Resources } from '@/data/cet6';
import { kaoyanResources } from '@/data/kaoyan';
import { gongkaoResources } from '@/data/gongkao';
import { useFilter } from '@/hooks/useFilter';

const allResourcesMap: Record<string, Resource[]> = {
  cet4: cet4Resources,
  cet6: cet6Resources,
  kaoyan: kaoyanResources,
  gongkao: gongkaoResources,
};

export default function PapersPage() {
  const { examId } = useParams<{ examId: string }>();
  const exam: ExamModule | undefined = examModules.find((e) => e.id === examId);
  const allResources = examId ? allResourcesMap[examId] || [] : [];
  const paperResources = allResources.filter((r) => r.type === 'paper' || r.type === 'answer');

  const { filter, updateFilter, paginatedResources, totalCount, totalPages } = useFilter(paperResources);

  if (!exam) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h2 className="text-xl font-bold text-slate-900">考试模块未找到</h2>
        <Link to="/" className="text-academic-600 hover:underline mt-2">返回首页</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{exam.shortName}历年真题 — Everyone is great</title>
      </Helmet>

      <Breadcrumb items={[
        { label: exam.name, path: `/exam/${examId}` },
        { label: '历年真题' },
      ]} />

      <div className="my-8">
        <h1 className="text-2xl font-bold text-slate-900">{exam.name} 历年真题</h1>
        <p className="text-slate-500 mt-1">包含近5年真题试卷及详细答案解析</p>
      </div>

      <ResourceList
        resources={paginatedResources}
        totalCount={totalCount}
        currentPage={filter.page}
        totalPages={totalPages}
        sort={filter.sort}
        onSortChange={(sort) => updateFilter({ sort, page: 1 })}
        onPageChange={(page) => updateFilter({ page })}
      />
    </>
  );
}
