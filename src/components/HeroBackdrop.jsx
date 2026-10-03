import { drawRibbons } from '../hero-ribbons.js';
import { useEffect, useRef } from 'react';

export default function HeroBackdrop() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const useWorker =
      typeof Worker !== 'undefined' && typeof canvas.transferControlToOffscreen === 'function';
    let worker = null;
    let ctx = null;
    let initialized = false;
    const hero = canvas.closest('.hero'),
      backdrop = canvas.parentElement;
    const symbol = hero.querySelector('.hero-symbol-motion');
    const art = hero.querySelector('.hero-art');
    const symbolPointer = { x: 0, y: 0, energy: 0, tx: 0, ty: 0, targetEnergy: 0 };
    let frame = 0;
    let previous = 0;
    let active = false;
    const frameInterval = useWorker ? 0 : 1000 / 30;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const resize = () => {
      if (!initialized) return;
      const size = Math.round(canvas.clientWidth * Math.min(devicePixelRatio || 1, 2));
      if (worker) worker.postMessage({ type: 'resize', size });
      else {
        canvas.width = size;
        canvas.height = size;
      }
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const initializeRenderer = () => {
      if (initialized) return;
      if (useWorker) {
        worker = new Worker(new URL('../hero-ribbons.worker.js', import.meta.url), {
          type: 'module',
        });
        const offscreen = canvas.transferControlToOffscreen();
        worker.postMessage({ type: 'init', canvas: offscreen }, [offscreen]);
      } else ctx = canvas.getContext('2d');
      initialized = true;
      resize();
    };
    const move = (event) => {
      if (event.pointerType === 'mouse') {
        const bounds = art.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
        const energy = Math.max(0, 1 - Math.hypot(x, y) / 1.5);
        symbolPointer.tx = Math.max(-1, Math.min(1, x)) * energy;
        symbolPointer.ty = Math.max(-1, Math.min(1, y)) * energy;
        symbolPointer.targetEnergy = energy;
      }

      const rect = canvas.getBoundingClientRect();
      pointer.tx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
      pointer.ty = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
      if (worker) {
        worker.postMessage({ type: 'pointer', x: pointer.tx, y: pointer.ty });
        schedule();
      }
    };
    const leave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      symbolPointer.tx = 0;
      symbolPointer.ty = 0;
      symbolPointer.targetEnergy = 0;
      if (worker) {
        worker.postMessage({ type: 'pointer', x: 0, y: 0 });
        schedule();
      }
    };
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    const render = (now) => {
      frame = 0;
      if (!active) return;
      if (previous && now - previous < frameInterval) {
        frame = requestAnimationFrame(render);
        return;
      }
      const ease = 1 - Math.exp(-Math.min(now - (previous || now), 64) / 220);
      previous = now;
      symbolPointer.x += (symbolPointer.tx - symbolPointer.x) * ease;
      symbolPointer.y += (symbolPointer.ty - symbolPointer.y) * ease;
      symbolPointer.energy += (symbolPointer.targetEnergy - symbolPointer.energy) * ease;
      if (symbol) {
        symbol.style.setProperty('--symbol-x', symbolPointer.x * 18 + 'px');
        symbol.style.setProperty('--symbol-y', symbolPointer.y * 12 + 'px');
        symbol.style.setProperty('--symbol-rotate-x', -symbolPointer.y * 12 + 'deg');
        symbol.style.setProperty('--symbol-rotate-y', symbolPointer.x * 16 + 'deg');
        symbol.style.setProperty('--symbol-roll', -symbolPointer.x * 3 + 'deg');
        symbol.style.setProperty('--symbol-energy', symbolPointer.energy);
      }

      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
      backdrop.style.setProperty('--ribbon-x', `${pointer.x * 16}px`);
      backdrop.style.setProperty('--ribbon-y', `${pointer.y * 12}px`);
      if (!worker && ctx) drawRibbons(ctx, canvas, now, pointer);
      if (
        !worker ||
        Math.abs(symbolPointer.x - symbolPointer.tx) > 0.001 ||
        Math.abs(symbolPointer.y - symbolPointer.ty) > 0.001 ||
        Math.abs(symbolPointer.energy - symbolPointer.targetEnergy) > 0.001 ||
        Math.abs(pointer.x - pointer.tx) > 0.001 ||
        Math.abs(pointer.y - pointer.ty) > 0.001
      )
        frame = requestAnimationFrame(render);
    };
    const schedule = () => {
      if (active && !frame) frame = requestAnimationFrame(render);
    };
    const onVisibility = () => {
      const bounds = canvas.getBoundingClientRect();
      active = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
      if (active) initializeRenderer();
      if (worker) worker.postMessage({ type: 'active', active });
      if (active) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
    };
    const visibility = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting && !document.hidden;
      if (active) initializeRenderer();
      if (worker) worker.postMessage({ type: 'active', active });
      if (active) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
    });
    visibility.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      worker?.terminate();
      document.removeEventListener('visibilitychange', onVisibility);
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
    };
  }, []);
  return (
    <div className="hero-backdrop">
      <div className="hero-aura hero-aura-blue" />
      <div className="hero-aura hero-aura-violet" />
      <canvas ref={canvasRef} className="hero-ribbons" />
      <div className="hero-core-glow" />
    </div>
  );
}
