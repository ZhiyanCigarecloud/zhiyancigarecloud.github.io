import assert from 'node:assert/strict';
import {test} from 'node:test';
import {paginate} from '../src/utils/pagination.ts';

test('每页最多七篇，跨页没有遗漏或重复', () => {
  for (const count of [0, 1, 7, 8, 14, 15, 70]) {
    const articles = Array.from({length: count}, (_, index) => index + 1);
    const pages = Math.max(1, Math.ceil(count / 7));
    const collected = [];
    for (let page = 1; page <= pages; page++) {
      const result = paginate(articles, String(page));
      assert.equal(result.totalPages, pages);
      assert.equal(result.page, page);
      assert.ok(result.items.length <= 7);
      collected.push(...result.items);
    }
    assert.deepEqual(collected, articles);
  }
});

test('缺失、非法或越界的页码仍显示有效目录', () => {
  const articles = Array.from({length: 15}, (_, index) => index);
  for (const query of [null, '', '0', '-1', '1.5', 'abc', 'Infinity', '999999999999999999']) {
    assert.equal(paginate(articles, query).page, 1);
  }
  assert.deepEqual(paginate(articles, '999').items, [14]);
  assert.equal(paginate([], '999').page, 1);
});
