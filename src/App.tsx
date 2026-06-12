import { Routes, Route, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Sidebar from '@/components/layout/Sidebar';
import type { ResourceType, ResourceStatus } from '@/types';
import { examModules } from '@/data/exams';
import { useFilter } from '@/hooks/useFilter';
import { cet4Resources } from '@/data/cet4';
import { cet6Resources } from '@/data/cet6';
import { kaoyanResources } from '@/data/kaoyan';
import { gongkaoResources } from '@/data/gongkao';
import type { Resource } from '@/types';

// Pages
import HomePage from '@/pages/HomePage';
import ExamHomePage from '@/pages/ExamHomePage';
import PapersPage from '@/pages/PapersPage';
import MethodsPage from '@/pages/MethodsPage';
import TeachersPage from '@/pages/TeachersPage';
import PricingPage from '@/pages/PricingPage';
import { ENABLE_PRICING } from '@/config/features';
import PaperViewPage from '@/pages/PaperViewPage';
import MethodDetailPage from '@/pages/MethodDetailPage';
import TopicPage from '@/pages/TopicPage';
import SearchResultPage from '@/pages/SearchResultPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

const allResourcesMap: Record<string, Resource[]> = {
  cet4: cet4Resources,
  cet6: cet6Resources,
  kaoyan: kaoyanResources,
  gongkao: gongkaoResources,
};

/** 带左侧筛选面板的考试页面布局 */
function ExamLayout() {
  const { examId } = useParams<{ examId: string }>();
  const exam = examModules.find((e) => e.id === examId);
  const resources = examId ? allResourcesMap[examId] || [] : [];

  const { filter, updateFilter, availableYears } = useFilter(resources);

  if (!exam) {
    return <Layout />;
  }

  const sidebar = (
    <Sidebar
      examModule={exam}
      selectedType={filter.resourceType as ResourceType | 'all'}
      selectedYear={filter.year}
      selectedStatus={filter.status as ResourceStatus | 'all'}
      selectedCategory={filter.category}
      availableYears={availableYears}
      onTypeChange={(resourceType) => updateFilter({ resourceType, page: 1 })}
      onYearChange={(year) => updateFilter({ year, page: 1 })}
      onStatusChange={(status) => updateFilter({ status, page: 1 })}
      onCategoryChange={(category) => updateFilter({ category, page: 1 })}
    />
  );

  return <Layout sidebar={sidebar} />;
}

export default function App() {
  return (
    <Routes>
      {/* 登录/注册 - 独立全屏布局，必须放在最前面优先匹配 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 首页 - 无侧边栏 */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* 联系页 - 无侧边栏 */}
      <Route element={<Layout />}>
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* 搜索结果页 - 无侧边栏 */}
      <Route element={<Layout />}>
        <Route path="/search" element={<SearchResultPage />} />
      </Route>

      {/* 考试模块页 - 带左侧筛选面板 */}
      <Route element={<ExamLayout />}>
        <Route path="/exam/:examId" element={<ExamHomePage />} />
        <Route path="/exam/:examId/papers" element={<PapersPage />} />
        <Route path="/exam/:examId/methods" element={<MethodsPage />} />
        <Route path="/exam/:examId/teachers" element={<TeachersPage />} />
        {ENABLE_PRICING && <Route path="/exam/:examId/pricing" element={<PricingPage />} />}
        <Route path="/exam/:examId/paper/:paperId" element={<PaperViewPage />} />
        <Route path="/exam/:examId/method/:methodId" element={<MethodDetailPage />} />
      </Route>

      {/* 专题页 - 无侧边栏 */}
      <Route element={<Layout />}>
        <Route path="/topic/:topicId" element={<TopicPage />} />
      </Route>
    </Routes>
  );
}
