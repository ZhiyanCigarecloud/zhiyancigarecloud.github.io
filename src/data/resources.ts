export type Resource = {
  title: string;
  url: string;
  description?: string;
  category?: string;
};

// 在对应数组中添加 {title: '名称', url: 'https://...', description: '说明'}。
export const webTools: Resource[] = [
  {title: 'Z-Library', category: '学习', url: 'https://zh.z-library.sk/', description: '电子书检索与阅读资源平台。'},
  {title: 'Recraft', category: '生活', url: 'https://www.recraft.ai/', description: 'AI 视觉创作工具。'},
  {title: 'AMiner', category: '学习', url: 'https://www.aminer.cn/', description: '学术搜索与科研信息平台。'},
  {title: '菜鸟教程', category: '学习', url: 'https://www.runoob.com/', description: '中文编程学习网站。'},
  {title: 'QueerEcho', category: '生活', url: 'https://queerecho.com/?tab=related', description: '一个LGBTQ社群论坛'},
];
