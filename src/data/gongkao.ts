import type { Resource, LearningMethod, Teacher, PricingTier, Topic } from '@/types';

export const gongkaoResources: Resource[] = [
  {
    id: 'gongkao-paper-2025-national',
    examId: 'gongkao',
    type: 'paper',
    title: '2025年国家公务员考试行测真题及详解',
    description: '最新国考行测真题，含常识判断、言语理解、数量关系、判断推理、资料分析五大模块。PDF资源整理中，敬请期待。',
    year: 2025,
    tags: ['行测', '常识判断', '言语', '数量', '判断', '资料'],
    status: 'free',
    viewCount: 22500,
    downloadCount: 16800,
    fileSize: '5.8MB',
    pageCount: 24,
    isHot: true,
    isNew: true,
    createdAt: '2025-01-10',
  },
  {
    id: 'gongkao-paper-2025-shenlun',
    examId: 'gongkao',
    type: 'paper',
    title: '2025年国家公务员考试申论真题及范文',
    description: '国考申论真题，含材料原文、题目要求和多篇高分范文参考。PDF资源整理中，敬请期待。',
    year: 2025,
    tags: ['申论', '范文', '写作'],
    status: 'free',
    viewCount: 19500,
    downloadCount: 14200,
    fileSize: '2.5MB',
    pageCount: 16,
    isHot: true,
    isNew: true,
    createdAt: '2025-01-10',
  },
  {
    id: 'gongkao-paper-2024-national',
    examId: 'gongkao',
    type: 'paper',
    title: '2024年国考行测+申论全套真题合集',
    description: '2024年国考完整真题套装，含行测详解和申论范文。PDF资源整理中，敬请期待。',
    year: 2024,
    tags: ['行测', '申论', '国考'],
    status: 'member',
    price: 12.9,
    viewCount: 15800,
    downloadCount: 11200,
    fileSize: '8.2MB',
    pageCount: 40,
    isHot: false,
    isNew: false,
    createdAt: '2024-01-10',
  },
];

export const gongkaoMethods: LearningMethod[] = [
  {
    id: 'gongkao-method-xingce',
    examId: 'gongkao',
    title: '行测80分备考方法论：五大模块高效复习策略',
    summary: '详细拆解行测五大模块的复习优先级、时间分配和解题技巧，帮助在职备考和全职备考的同学找到最高效的提分路径。',
    content: `## 行测模块分值占比与复习优先级

| 模块 | 题量 | 建议正确率 | 优先级 |
|------|------|-----------|--------|
| 资料分析 | 20题 | 90%+ | ★★★★★ |
| 判断推理 | 40题 | 80%+ | ★★★★ |
| 言语理解 | 40题 | 80%+ | ★★★★ |
| 常识判断 | 20题 | 60%+ | ★★ |
| 数量关系 | 10-15题 | 50%+ | ★★★ |

## 各模块核心策略

### 资料分析（最重要！）
- **目标**：20题争取全对，最多错1-2题
- **核心能力**：速算技巧（截位直除、特征数字、比较技巧）
- **训练量**：每天4篇共20题，限时25分钟
- **提速秘诀**：先看问题再找数据，避免通读材料

### 判断推理
- **图形推理**：熟记六大规律（位置、样式、属性、数量、空间、组合）
- **逻辑判断**：掌握加强/削弱题型套路
- **定义判断**：关键词匹配法
- **类比推理**：词项关系图谱

### 言语理解
- **逻辑填空**：语境分析 > 语感
- **片段阅读**：抓主旨句 + 转折词
- **语句排序**：首句排除法 + 关联词捆绑

### 数量关系
- 10题中选择5-6道自己擅长的题型
- 保底题型：工程问题、行程问题、利润问题、排列组合

### 常识判断
- 性价比最低，不建议花大量时间
- 利用碎片时间积累即可`,
    category: 'xingce',
    tags: ['行测', '五大模块', '策略', '公考'],
    author: '考公教研组',
  },
  {
    id: 'gongkao-method-shenlun',
    examId: 'gongkao',
    title: '申论高分秘籍：从60分到75分的跨越',
    summary: '申论提分的核心不在于"写得多"而在于"写得对"，本文带你理解阅卷人的评分逻辑。',
    content: `## 申论评分核心逻辑

阅卷老师看什么？（按重要性排序）
1. **要点全不全** — 踩点给分，漏点扣分（最重要！）
2. **条理清不清** — 是否分类准确、层次分明
3. **语言规范不规范** — 是否符合公文写作规范
4. **字迹工整不工整** — 印象分

## 归纳概括题（必考题）
- 核心方法：**划关键词 → 归类合并 → 提炼小标题**
- 常见分类维度：主体法（政府/企业/个人）、领域法（政治/经济/文化）、要素法（问题/原因/对策）

## 提出对策题
- 对策来源：材料中直接提取 + 根据问题进行反推
- 万能对策框架：制度层面 + 执行层面 + 监督层面 + 宣传层面

## 综合分析题
- 答题模板：表态 → 分析原因/影响 → 提出对策

## 大作文（40分）
- **五段三分式**：开头(亮观点) + 三个分论点段 + 结尾(升华)
- 分论点来源：优先从给定材料中提取
- 素材积累：习近平新时代中国特色社会主义思想核心概念`,
    category: 'shenlun',
    tags: ['申论', '写作', '归纳概括', '大作文'],
    author: '考公教研组',
  },
];

