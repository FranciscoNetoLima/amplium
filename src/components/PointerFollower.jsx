import { useEffect, useRef } from 'react';
import './pointer-follower.css';

export default function PointerFollower() {
  const followerRef = useRef(null);

  useEffect(() => {
    const follower = followerRef.current;
    const enabled = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
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

    const move = (event) => {
      if (!enabled.matches || event.pointerType !== 'mouse') {
        hide();
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!positioned) {
        x = targetX;
        y = targetY;
        positioned = true;
      }
      follower.setAttribute('data-visible', '');
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const updateTarget = (event) => {
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
    enabled.addEventListener('change', hide);

    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', updateTarget);
      document.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('blur', hide);
      enabled.removeEventListener('change', hide);
    };
  }, []);

  return (
    <div className="pointer-follower" ref={followerRef} aria-hidden="true">
      <span className="pointer-follower-ring">◎</span>
    </div>
  );
}
