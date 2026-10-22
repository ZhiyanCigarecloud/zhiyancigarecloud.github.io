export type Resource = {
  title: string;
  url: string;
  description?: string;
  category?: string;
};

// 在对应数组中添加 {title: '名称', url: 'https://...', description: '说明'}。
export const webTools: Resource[] = [
  {title: 'Z-Library', url: 'https://zh.z-library.sk/', description: '电子书检索与阅读资源平台，可按书名、作者或关键词查找书籍。'},
];
