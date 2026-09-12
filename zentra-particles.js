
(() => {
  const canvas = document.getElementById("zentra-particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(
      75,
      Math.max(28, Math.floor((w * h) / 18000))
    );

    particles = Array.from({length: count}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.4 + 0.7,
      vx: (Math.random() - .5) * .75,
      vy: (Math.random() - .5) * .75,
      a: Math.random() * .75 + .25,
      pulse: Math.random() * Math.PI * 2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += .045;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const alpha = p.a + Math.sin(p.pulse) * .12;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,55,150,${alpha})`;
      ctx.fill();
    }

    // Connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 125) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle =
            `rgba(180,40,255,${(1 - dist / 125) * .10})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize, {passive:true});
  resize();
  draw();
})();
