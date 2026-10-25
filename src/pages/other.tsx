import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const jellyOcean = {
  title: '果冻海 / Jelly Ocean',
  url: 'https://jellyocean.yzhi35351.workers.dev/',
  description: '一片可以触碰的极光果冻海。',
};

export default function Other() {
  const [message, setMessage] = useState('');
  const [showCopyUrl, setShowCopyUrl] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(jellyOcean.url);
      setShowCopyUrl(false);
      setMessage('已复制，可粘贴到浏览器中打开。');
    } catch {
      setShowCopyUrl(true);
      setMessage('请长按或选中下方链接复制。');
    }
  };

  return (
    <Layout title="其他" description="收录 vibe coding 小作品与网页实验。">
      <main id="main-content" className="reading-wrap resources-page">
        <Link to="/halls/" className="back-link">← 返回四馆简介</Link>
        <header className="resources-heading"><h1>其他</h1></header>
        <section className="resource-section" aria-labelledby="vibe-coding">
          <div className="resource-group">
            <h2 id="vibe-coding">vibe coding</h2>
            <ul className="resource-list">
              <li>
                <div className="resource-actions">
                  <a href={jellyOcean.url} target="_blank" rel="noopener noreferrer" aria-label="果冻海 / Jelly Ocean（在新标签页打开）">
                    {jellyOcean.title}<span aria-hidden="true"> ↗</span>
                  </a>
                  <button type="button" onClick={copyLink} aria-label="复制果冻海的链接">复制链接</button>
                </div>
                <p>{jellyOcean.description}</p>
                <p className="resource-copy-status" role="status">{message}</p>
                {showCopyUrl && (
                  <input
                    className="resource-copy-url"
                    aria-label="果冻海的链接"
                    readOnly
                    value={jellyOcean.url}
                    onFocus={event => event.currentTarget.select()}
                  />
                )}
              </li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
