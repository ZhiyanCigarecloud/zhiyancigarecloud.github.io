import React, {useEffect, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {entrance} from '../data/museum';

export default function Entrance() {
  const history = useHistory();
  const image = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!entrance.src || entrance.durationMs <= 0 || reducedMotion) {
      history.replace('/halls/');
      return;
    }
    // Mount the GIF after hydration, so its first frame and timer start together.
    setReady(true);
  }, [history]);
  useEffect(() => {
    if (ready && image.current?.complete) {
      if (image.current.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, [ready]);
  useEffect(() => {
    if (failed) {history.replace('/halls/'); return;}
    if (!ready || !loaded) return;
    const timer = window.setTimeout(() => history.replace('/halls/'), entrance.durationMs);
    return () => window.clearTimeout(timer);
  }, [history, ready, loaded, failed]);
  return <Layout title="入馆" noFooter>
    <main id="main-content" className="entrance-page">
      {ready && entrance.src && !failed ? <img ref={image} className="entrance-animation" src={entrance.src} alt="六块紫色纸片像拼图一样拼成折纸霸王龙" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} /> : <div className="entrance-message" role="status"><p>正在入馆</p></div>}
      <div className="entrance-controls"><Link to="/halls/">跳过动画，进入展厅 →</Link></div>
    </main>
  </Layout>;
}
