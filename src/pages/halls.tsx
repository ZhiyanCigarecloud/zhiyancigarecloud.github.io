import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useCollections} from '../components/Museum';
import HallArtwork from '../components/HallArtwork';
import {halls} from '../data/museum';
import {hallCategories} from '../utils/categories';

export default function Halls() {
  const collections = useCollections();
  return <Layout title="四馆简介" description="地层馆、野外馆、琥珀馆、碎屑馆。从任意一处，开始漫游。">
    <main id="main-content" className="halls-page section-wrap">
      <Link to="/" className="back-link">← 返回首页</Link>
      <header className="guide-heading"><div><p className="eyebrow">四馆简介</p><h1>从任意一处，<br /><span>开始漫游。</span></h1></div></header>
      <div className="hall-grid">{halls.map((hall, index) => <article className="hall-card" data-hall={hall.id} key={hall.id}>
        <div className="hall-card-top"><span className="hall-subject">{hall.subject}</span><span className="hall-number">0{index + 1}</span></div>
        <div className="hall-card-content"><div><h2>{hall.title}</h2><p>{hall.description}</p></div><HallArtwork hall={hall.id} /></div>
        <div className="hall-card-bottom"><div className="hall-category-labels">{(hallCategories[hall.id] || []).map(category => <span key={category}>{category}</span>)}</div><Link className="enter-hall" to={hall.href}>查看馆藏 <span aria-hidden="true">↗</span><span className="hall-count">{collections.filter(item => item.hall === hall.id).length} 篇</span></Link></div>
      </article>)}</div>
    </main>
  </Layout>;
}
