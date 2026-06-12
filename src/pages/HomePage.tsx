import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/home/HeroSection';
import ExamGrid from '@/components/home/ExamGrid';
import HotResources from '@/components/home/HotResources';
import FeaturedTopics from '@/components/home/FeaturedTopics';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ENABLE_PRICING } from '@/config/features';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Everyone is great — 四六级·考研·考公学习资源平台</title>
        <meta name="description" content="英语四六级、考研、考公一站式学习资源平台。真题试卷、学习方法、名师推荐聚合。" />
      </Helmet>

      <HeroSection />
      <ExamGrid />
      <HotResources />
      <FeaturedTopics />

      {/* 底部引导区 */}
      <section className="py-20 bg-gradient-to-br from-academic-900 to-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            准备好开始备考了吗？
          </h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto">
            选择你的考试，获取历年真题、高效学习方法和名师课程推荐
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-academic-700 hover:bg-slate-100 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              联系我们
            </Link>
            {ENABLE_PRICING && (
              <Link
                to="/exam/cet4/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-500 px-6 py-3 font-medium text-white hover:bg-white/10 transition-colors"
              >
                了解收费方案
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
