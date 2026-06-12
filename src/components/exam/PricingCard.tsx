import { Check, Star } from 'lucide-react';
import type { PricingTier } from '@/types';
import clsx from 'clsx';

export default function PricingCard({ tier }: { tier: PricingTier }) {
  const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
    slate: { border: 'border-slate-200', bg: 'bg-white', text: 'text-slate-900', badge: 'bg-slate-100 text-slate-600' },
    blue: { border: 'border-academic-300', bg: 'bg-white', text: 'text-slate-900', badge: 'bg-academic-100 text-academic-700' },
    indigo: { border: 'border-indigo-300', bg: 'bg-white', text: 'text-slate-900', badge: 'bg-indigo-100 text-indigo-700' },
    violet: { border: 'border-violet-300', bg: 'bg-white', text: 'text-slate-900', badge: 'bg-violet-100 text-violet-700' },
    amber: { border: 'border-amber-300', bg: 'bg-gradient-to-b from-amber-50 to-white', text: 'text-slate-900', badge: 'bg-amber-100 text-amber-700' },
    orange: { border: 'border-orange-300', bg: 'bg-gradient-to-b from-orange-50 to-white', text: 'text-slate-900', badge: 'bg-orange-100 text-orange-700' },
  };

  const colors = colorMap[tier.color] || colorMap.slate;

  return (
    <div
      className={clsx(
        'relative rounded-2xl border-2 p-6',
        tier.isPopular ? 'border-academic-500 shadow-lg' : colors.border,
        colors.bg
      )}
    >
      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-academic-600 px-4 py-1 text-xs font-medium text-white">
            <Star className="h-3 w-3" />
            最受欢迎
          </span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-slate-900 mb-1">{tier.name}</h3>
      <p className="text-sm text-slate-500 mb-4">{tier.description}</p>

      <div className="mb-6">
        <span className="text-3xl font-bold text-slate-900">
          {tier.price === 0 ? '免费' : `¥${tier.price}`}
        </span>
        {tier.originalPrice && (
          <span className="ml-2 text-sm text-slate-400 line-through">¥{tier.originalPrice}</span>
        )}
        {tier.periodLabel && (
          <span className="text-sm text-slate-500 ml-1">{tier.periodLabel}</span>
        )}
      </div>

      <ul className="space-y-2.5 mb-6">
        {tier.includes.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
            <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
