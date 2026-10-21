export const PAGE_SIZE = 7;

export function paginate<T>(items: readonly T[], requestedPage: string | null) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const parsed = Number(requestedPage);
  const page = Math.min(totalPages, Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1);
  return {page, totalPages, items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)};
}
