import { useEffect, useRef } from 'react';

const curves = [
  [
    [-40, 590],
    [90, 610],
    [175, 395],
    [240, 445],
    [330, 480],
    [385, 600],
    [465, 545],
  ],
  [
    [185, 165],
    [250, 175],
    [345, 310],
    [440, 225],
    [530, 145],
    [555, -25],
    [660, 10],
  ],
  [
    [390, 405],
    [500, 425],
    [470, 220],
    [520, 105],
    [550, 40],
    [585, -35],
    [645, -65],
  ],
];
export default function HeroBackdrop() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current,
      ctx = canvas.getContext('2d');
    if (!ctx) return;
    const hero = canvas.closest('.hero'),
      backdrop = canvas.parentElement;
    const symbol = hero.querySelector('.hero-symbol-motion');
    const art = hero.querySelector('.hero-art');
    const symbolPointer = { x: 0, y: 0, energy: 0, tx: 0, ty: 0, targetEnergy: 0 };
    let frame,
      previous = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const resize = () => {
      const size = Math.round(canvas.clientWidth * Math.min(devicePixelRatio || 1, 2));
      canvas.width = size;
      canvas.height = size;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
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
    };
    const leave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      symbolPointer.tx = 0;
      symbolPointer.ty = 0;
      symbolPointer.targetEnergy = 0;
    };
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    const render = (now) => {
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
      ctx.setTransform(canvas.width / 640, 0, 0, canvas.height / 640, 0, 0);
      ctx.clearRect(0, 0, 640, 640);
      ctx.globalCompositeOperation = 'lighter';
      const time = now / 1000;
      curves.forEach((points, index) => {
        const gradient =
          index === 0
            ? ctx.createLinearGradient(-40, 590, 465, 545)
            : ctx.createLinearGradient(185, 165, 620, 20);
        gradient.addColorStop(0, '#168dff00');
        gradient.addColorStop(0.22, '#238eff');
        gradient.addColorStop(0.58, index === 0 ? '#329cff' : '#6369ff');
        gradient.addColorStop(0.85, index === 0 ? '#246bd9' : '#a078ff');
        gradient.addColorStop(1, '#8c5eff00');
        ctx.strokeStyle = gradient;
        for (let strand = 0; strand < 64; strand++) {
          const offset = (strand - 31.5) / 31.5;
          ctx.beginPath();
          for (let step = 0; step <= 80; step++) {
            const t = step / 80,
              envelope = Math.sin(Math.PI * t);
            const segment = t < 0.5 ? 0 : 3,
              v = t < 0.5 ? t * 2 : (t - 0.5) * 2,
              u = 1 - v;
            const p = points.slice(segment, segment + 4);
            const spread =
              offset * (75 + 32 * Math.sin(t * Math.PI * 2 + time * 0.16 + index * 1.7));
            const wave = Math.sin(t * 9 - time * 0.3 + index) * 12 * envelope;
            const x =
              u ** 3 * p[0][0] +
              3 * u * u * v * p[1][0] +
              3 * u * v * v * p[2][0] +
              v ** 3 * p[3][0] +
              envelope * (spread + wave + pointer.x * 37 * Math.sin(t * 4 + index));
            const y =
              u ** 3 * p[0][1] +
              3 * u * u * v * p[1][1] +
              3 * u * v * v * p[2][1] +
              v ** 3 * p[3][1] +
              envelope * (spread * Math.cos(t * 5 + index) + wave + pointer.y * 32);
            if (step === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.globalAlpha = 0.13 + 0.22 * (1 - Math.abs(offset));
          ctx.lineWidth = strand % 13 === 0 ? 1 : 0.55;
          ctx.stroke();
        }
      });
      for (let i = 0; i < 36; i++) {
        ctx.globalAlpha = 0.12 + (0.22 * (1 + Math.sin(time * 0.7 + i))) / 2;
        ctx.fillStyle = '#92baff';
        ctx.beginPath();
        ctx.arc(
          100 + ((i * 137.5) % 450) + Math.sin(time * 0.23 + i) * 12,
          90 + ((i * 91.3) % 460) + Math.cos(time * 0.2 + i) * 17,
          i % 5 === 0 ? 1.7 : 0.85,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
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
