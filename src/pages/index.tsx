import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import {CuratorTips} from '../components/Museum';
import {curator, updated} from '../data/museum';

const cutsX = [0, 242, 485, 728, 971];
const cutsY = [0, 404, 809, 1214, 1619];

function SpecimenImage() {
  const assetRoot = useBaseUrl('/img/');
  return <div className="specimen-picture" role="img" aria-label="旧纸与蓝色拓印拼贴中的恐龙化石">
    <div className="specimen-image">{Array.from({length: 16}, (_, index) => {
      const column = index % 4, row = Math.floor(index / 4);
      return <img key={index} src={`${assetRoot}specimen-${String(index + 1).padStart(2, '0')}.jpg`} alt="" width={cutsX[column + 1] - cutsX[column]} height={cutsY[row + 1] - cutsY[row]} loading={index < 8 ? 'eager' : 'lazy'} decoding="async" style={{left: `${cutsX[column] / 971 * 100}%`, top: `${cutsY[row] / 1619 * 100}%`, width: `${(cutsX[column + 1] - cutsX[column]) / 971 * 100}%`, height: `${(cutsY[row + 1] - cutsY[row]) / 1619 * 100}%`}} />;
    })}</div>
  </div>;
}

export default function Home() {
  useBrokenLinks().collectAnchor('curator');
  return <Layout title="首页" description={curator}>
    <main id="main-content" className="museum-home">
      <section className="museum-cover" aria-labelledby="welcome-title">
        <div className="cover-kicker"><p>心中有绿色，出门便是草</p><span>私人馆藏 · 持续生长中</span></div>
        <header className="cover-heading"><p>纸烟的博物馆</p><h1 id="welcome-title">奇妙夜</h1></header>
        <div className="cover-body">
          <figure className="hero-exhibit"><SpecimenImage /><figcaption><span>恐龙化石</span><span>私人馆藏</span></figcaption></figure>
          <div className="cover-notes">
            <section className="curator-intro" id="curator" aria-labelledby="curator-title"><h2 id="curator-title">关于馆长</h2><p>{curator}</p></section>
            <Link className="visit-button" to="/entrance/">开始漫游 <span aria-hidden="true">↗</span></Link>
            <CuratorTips />
          </div>
        </div>
      </section>
      <aside className="home-update" aria-label="更新记录"><span>更新记录</span><time dateTime={updated}>{updated.replaceAll('-', '.')}</time><p>以旧纸档案与书刊排版重整全站。</p></aside>
    </main>
  </Layout>;
}
