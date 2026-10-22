import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {publicAccounts, webTools, type Resource} from '../data/resources';

function ResourceSection({title, items}: {title: string; items: Resource[]}) {
  const categories = [...new Set(items.map(item => item.category || ''))];
  return <section className="resource-section" aria-label={title}>
    <h2>{title}</h2>
    {items.length ? categories.map(category => <div className="resource-group" key={category}>
      {category && <h3>{category}</h3>}
      <ul className="resource-list">{items.filter(item => (item.category || '') === category).map(item => <li key={item.url}>
        <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.title}（在新窗口打开）`}>{item.title}<span aria-hidden="true"> ↗</span></a>
        {item.description && <p>{item.description}</p>}
      </li>)}</ul>
    </div>) : <p className="resource-empty">暂未收录。</p>}
  </section>;
}

export default function Resources() {
  return <Layout title="资源整合" description="收集公众号资源与网页工具。">
    <main id="main-content" className="reading-wrap resources-page">
      <Link to="/halls/" className="back-link">← 返回四馆简介</Link>
      <header className="hall-heading"><h1>资源整合</h1><p>公众号资源与网页工具，收在这里。</p></header>
      <ResourceSection title="公众号资源" items={publicAccounts} />
      <ResourceSection title="网页工具" items={webTools} />
    </main>
  </Layout>;
}
