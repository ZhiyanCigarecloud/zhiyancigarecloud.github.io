export type Resource = {
  title: string;
  url: string;
  description?: string;
  category?: string;
};

// 在对应数组中添加 {title: '名称', url: 'https://...', description: '说明'}。
export const webTools: Resource[] = [];
