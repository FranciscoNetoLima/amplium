import { useEffect, useRef, useState } from 'react';

export default function PointerFollower() {
  const [Cursor, setCursor] = useState(null);
  const pointer = useRef({ x: 0, y: 0, visible: false });

  useEffect(() => {
    if (Cursor) return;
    let cancelled = false;
    let loading = false;
    const hide = () => {
      pointer.current.visible = false;
    };
    const move = (event) => {
      pointer.current = {
        x: event.clientX,
        y: event.clientY,
        visible: event.pointerType !== 'touch',
      };
      if (!pointer.current.visible || loading) return;
      loading = true;
      import('./ui/motion-cursor-multifollow.jsx')
        .then((module) => {
          if (!cancelled) setCursor(() => module.default);
        })
        .catch(() => {
          loading = false;
        });
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', hide);
    document.addEventListener('pointerleave', hide);
    return () => {
      cancelled = true;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', hide);
      document.removeEventListener('pointerleave', hide);
    };
  }, [Cursor]);

  return Cursor ? <Cursor initialPointer={pointer.current} /> : null;
}
