/**
 * CET 四六级捆绑会员 — 一次付费，四级+六级全部资源通用
 *
 * 这是面向用户的定价方案：一个标准会员即可解锁全部
 * CET-4 和 CET-6 真题（近5年）、学习方法、名师推荐、考前冲刺专题。
 */
import type { PricingTier } from '@/types';

export const cetPricing: PricingTier[] = [
  {
    id: 'cet-free',
    examId: 'cet',
    name: '免费专区',
    price: 0,
    periodLabel: '',
    description: '零成本体验四六级备考',
    includes: [
      '四级+六级最近2次真题免费下载',
      '部分学习方法文章',
      '备考规划建议',
      '考试大纲解读',
    ],
    isPopular: false,
    color: 'slate',
  },
  {
    id: 'cet-member',
    examId: 'cet',
    name: '四六级标准会员',
    price: 49.9,
    originalPrice: 69.9,
    periodLabel: '/年',
    description: '一次性解锁四级+六级全部资源，性价比最高的备考方案',
    includes: [
      '四级+六级近5年全部真题+解析（共60+套）',
      '全部学习方法深度文章',
      '名师课程推荐合集',
      '四级+六级考前冲刺专题',
      '专属学习计划定制',
      'VIP微信学习群答疑+互助',
    ],
    isPopular: true,
    color: 'emerald',
  },
  {
    id: 'cet-premium',
    examId: 'cet',
    name: '四六级高级会员',
    price: 79.9,
    originalPrice: 109.9,
    periodLabel: '/年',
    description: '冲击600+高分的全面备考方案',
    includes: [
      '标准会员全部权益（四级+六级）',
      '近10年全部真题合集',
      '一对一备考规划咨询（2次）',
      '作文批改服务（四级3篇 + 六级3篇）',
      '独家预测卷 + 考前密押',
      '名师正价课折扣券',
    ],
    isPopular: false,
    color: 'amber',
  },
];