export const gongkaoTeachers: Teacher[] = [
  {
    id: 'gongkao-teacher-1',
    examId: 'gongkao',
    name: '花生十三',
    description: '行测资料分析第一人，独创的速算体系和概念拆解让无数考生资料分析实现全对。',
    specialty: ['行测', '资料分析', '数量关系'],
    platform: 'CCtalk',
    link: 'https://www.cctalk.com',
    courseCount: 6,
    studentCount: 800000,
  },
  {
    id: 'gongkao-teacher-2',
    examId: 'gongkao',
    name: '站长申论',
    description: '申论培训领域的标杆，授课体系完整，从基础到冲刺全覆盖，学员上岸率极高。',
    specialty: ['申论', '大作文'],
    platform: 'CCtalk',
    link: 'https://www.cctalk.com',
    courseCount: 5,
    studentCount: 600000,
  },
  {
    id: 'gongkao-teacher-3',
    examId: 'gongkao',
    name: '粉笔公考',
    description: '粉笔公考系统班，线上刷题+直播课双结合模式，配套APP题库体验优秀。',
    specialty: ['全科', '行测', '申论'],
    platform: '粉笔',
    link: 'https://www.fenbi.com',
    courseCount: 20,
    studentCount: 3000000,
  },
];

export const gongkaoPricing: PricingTier[] = [
  {
    id: 'gongkao-free',
    examId: 'gongkao',
    name: '免费专区',
    price: 0,
    periodLabel: '',
    description: '零成本获取基础备考资料',
    includes: ['近2年国考真题免费下载', '部分学习方法文章', '考试信息汇总'],
    isPopular: false,
    color: 'slate',
  },
  {
    id: 'gongkao-member',
    examId: 'gongkao',
    name: '标准会员',
    price: 39.9,
    originalPrice: 59.9,
    periodLabel: '/年',
    description: '适合国考/省考同步备考',
    includes: ['近5年国考+省考真题合集', '全部学习方法深度文章', '名师课程推荐合集', '申论范文库（100+篇）', '时政热点月度整理', '微信备考群互助'],
    isPopular: true,
    color: 'amber',
  },
  {
    id: 'gongkao-premium',
    examId: 'gongkao',
    name: '高级会员',
    price: 69.9,
    originalPrice: 99.9,
    periodLabel: '/全程',
    description: '从笔试到面试全程保障',
    includes: ['标准会员全部权益', '面试备考资料包', '申论人工批改（3篇）', '行测模考+排名分析', '岗位报考指导', '名师正价课9折券'],
    isPopular: false,
    color: 'orange',
  },
];

export const gongkaoTopics: Topic[] = [
  {
    id: 'gongkao-topic-sprint',
    title: '国考倒计时60天冲刺专题',
    description: '行测五大模块冲刺计划 + 申论热点话题预测，最后60天高效抢分。',
    examId: 'gongkao',
    resourceIds: ['gongkao-paper-2025-national', 'gongkao-method-xingce', 'gongkao-method-shenlun'],
    isActive: true,
  },
];
