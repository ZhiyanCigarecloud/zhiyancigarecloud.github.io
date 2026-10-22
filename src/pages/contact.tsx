import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Contact() {
  const [message, setMessage] = useState('');
  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText('zhiyan_a_dinosaur');
      setMessage('微信号已复制。');
    } catch {
      setMessage('请选中微信号复制。');
    }
  };
  return <Layout title="找到我" description="纸烟的联系方式。">
    <main id="main-content" className="reading-wrap contact-page">
      <Link to="/halls/" className="back-link">← 返回四馆简介</Link>
      <header className="resources-heading"><h1>找到我</h1></header>
      <dl className="contact-list">
        <div className="contact-row"><dt>微信</dt><dd><span className="contact-value">zhiyan_a_dinosaur</span><button type="button" onClick={copyWechat}>复制微信号</button><span className="contact-status" role="status">{message}</span></dd></div>
        <div className="contact-row"><dt>邮箱</dt><dd><a href="mailto:Cigarecloud_wyf@sjtu.edu.cn">Cigarecloud_wyf@sjtu.edu.cn</a><a href="mailto:yzhi35351@gmail.com">yzhi35351@gmail.com</a></dd></div>
      </dl>
    </main>
  </Layout>;
}
