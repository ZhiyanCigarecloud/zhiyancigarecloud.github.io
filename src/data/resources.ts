export type Resource = {
  title: string;
  url: string;
  description?: string;
  category?: string;
};

// 在对应数组中添加 {title: '名称', url: 'https://...', description: '说明'}。
export const webTools: Resource[] = [
  {title: 'Z-Library', category: '学习', url: 'https://zh.z-library.sk/', description: '电子书检索与阅读资源平台，可按书名、作者或关键词查找书籍。'},
  {title: 'Recraft', category: '生活', url: 'https://www.recraft.ai/', description: 'AI 视觉创作工具，用于生成和编辑图片、插画与设计素材。'},
  {title: 'AMiner', category: '学习', url: 'https://www.aminer.cn/', description: '学术搜索与科研信息平台，可检索论文、查找学者并追踪研究动态。'},
  {title: '菜鸟教程', category: '学习', url: 'https://www.runoob.com/', description: '中文编程学习网站，提供多种编程语言、网页开发与数据库教程和示例。'},
];
