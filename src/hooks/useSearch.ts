import { useMemo, useState, useCallback } from 'react';
import Fuse from 'fuse.js';
import type { Resource, ExamId, ResourceType } from '@/types';

interface SearchOptions {
  query: string;
  examId?: ExamId;
  type?: ResourceType | 'all';
}

export function useSearch(resources: Resource[]) {
  const [options, setOptions] = useState<SearchOptions>({ query: '' });

  const fuse = useMemo(
    () =>
      new Fuse(resources, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'description', weight: 0.3 },
          { name: 'tags', weight: 0.2 },
          { name: 'year', weight: 0.1 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [resources]
  );

  const search = useCallback(
    (query: string, examId?: ExamId, type?: ResourceType | 'all') => {
      setOptions({ query, examId, type });
    },
    []
  );

  const results = useMemo(() => {
    let results = options.query ? fuse.search(options.query).map((r) => r.item) : [];

    if (options.examId) {
      results = results.filter((r) => r.examId === options.examId);
    }
    if (options.type && options.type !== 'all') {
      results = results.filter((r) => r.type === options.type);
    }

    return results;
  }, [options, fuse]);

  return {
    search,
    results,
    query: options.query,
  };
}
