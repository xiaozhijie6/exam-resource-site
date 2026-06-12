import { useState } from 'react';
import { Flame, Clock } from 'lucide-react';
import { cet4Resources } from '@/data/cet4';
import { cet6Resources } from '@/data/cet6';
import { kaoyanResources } from '@/data/kaoyan';
import { gongkaoResources } from '@/data/gongkao';
import ResourceCard from '@/components/resource/ResourceCard';
import type { Resource } from '@/types';

const allResources: Resource[] = [...cet4Resources, ...cet6Resources, ...kaoyanResources, ...gongkaoResources];

export default function HotResources() {
  const [tab, setTab] = useState<'hot' | 'new'>('hot');

  const hotResources = [...allResources]
    .filter((r) => r.isHot)
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 6);

  const newResources = [...allResources]
    .filter((r) => r.isNew)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const displayed = tab === 'hot' ? hotResources : newResources;

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-slate-900">热门资源</h2>
          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              onClick={() => setTab('hot')}
              className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === 'hot' ? 'bg-white text-academic-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Flame className="h-4 w-4" />
              本周热门
            </button>
            <button
              onClick={() => setTab('new')}
              className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === 'new' ? 'bg-white text-academic-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Clock className="h-4 w-4" />
              最新上传
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {displayed.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
