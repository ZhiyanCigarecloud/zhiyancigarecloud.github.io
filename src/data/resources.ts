export type Resource = {
  title: string;
  url: string;
  description?: string;
};

// 在对应数组中添加 {title: '名称', url: 'https://...', description: '说明'}。
export const publicAccounts: Resource[] = [];
export const webTools: Resource[] = [];
