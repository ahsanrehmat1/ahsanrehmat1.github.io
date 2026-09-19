(() => {
  const supported = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const ball = document.createElement('div');
  ball.className = 'cursor-ball';
  ball.setAttribute('aria-hidden', 'true');
  document.body.append(ball);
  let x = 0, y = 0, targetX = 0, targetY = 0, frame = 0, active = false, last = 0;
  const enabled = () => supported.matches && !reduced.matches;
  function hide() {
    active = false;
    ball.classList.remove('is-visible', 'is-link');
    document.documentElement.classList.remove('custom-cursor-active');
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
  }
  function draw(time) {
    const alpha = 1 - Math.exp(-Math.min(time - (last || time - 16), 50) / 75);
    last = time;
    x += (targetX - x) * alpha;
    y += (targetY - y) * alpha;
    ball.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (Math.abs(targetX - x) + Math.abs(targetY - y) > .1 && active) frame = requestAnimationFrame(draw);
    else { frame = 0; last = 0; }
  }
  function updateTarget(element) {
    if (!element || element.closest('video, iframe, input, textarea, select, [contenteditable="true"]')) { hide(); return false; }
    ball.classList.toggle('is-link', !!element.closest('a, button, summary'));
    return true;
  }
  document.addEventListener('pointermove', event => {
    if (!enabled() || event.pointerType !== 'mouse' || !updateTarget(event.target)) { hide(); return; }
    targetX = event.clientX; targetY = event.clientY;
    if (!active) {
      x = targetX; y = targetY;
      ball.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      active = true;
      ball.classList.add('is-visible');
      document.documentElement.classList.add('custom-cursor-active');
    }
    if (!frame) frame = requestAnimationFrame(draw);
  }, {passive: true});
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) hide(); });
  document.addEventListener('keydown', hide);
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  document.addEventListener('fullscreenchange', hide);
  window.addEventListener('blur', hide);
  window.addEventListener('scroll', () => { if (active) updateTarget(document.elementFromPoint(targetX, targetY)); }, {passive:true});
  supported.addEventListener('change', hide);
  reduced.addEventListener('change', hide);
})();
