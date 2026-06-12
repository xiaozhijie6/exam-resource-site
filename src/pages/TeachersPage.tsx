import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '@/components/layout/Breadcrumb';
import TeacherCard from '@/components/exam/TeacherCard';
import type { Teacher, ExamModule } from '@/types';
import { examModules } from '@/data/exams';
import { cet4Teachers } from '@/data/cet4';
import { cet6Teachers } from '@/data/cet6';
import { kaoyanTeachers } from '@/data/kaoyan';
import { gongkaoTeachers } from '@/data/gongkao';

const teachersMap: Record<string, Teacher[]> = {
  cet4: cet4Teachers,
  cet6: cet6Teachers,
  kaoyan: kaoyanTeachers,
  gongkao: gongkaoTeachers,
};

export default function TeachersPage() {
  const { examId } = useParams<{ examId: string }>();
  const exam: ExamModule | undefined = examModules.find((e) => e.id === examId);
  const teachers = examId ? teachersMap[examId] || [] : [];

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
        <title>{exam.shortName}名师推荐 — Everyone is great</title>
      </Helmet>

      <Breadcrumb items={[
        { label: exam.name, path: `/exam/${examId}` },
        { label: '名师推荐' },
      ]} />

      <div className="my-8">
        <h1 className="text-2xl font-bold text-slate-900">{exam.name} 名师推荐</h1>
        <p className="text-slate-500 mt-1">网评最好的老师课程链接合集，每个老师都有独特的教学风格</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
        {teachers.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-400">该模块的名师推荐正在整理中，敬请期待...</div>
        )}
      </div>
    </>
  );
}
