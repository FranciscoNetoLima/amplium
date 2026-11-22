import { useEffect, useRef } from 'react';
import './pointer-follower.css';

export default function PointerFollower() {
  const followerRef = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let positioned = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const draw = () => {
      frame = 0;
      x += (targetX - x) * 0.3;
      y += (targetY - y) * 0.3;
      const moving = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1;
      if (!moving) {
        x = targetX;
        y = targetY;
      }
      follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (moving) frame = window.requestAnimationFrame(draw);
    };

    const hide = () => {
      follower.removeAttribute('data-visible');
      follower.removeAttribute('data-interactive');
      window.cancelAnimationFrame(frame);
      frame = 0;
      positioned = false;
    };

    const updateMotion = () => {
      if (!reducedMotion.matches) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
      x = targetX;
      y = targetY;
      if (positioned) draw();
    };

    const move = (event) => {
      if (event.pointerType === 'touch') {
        hide();
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!positioned || reducedMotion.matches) {
        x = targetX;
        y = targetY;
        follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        positioned = true;
      }
      follower.setAttribute('data-visible', '');
      if (!frame && !reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    };

    const updateTarget = (event) => {
      if (event.pointerType === 'touch') {
        hide();
        return;
      }
      follower.toggleAttribute(
        'data-interactive',
        event.target instanceof Element &&
          Boolean(event.target.closest('a[href], button:not(:disabled), [role="button"]')),
      );
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', updateTarget);
    document.addEventListener('pointerleave', hide);
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('blur', hide);
    reducedMotion.addEventListener('change', updateMotion);

    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', updateTarget);
      document.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('blur', hide);
      reducedMotion.removeEventListener('change', updateMotion);
    };
  }, []);

  return (
    <div className="pointer-follower" ref={followerRef} aria-hidden="true">
      <span className="pointer-follower-ring">◎</span>
    </div>
  );
}
