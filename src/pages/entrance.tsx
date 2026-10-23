import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import FossilPuzzle, {FOSSIL_EXIT_MS} from '../components/FossilPuzzle';

export default function Entrance() {
  const history = useHistory();
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      history.replace('/halls/');
      return;
    }
    let timer: number | undefined;
    let cancelled = false;
    const images = Array.from(document.querySelectorAll<SVGImageElement>('.entrance-page svg image'));
    const ready = images.map(element => new Promise<void>(resolve => {
      const image = new Image();
      image.onload = image.onerror = () => resolve();
      image.src = element.href.baseVal;
    }));
    const fallback = window.setTimeout(() => history.replace('/halls/'), 3000);
    Promise.all(ready).then(() => {
      if (cancelled) return;
      window.clearTimeout(fallback);
      setLeaving(true);
      timer = window.setTimeout(() => history.replace('/halls/'), FOSSIL_EXIT_MS);
    });
    return () => {cancelled = true; window.clearTimeout(timer); window.clearTimeout(fallback);};
  }, [history]);
  return <Layout title="入馆" noFooter>
    <main id="main-content" className="entrance-page">
      <FossilPuzzle leaving={leaving} />
      <div className="entrance-controls"><Link to="/halls/">跳过动画，进入展厅 →</Link></div>
    </main>
  </Layout>;
}
