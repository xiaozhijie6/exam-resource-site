import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Trophy, Landmark, ArrowRight } from 'lucide-react';
import { examModules } from '@/data/exams';

const examIcons: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="h-10 w-10" />,
  GraduationCap: <GraduationCap className="h-10 w-10" />,
  Trophy: <Trophy className="h-10 w-10" />,
  Landmark: <Landmark className="h-10 w-10" />,
};

export default function ExamGrid() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">选择你的考试</h2>
          <p className="mt-2 text-slate-500">每个考试模块都包含真题资料、学习方法和名师推荐</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {examModules.map((exam) => (
            <Link
              key={exam.id}
              to={`/exam/${exam.id}`}
              className="exam-card-gradient group"
              style={{ background: `linear-gradient(135deg, ${exam.gradientFrom}, ${exam.gradientTo})` }}
            >
              <div className="p-6 text-white">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  {examIcons[exam.icon]}
                </div>
                <h3 className="text-xl font-bold mb-1">{exam.shortName}</h3>
                <p className="text-sm text-white/70 mb-4 line-clamp-2">{exam.name}</p>

                {/* 子分类标签 */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {exam.subCategories.slice(0, 4).map((cat) => (
                    <span
                      key={cat.key}
                      className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-xs backdrop-blur-sm"
                    >
                      {cat.name}
                    </span>
                  ))}
                  {exam.subCategories.length > 4 && (
                    <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-xs backdrop-blur-sm">
                      +{exam.subCategories.length - 4}
                    </span>
                  )}
                </div>

                {/* 统计信息 */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex gap-3 text-xs text-white/70">
                    <span>{exam.stats.totalResources}份资料</span>
                    <span>{exam.stats.freeResources}份免费</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/60 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
