import type { Resource, LearningMethod, Teacher, PricingTier, Topic } from '@/types';

export const kaoyanResources: Resource[] = [
  {
    id: 'kaoyan-paper-2025-english',
    examId: 'kaoyan',
    type: 'paper',
    title: '2025年考研英语（一）真题及详解',
    description: '最新考研英语（一）真题，含完形、阅读、新题型、翻译和写作。PDF资源整理中，敬请期待。',
    year: 2025,
    tags: ['英语一', '完形', '阅读', '写作'],
    status: 'free',
    viewCount: 18600,
    downloadCount: 14200,
    fileSize: '4.2MB',
    pageCount: 18,
    isHot: true,
    isNew: true,
    createdAt: '2025-01-05',
  },
  {
    id: 'kaoyan-paper-2025-politics',
    examId: 'kaoyan',
    type: 'paper',
    title: '2025年考研政治真题及详解',
    description: '含单选题、多选题和分析题完整真题及权威答案解析。PDF资源整理中，敬请期待。',
    year: 2025,
    tags: ['政治', '选择题', '分析题'],
    status: 'free',
    viewCount: 16500,
    downloadCount: 12800,
    fileSize: '3.8MB',
    pageCount: 16,
    isHot: true,
    isNew: true,
    createdAt: '2025-01-05',
  },
  {
    id: 'kaoyan-paper-2024-english',
    examId: 'kaoyan',
    type: 'paper',
    title: '2024年考研英语（一）真题合集',
    description: '包含英语（一）和英语（二）两套完整试卷及答案。PDF资源整理中，敬请期待。',
    year: 2024,
    tags: ['英语一', '英语二', '完形', '阅读'],
    status: 'member',
    price: 15.9,
    viewCount: 13500,
    downloadCount: 9800,
    fileSize: '7.5MB',
    pageCount: 36,
    isHot: false,
    isNew: false,
    createdAt: '2024-01-05',
  },
];

export const kaoyanMethods: LearningMethod[] = [
  {
    id: 'kaoyan-method-english-reading',
    examId: 'kaoyan',
    title: '考研英语阅读理解40分攻略：从错一半到只错2个',
    summary: '系统讲解考研英语阅读六大题型的解题逻辑，配合真题精读训练计划。',
    content: `## 考研英语阅读的地位

阅读理解占考研英语总分40%（40分），是决定能否过线的关键板块。

## 六大题型解题逻辑

### 1. 主旨大意题
- 标志词：mainly about, best title, subject
- 解题方法：重点看文章首段、各段首句、末段
- 注意：不要被细节迷惑

### 2. 细节事实题（最高频，约占50%）
- 解题方法：题干关键词回文定位 → 定位句+前后各一句 → 对比选项
- 常见陷阱：偷换概念、过度推理、以偏概全

### 3. 推理判断题
- 注意：推理≠凭空猜测，必须是基于原文的合理推断
- 方法：排除法 + 正反对比

### 4. 词义猜测题
- 方法：看上下文逻辑关系（转折/并列/因果）推断词义

### 5. 观点态度题
- 积累态度词：positive, negative, skeptical, objective...

### 6. 例证题
- 方法：例子是为观点服务的，答案在例子前后的论点句中

## 精读训练法
每天1篇阅读，完成：
1. 18分钟内做完全部5题
2. 对答案，分析每道题的错误原因
3. 逐句翻译全文，标注生词和长难句
4. 总结文章结构和出题规律`,
    category: 'english',
    tags: ['英语', '阅读', '题型', '精读'],
    author: '考研教研组',
  },
  {
    id: 'kaoyan-method-politics',
    examId: 'kaoyan',
    title: '考研政治80分复习路线图：马原+毛中特+史纲+思修',
    summary: '四阶段复习法 + 各模块分值占比分析，合理分配复习时间，高效冲击80+。',
    content: `## 考研政治试卷结构

| 模块 | 单选 | 多选 | 分析 | 总分 |
|------|------|------|------|------|
| 马原 | 4题 | 5题 | 1题 | 24分 |
| 毛中特 | 4题 | 5题 | 1题 | 24分 |
| 史纲 | 4题 | 3题 | 1题 | 20分 |
| 思修法基 | 2题 | 2题 | 1题 | 16分 |
| 时政 | 2题 | 2题 | 1题 | 16分 |

## 四阶段复习法

### 第一阶段：基础（7-8月）
- 通读教材，建立知识框架
- 重点：马原哲学部分理解、史纲时间线梳理

### 第二阶段：强化（9-10月）
- 配合习题集练习，重点刷选择题
- 目标：选择题正确率达到75%+

### 第三阶段：冲刺（11月）
- 开始背诵分析题考点
- 肖秀荣八套卷 + 其他名师模拟卷

### 第四阶段：押题（12月）
- 肖秀荣四套卷背诵（重中之重！）
- 梳理时政热点，回顾错题`,
    category: 'politics',
    tags: ['政治', '马原', '毛中特', '复习规划'],
    author: '考研教研组',
  },
];

