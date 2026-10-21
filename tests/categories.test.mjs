import assert from 'node:assert/strict';
import {test} from 'node:test';
import {selectCategory} from '../src/utils/categories.ts';
import {paginate} from '../src/utils/pagination.ts';

test('分类仅展示同馆对应文章，未指定或无效分类时选中第一个分类', () => {
  const entries = [
    {hall:'amber',category:'诗歌',specimen:'10'},
    {hall:'fragments',category:'感悟',specimen:'1'},
    {hall:'amber',category:'小说',specimen:'3'},
    {hall:'amber',category:'诗歌',specimen:'2'},
    {hall:'amber',category:'',specimen:'4'},
  ];
  assert.deepEqual(selectCategory(entries,'amber','诗歌').entries.map(x=>x.specimen),['2','10']);
  assert.deepEqual(selectCategory(entries,'amber',null).entries.map(x=>x.specimen),['3']);
  assert.equal(selectCategory(entries,'amber','影评').category,'小说');
  assert.equal(selectCategory(entries,'fragments','游记').entries.length,0);
});

test('分类后每页七篇，翻页没有混入其他分类或遗漏', () => {
  const entries=Array.from({length:25},(_,i)=>({hall:'amber',category:i%2?'小说':'诗歌',specimen:String(i+1)}));
  const filtered=selectCategory(entries,'amber','诗歌').entries;
  const first=paginate(filtered,'1'), second=paginate(filtered,'2');
  assert.equal(first.totalPages,2);
  assert.equal(first.items.length,7);
  assert.equal(second.items.length,6);
  assert.deepEqual([...first.items,...second.items],filtered);
});

test('分类内按时间排序，独立编号互不干扰', () => {
  const entries=[
    {hall:'amber',category:'诗歌',specimen:'002',date:'2023-03-04'},
    {hall:'amber',category:'小说',specimen:'001',date:'2023-02-01'},
    {hall:'amber',category:'诗歌',specimen:'001',date:'2022-04-30'},
  ];
  assert.deepEqual(selectCategory(entries,'amber',null).entries.map(x=>x.category+x.specimen),['小说001']);
  assert.deepEqual(selectCategory(entries,'amber','小说').entries.map(x=>x.specimen),['001']);
  assert.deepEqual(selectCategory(entries,'amber','诗歌').entries.map(x=>x.specimen),['001','002']);
});
