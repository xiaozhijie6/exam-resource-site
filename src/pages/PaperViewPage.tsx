import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, FileText, Download, Clock, AlertCircle } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import PDFViewer from '@/components/common/PDFViewer';
import Badge from '@/components/common/Badge';
import ResourceCard from '@/components/resource/ResourceCard';
import { ResourceStatusLabel } from '@/types';
import type { Resource } from '@/types';
import { ENABLE_PRICING } from '@/config/features';
import { examModules } from '@/data/exams';
import { cet4Resources } from '@/data/cet4';
import { cet6Resources } from '@/data/cet6';
import { kaoyanResources } from '@/data/kaoyan';
import { gongkaoResources } from '@/data/gongkao';

const allResourcesMap: Record<string, Resource[]> = {
  cet4: cet4Resources,
  cet6: cet6Resources,
  kaoyan: kaoyanResources,
  gongkao: gongkaoResources,
};

export default function PaperViewPage() {
  const { examId, paperId } = useParams<{ examId: string; paperId: string }>();
  const exam = examModules.find((e) => e.id === examId);
  const allResources = examId ? allResourcesMap[examId] || [] : [];
  const paper = allResources.find((r) => r.id === paperId);

  const relatedPapers = allResources
    .filter((r) => r.id !== paperId && (r.type === 'paper' || r.type === 'answer'))
    .slice(0, 4);

  if (!exam || !paper) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <FileText className="h-16 w-16 text-slate-200 mb-4" />
        <h2 className="text-xl font-bold text-slate-900">资源未找到</h2>
        <p className="text-slate-500 mt-1 mb-4">该资源可能已被移除或链接无效</p>
        <Link to={exam ? `/exam/${examId}` : '/'} className="text-academic-600 hover:underline">
          {exam ? `返回${exam.name}` : '返回首页'}
        </Link>
      </div>
    );
  }

  const statusVariant = paper.status === 'free' ? 'free' : paper.status === 'member' ? 'member' : 'premium';

  return (
    <>
      <Helmet>
        <title>{paper.title} — {exam.shortName} — Everyone is great</title>
        <meta name="description" content={paper.description} />
      </Helmet>

      <div className="space-y-8">
        <Breadcrumb items={[
          { label: exam.name, path: `/exam/${examId}` },
          { label: '历年真题', path: `/exam/${examId}/papers` },
          { label: paper.title },
        ]} />

        {/* 试卷信息卡 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {ENABLE_PRICING && <Badge variant={statusVariant}>{ResourceStatusLabel[paper.status]}</Badge>}
                {paper.isHot && <Badge variant="hot">热门</Badge>}
                {paper.isNew && <Badge variant="new">最新</Badge>}
              </div>
              <h1 className="text-xl font-bold text-slate-900 mb-2">{paper.title}</h1>
              <p className="text-slate-500 text-sm">{paper.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {paper.year}{paper.month ? `年${paper.month}月` : '年'}
            </span>
            {paper.fileSize && (
              <span className="flex items-center gap-1.5">
                <Download className="h-4 w-4" />
                {paper.fileSize}
              </span>
            )}
            {paper.pageCount && (
              <span className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                {paper.pageCount}页
              </span>
            )}
            <span className="font-medium text-emerald-600">免费</span>
          </div>
          {/* 标签 */}
          {paper.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {paper.tags.map((tag) => (
                <span key={tag} className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* PDF查看器 或 占位提示 */}
        {paper.pdfPath ? (
          <PDFViewer
            pdfPath={paper.pdfPath}
            answerPdfPath={paper.answerPdfPath}
            title={paper.title}
            status={paper.status}
            examId={examId!}
          />
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h2 className="font-medium text-slate-900">试卷预览</h2>
            </div>
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-50">
              <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-5">
                <Clock className="h-10 w-10 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">PDF资源整理中</h3>
              <p className="text-sm text-slate-500 text-center max-w-md mb-6">
                该试卷的PDF文件正在整理上传中，我们会尽快更新。如需获取此套真题，请联系客服获取最新资源状态。
              </p>
              <div className="flex items-center gap-3">
                {ENABLE_PRICING && (
                  <Link
                    to={`/exam/${examId}/pricing`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-academic-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-academic-700 transition-colors"
                  >
                    查看会员方案
                  </Link>
                )}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  联系客服
                </Link>
              </div>
              {ENABLE_PRICING && paper.status === 'member' && (
                <div className="flex items-start gap-2 mt-5 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <div className="text-amber-700">
                    <span className="font-medium">会员专享资源</span>
                    <span className="text-amber-600 ml-1">— 升级会员后可直接下载完整PDF及配套答案解析</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 相关推荐 */}
        {relatedPapers.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">相关试卷推荐</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedPapers.map((rp) => (
                <ResourceCard key={rp.id} resource={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
