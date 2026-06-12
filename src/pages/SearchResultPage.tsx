import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowLeft } from 'lucide-react';
import ResourceCard from '@/components/resource/ResourceCard';
import SearchBox from '@/components/common/SearchBox';
import type { Resource } from '@/types';
import { cet4Resources } from '@/data/cet4';
import { cet6Resources } from '@/data/cet6';
import { kaoyanResources } from '@/data/kaoyan';
import { gongkaoResources } from '@/data/gongkao';
import { useSearch } from '@/hooks/useSearch';
import { useEffect } from 'react';

const allResources: Resource[] = [...cet4Resources, ...cet6Resources, ...kaoyanResources, ...gongkaoResources];

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { search, results: searchResults } = useSearch(allResources);

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);

  // 高亮关键词（简化版）
  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-amber-200 rounded px-0.5">$1</mark>');
  };

  return (
    <>
      <Helmet>
        <title>搜索: {query} — Everyone is great</title>
      </Helmet>

      <div className="space-y-8 mx-auto max-w-7xl px-4 sm:px-8 py-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-academic-600 hover:text-academic-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
          <div className="max-w-xl">
            <SearchBox placeholder="搜索真题、方法、老师..." large />
          </div>
        </div>

        {/* 搜索结果 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-slate-400" />
            <h2 className="text-lg font-semibold text-slate-900">
              {query ? `"${query}" 的搜索结果` : '请输入搜索关键词'}
            </h2>
            {query && (
              <span className="text-sm text-slate-500">
                共找到 {searchResults.length} 条结果
              </span>
            )}
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {searchResults.map((resource) => (
                <div key={resource.id}>
                  <ResourceCard resource={resource} />
                  {/* 显示匹配高亮 */}
                  {query && (
                    <p
                      className="mt-1 text-xs text-slate-400 line-clamp-1 px-1"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(resource.description, query),
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-slate-500 mb-2">没有找到与 "{query}" 相关的结果</p>
              <p className="text-sm text-slate-400">尝试使用其他关键词搜索</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
