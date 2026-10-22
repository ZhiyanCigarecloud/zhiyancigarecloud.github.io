export const hallCategories: Record<string, readonly string[]> = {
  wild: ['口琴谱'],
  amber: ['小说', '诗歌'],
  fragments: ['影评', '感悟', '游记'],
};

export function selectCategory<T extends {hall: string; category: string; specimen: string; date?: string}>(
  collections: readonly T[], hallId: string, requested: string | null,
) {
  const categories = hallCategories[hallId] || [];
  const category = requested && categories.includes(requested) ? requested : (categories[0] || '');
  const entries = collections.filter(item => item.hall === hallId && (!category || item.category === category))
    .sort((a, b) => (a.date || '').localeCompare(b.date || '') || a.specimen.localeCompare(b.specimen, 'zh-CN', {numeric: true}));
  return {categories, category, entries};
}