export const kaoyanTeachers: Teacher[] = [
  {
    id: 'kaoyan-teacher-1',
    examId: 'kaoyan',
    name: '肖秀荣',
    description: '考研政治第一人，考研学子人手一本的肖四肖八作者，押题命中率极高，教材体系完整。',
    specialty: ['政治', '押题', '教材'],
    platform: '各大书店有售',
    link: 'https://www.kaoyan.com',
    courseCount: 4,
    studentCount: 5000000,
  },
  {
    id: 'kaoyan-teacher-2',
    examId: 'kaoyan',
    name: '唐迟',
    description: '考研英语阅读名师，"慢慢来比较快"理念深入人心，阅读逻辑课程深受考研学生信赖。',
    specialty: ['英语阅读', '长难句'],
    platform: '有道精品课',
    link: 'https://ke.youdao.com',
    courseCount: 10,
    studentCount: 2000000,
  },
  {
    id: 'kaoyan-teacher-3',
    examId: 'kaoyan',
    name: '张宇',
    description: '考研数学名师，讲课风格激情幽默，高数十八讲系列教材学霸必备。',
    specialty: ['数学', '高数', '线代'],
    platform: '爱启航',
    link: 'https://www.iqihang.com',
    courseCount: 15,
    studentCount: 1500000,
  },
];

export const kaoyanPricing: PricingTier[] = [
  {
    id: 'kaoyan-free',
    examId: 'kaoyan',
    name: '免费专区',
    price: 0,
    periodLabel: '',
    description: '零成本获取考研基础资料',
    includes: ['近2年公共课真题免费下载', '部分学习方法文章', '考试信息汇总'],
    isPopular: false,
    color: 'slate',
  },
  {
    id: 'kaoyan-member',
    examId: 'kaoyan',
    name: '标准会员',
    price: 49.9,
    originalPrice: 69.9,
    periodLabel: '/年',
    description: '适合全程备考的考研学子',
    includes: ['近10年公共课真题+解析', '全部学习方法深度文章', '名师课程推荐合集', '专业课资料索引', '月度复习规划模板', '微信备考群互助'],
    isPopular: true,
    color: 'violet',
  },
  {
    id: 'kaoyan-premium',
    examId: 'kaoyan',
    name: '高级会员',
    price: 89.9,
    originalPrice: 119.9,
    periodLabel: '/全程',
    description: '从初试到复试全程护航',
    includes: ['标准会员全部权益', '复试备考资料包', '一对一择校咨询', '作文批改服务（5篇）', '考前密押卷', '名师正价课85折券'],
    isPopular: false,
    color: 'amber',
  },
];

export const kaoyanTopics: Topic[] = [
  {
    id: 'kaoyan-topic-sprint',
    title: '考研百日冲刺专题',
    description: '最后100天高强度冲刺方案，英语+政治+数学系统突破计划。',
    examId: 'kaoyan',
    resourceIds: ['kaoyan-paper-2025-english', 'kaoyan-paper-2025-politics', 'kaoyan-method-english-reading', 'kaoyan-method-politics'],
    isActive: true,
  },
];
