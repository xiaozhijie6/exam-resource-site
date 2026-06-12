import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Resource, FilterState, ResourceType, ResourceStatus, ExamId } from '@/types';

export function useFilter(resources: Resource[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter: FilterState = {
    examId: (searchParams.get('examId') as ExamId) || null,
    resourceType: (searchParams.get('type') as ResourceType) || 'all',
    year: searchParams.get('year') === 'all' ? 'all' : Number(searchParams.get('year')) || 'all',
    status: (searchParams.get('status') as ResourceStatus) || 'all',
    category: searchParams.get('category') || '',
    sort: (searchParams.get('sort') as 'newest' | 'popular' | 'free') || 'newest',
    search: searchParams.get('q') || '',
    page: Number(searchParams.get('page')) || 1,
    pageSize: 12,
  };

  // Map FilterState keys to URL parameter names (read side uses short names)
  const keyToParam: Record<string, string> = {
    resourceType: 'type',
    search: 'q',
  };

  const updateFilter = useCallback(
    (updates: Partial<FilterState>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          const paramKey = keyToParam[key] || key;
          if (value === null || value === 'all' || value === '' || value === undefined) {
            next.delete(paramKey);
          } else {
            next.set(paramKey, String(value));
          }
        });
        // Reset page when filters change
        if (!('page' in updates)) {
          next.delete('page');
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const filteredResources = useMemo(() => {
    let result = [...resources];

    // Filter by exam
    if (filter.examId) {
      result = result.filter((r) => r.examId === filter.examId);
    }

    // Filter by type
    if (filter.resourceType && filter.resourceType !== 'all') {
      result = result.filter((r) => r.type === filter.resourceType);
    }

    // Filter by year
    if (filter.year !== 'all') {
      result = result.filter((r) => r.year === filter.year);
    }

    // Filter by status
    if (filter.status && filter.status !== 'all') {
      result = result.filter((r) => r.status === filter.status);
    }

    // Filter by category/tag
    if (filter.category) {
      result = result.filter((r) => r.tags.some((t) => t === filter.category));
    }

    // Search
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (filter.sort) {
      case 'newest':
        result.sort((a, b) => b.year - a.year || (b.month || 0) - (a.month || 0));
        break;
      case 'popular':
        result.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case 'free':
        result.sort((a, b) => {
          if (a.status === 'free' && b.status !== 'free') return -1;
          if (a.status !== 'free' && b.status === 'free') return 1;
          return b.downloadCount - a.downloadCount;
        });
        break;
    }

    return result;
  }, [resources, filter]);

  // Pagination
  const totalPages = Math.ceil(filteredResources.length / filter.pageSize);
  const paginatedResources = useMemo(
    () => filteredResources.slice((filter.page - 1) * filter.pageSize, filter.page * filter.pageSize),
    [filteredResources, filter.page, filter.pageSize]
  );

  // Get unique years from resources
  const availableYears = useMemo(
    () => [...new Set(resources.map((r) => r.year))].sort((a, b) => b - a),
    [resources]
  );

  return {
    filter,
    updateFilter,
    filteredResources,
    paginatedResources,
    totalPages,
    availableYears,
    totalCount: filteredResources.length,
  };
}
