import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-semibold prose-a:text-academic-600 prose-a:no-underline hover:prose-a:underline prose-table:border-collapse prose-table:w-full prose-th:bg-slate-50 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-td:px-4 prose-td:py-2 prose-td:border-b prose-td:border-slate-100">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
