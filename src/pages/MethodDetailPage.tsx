import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '@/components/layout/Breadcrumb';
import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import type { LearningMethod } from '@/types';
import { examModules } from '@/data/exams';
import { cet4Methods } from '@/data/cet4';
import { cet6Methods } from '@/data/cet6';
import { kaoyanMethods } from '@/data/kaoyan';
import { gongkaoMethods } from '@/data/gongkao';

const methodsMap: Record<string, LearningMethod[]> = {
  cet4: cet4Methods,
  cet6: cet6Methods,
  kaoyan: kaoyanMethods,
  gongkao: gongkaoMethods,
};

export default function MethodDetailPage() {
  const { examId, methodId } = useParams<{ examId: string; methodId: string }>();
  const exam = examModules.find((e) => e.id === examId);
  const methods = examId ? methodsMap[examId] || [] : [];
  const method = methods.find((m) => m.id === methodId);

  if (!exam || !method) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h2 className="text-xl font-bold text-slate-900">学习方法未找到</h2>
        <Link to={exam ? `/exam/${examId}/methods` : '/'} className="text-academic-600 hover:underline mt-2">
          {exam ? `返回${exam.name}学习方法` : '返回首页'}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{method.title} — {exam.shortName} — Everyone is great</title>
        <meta name="description" content={method.summary} />
      </Helmet>

      <div className="space-y-6 max-w-4xl">
        <Breadcrumb items={[
          { label: exam.name, path: `/exam/${examId}` },
          { label: '学习方法', path: `/exam/${examId}/methods` },
          { label: method.title },
        ]} />

        {/* 文章头 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
              {method.category}
            </span>
            {method.author && (
              <span className="text-xs text-slate-400">作者：{method.author}</span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{method.title}</h1>
          <p className="text-slate-500">{method.summary}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {method.tags.map((tag) => (
              <span key={tag} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 文章内容 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <MarkdownRenderer content={method.content} />
        </div>
      </div>
    </>
  );
}
