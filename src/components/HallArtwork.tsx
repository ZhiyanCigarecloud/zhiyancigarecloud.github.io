import React from 'react';
import type {HallId} from '../data/museum';

export default function HallArtwork({hall}: {hall: HallId}) {
  return <svg className="hall-artwork" viewBox="0 0 240 180" fill="none" aria-hidden="true">
    {hall === 'strata' && <g stroke="currentColor" strokeWidth="1.2">{[0,1,2,3,4,5].map(i => <path key={i} d={`M18 ${88+i*12} L72 ${40+i*12} L130 ${68+i*12} L181 ${31+i*12} L224 ${57+i*12}`} />)}<circle cx="181" cy="31" r="5" fill="currentColor" /></g>}
    {hall === 'wild' && <g stroke="currentColor" strokeWidth="1.3"><path d="M119 157C120 110 140 64 185 24C192 86 172 126 119 137M121 123C83 123 49 94 47 52C94 53 119 81 125 110M119 141L168 53M119 118L67 70"/><circle cx="185" cy="24" r="4" fill="currentColor"/></g>}
    {hall === 'amber' && <g stroke="currentColor" strokeWidth="1.2"><path d="M87 22L155 17L206 65L190 140L124 163L54 132L34 65Z"/><path d="M87 22L69 68L54 132M155 17L167 63L206 65M190 140L156 117L124 163M69 68L105 48L167 63L156 117L100 131L69 68Z"/><path d="M119 113C88 96 90 67 118 67C145 67 150 94 130 98C111 103 106 85 118 82" strokeWidth="2"/><circle cx="34" cy="65" r="4" fill="currentColor"/></g>}
    {hall === 'fragments' && <g stroke="currentColor" strokeWidth="1.2"><path d="M38 105L84 59L103 117L63 146ZM123 35L167 24L186 67L142 87ZM128 113L180 93L213 142L156 157Z"/><path d="M57 86L83 104M143 48L166 65M152 125L180 139M83 28L88 34M207 80L214 82M105 153L110 159"/><circle cx="103" cy="117" r="4" fill="currentColor"/></g>}
  </svg>;
}
