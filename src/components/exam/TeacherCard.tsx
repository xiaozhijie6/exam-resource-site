import { ExternalLink, Users, BookOpen, Star } from 'lucide-react';
import type { Teacher } from '@/types';

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-academic-200 hover:shadow-md transition-all">
      {/* 头像 + 名字 */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-academic-400 to-academic-600 text-white text-xl font-bold shrink-0">
          {teacher.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{teacher.name}</h3>
          <p className="text-xs text-slate-500">{teacher.platform}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{teacher.description}</p>

      {/* 擅长领域 */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {teacher.specialty.map((spec) => (
          <span key={spec} className="inline-flex rounded-lg bg-academic-50 px-2.5 py-1 text-xs font-medium text-academic-700">
            {spec}
          </span>
        ))}
      </div>

      {/* 数据 */}
      <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" />
          {teacher.courseCount}门课程
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {teacher.studentCount >= 10000
            ? `${(teacher.studentCount / 10000).toFixed(0)}万学员`
            : `${teacher.studentCount}学员`}
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-amber-400" />
          好评
        </span>
      </div>

      {/* 跳转按钮 */}
      <a
        href={teacher.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 w-full rounded-lg border border-academic-200 bg-academic-50 py-2 text-sm font-medium text-academic-700 hover:bg-academic-100 transition-colors"
      >
        前往课程
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
