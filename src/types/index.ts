// ====== 资源类型枚举 ======
export type ResourceType = 'paper' | 'answer' | 'method' | 'teacher' | 'plan' | 'guide';

export const ResourceTypeLabel: Record<ResourceType, string> = {
  paper: '真题试卷',
  answer: '答案解析',
  method: '学习方法',
  teacher: '名师推荐',
  plan: '备考规划',
  guide: '考试指南',
};

export const ResourceTypeIcon: Record<ResourceType, string> = {
  paper: 'FileText',
  answer: 'CheckCircle',
  method: 'Lightbulb',
  teacher: 'GraduationCap',
  plan: 'Calendar',
  guide: 'BookOpen',
};

// ====== 资源状态 ======
export type ResourceStatus = 'free' | 'member' | 'premium';

export const ResourceStatusLabel: Record<ResourceStatus, string> = {
  free: '免费',
  member: '会员专享',
  premium: '付费精品',
};

// ====== 考试ID ======
export type ExamId = 'cet4' | 'cet6' | 'cet' | 'kaoyan' | 'gongkao';

// ====== 单个资源（核心实体） ======
export interface Resource {
  id: string;
  examId: ExamId;
  type: ResourceType;
  title: string;
  description: string;
  year: number;
  month?: number;
  tags: string[];
  pdfPath?: string;
  answerPdfPath?: string;
  status: ResourceStatus;
  price?: number;
  viewCount: number;
  downloadCount: number;
  fileSize?: string;
  pageCount?: number;
  isHot: boolean;
  isNew: boolean;
  createdAt: string;
}

// ====== 学习方法 ======
export interface LearningMethod {
  id: string;
  examId: ExamId;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  author?: string;
}

// ====== 名师推荐 ======
export interface Teacher {
  id: string;
  examId: ExamId;
  name: string;
  avatar?: string;
  description: string;
  specialty: string[];
  platform: string;
  platformIcon?: string;
  link: string;
  courseCount: number;
  studentCount: number;
}

// ====== 会员定价 ======
export interface PricingTier {
  id: string;
  examId: ExamId;
  name: string;
  price: number;
  originalPrice?: number;
  periodLabel: string;
  description: string;
  includes: string[];
  isPopular: boolean;
  color: string;
}

// ====== 专题 ======
export interface Topic {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  examId: ExamId;
  resourceIds: string[];
  isActive: boolean;
}

// ====== 考试模块 ======
export interface ExamModule {
  id: ExamId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  examInfo: {
    organizer: string;
    frequency: string;
    sections: string[];
    totalScore: number;
    registrationTime?: string;
    examDate?: string;
  };
  subCategories: {
    name: string;
    key: string;
    icon: string;
  }[];
  stats: {
    totalResources: number;
    freeResources: number;
    memberCount: number;
  };
}

// ====== 筛选状态 ======
export interface FilterState {
  examId: ExamId | null;
  resourceType: ResourceType | 'all';
  year: number | 'all';
  status: ResourceStatus | 'all';
  category: string;
  sort: 'newest' | 'popular' | 'free';
  search: string;
  page: number;
  pageSize: number;
}

// ====== 搜索参数 ======
export interface SearchParams {
  q: string;
  examId?: ExamId;
  type?: ResourceType | 'all';
}
