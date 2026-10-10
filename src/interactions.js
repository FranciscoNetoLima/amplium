import { t } from './i18n.js';
export function initializeInteractions() {
  let disposed = false;
  const listeners = [],
    observers = [],
    restores = [];
  const frames = new Set(),
    timers = new Set();
  const listen = (target, type, callback, options) => {
    target.addEventListener(type, callback, options);
    listeners.push(() => target.removeEventListener(type, callback, options));
  };
  const requestAnimationFrame = (callback) => {
    const id = window.requestAnimationFrame((time) => {
      frames.delete(id);
      if (!disposed) callback(time);
    });
    frames.add(id);
    return id;
  };
  const cancelAnimationFrame = (id) => {
    window.cancelAnimationFrame(id);
    frames.delete(id);
  };
  const clearInterval = (id) => {
    window.clearInterval(id);
    timers.delete(id);
  };
  const setInterval = (callback, delay) => {
    const id = window.setInterval(callback, delay);
    timers.add(id);
    return id;
  };
  const observeIntersection = (...args) => {
    const observer = new window.IntersectionObserver(...args);
    observers.push(observer);
    return observer;
  };
  // Títulos separados por linha para a animação de entrada.
  document.querySelectorAll('.hero h1,.section h2,.closing h2').forEach((heading) => {
    if (heading.querySelector(':scope > .motion-line')) return;
    const nodes = [...heading.childNodes];
    const original = nodes.map((node) => node.cloneNode(true));
    restores.push(() => heading.replaceChildren(...original));
    heading.replaceChildren();
    let lineIndex = 0;
    const newLine = () => {
      const line = document.createElement('span');
      line.className = 'motion-line';
      const inner = document.createElement('span');
      inner.className = 'motion-line-inner';
      inner.style.setProperty('--line-delay', `${lineIndex++ * 0.16}s`);
      line.append(inner);
      heading.append(line);
      return inner;
    };
    let inner = newLine();
    nodes.forEach((node) => {
      if (node.nodeName === 'BR') inner = newLine();
      else inner.append(node);
    });
  });
  document.querySelectorAll('.services-grid,.process,.footer-grid').forEach((group) => {
    [...group.children].forEach((item, index) =>
      item.style.setProperty('--reveal-delay', `${(index % 3) * 0.14}s`),
    );
  });
  const progress = document.createElement('aside');
  progress.className = 'scroll-indicator';
  progress.setAttribute('aria-hidden', 'true');
  const progressFill = document.createElement('span');
  progressFill.className = 'scroll-indicator-fill';
  progress.append(progressFill);
  document.body.append(progress);
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.links');
  const navItems = [...links.querySelectorAll('[data-nav-section]')];
  const navSections = navItems.map((item) => document.getElementById(item.dataset.navSection));
  let navFrame = 0;
  const updateNav = () => {
    navFrame = 0;
    const scrollRange = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty(
      '--scroll-progress',
      scrollRange > 0 ? Math.max(0, Math.min(1, scrollY / scrollRange)) : 0,
    );
    document
      .querySelector('.hero-art')
      .style.setProperty('--hero-parallax', `${Math.min(scrollY, innerHeight) * 0.06}px`);
    let current = -1;
    navSections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top <= 160) current = i;
    });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4)
      current = navItems.length - 1;
    navItems.forEach((link, i) => {
      if (i === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };
  listen(
    window,
    'scroll',
    () => {
      if (!navFrame) navFrame = requestAnimationFrame(updateNav);
    },
    { passive: true },
  );
  listen(window, 'resize', updateNav);
  updateNav();
  const scrim = document.querySelector('.nav-scrim');
  let lockedScrollY = null;
  let previousBodyStyles;
  const unlockPage = () => {
    if (lockedScrollY === null) return;
    const scrollPosition = lockedScrollY;
    lockedScrollY = null;
    Object.assign(document.body.style, previousBodyStyles);
    window.scrollTo({ top: scrollPosition, behavior: 'instant' });
  };
  const setMenuOpen = (open) => {
    if (open && lockedScrollY === null && innerWidth <= 980) {
      stopScroll();
      lockedScrollY = scrollY;
      previousBodyStyles = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        right: document.body.style.right,
        width: document.body.style.width,
      };
      Object.assign(document.body.style, {
        position: 'fixed',
        top: `-${lockedScrollY}px`,
        left: '0',
        right: '0',
        width: '100%',
      });
    } else if (!open) {
      unlockPage();
      window.dispatchEvent(new Event('navmenuclose'));
    }
    links.classList.toggle('open', open);
    scrim.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', t(open ? 'Fechar menu' : 'Abrir menu'));
  };
  restores.push(unlockPage);
  const closeMenu = () => setMenuOpen(false);
  listen(menu, 'click', () => setMenuOpen(!links.classList.contains('open')));
  listen(scrim, 'click', closeMenu);
  listen(window, 'resize', () => {
    if (innerWidth > 980 && links.classList.contains('open')) closeMenu();
  });
  links.querySelectorAll('a').forEach((link) => listen(link, 'click', closeMenu));
  listen(document, 'keydown', (event) => {
    if (event.key === 'Escape' && links.classList.contains('open')) {
      closeMenu();
      menu.focus();
    }
  });

  // Equal-sized groups include their trailing gap, so -50% is exactly one lap.
  const loopSources = [];
  for (const track of document.querySelectorAll('.marquee, .tech-track')) {
    const items = [...track.children].filter((item) => item.getAttribute('aria-hidden') !== 'true');
    const original = items.map((item) => item.cloneNode(true));
    restores.push(() => track.replaceChildren(...original));
    const group = document.createElement('div');
    group.className = 'loop-group';
    group.append(...items);
    loopSources.push({ track, template: group.cloneNode(true) });
  }
  const fitLoops = () =>
    loopSources.forEach(({ track, template }) => {
      const group = template.cloneNode(true);
      const localize = (root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (walker.nextNode())
          walker.currentNode.textContent = t(walker.currentNode.textContent);
        root
          .querySelectorAll('[aria-label]')
          .forEach((element) =>
            element.setAttribute('aria-label', t(element.getAttribute('aria-label'))),
          );
      };
      localize(group);
      track.replaceChildren(group);
      // A lap must cover the viewport even on ultrawide displays.
      for (
        let copies = 0;
        group.getBoundingClientRect().width < track.parentElement.clientWidth && copies < 12;
        copies++
      ) {
        for (const item of template.children) {
          const copy = item.cloneNode(true);
          localize(copy);
          copy.setAttribute('aria-hidden', 'true');
          group.append(copy);
        }
      }
      const duplicate = group.cloneNode(true);
      duplicate.setAttribute('aria-hidden', 'true');
      track.append(duplicate);
      // Match distance per second across viewport widths and translated labels.
      const pixelsPerSecond = track.classList.contains('tech-track') ? 75 : 60;
      track.style.animationDuration = `${group.getBoundingClientRect().width / pixelsPerSecond}s`;
    });
  fitLoops();
  listen(window, 'resize', fitLoops);

  const solutions = document.querySelector('#solucoes');
  const rail = document.querySelector('#rail');
  const solutionCards = [...rail.children];
  const currentSolution = document.querySelector('#solution-current');
  let solutionTravel = 0;
  let solutionRange = 1;
  let solutionFrame = 0;
  const renderSolutions = () => {
    solutionFrame = 0;
    const distance = -solutions.getBoundingClientRect().top;
    const ratio = Math.max(0, Math.min(1, distance / solutionRange));
    rail.style.transform = 'translate3d(' + -ratio * solutionTravel + 'px,0,0)';
    solutions.style.setProperty('--solution-progress', ratio);
    const index = Math.min(
      solutionCards.length - 1,
      Math.round(ratio * (solutionCards.length - 1)),
    );
    currentSolution.textContent = String(index + 1).padStart(2, '0');
    solutionCards.forEach((card, i) => card.classList.toggle('is-current', i === index));
  };
  const scheduleSolutions = () => {
    if (!solutionFrame) solutionFrame = requestAnimationFrame(renderSolutions);
  };
  const measureSolutions = () => {
    const sticky = solutions.querySelector('.solutions-sticky');
    const header = solutions.querySelector('.solutions-header');
    const bottom = solutions.querySelector('.solutions-bottom');
    const stickyStyle = getComputedStyle(sticky);
    const available =
      sticky.clientHeight -
      parseFloat(stickyStyle.paddingTop) -
      parseFloat(stickyStyle.paddingBottom) -
      header.offsetHeight -
      parseFloat(getComputedStyle(header).marginBottom) -
      bottom.offsetHeight -
      parseFloat(getComputedStyle(bottom).marginTop);
    const mobile = innerWidth <= 800;
    const cardLimit = mobile ? (sticky.clientHeight <= 680 ? 340 : 400) : 600;
    solutions.style.setProperty(
      '--solution-card-height',
      `${Math.max(mobile ? 160 : 260, Math.min(cardLimit, available))}px`,
    );
    solutionTravel = Math.max(0, rail.scrollWidth - rail.parentElement.clientWidth);
    solutionRange = Math.max(solutionTravel, sticky.clientHeight * 1.5);
    solutions.style.height = sticky.offsetHeight + solutionRange + 'px';
    renderSolutions();
  };
  const revealSolution = (index) => {
    const start = scrollY + solutions.getBoundingClientRect().top;
    smoothTo(
      start +
        (Math.max(0, Math.min(solutionCards.length - 1, index)) / (solutionCards.length - 1)) *
          solutionRange,
    );
  };
  listen(rail, 'keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const index = solutionCards.findIndex((card) => card.classList.contains('is-current'));
    revealSolution(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  listen(rail, 'focusin', (event) => {
    const card = event.target.closest('.solution-card');
    if (card) revealSolution(solutionCards.indexOf(card));
  });
  listen(window, 'scroll', scheduleSolutions, { passive: true });
  let solutionViewportWidth = innerWidth;
  listen(window, 'resize', () => {
    if (innerWidth > 800 || innerWidth !== solutionViewportWidth) {
      solutionViewportWidth = innerWidth;
      measureSolutions();
    } else scheduleSolutions();
  });
  document.fonts.ready.then(() => {
    if (disposed) return;
    fitLoops();
    measureSolutions();
    // React mounts after the browser's initial anchor lookup.
    const destination = document.getElementById(location.hash.slice(1));
    if (destination) {
      const margin = parseFloat(getComputedStyle(destination).scrollMarginTop) || 0;
      window.scrollTo({
        top:
          location.hash === '#inicio'
            ? 0
            : scrollY + destination.getBoundingClientRect().top - margin,
        behavior: 'instant',
      });
    }
  });
  measureSolutions();

  solutionCards.forEach((card) => {
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const paintPointer = () => {
      pointerFrame = 0;
      const bounds = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (pointerX - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (pointerY - bounds.top) / bounds.height));
      card.style.setProperty('--pointer-x', `${x * 100}%`);
      card.style.setProperty('--pointer-y', `${y * 100}%`);
      card.style.setProperty('--mouse-x', `${(x - 0.5) * 10}px`);
      card.style.setProperty('--mouse-y', `${(y - 0.5) * 8}px`);
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 2.5}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 3}deg`);
    };
    const followPointer = (event) => {
      if (event.pointerType !== 'mouse') return;
      card.classList.add('pointer-active');
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
    };
    const resetPointer = () => {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      card.classList.remove('pointer-active');
      ['--pointer-x', '--pointer-y', '--mouse-x', '--mouse-y', '--tilt-x', '--tilt-y'].forEach(
        (name) => card.style.removeProperty(name),
      );
    };
    listen(card, 'pointerenter', followPointer);
    listen(card, 'pointermove', followPointer);
    listen(card, 'pointerleave', resetPointer);
    listen(card, 'pointercancel', resetPointer);
    listen(window, 'pagehide', resetPointer);
  });

  document.querySelectorAll('#metodo .process-card').forEach((card) => {
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const paintPointer = () => {
      pointerFrame = 0;
      const bounds = card.getBoundingClientRect();
      const x = Math.max(-0.5, Math.min(0.5, (pointerX - bounds.left) / bounds.width - 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (pointerY - bounds.top) / bounds.height - 0.5));
      card.style.setProperty('--method-mouse-x', `${x * 16}px`);
      card.style.setProperty('--method-mouse-y', `${y * 12}px`);
      card.style.setProperty('--method-tilt-x', `${-y * 6}deg`);
      card.style.setProperty('--method-tilt-y', `${x * 8}deg`);
    };
    const followPointer = (event) => {
      if (event.pointerType !== 'mouse') return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(paintPointer);
    };
    const resetPointer = () => {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      ['--method-mouse-x', '--method-mouse-y', '--method-tilt-x', '--method-tilt-y'].forEach(
        (name) => card.style.removeProperty(name),
      );
    };
    listen(card, 'pointerenter', followPointer);
    listen(card, 'pointermove', followPointer, { passive: true });
    listen(card, 'pointerleave', resetPointer);
    listen(card, 'pointercancel', resetPointer);
    listen(window, 'blur', resetPointer);
    restores.push(resetPointer);
  });

  const capture = document.querySelector('#captacao');
  const stages = [...capture.querySelectorAll('.flow-stage')];
  const stageNote = capture.querySelector('#capture-stage-note');
  const notes = [
    'Anúncios apresentam sua oferta a potenciais clientes.',
    'A landing page organiza a oferta e conduz ao próximo passo.',
    'O contato transforma o interesse em uma oportunidade de conversa.',
    'O CRM acompanha oportunidades, vendas e métricas das campanhas.',
  ];
  let stageIndex = 0;
  let stageTimer = 0;
  let captureVisible = false;
  let interacting = false;
  let manuallySelected = false;
  const selectStage = (index) => {
    stageIndex = (index + stages.length) % stages.length;
    stages.forEach((button, i) => button.setAttribute('aria-pressed', String(i === stageIndex)));
    stageNote.textContent = t(notes[stageIndex]);
  };
  const cycleStages = () => {
    clearInterval(stageTimer);
    stageTimer = 0;
    if (captureVisible && !interacting && !manuallySelected && !document.hidden) {
      stageTimer = setInterval(() => selectStage(stageIndex + 1), 4200);
    }
  };
  stages.forEach((button, index) => {
    listen(button, 'click', () => {
      manuallySelected = true;
      stageNote.setAttribute('aria-live', 'polite');
      selectStage(index);
      cycleStages();
    });
    listen(button, 'keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) return;
      event.preventDefault();
      const next =
        (index + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + stages.length) %
        stages.length;
      stages[next].focus();
      stages[next].click();
    });
  });
  listen(capture, 'pointerenter', () => {
    interacting = true;
    cycleStages();
  });
  listen(capture, 'pointerleave', () => {
    interacting = capture.contains(document.activeElement);
    capture.style.removeProperty('--flow-x');
    capture.style.removeProperty('--flow-y');
    cycleStages();
  });
  listen(capture, 'pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = capture.getBoundingClientRect();
    capture.style.setProperty(
      '--flow-x',
      `${((event.clientX - rect.left - rect.width / 2) / rect.width) * 8}px`,
    );
    capture.style.setProperty(
      '--flow-y',
      `${((event.clientY - rect.top - rect.height / 2) / rect.height) * 8}px`,
    );
  });
  listen(capture, 'focusin', () => {
    interacting = true;
    cycleStages();
  });
  listen(capture, 'focusout', (event) => {
    if (!capture.contains(event.relatedTarget)) {
      interacting = capture.matches(':hover');
      cycleStages();
    }
  });
  listen(document, 'visibilitychange', cycleStages);
  if ('IntersectionObserver' in window) {
    const captureObserver = observeIntersection(
      (entries) => {
        captureVisible = entries[0].isIntersecting;
        if (!captureVisible && !manuallySelected) selectStage(0);
        cycleStages();
      },
      { threshold: 0.2 },
    );
    captureObserver.observe(capture);
  } else {
    captureVisible = true;
    cycleStages();
  }
  listen(window, 'pagehide', () => clearInterval(stageTimer));

  // Each meaningful element reveals according to its own viewport position.
  // No timed entrance continues after scrolling stops; parent sections stay opaque.
  document.querySelectorAll('.reveal').forEach((element) => {
    const wasPending = element.classList.contains('reveal-pending');
    element.classList.remove('reveal', 'reveal-pending');
    restores.push(() => {
      element.classList.add('reveal');
      if (wasPending) element.classList.add('reveal-pending');
    });
  });
  const revealSelector = [
    '.section-head .eyebrow',
    '.section-head h2',
    '.section-head > p',
    '.service-card > .service-number',
    '.service-card > h3',
    '.service-card > p',
    '.service-card > .service-visual',
    '.service-card > .service-caption',
    '.capture-copy > *',
    '.capture-flow-label',
    '.capture-step',
    '.capture-stage-note',
    '.capture-benefits > li',
    '.solutions-header .eyebrow',
    '.solutions-header h2',
    '.solutions-header p',
    '.solutions-counter',
    '.solution-art',
    '.solution-copy > *',
    '.solutions-bottom',
    '.portfolio-preview',
    '.portfolio-copy > *',
    '.process-card > *',
    '.tech-caption',
    '.tech-strip',
    '.closing-inner > .eyebrow',
    '.closing-inner > h2',
    '.closing-inner > p',
    '.brief-progress-head',
    '.brief-progress',
    '.brief-step h3',
    '.brief-step-note',
    '.brief-choice',
    '.brief-fields > label',
    '.brief-review > label',
    '.brief-edit-links > button',
    '.brief-wizard-actions > *',
    '.brief-direct',
    '.faq-item',
    '.footer-intro > *',
    '.footer-column > h4',
    '.footer-column li',
    '.footer-bottom > *',
    '.footer-wordmark',
  ].join(',');
  const revealItems = new Map();
  let revealFrame = 0;
  const revealResize = new ResizeObserver(() => {
    registerReveals();
    scheduleReveals();
  });
  observers.push(revealResize);
  const registerReveals = () => {
    for (const [element] of revealItems) {
      if (!element.isConnected) {
        revealResize.unobserve(element);
        revealItems.delete(element);
      }
    }
    // Read every initial opacity before adding classes that invalidate styles.
    const additions = [...document.querySelectorAll(revealSelector)]
      .filter((element) => !element.closest('.hero') && !revealItems.has(element))
      .map((element) => ({ element, originalOpacity: getComputedStyle(element).opacity }));
    additions.forEach(({ element, originalOpacity }) => {
      element.classList.add('scroll-reveal');
      revealResize.observe(element);
      revealItems.set(element, {
        shift: 0,
        progress: 0,
        baseOpacity: Number(originalOpacity) || 1,
        opacity: element.style.opacity,
        filter: element.style.filter,
        painted: false,
      });
    });
  };
  let revealTime = 0;
  const renderReveals = (time) => {
    revealFrame = 0;
    const elapsed = Math.min(
      64,
      Math.max(16, (time || performance.now()) - (revealTime || time || performance.now())),
    );
    revealTime = time || performance.now();
    let settling = false;
    const viewport = innerHeight;
    const measurements = [];
    revealItems.forEach((state, element) => {
      if (!element.isConnected) return;
      const bounds = element.getBoundingClientRect();
      const top = bounds.top - state.shift;
      const height = bounds.height;
      // Reveal over the visible screen area, completing at the viewport edge.
      // A pinned section needs no extra document scroll to become sharp.
      const visibleVertical = Math.min(height, Math.max(0, viewport - top));
      let value = Math.max(0, Math.min(1, visibleVertical / Math.min(height || 1, viewport)));
      if (element.closest('.solution-card')) {
        const screen = element.closest('.solutions-viewport').getBoundingClientRect();
        const right = Math.min(innerWidth, screen.right);
        const width = Math.min(bounds.width, right - Math.max(0, screen.left));
        const visibleHorizontal = Math.min(bounds.width, Math.max(0, right - bounds.left));
        const horizontal = Math.max(0, Math.min(1, visibleHorizontal / Math.max(1, width)));
        value = Math.min(value, horizontal);
      }
      if (element.matches(':focus-within')) value = 1;
      if (!height || getComputedStyle(element).display === 'none') return;
      measurements.push({ element, state, value });
    });
    // Separate layout reads from style writes and preserve hover transforms.
    measurements.forEach(({ element, state, value }) => {
      const difference = value - state.progress;
      if (!difference && state.painted) return;
      if (Math.abs(difference) > 0.001) {
        state.progress += difference * (1 - Math.exp(-elapsed / 180));
        settling = true;
      } else state.progress = value;
      state.shift = (1 - state.progress) * 48;
      element.style.setProperty('--element-reveal', state.progress.toFixed(4));
      element.style.setProperty('--element-shift', state.shift.toFixed(3) + 'px');
      element.style.opacity = String(state.progress * state.baseOpacity);
      element.style.filter = 'blur(' + ((1 - state.progress) * 8).toFixed(3) + 'px)';
      state.painted = true;
    });
    if (settling) scheduleReveals();
  };
  const scheduleReveals = () => {
    if (!revealFrame) revealFrame = requestAnimationFrame(renderReveals);
  };
  registerReveals();
  renderReveals();
  listen(window, 'scroll', scheduleReveals, { passive: true });
  listen(window, 'resize', scheduleReveals);
  listen(document, 'focusin', scheduleReveals);
  listen(document, 'focusout', scheduleReveals);
  // React replaces questionnaire steps and expands FAQ answers after mount.
  const revealChanges = new MutationObserver(() => {
    registerReveals();
    scheduleReveals();
  });
  document
    .querySelectorAll('#contato, #faq')
    .forEach((root) => revealChanges.observe(root, { childList: true, subtree: true }));
  observers.push(revealChanges);
  document.fonts.ready.then(() => {
    if (!disposed) scheduleReveals();
  });
  restores.push(() =>
    revealItems.forEach((state, element) => {
      element.classList.remove('scroll-reveal');
      element.style.removeProperty('--element-reveal');
      element.style.removeProperty('--element-shift');
      element.style.opacity = state.opacity;
      element.style.filter = state.filter;
    }),
  );

  // One frame-driven vertical scroll handles wheels, keyboard and anchors.
  // Native touch inertia and direct scrollbar dragging stay under browser control.
  let scrollFrame = 0;
  let scrollTarget = scrollY;
  let previousTime = 0;
  const clampScroll = (value) =>
    Math.max(0, Math.min(value, document.documentElement.scrollHeight - innerHeight));
  const stopScroll = () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    previousTime = 0;
    scrollTarget = scrollY;
  };
  const stepScroll = (time) => {
    const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
    previousTime = time;
    scrollTarget = clampScroll(scrollTarget);
    const distance = scrollTarget - scrollY;
    if (Math.abs(distance) < 0.75) {
      window.scrollTo({ top: scrollTarget, behavior: 'instant' });
      stopScroll();
      return;
    }
    window.scrollTo({
      top: scrollY + distance * (1 - Math.exp(-elapsed / 180)),
      behavior: 'instant',
    });
    scrollFrame = requestAnimationFrame(stepScroll);
  };
  const smoothTo = (value) => {
    scrollTarget = clampScroll(value);
    if (!scrollFrame) scrollFrame = requestAnimationFrame(stepScroll);
  };
  const ownsVerticalScroll = (element) => {
    for (let node = element; node && node !== document.body; node = node.parentElement) {
      if (
        node.scrollHeight > node.clientHeight + 1 &&
        /auto|scroll/.test(getComputedStyle(node).overflowY)
      )
        return true;
    }
    return false;
  };
  listen(
    window,
    'wheel',
    (event) => {
      if (lockedScrollY !== null) {
        if (links.contains(event.target) && ownsVerticalScroll(event.target)) return;
        event.preventDefault();
        return;
      }
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        ownsVerticalScroll(event.target)
      )
        return;
      event.preventDefault();
      const delta =
        event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      smoothTo((scrollFrame ? scrollTarget : scrollY) + delta);
    },
    { passive: false },
  );
  listen(document, 'keydown', (event) => {
    if (lockedScrollY !== null) return;
    if (
      event.defaultPrevented ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.target.closest('input,textarea,select,button,a,[contenteditable="true"]') ||
      ownsVerticalScroll(event.target)
    )
      return;
    const page = innerHeight * 0.85;
    const delta = {
      ArrowDown: 80,
      ArrowUp: -80,
      PageDown: page,
      PageUp: -page,
      ' ': event.shiftKey ? -page : page,
    }[event.key];
    if (delta !== undefined || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      smoothTo(
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? document.documentElement.scrollHeight
            : (scrollFrame ? scrollTarget : scrollY) + delta,
      );
    }
  });
  listen(document, 'click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (
      !anchor ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    const destination = document.getElementById(anchor.hash.slice(1));
    if (!destination) return;
    event.preventDefault();
    history.pushState(null, '', anchor.hash);
    const margin = parseFloat(getComputedStyle(destination).scrollMarginTop) || 0;
    smoothTo(
      anchor.hash === '#inicio' ? 0 : scrollY + destination.getBoundingClientRect().top - margin,
    );
    destination.setAttribute('tabindex', '-1');
    destination.focus({ preventScroll: true });
  });
  listen(window, 'pointerdown', stopScroll, { passive: true });
  listen(window, 'touchstart', stopScroll, { passive: true });
  listen(window, 'popstate', stopScroll);
  listen(window, 'pagehide', stopScroll);
  listen(window, 'languagechange', () => {
    fitLoops();
    measureSolutions();
    registerReveals();
    scheduleReveals();
    selectStage(stageIndex);
    menu.setAttribute(
      'aria-label',
      t(menu.getAttribute('aria-expanded') === 'true' ? 'Fechar menu' : 'Abrir menu'),
    );
  });
  return () => {
    disposed = true;
    listeners.forEach((remove) => remove());
    observers.forEach((observer) => observer.disconnect());
    frames.forEach((id) => window.cancelAnimationFrame(id));
    timers.forEach((id) => window.clearInterval(id));
    progress.remove();
    restores.forEach((restore) => restore());
  };
}
