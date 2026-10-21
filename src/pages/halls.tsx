import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {DateLabel} from '../components/Museum';
import {halls} from '../data/museum';

export default function Halls() {
  return <Layout title="展厅导览" description="地层馆、野外馆、琥珀馆、碎屑馆。从任意一处，开始漫游。">
    <main id="main-content" className="halls-page section-wrap">
      <Link to="/" className="back-link">← 返回首页</Link>
      <header className="guide-heading"><p className="eyebrow">四馆导览</p><h1>从任意一处，<br />开始漫游。</h1><DateLabel /></header>
      <div className="hall-grid">{halls.map((hall, index) => <Link className="hall-card" data-hall={hall.id} key={hall.id} to={hall.href}>
        <span className="hall-number" aria-hidden="true">0{index + 1}</span><span className="hall-subject">{hall.subject}</span>
        <h2>{hall.title}</h2><p>{hall.description}</p><span className="enter-hall">查看馆藏 <span aria-hidden="true">↗</span></span>
      </Link>)}</div>
    </main>
  </Layout>;
}
