export const updated = '2026-10-21';
export const curator = '一只叫纸烟的恐龙。你可以在这里找到有关我的一切。';

export const halls = [
  {id: 'strata', title: '地层馆', subject: '课内学习', description: '有如西西弗斯推石上山的课内学习', href: '/strata/'},
  {id: 'wild', title: '野外馆', subject: '课外探索', description: '全凭一腔热血挥洒兴趣的课外探索', href: '/wild/'},
  {id: 'amber', title: '琥珀馆', subject: '小说诗歌', description: '实则顾影自怜自娱自乐的小说诗歌', href: '/amber/'},
  {id: 'fragments', title: '碎屑馆', subject: '杂谈感悟', description: '偶尔闲暇写就吐槽揶揄的杂谈感悟', href: '/fragments/'},
] as const;
export type HallId = typeof halls[number]['id'];

// 等馆长提供专用文案后再启用，空数组时不展示组件或占位。
export const tips: {text: string; date: string}[] = [];

// 收到 GIF 后填入以 / 开头的地址和单次播放时长。计时从图片加载完成后开始。
// GIF 无 ended 事件，需要按素材的实际帧时长填写 durationMs。
export const entrance: {src: string | null; durationMs: number} = {src: null, durationMs: 0};
