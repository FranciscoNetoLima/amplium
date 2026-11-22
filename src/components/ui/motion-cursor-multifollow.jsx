import { createContext, useContext, useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import './motion-cursor-multifollow.css';

const CursorContext = createContext(null);

function Stage({ children, initialPointer }) {
  const x = useMotionValue(initialPointer.x);
  const y = useMotionValue(initialPointer.y);
  const opacity = useMotionValue(initialPointer.visible ? 1 : 0);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const hide = () => {
      opacity.set(0);
      setPressed(false);
    };
    const move = (event) => {
      if (event.pointerType === 'touch') {
        hide();
        return;
      }
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
    };
    const press = (event) => {
      if (event.pointerType === 'touch') hide();
      else setPressed(true);
    };
    const release = () => setPressed(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', hide);
    window.addEventListener('blur', hide);
    document.addEventListener('pointerleave', hide);
    document.addEventListener('visibilitychange', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', hide);
      window.removeEventListener('blur', hide);
      document.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', hide);
    };
  }, [x, y, opacity]);

  return (
    <CursorContext.Provider value={{ x, y, opacity, pressed }}>
      <div className="cursor-multifollow" aria-hidden="true">
        {children}
      </div>
    </CursorContext.Provider>
  );
}

function Cursor({ className, spring, variants }) {
  const pointer = useContext(CursorContext);
  const reducedMotion = useReducedMotion();
  const x = useSpring(pointer.x.get(), spring);
  const y = useSpring(pointer.y.get(), spring);

  useEffect(() => {
    const updateX = (value) => (reducedMotion ? x.jump(value) : x.set(value));
    const updateY = (value) => (reducedMotion ? y.jump(value) : y.set(value));
    // Keep the four layers together on re-entry and when motion is reduced.
    x.jump(pointer.x.get());
    y.jump(pointer.y.get());
    const unsubscribeX = pointer.x.on('change', updateX);
    const unsubscribeY = pointer.y.on('change', updateY);
    const unsubscribeOpacity = pointer.opacity.on('change', (value) => {
      if (value === 1) {
        x.jump(pointer.x.get());
        y.jump(pointer.y.get());
      }
    });
    return () => {
      unsubscribeX();
      unsubscribeY();
      unsubscribeOpacity();
    };
  }, [pointer.x, pointer.y, pointer.opacity, reducedMotion, x, y]);

  return (
    <motion.div
      className={`multifollow-layer ${className}`}
      data-cursor=""
      initial={false}
      animate={pointer.pressed ? 'pressed' : 'default'}
      variants={variants}
      transition={reducedMotion ? { duration: 0 } : undefined}
      style={{ x, y, opacity: pointer.opacity, translateX: '-50%', translateY: '-50%' }}
    />
  );
}

export function CursorMultifollow({ initialPointer = { x: 0, y: 0, visible: false } }) {
  return (
    <Stage initialPointer={initialPointer}>
      <Cursor
        className="multifollow-dot"
        spring={{ stiffness: 900, damping: 55 }}
        variants={{ default: { scale: 1 }, pressed: { scale: 0.5 } }}
      />
      <Cursor
        className="multifollow-inner"
        spring={{ stiffness: 1000, damping: 50 }}
        variants={{
          default: { scale: 1, borderColor: '#ff0088' },
          pressed: { scale: 0.6, borderColor: '#dd00ee' },
        }}
      />
      <Cursor
        className="multifollow-middle"
        spring={{ stiffness: 800, damping: 70 }}
        variants={{
          default: { scale: 1, borderColor: '#dd00ee' },
          pressed: { scale: 0.7, borderColor: '#9911ff' },
        }}
      />
      <Cursor
        className="multifollow-outer"
        spring={{ stiffness: 700, damping: 90 }}
        variants={{
          default: { scale: 1, borderColor: '#9911ff' },
          pressed: { scale: 0.8, borderColor: '#1e75f7' },
        }}
      />
    </Stage>
  );
}

export default CursorMultifollow;
