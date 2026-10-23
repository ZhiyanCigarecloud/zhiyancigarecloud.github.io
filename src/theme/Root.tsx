import React, {useEffect} from 'react';

/** Keep click feedback across page changes without delaying navigation. */
export default function Root({children}: {children: React.ReactNode}) {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const active = new Map<HTMLElement, Animation>();
    function ripple(event: PointerEvent) {
      if (motion.matches || !event.isPrimary || event.button !== 0) return;
      const target = event.target instanceof Element
        ? event.target.closest('a[href], button, [role="button"], summary') : null;
      if (!target || target.matches(':disabled, [aria-disabled="true"]')) return;
      const mark = document.createElement('span');
      mark.className = 'museum-click-ripple';
      mark.setAttribute('aria-hidden', 'true');
      mark.style.left = `${event.clientX}px`;
      mark.style.top = `${event.clientY}px`;
      document.body.append(mark);
      const animation = mark.animate([
        {transform: 'translate(-50%, -50%) scale(.25)', opacity: .55},
        {transform: 'translate(-50%, -50%) scale(1.45)', opacity: 0},
      ], {duration: 460, easing: 'cubic-bezier(.16,1,.3,1)'});
      active.set(mark, animation);
      animation.onfinish = () => {mark.remove(); active.delete(mark);};
    }
    document.addEventListener('pointerdown', ripple, {passive: true});
    return () => {
      document.removeEventListener('pointerdown', ripple);
      active.forEach((animation, mark) => {animation.cancel(); mark.remove();});
      active.clear();
    };
  }, []);
  return <>{children}</>;
}
