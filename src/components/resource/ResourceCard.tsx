import { Link } from 'react-router-dom';
import { FileText, Download, Eye, CheckCircle, Lightbulb, Calendar, BookOpen } from 'lucide-react';
import type { Resource } from '@/types';
import { ResourceTypeLabel, ResourceStatusLabel } from '@/types';
import Badge from '@/components/common/Badge';
import { ENABLE_PRICING, effectiveStatus } from '@/config/features';

const typeIcons: Record<string, React.ReactNode> = {
  paper: <FileText className="h-4 w-4" />,
  answer: <CheckCircle className="h-4 w-4" />,
  method: <Lightbulb className="h-4 w-4" />,
  teacher: <Lightbulb className="h-4 w-4" />,
  plan: <Calendar className="h-4 w-4" />,
  guide: <BookOpen className="h-4 w-4" />,
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  const actualStatus = effectiveStatus(resource.status);
  const statusVariant = actualStatus === 'free' ? 'free' : actualStatus === 'member' ? 'member' : 'premium';

  const linkPath =
    resource.type === 'paper' || resource.type === 'answer'
      ? `/exam/${resource.examId}/paper/${resource.id}`
      : resource.type === 'method'
        ? `/exam/${resource.examId}/method/${resource.id}`
        : `/exam/${resource.examId}`;

  return (
    <Link to={linkPath} className="resource-card block">
      {/* 类型图标 + 标签 */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {typeIcons[resource.type] || <FileText className="h-4 w-4" />}
          {ResourceTypeLabel[resource.type]}
        </span>
        <div className="flex gap-1.5">
          {resource.isHot && <Badge variant="hot">热门</Badge>}
          {resource.isNew && <Badge variant="new">最新</Badge>}
          {ENABLE_PRICING && <Badge variant={statusVariant}>{ResourceStatusLabel[actualStatus]}</Badge>}
        </div>
      </div>

      {/* 标题 */}
      <h3 className="font-medium text-slate-900 mb-1.5 line-clamp-2 leading-snug">{resource.title}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{resource.description}</p>

      {/* 标签 */}
      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="inline-flex rounded-md bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 底部信息 */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {resource.year && (
            <span>
              {resource.year}{resource.month ? `.${String(resource.month).padStart(2, '0')}` : ''}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {resource.downloadCount >= 1000 ? `${(resource.downloadCount / 1000).toFixed(1)}k` : resource.downloadCount}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {resource.viewCount >= 1000 ? `${(resource.viewCount / 1000).toFixed(1)}k` : resource.viewCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {resource.fileSize && <span>{resource.fileSize}</span>}
          <span className="font-medium text-emerald-600">免费</span>
        </div>
      </div>
    </Link>
  );
}
