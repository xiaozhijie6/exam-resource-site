import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Mail } from 'lucide-react';
import { ENABLE_PRICING } from '@/config/features';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌 */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-academic-500 to-academic-300">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Everyone is great</span>
            </div>
            <p className="text-sm leading-relaxed">
              四六级·考研·考公一站式学习资源平台
              <br />
              真题资料 · 学习方法 · 名师指路
            </p>
          </div>

          {/* 考试模块 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">考试模块</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/exam/cet4" className="hover:text-white transition-colors">大学英语四级 (CET-4)</Link></li>
              <li><Link to="/exam/cet6" className="hover:text-white transition-colors">大学英语六级 (CET-6)</Link></li>
              <li><Link to="/exam/kaoyan" className="hover:text-white transition-colors">全国硕士研究生招生考试</Link></li>
              <li><Link to="/exam/gongkao" className="hover:text-white transition-colors">国家公务员考试</Link></li>
            </ul>
          </div>

          {/* 资源类型 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">资源类型</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-default">历年真题试卷</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">答案解析与详解</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">学习方法与技巧</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">名师课程推荐</span></li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">联系我们</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>微信：successful_023562</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>微信群/QQ群：扫码加入</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>QQ：2788834675</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>邮箱：2788834675@qq.com</span>
              </li>
              {ENABLE_PRICING && (
              <li>
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-academic-400 hover:text-academic-300 transition-colors">
                  <ShieldCheck className="h-4 w-4" />
                  查看购买保障
                </Link>
              </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs text-slate-500">
          <p>本站资源仅供学习参考，请勿用于商业用途。所有推荐的老师及平台信息均来自公开渠道。</p>
          <p className="mt-1">© {new Date().getFullYear()} Everyone is great — 四六级·考研·考公学习资源平台</p>
        </div>
      </div>
    </footer>
  );
}
