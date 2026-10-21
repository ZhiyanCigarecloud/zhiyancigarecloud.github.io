import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useCollections} from '../../../components/Museum';

export default function ArticlePaginator() {
  const {metadata} = useDoc();
  const collections = useCollections();
  const current = collections.find(item => item.id === metadata.id);
  if (!current?.hall) return null;
  const entries = collections.filter(item => item.hall === current.hall && item.category === current.category)
    .sort((a, b) => a.specimen.localeCompare(b.specimen, 'zh-CN', {numeric: true}));
  const index = entries.findIndex(item => item.id === current.id);
  const previous = entries[index - 1];
  const next = entries[index + 1];
  return <nav className="article-pagination" aria-label="同分类文章切换">
    {previous ? <Link to={previous.href} rel="prev" className="article-previous" aria-label={`上一篇：${previous.title}`}>
      <span className="article-page-direction">← 上一篇</span>
      <span className="article-page-title">{previous.specimen} — {previous.title}</span>
    </Link> : <span className="article-page-end" aria-disabled="true">← 已是第一篇</span>}
    {next ? <Link to={next.href} rel="next" className="article-next" aria-label={`下一篇：${next.title}`}>
      <span className="article-page-direction">下一篇 →</span>
      <span className="article-page-title">{next.specimen} — {next.title}</span>
    </Link> : <span className="article-page-end article-next" aria-disabled="true">已是最后一篇 →</span>}
  </nav>;
}
