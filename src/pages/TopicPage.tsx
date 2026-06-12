import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Zap, ArrowLeft } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ResourceCard from '@/components/resource/ResourceCard';
import type { Resource } from '@/types';
import { examModules } from '@/data/exams';
import { cet4Topics } from '@/data/cet4';
import { cet6Topics } from '@/data/cet6';
import { kaoyanTopics } from '@/data/kaoyan';
import { gongkaoTopics } from '@/data/gongkao';
import { cet4Resources } from '@/data/cet4';
import { cet6Resources } from '@/data/cet6';
import { kaoyanResources } from '@/data/kaoyan';
import { gongkaoResources } from '@/data/gongkao';

const allTopics = [...cet4Topics, ...cet6Topics, ...kaoyanTopics, ...gongkaoTopics];
const allResourcesMap: Record<string, Resource[]> = {
  cet4: cet4Resources,
  cet6: cet6Resources,
  kaoyan: kaoyanResources,
  gongkao: gongkaoResources,
};

export default function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = allTopics.find((t) => t.id === topicId);
  const exam = examModules.find((e) => e.id === topic?.examId);
  const allResources = topic ? allResourcesMap[topic.examId] || [] : [];
  const resources = topic ? topic.resourceIds.map((id) => allResources.find((r) => r.id === id)).filter(Boolean) as Resource[] : [];

  if (!topic || !exam) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h2 className="text-xl font-bold text-slate-900">专题未找到</h2>
        <Link to="/" className="text-academic-600 hover:underline mt-2">返回首页</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{topic.title} — Everyone is great</title>
        <meta name="description" content={topic.description} />
      </Helmet>

      <div className="space-y-8 mx-auto max-w-7xl px-4 sm:px-8 py-8">
        <Breadcrumb items={[
          { label: exam.name, path: `/exam/${exam.id}` },
          { label: topic.title },
        ]} />

        {/* 专题头 */}
        <div className="rounded-2xl bg-gradient-to-br from-academic-600 to-academic-800 p-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-amber-300" />
            <span className="text-sm text-white/70">{exam.name}</span>
            {topic.isActive && (
              <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-medium text-emerald-300">
                进行中
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{topic.title}</h1>
          <p className="text-white/70">{topic.description}</p>
        </div>

        {/* 专题资源列表 */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">专题包含的资源</h3>
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">该专题资源正在整理中...</div>
          )}
        </div>

        <Link
          to={`/exam/${exam.id}`}
          className="inline-flex items-center gap-2 text-sm text-academic-600 hover:text-academic-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回{exam.name}全部资源
        </Link>
      </div>
    </>
  );
}
