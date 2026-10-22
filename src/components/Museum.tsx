import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {useLocation, useHistory} from '@docusaurus/router';
import {usePluginData} from '@docusaurus/useGlobalData';
import {halls, tips, updated, type HallId} from '../data/museum';
import {paginate} from '../utils/pagination';
import {selectCategory} from '../utils/categories';

export function DateLabel({date = updated, label = '更新于'}: {date?: string; label?: string}) {
  const [year, month, day] = date.slice(0, 10).split('-');
  return <span className="date-label">{label} <time dateTime={date}>{year}年{Number(month)}月{day ? `${Number(day)}日` : ''}</time></span>;
}

export function MuseumHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();
  const {pathname} = useLocation();
  const isHome = pathname === '/';
  return <header className="museum-header">
    <Link to="/" className="museum-brand" aria-label="纸烟的博物馆奇妙夜，返回首页"><span className="brand-mark" aria-hidden="true">纸</span><span>纸烟的博物馆<span className="brand-night">奇妙夜</span></span></Link>
    {!isHome && <><nav className="desktop-navigation" aria-label="主要导航">
      <Link to="/" aria-current={isHome ? 'page' : undefined}>首页</Link>
      <Link to="/halls/" aria-current={pathname === '/halls/' ? 'page' : undefined}>四馆简介</Link>
      <Link to="/resources/" aria-current={pathname === '/resources/' ? 'page' : undefined}>资源整合</Link>
    </nav>
    <button className="menu-toggle" aria-label="打开导览菜单" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>导览 <span aria-hidden="true">☰</span></button>
    <dialog className="museum-menu" ref={dialog} aria-label="导览菜单" onClick={event => {if (event.target === dialog.current) close();}}>
      <div className="menu-inner">
        <button autoFocus className="menu-close" onClick={close}>关闭导览 ×</button>
        <nav aria-label="手机导览">
          <Link to="/" onClick={close}>首页</Link>
          <Link to="/halls/" onClick={close}>四馆简介</Link>
          <Link to="/resources/" onClick={close}>资源整合</Link>
        </nav>
      </div>
    </dialog></>}
  </header>;
}

export function MuseumFooter() {
  return <footer className="museum-footer"><span>© {new Date().getFullYear()} 纸烟的博物馆奇妙夜</span><span className="footer-note">收藏文字，也收藏时间。</span></footer>;
}

export function CuratorTips() {
  const [index, setIndex] = useState(0);
  const tip = tips[index];
  if (!tip) return null;
  return <aside className="curator-tips" aria-label="馆长小记">
    <div className="tips-label"><span>馆长小记</span><span aria-hidden="true">{index + 1} / {tips.length}</span></div>
    <p aria-live="polite" aria-atomic="true">{tip.text}</p>
    <div className="tips-bottom"><DateLabel date={tip.date} /><button type="button" onClick={() => setIndex(current => (current + 1) % tips.length)} disabled={tips.length < 2}>换一条 ↻</button></div>
  </aside>;
}

export type Collection = {id: string; title: string; description: string; href: string; hall: string; category: string; specimen: string; date: string};
export function useCollections() {
  return usePluginData('museum-collections') as Collection[];
}

export function HallPage({hallId}: {hallId: HallId}) {
  const hall = halls.find(item => item.id === hallId)!;
  const {search} = useLocation();
  const isBrowser = useIsBrowser();
  const params = new URLSearchParams(isBrowser ? search : '');
  const {categories, category, entries} = selectCategory(useCollections(), hallId, params.get('category'));
  const {page, totalPages, items} = paginate(entries, params.get('page'));
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
        {items.length ? <ol>{items.map(item => <li key={item.id}><Link to={item.href}><span className="specimen-number">{item.specimen}</span><span className="specimen-title">{item.category && !category && <span className="archive-category-label">{item.category} · </span>}{item.title}</span></Link><DateLabel date={item.date} label="" /><span className="archive-arrow" aria-hidden="true">↗</span></li>)}</ol> : <p className="empty-hall">{category ? `暂时还没有${category}，等待下一次发掘。` : '尚无馆藏，等待下一次发掘。'}</p>}
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
