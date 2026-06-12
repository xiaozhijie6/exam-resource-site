import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'free' | 'member' | 'premium' | 'hot' | 'new';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-slate-100 text-slate-700',
  free: 'bg-emerald-100 text-emerald-700',
  member: 'bg-blue-100 text-blue-700',
  premium: 'bg-amber-100 text-amber-700',
  hot: 'bg-red-100 text-red-600',
  new: 'bg-academic-100 text-academic-700',
};

export default function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
