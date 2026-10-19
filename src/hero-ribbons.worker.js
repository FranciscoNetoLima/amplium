import { drawRibbons } from './hero-ribbons.js';
let canvas;
let ctx;
let timer;
let active = true;
let lowPower = false;
const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
const tick = () => {
  if (!active || !ctx || !canvas.width) return;
  pointer.x += (pointer.tx - pointer.x) * 0.15;
  pointer.y += (pointer.ty - pointer.y) * 0.15;
  drawRibbons(ctx, canvas, performance.now(), pointer, lowPower ? 44 : 64);
  timer = setTimeout(tick, 1000 / (lowPower ? 24 : 30));
};
self.onmessage = ({ data }) => {
  if (data.type === 'init') {
    canvas = data.canvas;
    lowPower = data.lowPower;
    ctx = canvas.getContext('2d');
  } else if (data.type === 'resize') {
    canvas.width = data.size;
    canvas.height = data.size;
    if (active && !timer) tick();
  } else if (data.type === 'pointer') {
    pointer.tx = data.x;
    pointer.ty = data.y;
  } else if (data.type === 'active') {
    active = data.active;
    clearTimeout(timer);
    timer = 0;
    if (active) tick();
  }
};
