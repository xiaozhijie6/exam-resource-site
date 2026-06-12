import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  large?: boolean;
}

export default function SearchBox({ placeholder = '搜索真题、方法、老师...', className = '', large = false }: SearchBoxProps) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim()) {
        navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      }
    },
    [value, navigate]
  );

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Search className={clsx('absolute left-3 top-1/2 -translate-y-1/2 text-slate-400', large ? 'h-5 w-5' : 'h-4 w-4')} />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            'w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10',
            'text-slate-900 placeholder:text-slate-400',
            'focus:border-academic-500 focus:outline-none focus:ring-2 focus:ring-academic-100',
            'transition-all',
            large ? 'h-12 text-base' : 'h-10 text-sm'
          )}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
}

function clsx(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(' ');
}
