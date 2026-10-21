import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import {halls, CollectionCard, useCollections} from '../components/Museum';

const cutsX = [0, 242, 485, 728, 971];
const cutsY = [0, 404, 809, 1214, 1619];

function SpecimenImage() {
  const assetRoot = useBaseUrl('/img/');
  return <div className="specimen-picture" role="img" aria-label="旧纸和蓝色拓印拼贴中的恐龙骨架，题字 Deep time">
    <div className="specimen-image">
      {Array.from({length: 16}, (_, index) => {
        const column = index % 4, row = Math.floor(index / 4);
        return <img key={index} src={`${assetRoot}specimen-${String(index + 1).padStart(2, '0')}.jpg`} alt="" width={cutsX[column + 1] - cutsX[column]} height={cutsY[row + 1] - cutsY[row]} loading={index < 8 ? 'eager' : 'lazy'} decoding="async" style={{left: `${cutsX[column] / 971 * 100}%`, top: `${cutsY[row] / 1619 * 100}%`, width: `${(cutsX[column + 1] - cutsX[column]) / 971 * 100}%`, height: `${(cutsY[row + 1] - cutsY[row]) / 1619 * 100}%`}} />;
      })}
    </div>
  </div>;
}

export default function Home() {
  const collections = useCollections();
  const anchors = useBrokenLinks();
  anchors.collectAnchor('latest');
  anchors.collectAnchor('halls');
  return <Layout title="首页" description="每段文字，都是被发掘和重新命名的化石标本。">
    <main id="main-content" className="museum-home">
      <section className="museum-hero" aria-labelledby="welcome-title">
        <div className="hero-copy">
          <p className="archive-code">PRIVATE MUSEUM / OPEN AFTER DARK</p>
          <h1 id="welcome-title"><span>纸烟的博物馆</span><span>奇妙夜</span></h1>
          <p className="hero-description">每段文字，都是被发掘和重新命名的化石标本。</p>
          <a className="visit-button" href="#halls">开始漫游 <span aria-hidden="true">↗</span></a>
        </div>
        <SpecimenImage />
      </section>
      <section className="hall-section section-wrap" id="halls" aria-labelledby="halls-title">
        <div className="section-heading">
          <p className="archive-code">01 / EXPLORE THE HALLS</p>
          <h2 id="halls-title">从任意一处，开始漫游。</h2>
        </div>
        <div className="hall-grid">{halls.map((hall, index) => <Link className="hall-card" key={hall.id} to={hall.href}>
          <span className="archive-code">HALL / 0{index + 1}</span>
          <span className="hall-rule" aria-hidden="true" />
          <h3>{hall.title}</h3>
          <span className="archive-code">{hall.en}</span>
          <p>{hall.description}</p>
          <span className="enter-hall">进入展厅 <span aria-hidden="true">↗</span></span>
        </Link>)}</div>
      </section>
      <section className="latest-section section-wrap" id="latest" aria-labelledby="latest-title">
        <p className="archive-code">02 / RECENT EXCAVATIONS</p>
        <h2 id="latest-title">最新出土</h2>
        <p>最近被整理、命名与重新陈列的文章、笔记和诗句。</p>
        <div className="collection-grid">{collections.slice(0, 3).map(item => <CollectionCard key={item.id} item={item} />)}</div>
        {collections.some(item => item.example) && <p className="example-note">以上为排版与交互示例，正式内容待馆长编目。</p>}
      </section>
    </main>
  </Layout>;
}
