import React from 'react';
import OriginalLayout from '@theme-original/DocItem/Layout';
import type {Props} from '@theme/DocItem/Layout';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {useCollections} from '../../../components/Museum';
import {halls} from '../../../data/museum';

export default function ReadingLayout(props: Props) {
  const {metadata} = useDoc();
  const current = useCollections().find(item => item.id === metadata.id);
  const hall = halls.find(item => item.id === current?.hall);
  return <div className="museum-reader">
    {hall && <nav className="reader-path" aria-label="文章位置"><Link to="/halls/">四馆简介</Link><span aria-hidden="true">/</span><Link to={hall.href}>{hall.title}</Link>{current?.category && <><span aria-hidden="true">/</span><Link to={`${hall.href}?category=${encodeURIComponent(current.category)}`}>{current.category}</Link></>}</nav>}
    <OriginalLayout {...props} />
  </div>;
}
