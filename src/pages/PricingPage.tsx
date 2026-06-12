import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PricingCard from '@/components/exam/PricingCard';
import ContactInfo from '@/components/common/ContactInfo';
import type { PricingTier, ExamModule } from '@/types';
import { examModules } from '@/data/exams';
import { cetPricing } from '@/data/cet-bundle';
import { kaoyanPricing } from '@/data/kaoyan';
import { gongkaoPricing } from '@/data/gongkao';

const pricingMap: Record<string, PricingTier[]> = {
  cet4: cetPricing,
  cet6: cetPricing,
  kaoyan: kaoyanPricing,
  gongkao: gongkaoPricing,
};

export default function PricingPage() {
  const { examId } = useParams<{ examId: string }>();
  const exam: ExamModule | undefined = examModules.find((e) => e.id === examId);
  const tiers = examId ? pricingMap[examId] || [] : [];

  if (!exam) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h2 className="text-xl font-bold text-slate-900">考试模块未找到</h2>
        <Link to="/" className="text-academic-600 hover:underline mt-2">返回首页</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{exam.shortName}收费方案 — Everyone is great</title>
      </Helmet>

      <Breadcrumb items={[
        { label: exam.name, path: `/exam/${examId}` },
        { label: '收费方案' },
      ]} />

      <div className="my-8">
        <h1 className="text-2xl font-bold text-slate-900">{exam.name} 收费方案</h1>
        <p className="text-slate-500 mt-1">选择最适合你的备考方案，投资自己永远是最值得的</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* 定价卡片区 */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* 联系方式区 */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-slate-900 mb-4">购买方式</h3>
          <ContactInfo />
        </div>
      </div>
    </>
  );
}
