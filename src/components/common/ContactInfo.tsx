import { MessageCircle, HeartHandshake, ShieldCheck, Users } from 'lucide-react';
import { ENABLE_PRICING } from '@/config/features';

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* 微信个人号 */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-slate-900">微信咨询</div>
            <div className="text-sm text-slate-500">扫码或搜索添加</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="/wechat-qr.jpg"
            alt="微信二维码"
            className="h-36 w-36 rounded-xl object-cover border border-slate-100"
          />
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-slate-500">微信号：</span>
              <span className="font-mono font-medium text-slate-900">successful_023562</span>
            </div>
            <p className="text-xs text-slate-400">添加时请备注：考试名称</p>
          </div>
        </div>
      </div>

      {/* 微信群 */}
      <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-slate-900">微信交流群</div>
            <div className="text-sm text-slate-500">扫码加入备考交流群</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="/wechat-group.jpg"
            alt="微信群二维码"
            className="h-36 w-36 rounded-xl object-cover border border-slate-100"
          />
          <div className="text-xs text-slate-400">
            定期分享<br />备考资料<br />和最新资讯
          </div>
        </div>
      </div>

      {/* QQ区域 */}
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-slate-900">QQ交流群</div>
            <div className="text-sm text-slate-500">扫码加入获取最新资源</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="/qq-group.jpg"
            alt="QQ群二维码"
            className="h-36 w-36 rounded-xl object-cover border border-slate-100"
          />
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-slate-500">QQ号：</span>
              <span className="font-mono font-medium text-slate-900">2788834675</span>
            </div>
            <div>
              <span className="text-slate-500">邮箱：</span>
              <span className="font-mono font-medium text-slate-900">2788834675@qq.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* 购买保障 — 仅收费模式下显示 */}
      {ENABLE_PRICING && (
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium text-slate-700">购买保障</span>
        </div>
        <div className="space-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-3 w-3 text-slate-400" />
            付款后24小时内开通会员权限
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-3 w-3 text-slate-400" />
            7天内未使用可无条件退款
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-3 w-3 text-slate-400" />
            资料持续更新，会员期内免费获取
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
