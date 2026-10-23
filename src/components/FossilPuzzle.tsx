import React, {useId} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const FOSSIL_EXIT_MS = 1200;
const xs = [0, 242, 485, 728, 971];
const ys = [0, 404, 809, 1214, 1619];

// Shared boundary curves let adjacent pieces fit exactly.
function edge(ax: number, ay: number, bx: number, by: number, tab: number) {
  const dx = bx-ax, dy = by-ay, length = Math.hypot(dx,dy);
  const nx = -dy/length*38*tab, ny = dx/length*38*tab;
  const p = (t: number, depth = 0) => `${ax+dx*t+nx*depth},${ay+dy*t+ny*depth}`;
  return tab ? `L${p(.35)} C${p(.46)} ${p(.34,1)} ${p(.5,1)} C${p(.66,1)} ${p(.54)} ${p(.65)} L${bx},${by}` : `L${bx},${by}`;
}
function outline(c: number, r: number) {
  const l=xs[c], right=xs[c+1], t=ys[r], b=ys[r+1];
  return `M${l},${t} ${edge(l,t,right,t,r ? -1:0)} ${edge(right,t,right,b,c<3 ? 1:0)} ${edge(right,b,l,b,r<3 ? 1:0)} ${edge(l,b,l,t,c ? -1:0)} Z`;
}
export default function FossilPuzzle({leaving = false}: {leaving?: boolean}) {
  const root = useBaseUrl('/img/');
  const id = `fossil-${useId().replace(/:/g,'')}`;
  return <div className={`specimen-picture fossil-puzzle${leaving ? ' is-leaving' : ''}`}>
    <svg className="specimen-image" viewBox="0 0 971 1619" role="img" aria-label="旧纸与蓝色拓印中的恐龙化石，入馆时化为拼图散去">
      <defs>
        <g id={`${id}-photo`}>{Array.from({length:16}, (_,i) => {
          const c=i%4, r=Math.floor(i/4);
          return <image key={i} href={`${root}specimen-${String(i+1).padStart(2,'0')}.jpg`} x={xs[c]} y={ys[r]} width={xs[c+1]-xs[c]} height={ys[r+1]-ys[r]} preserveAspectRatio="none" />;
        })}</g>
        {Array.from({length:16}, (_,i) => <clipPath key={i} id={`${id}-${i}`}><path d={outline(i%4,Math.floor(i/4))} /></clipPath>)}
      </defs>
      <use href={`#${id}-photo`} className="fossil-whole" />
      {Array.from({length:16}, (_,i) => {
        const c=i%4, r=Math.floor(i/4);
        const style = {'--piece-x':`${(c-1.5)*125}px`, '--piece-y':`${(r-1.5)*95}px`, '--piece-turn':`${(i%2 ? 1:-1)*(7+i%5*3)}deg`, '--piece-delay':`${((c*3+r*5)%7)*30}ms`} as React.CSSProperties;
        return <g key={i} className="fossil-piece" style={style}><use href={`#${id}-photo`} clipPath={`url(#${id}-${i})`} /></g>;
      })}
    </svg>
  </div>;
}
