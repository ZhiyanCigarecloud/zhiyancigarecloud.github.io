import test from 'node:test';
import assert from 'node:assert/strict';
import {countWords, countArticleWords} from '../src/utils/wordCount.ts';
import remarkWordCount from '../src/utils/wordCount.ts';

test('中英文混排按中文字和英文数字词计数，忽略标点与空白', () => {
  assert.equal(countWords('你好，世界！ Hello world 2026。'), 7);
  assert.equal(countWords('AI医学影像，don’t re-write。'), 7);
  assert.equal(countWords('  ，。!? ——\n'), 0);
});

test('排除标题、日期、代码、图片地址与返回目录，保留诗歌和正文链接', () => {
  const text = value => ({type:'text', value});
  const tree = {type:'root', children:[
    {type:'heading', depth:1, children:[text('不计标题')]},
    {type:'mdxJsxFlowElement', name:'p', attributes:[{name:'className',value:'writing-date'}], children:[text('写于2026年')]},
    {type:'mdxJsxFlowElement', name:'div', attributes:[{name:'className',value:'poem'}], children:[{type:'paragraph',children:[text('夜晚'),{type:'strong',children:[text('带来')]},text('回声')]}]},
    {type:'paragraph', children:[{type:'link',url:'https://example.com',children:[text('正文链接')]}]},
    {type:'code', value:'console.log("忽略代码")'},
    {type:'image',url:'/img/test.png',alt:'图片描述'},
    {type:'mdxjsEsm',value:'import Component from "test"'},
    {type:'paragraph',children:[{type:'link',url:'/amber/?category=诗歌',children:[text('← 返回诗歌目录')]}]},
  ]};
  assert.equal(countArticleWords(tree), 10);
});

test('内联格式不拆开英文单词，正文段落之间不合并词语', () => {
  const tree = {type:'root',children:[
    {type:'paragraph',children:[{type:'text',value:'hel'},{type:'emphasis',children:[{type:'text',value:'lo'}]}]},
    {type:'paragraph',children:[{type:'text',value:'world'}]},
  ]};
  assert.equal(countArticleWords(tree), 2);
});

test('无正文显示0字，统计节点插入在文章日期之后', () => {
  const tree = {type:'root',children:[{type:'mdxJsxFlowElement', name:'p', attributes:[{name:'className',value:'writing-date'}],children:[{type:'text',value:'写于今天'}]}]};
  remarkWordCount()(tree);
  assert.equal(tree.children[1].children[0].value, '正文 0 字');
  assert.deepEqual(tree.children[1].data.hProperties.className, ['article-word-count']);
});
