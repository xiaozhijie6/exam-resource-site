import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, navigate]
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-academic-900 to-slate-900 py-20 sm:py-28">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-academic-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            英语四六级·考研·考公
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              一站式学习资源平台
            </span>
          </h1>
          <p className="mt-5 text-lg text-slate-300 leading-relaxed">
            真题试卷 · 学习方法 · 名师推荐 · 备考规划
          </p>
          <p className="mt-2 text-sm text-slate-400">
            不卖视频课，只做最优质的信息聚合和资源分发
          </p>

          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="mt-10 mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索历年真题、学习方法、名师推荐..."
                className="w-full rounded-2xl border-0 bg-white/10 backdrop-blur-sm pl-12 pr-4 h-14 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-400/50 text-base"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-academic-500 px-5 py-2 text-sm font-medium text-white hover:bg-academic-400 transition-colors"
              >
                搜索
              </button>
            </div>
          </form>

          {/* 数据亮点 */}
          <div className="mt-12 flex items-center justify-center gap-10">
            {[
              { value: '300+', label: '真题试卷' },
              { value: '50+', label: '学习方法' },
              { value: '20+', label: '名师推荐' },
              { value: '5000+', label: '累计用户' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
