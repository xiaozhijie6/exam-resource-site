import { Link } from 'react-router-dom';
import { Download, Lock, Crown, Eye, ArrowRight } from 'lucide-react';
import type { ResourceStatus } from '@/types';
import { ENABLE_PRICING, effectiveStatus } from '@/config/features';

interface PDFViewerProps {
  pdfPath: string;
  answerPdfPath?: string;
  title: string;
  status: ResourceStatus;
  examId: string;
}

export default function PDFViewer({ pdfPath, answerPdfPath, title, status, examId }: PDFViewerProps) {
  const isFree = effectiveStatus(status) === 'free';

  return (
    <div className="space-y-6">
      {/* PDF 预览区 */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* 工具栏 */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-slate-400" />
            <h2 className="font-medium text-slate-900">
              试卷预览
              {!isFree && <span className="ml-2 text-xs text-amber-600 font-normal">（部分预览）</span>}
            </h2>
          </div>
          {isFree && (
            <a
              href={pdfPath}
              download
              className="inline-flex items-center gap-1.5 rounded-lg bg-academic-600 px-4 py-2 text-sm font-medium text-white hover:bg-academic-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              下载试卷
            </a>
          )}
        </div>

        {/* 桌面端：iframe 固定高度预览 */}
        <div className="relative bg-slate-100">
          <iframe
            src={`${pdfPath}#toolbar=0&navpanes=0`}
            title={title}
            className="hidden md:block w-full"
            style={{
              height: isFree ? 'calc(100vh - 200px)' : '400px',
              minHeight: isFree ? '600px' : '400px',
            }}
          />

          {/* 非免费资源的遮罩层 */}
          {!isFree && (
            <div className="hidden md:block absolute inset-x-0 bottom-0" style={{ height: '220px' }}>
              {/* 渐变遮罩 */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.95) 60%, white 100%)',
                }}
              />
              {/* CTA */}
              <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-6 px-4">
                <div className="flex items-center gap-1.5 text-amber-600 mb-2">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm font-medium">会员专享完整内容</span>
                </div>
                <p className="text-xs text-slate-400 mb-3 text-center">
                  以上为试卷预览，升级会员后可查看完整试卷并下载答案解析
                </p>
                <Link
                  to={`/exam/${examId}/pricing`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-medium text-white shadow-md hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  <Crown className="h-4 w-4" />
                  升级会员查看全部
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* 移动端提示 */}
          <div className="flex flex-col items-center justify-center p-12 md:hidden">
            {isFree ? (
              <>
                <Download className="h-12 w-12 text-slate-300 mb-4" />
                <p className="text-slate-500 text-center mb-4">移动端建议直接下载PDF查看</p>
                <a
                  href={pdfPath}
                  download
                  className="inline-flex items-center gap-2 rounded-xl bg-academic-600 px-6 py-3 font-medium text-white hover:bg-academic-700 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  下载试卷
                </a>
              </>
            ) : (
              <>
                <Lock className="h-12 w-12 text-amber-300 mb-4" />
                <p className="text-slate-600 font-medium mb-1">会员专享内容</p>
                <p className="text-slate-400 text-sm text-center mb-4">请在电脑端查看或升级会员</p>
                <Link
                  to={`/exam/${examId}/pricing`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-medium text-white"
                >
                  <Crown className="h-5 w-5" />
                  查看会员方案
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 免费资源答案提示 / 会员资源答案引导（收费关闭时不显示） */}
      {ENABLE_PRICING && isFree && !answerPdfPath && (
        <div className="flex items-center justify-between rounded-lg bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-start gap-2">
            <Lock className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">答案解析为会员专属</p>
              <p className="text-xs text-amber-600 mt-0.5">升级会员即可获取详细答案解析、听力原文和翻译参考</p>
            </div>
          </div>
          <Link
            to={`/exam/${examId}/pricing`}
            className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
          >
            <Crown className="h-3.5 w-3.5" />
            查看会员方案
          </Link>
        </div>
      )}

      {/* 已有答案PDF时显示下载 */}
      {answerPdfPath && (
        <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 p-4">
          <div className="flex items-start gap-2">
            <Download className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-emerald-800">答案解析可下载</p>
              <p className="text-xs text-emerald-600 mt-0.5">配套答案解析PDF，助你吃透每一道题</p>
            </div>
          </div>
          <a
            href={answerPdfPath}
            download
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            下载答案
          </a>
        </div>
      )}
    </div>
  );
}
