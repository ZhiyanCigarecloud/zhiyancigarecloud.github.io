import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {publicAccounts, webTools, type Resource} from '../data/resources';

function ResourceItem({item}: {item: Resource}) {
  const [message, setMessage] = useState('');
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(item.url);
      setMessage('已复制，可粘贴到微信中打开。');
    } catch {
      setMessage('请长按或选中下方链接复制。');
    }
  };
  return <li>
    <div className="resource-actions">
      <a href={item.url}>{item.title}<span aria-hidden="true"> ↗</span></a>
      <button type="button" onClick={copyLink} aria-label={`复制${item.title}的链接`}>复制链接</button>
    </div>
    {item.description && <p>{item.description}</p>}
    <p className="resource-copy-status" role="status">{message}</p>
    {message === '请长按或选中下方链接复制。' && <input className="resource-copy-url" aria-label={`${item.title}的链接`} readOnly value={item.url} onFocus={event => event.target.select()} />}
  </li>;
}

function ResourceSection({title, items}: {title: string; items: Resource[]}) {
  const categories = [...new Set(items.map(item => item.category || ''))];
  return <section className="resource-section" aria-label={title}>
    <h2>{title}</h2>
    {items.length ? categories.map(category => <div className="resource-group" key={category}>
      {category && <h3>{category}</h3>}
      <ul className="resource-list">{items.filter(item => (item.category || '') === category).map(item => <ResourceItem key={item.url} item={item} />)}</ul>
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
