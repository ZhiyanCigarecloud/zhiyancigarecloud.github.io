import React, {useEffect} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function ThemeToggle() {
  const {colorMode, setColorMode} = useColorMode();
  const isBrowser = useIsBrowser();
  const dark = colorMode === 'dark';
  const label = dark ? '切换到日间模式' : '切换到夜间模式';
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#1b1822' : '#f3f1e9');
  }, [dark]);
  return <button type="button" className="museum-theme-toggle" disabled={!isBrowser} aria-label={label} title={label} onClick={() => setColorMode(dark ? 'light' : 'dark')}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dark ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></> : <path d="M20.5 14a8.8 8.8 0 0 1-10.5-10.5A8.8 8.8 0 1 0 20.5 14Z"/>}
    </svg>
  </button>;
}
