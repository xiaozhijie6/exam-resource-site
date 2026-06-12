import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '@/components/layout/Breadcrumb';
import MethodCard from '@/components/exam/MethodCard';
import type { LearningMethod, ExamModule } from '@/types';
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

export default function MethodsPage() {
  const { examId } = useParams<{ examId: string }>();
  const exam: ExamModule | undefined = examModules.find((e) => e.id === examId);
  const methods = examId ? methodsMap[examId] || [] : [];

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
        <title>{exam.shortName}学习方法 — Everyone is great</title>
      </Helmet>

      <Breadcrumb items={[
        { label: exam.name, path: `/exam/${examId}` },
        { label: '学习方法' },
      ]} />

      <div className="my-8">
        <h1 className="text-2xl font-bold text-slate-900">{exam.name} 学习方法</h1>
        <p className="text-slate-500 mt-1">系统化的备考策略和解题技巧，帮你少走弯路</p>
      </div>

      <div className="space-y-4">
        {methods.map((method) => (
          <MethodCard key={method.id} method={method} />
        ))}
        {methods.length === 0 && (
          <div className="text-center py-12 text-slate-400">该模块的学习方法正在整理中，敬请期待...</div>
        )}
      </div>
    </>
  );
}
