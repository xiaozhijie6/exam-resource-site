/**
 * 功能开关 —— 统一控制收费/会员相关功能的显隐。
 * 关闭后：所有资源视为免费、无会员标签、无价格展示、无定价页。
 * 上线收款时改为 true 即可一键恢复。
 */
export const ENABLE_PRICING = false;

/** 根据开关返回实际 status：关闭后所有资源都是 free */
export function effectiveStatus(status: string): string {
  return ENABLE_PRICING ? status : 'free';
}
