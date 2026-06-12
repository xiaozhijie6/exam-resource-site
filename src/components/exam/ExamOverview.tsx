import { CalendarDays, Building2, Hash, Award, Clock } from 'lucide-react';
import type { ExamModule } from '@/types';

interface ExamOverviewProps {
  exam: ExamModule;
}

export default function ExamOverview({ exam }: ExamOverviewProps) {
  return (
    <div
      className="rounded-2xl p-8 text-white"
      style={{ background: `linear-gradient(135deg, ${exam.gradientFrom}, ${exam.gradientTo})` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <h1 className="text-2xl font-bold">{exam.name}</h1>
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {exam.shortName}
        </span>
      </div>
      <p className="text-white/80 text-sm mb-6 max-w-2xl">{exam.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
          <Building2 className="h-4 w-4 text-white/60 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs text-white/60">主办方</div>
            <div className="text-sm font-medium truncate">{exam.examInfo.organizer}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
          <CalendarDays className="h-4 w-4 text-white/60 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs text-white/60">考试时间</div>
            <div className="text-sm font-medium truncate">{exam.examInfo.examDate}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
          <Clock className="h-4 w-4 text-white/60 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs text-white/60">频次</div>
            <div className="text-sm font-medium truncate">{exam.examInfo.frequency}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
          <Award className="h-4 w-4 text-white/60 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs text-white/60">总分</div>
            <div className="text-sm font-medium">{exam.examInfo.totalScore}分</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
          <Hash className="h-4 w-4 text-white/60 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs text-white/60">资源总数</div>
            <div className="text-sm font-medium">{exam.stats.totalResources}份</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
          <Hash className="h-4 w-4 text-white/60 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs text-white/60">免费资源</div>
            <div className="text-sm font-medium">{exam.stats.freeResources}份</div>
          </div>
        </div>
      </div>
    </div>
  );
}
