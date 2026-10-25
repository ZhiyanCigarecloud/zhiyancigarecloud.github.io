import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation, useHistory} from '@docusaurus/router';
import {usePluginData} from '@docusaurus/useGlobalData';
import {halls, tips, updated, type HallId} from '../data/museum';
import {paginate} from '../utils/pagination';
import ThemeToggle from './ThemeToggle';
import {selectCategory} from '../utils/categories';

export function DateLabel({date = updated, label = '更新于'}: {date?: string; label?: string}) {
  if (!date) return null;
  const [year, month, day] = date.slice(0, 10).split('-');
  return <span className="date-label">{label} <time dateTime={date}>{year}年{Number(month)}月{day ? `${Number(day)}日` : ''}</time></span>;
}

export function MuseumHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();
  const {pathname} = useLocation();
  const isHome = pathname === '/';
  const brandImage = useBaseUrl('/img/brand-origami-rex.png');
  return <header className="museum-header">
    <Link to="/" className="museum-brand" aria-label="纸烟的博物馆奇妙夜，返回首页"><img className="museum-brand-symbol" src={brandImage} width="44" height="44" alt="" aria-hidden="true" /><span className="museum-brand-text">纸烟的博物馆奇妙夜</span></Link>
    {!isHome && <><nav className="desktop-navigation" aria-label="主要导航">
      <Link to="/" aria-current={isHome ? 'page' : undefined}>首页</Link>
      <Link to="/halls/" aria-current={pathname === '/halls/' ? 'page' : undefined}>四馆简介</Link>
      <Link to="/resources/" aria-current={pathname === '/resources/' ? 'page' : undefined}>资源整合</Link>
      <Link to="/ohe/r" aria-current={pathname === '/other' ? 'page' : undefined}>其他</Link>
      <Link to="/contact/" aria-current={pathname === '/contact/' ? 'page' : undefined}>找到我</Link>
    </nav>
    <button className="menu-toggle" aria-label="打开游览菜单" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>导览 <span aria-hidden="true">☰</span></button>
    <dialog className="museum-menu" ref={dialog} aria-label="导航菜单" onClick={event => { if (event.target === dialog.current) close(); }}>
      <div className="menu-inner">
        <button autoFocus className="menu-close" onClick={close}>关闭导航 ×</button>
        <nav aria-label="手机导航">
          <Link to="/" onClick={close}>首页</Link>
          <Link to="/halls/" onClick={close}>四馆简介</Link>
          <Link to="/resources/" onClick={close}>资源整合</Link>
          <Link to="/other" onClick={close}>其他</Link>
          <Link to="/contact/" onClick={close}>找到我</Link>
        </nav>
      </div>
    </dialog></>}
    <ThemeToggle />
  </header>;
}

export function MuseumFooter() {
  return <footer className="museum-footer"><span>© {new Date().getFullYear()} 纸烟的博物馆奇妙夜</span></footer>;
}

export function CuratorTips() {
  const [index, setIndex] = useState(0);
  const tip = tips[index];
  return <div className="curator-tips" aria-label="馆长特别叮嘱"><p>{tip}</p><button type="button" onClick={() => setIndex((index + 1) % tips.length)}>换一条叮嘱</button></div>;
}

export function HallPage({hallId}: {hallId: HallId}) {
  const hall = halls[hallId];
  const isBrowser = useIsBrowser();
  const {search} = useLocation();
  const params = new URLSearchParams(search);
  const categories = Object.keys(hall.categories ?? {});
  const categoryParam = params.get('category');
  const category = selectCategory(categories, categoryParam);
  const rawPage = Number(params.get('page') ?? '1');
  const entries = category ? (hall.categories?.[category] ?? []) : hall.entries;
  const {page, totalPages, items} = paginate(entries, rawPage);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {firstRender.current = false; return;}
    heading.current?.focus({preventScroll: true});
    heading.current?.scrollIntoView({block: 'start'});
  }, [page, category]);
  const pageUrl = (number: number, selected = category) => {
    const query = new URLSearchParams();
    if (selected) query.set('category', selected);
    if (number > 1) query.set('page', String(number));
    const value = query.toString();
    return hall.href + (value ? `?${value}` : '');
  };
  return <Layout title={hall.title} description={hall.description}>
    <main id="main-content" className="hall-page reading-wrap">
      <Link to="/halls/" className="back-link">← 返回四馆简介</Link>
      <header className="hall-heading">
        {categories.length > 0 ? <nav className="archive-categories" aria-label={`${hall.title}文章分类`}>
          {categories.map(item => <Link key={item} to={pageUrl(1, item)} aria-current={category === item ? 'page' : undefined}>{item}</Link>)}
        </nav> : <span className="eyebrow">{hall.subject}</span>}
        <h1 ref={heading} tabIndex={-1}>{hall.title}</h1><p>{hall.description}</p></header>
      <div className="archive-section-heading"><h2>{category || hall.subject}</h2><span>共 {entries.length} 篇馆藏</span></div>
      <section className="archive-list" aria-label={`${hall.title}馆藏目录`}>
        {items.length > 0 ? <ol>{items.map(item => <li key={item.id}><Link to={item.href}><span className="specimen-number">#{item.id}</span><strong>{item.title}</strong></Link><DateLabel date={item.date} /></li>)}</ol> : <p className="empty-notice">没有找到任何馆藏记录。</p>}
      </section>
      {entries.length > 0 && <nav className="archive-pagination" aria-label="馆藏目录分页">
        {page > 1 ? <Link rel="prev" to={pageUrl(page - 1)}>← 上一页</Link> : <span aria-disabled="true">← 上一页</span>}
        <span aria-current="page">第 {page} / {totalPages} 页</span>
        {page < totalPages ? <Link rel="next" to={pageUrl(page + 1)}>下一页 →</Link> : <span aria-disabled="true">下一页 →</span>}
      </nav>}
    </main>
  </Layout>;
}

export function LegacyRedirect({to}: {to: string}) {
  const history = useHistory();
  useEffect(() => {history.replace(to);}, [history, to]);
  return <Layout title="继续漫游"><main className="reading-wrap"><Link to={to}>继续漫游 →</Link></main></Layout>;
}
export type Collection = { id: string; title: string; description: string; href: string; hall: string; category: string; specimen: string; date: string; }; export function useCollections() { return usePluginData('museum-collections') as Collection[]; }
