import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {entrance} from '../data/museum';
import {DateLabel} from '../components/Museum';

export default function Entrance() {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!entrance.src || entrance.durationMs <= 0 || reducedMotion) {history.replace('/halls/'); return;}
    if (!loaded || failed) return;
    const timer = window.setTimeout(() => history.replace('/halls/'), entrance.durationMs);
    return () => window.clearTimeout(timer);
  }, [history, loaded, failed]);
  return <Layout title="入馆" noFooter>
    <main id="main-content" className="entrance-page">
      {entrance.src && !failed ? <img className="entrance-animation" src={entrance.src} alt="博物馆入馆动画" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} /> : <div className="entrance-message"><h1>展厅在前方</h1><p>从任意一处，开始漫游。</p></div>}
      <div className="entrance-controls"><Link to="/halls/">{entrance.src && !failed ? '跳过动画，进入展厅 →' : '进入展厅 →'}</Link><DateLabel /></div>
    </main>
  </Layout>;
}
