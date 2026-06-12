import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, HelpCircle } from 'lucide-react';
import ContactInfo from '@/components/common/ContactInfo';
import { ENABLE_PRICING } from '@/config/features';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>联系我们 — Everyone is great</title>
        <meta name="description" content="联系Everyone is great获取英语四六级、考研、考公学习资料，免费真题在线预览和下载。" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-8 py-16">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-academic-600 hover:text-academic-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* 左侧：使用说明 / 购买流程 */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">联系我们</h1>
              <p className="text-slate-500">有任何问题？我们随时为你提供帮助</p>
            </div>

            {/* 使用步骤 / 购买流程（根据 ENABLE_PRICING 切换内容） */}
            <div className="space-y-4">
              {ENABLE_PRICING ? (
                [
                  { step: '01', title: '选择方案', desc: '浏览各考试模块的收费方案，选择最适合你的会员等级。每个考试都有免费资源可以先体验。' },
                  { step: '02', title: '联系付款', desc: '通过微信或QQ联系我们，告知你选择的考试模块和会员等级。我们会在24小时内回复确认。' },
                  { step: '03', title: '开通权限', desc: '付款确认后，我们将立即为你开通对应会员权限。所有付费资源即刻解锁，资料持续更新免费获取。' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-academic-100 text-sm font-bold text-academic-700">{item.step}</div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                [
                  { step: '01', title: '选择考试', desc: '在首页选择你要备考的考试（四六级/考研/考公），浏览历年真题和学习方法。' },
                  { step: '02', title: '在线预览', desc: '点击任意真题即可在线预览试卷内容，所有资源免费开放，无需付费。' },
                  { step: '03', title: '下载学习', desc: '找到合适的真题后直接下载PDF，题目配合答案解析，高效备考。如需帮助，随时联系我们。' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-academic-100 text-sm font-bold text-academic-700">{item.step}</div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 常见问题 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-academic-600" />
                <h3 className="font-semibold text-slate-900">常见问题</h3>
              </div>
              <div className="space-y-4">
                {ENABLE_PRICING ? (
                  [
                    { q: '付款后多久可以获取资料？', a: '付款确认后，24小时内开通会员权限，即可下载所有资料。' },
                    { q: '资料会更新吗？', a: '是的，每次考试结束后都会第一时间更新最新真题和解析，会员期内免费获取。' },
                    { q: '可以退款吗？', a: '7天内未使用可无条件全额退款，已下载的资料不在此范围。' },
                    { q: '资料是什么格式？', a: '真题试卷和答案为PDF格式，学习方法为在线文章。所有试卷均可在线预览和下载。' },
                  ].map((faq) => (
                    <div key={faq.q} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">{faq.q}</h4>
                          <p className="text-sm text-slate-500 mt-1">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  [
                    { q: '资源都是免费的吗？', a: '是的，目前所有真题试卷、学习方法和名师推荐全部免费开放，可在线预览和下载。' },
                    { q: '资料会更新吗？', a: '是的，每次考试结束后都会第一时间更新最新真题和解析，欢迎持续关注。' },
                    { q: '如何下载PDF？', a: '打开任意真题页面，点击下载按钮即可保存到本地。部分试卷提供配套答案解析。' },
                    { q: '有学习建议吗？', a: '每个考试模块都有对应的学习方法和名师推荐，帮助你制定合理的备考计划。' },
                  ].map((faq) => (
                    <div key={faq.q} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-slate-900">{faq.q}</h4>
                          <p className="text-sm text-slate-500 mt-1">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 右侧：联系方式 */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4">📱 联系我们</h2>
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
