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
const curveSamples = curves.map((points) =>
  Array.from({ length: 81 }, (_, step) => {
    const t = step / 80;
    const segment = t < 0.5 ? 0 : 3;
    const v = t < 0.5 ? t * 2 : (t - 0.5) * 2;
    const u = 1 - v;
    const p = points.slice(segment, segment + 4);
    return {
      t,
      envelope: Math.sin(Math.PI * t),
      cos5: Math.cos(t * 5),
      sin4: Math.sin(t * 4 + curves.indexOf(points)),
      baseX:
        u ** 3 * p[0][0] + 3 * u * u * v * p[1][0] + 3 * u * v * v * p[2][0] + v ** 3 * p[3][0],
      baseY:
        u ** 3 * p[0][1] + 3 * u * u * v * p[1][1] + 3 * u * v * v * p[2][1] + v ** 3 * p[3][1],
      spread: 0,
      wave: 0,
    };
  }),
);

export function drawRibbons(ctx, canvas, now, pointer) {
  ctx.setTransform(canvas.width / 640, 0, 0, canvas.height / 640, 0, 0);
  ctx.clearRect(0, 0, 640, 640);
  ctx.globalCompositeOperation = 'lighter';
  const time = now / 1000;
  curveSamples.forEach((samples, index) => {
    for (const sample of samples) {
      sample.spread = 75 + 32 * Math.sin(sample.t * Math.PI * 2 + time * 0.16 + index * 1.7);
      sample.wave = Math.sin(sample.t * 9 - time * 0.3 + index) * 12 * sample.envelope;
    }
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
      for (let step = 0; step < samples.length; step++) {
        const sample = samples[step];
        const spread = offset * sample.spread;
        const wave = sample.wave;
        const x = sample.baseX + sample.envelope * (spread + wave + pointer.x * 37 * sample.sin4);
        const y = sample.baseY + sample.envelope * (spread * sample.cos5 + wave + pointer.y * 32);
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
}
