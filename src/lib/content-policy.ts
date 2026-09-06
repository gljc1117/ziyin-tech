// These entries originated as seed/demo copy, without an approved source dossier.
// Keep the original database and git history intact; restore display after review.
const pendingNewsTitles = new Set([
  "子殷科技完成数字骨科平台核心模块开发",
  "与内蒙古医科大学附属医院达成临床合作",
  "子殷科技官网正式上线",
]);
const pendingCaseTitles = new Set([
  "股骨远端骨折个性化接骨板",
  "宫颈癌后装放疗个体化施源器",
  "胫骨平台骨折手术导板",
]);
export function canDisplayNews(item: { title: string }) { return !pendingNewsTitles.has(item.title); }
export function canDisplayCase(item: { title: string }) { return !pendingCaseTitles.has(item.title); }
