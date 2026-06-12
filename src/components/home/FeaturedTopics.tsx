import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';
import { cet4Topics } from '@/data/cet4';
import { kaoyanTopics } from '@/data/kaoyan';
import { gongkaoTopics } from '@/data/gongkao';

const allTopics = [
  { ...cet4Topics[0], examId: 'cet4' as const },
  { ...kaoyanTopics[0], examId: 'kaoyan' as const },
  { ...gongkaoTopics[0], examId: 'gongkao' as const },
];

const examLabels: Record<string, string> = {
  cet4: '四级',
  cet6: '六级',
  kaoyan: '考研',
  gongkao: '考公',
};

export default function FeaturedTopics() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center gap-2 mb-10">
          <Zap className="h-6 w-6 text-amber-500" />
          <h2 className="text-2xl font-bold text-slate-900">考前冲刺专题</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allTopics.map((topic) => (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-academic-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-full bg-academic-100 px-2.5 py-0.5 text-xs font-medium text-academic-700">
                  {examLabels[topic.examId]}
                </span>
                {topic.isActive && (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    进行中
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-academic-700 transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{topic.description}</p>
              <div className="flex items-center gap-1 text-sm font-medium text-academic-600">
                查看专题
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
