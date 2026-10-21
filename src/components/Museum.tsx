import React, {useRef} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {usePluginData} from '@docusaurus/useGlobalData';

export const halls = [
  {id: 'about', title: '馆长序言', en: "CURATOR’S NOTE", description: '关于我与这座博物馆。', href: '/about/'},
  {id: 'literature', title: '情感语言区', en: 'LANGUAGE & FEELING', description: '收藏诗句、小说与未完成的回声。', href: '/literature/'},
  {id: 'courses', title: '课程研究区', en: 'COURSE RESEARCH', description: '让知识留下可以追溯的层理。', href: '/courses/'},
  {id: 'field', title: '野外科考区', en: 'FIELD EXPLORATION', description: '向课堂之外，继续探索未知。', href: '/field/'},
] as const;

export function MuseumHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();
  return <header className="museum-header">
    <Link to="/" className="museum-brand" aria-label="纸烟的博物馆奇妙夜，返回首页">
      <span className="brand-full">纸烟的博物馆奇妙夜</span>
      <span className="brand-short">纸烟的博物馆</span>
      <span className="archive-code">NIGHT AT THE FOSSIL MUSEUM</span>
    </Link>
    <nav className="desktop-navigation" aria-label="主要导航">
      {halls.map(hall => <Link key={hall.id} to={hall.href}>{hall.title}</Link>)}
      <Link to="/#latest">最新出土 ↓</Link>
    </nav>
    <button className="menu-toggle" aria-label="打开导览菜单" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>☰</button>
    <dialog className="museum-menu" ref={dialog} aria-labelledby="menu-title" onClick={event => {if (event.target === dialog.current) close();}}>
      <div className="menu-inner">
        <button autoFocus className="menu-close" onClick={close}>关闭导览 ×</button>
        <h2 id="menu-title">今晚，想去哪里？</h2>
        <nav aria-label="手机导览">
          {halls.map((hall, index) => <Link key={hall.id} to={hall.href} onClick={close}><span className="archive-code">0{index + 1}</span>{hall.title}<span aria-hidden="true">↗</span></Link>)}
          <Link to="/#latest" onClick={close}>最新出土<span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </dialog>
  </header>;
}

export function MuseumFooter() {
  return <footer className="museum-footer section-wrap">
    <p className="footer-name">纸烟的博物馆奇妙夜</p>
    <p>一座生长中的私人数字博物馆。</p>
    <hr />
    <p>文字 · 知识 · 记忆 / 持续编目中</p>
    <small className="archive-code">© {new Date().getFullYear()} 纸烟 / 持续编目中</small>
  </footer>;
}

type Collection = {id: string; title: string; description: string; href: string; hall: string; specimen: string; status: string; example: boolean; date: string};

export function useCollections() {
  return usePluginData('museum-collections') as Collection[];
}

export function CollectionCard({item}: {item: Collection}) {
  const hall = halls.find(h => h.id === item.hall);
  return <Link to={item.href} className="collection-card">
    <span className="archive-code">SPECIMEN / {item.specimen}{item.example ? ' · 示例馆藏' : ''}</span>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <span className="collection-meta">{hall?.title} · {item.status}</span>
  </Link>;
}

export function HallPage({hallId}: {hallId: typeof halls[number]['id']}) {
  const hall = halls.find(h => h.id === hallId)!;
  const entries = useCollections().filter(item => item.hall === hallId);
  return <Layout title={hall.title} description={hall.description}>
    <main id="main-content" className="hall-page section-wrap">
      <Link to="/" className="back-link">← 返回博物馆</Link>
      <p className="archive-code">HALL / 0{halls.indexOf(hall) + 1}</p>
      <h1>{hall.title}</h1>
      <p className="archive-code">{hall.en}</p>
      <p className="hall-intro">{hall.description}</p>
      <div className="collection-grid">{entries.map(item => <CollectionCard key={item.id} item={item} />)}</div>
      {entries.length === 0 && <p>待编目 · 内容陆续整理中。</p>}
    </main>
  </Layout>;
}
