export type Resource = {
  title: string;
  url: string;
  description?: string;
  category?: string;
};

// 在对应数组中添加 {title: '名称', url: 'https://...', description: '说明'}。
export const publicAccounts: Resource[] = [
  {title: '公众号资源 01', url: 'https://mp.weixin.qq.com/s/WWzm2QDbrCTW1hlILN0XKA', category: '有关彩虹色'},
  {title: '公众号资源 02', url: 'https://mp.weixin.qq.com/s/mxY8Q1xXixvN3OWYHWehkg', category: '有关彩虹色'},
];
export const webTools: Resource[] = [];
