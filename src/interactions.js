import { t } from './i18n.js';
export function initializeInteractions() {
  let disposed = false;
  const listeners = [],
    observers = [],
    restores = [];
  const frames = new Set();
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
  const selectStage = (index) => {
    stageIndex = (index + stages.length) % stages.length;
    stages.forEach((button, i) => button.setAttribute('aria-pressed', String(i === stageIndex)));
    stageNote.textContent = t(notes[stageIndex]);
  };
  stages.forEach((button, index) => {
    listen(button, 'click', () => {
      stageNote.setAttribute('aria-live', 'polite');
      selectStage(index);
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

  // Uma entrada breve para blocos grandes; os conteúdos internos ficam nítidos.
  document.querySelectorAll('.reveal').forEach((element) => {
    element.classList.remove('reveal', 'reveal-pending');
  });
  if (matchMedia('(min-width: 801px) and (prefers-reduced-motion: no-preference)').matches) {
    const revealTargets = document.querySelectorAll(
      '.section-head, .services-grid > .service-card, .capture-card, .portfolio-project, .process-card, .closing-inner, .faq-item',
    );
    const revealObserver = observeIntersection(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px 80px 0px', threshold: 0.01 },
    );
    revealTargets.forEach((element) => {
      element.classList.add('enter-reveal');
      revealObserver.observe(element);
    });
  }

  // Roda do mouse suave sem interferir na inércia nativa do toque ou em áreas roláveis.
  let scrollFrame = 0;
  let scrollTarget = scrollY;
  let previousTime = 0;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const clampScroll = (value) =>
    Math.max(0, Math.min(value, document.documentElement.scrollHeight - innerHeight));
  const stopScroll = () => {
    if (scrollFrame) {
      window.cancelAnimationFrame(scrollFrame);
      frames.delete(scrollFrame);
    }
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
    if (reduceMotion.matches) {
      stopScroll();
      window.scrollTo({ top: value, behavior: 'instant' });
      return;
    }
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
      if (
        !finePointer.matches ||
        reduceMotion.matches ||
        lockedScrollY !== null ||
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
    if (
      !finePointer.matches ||
      reduceMotion.matches ||
      lockedScrollY !== null ||
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
  listen(window, 'languagechange', () => {
    fitLoops();
    measureSolutions();
    selectStage(stageIndex);
    menu.setAttribute(
      'aria-label',
      t(menu.getAttribute('aria-expanded') === 'true' ? 'Fechar menu' : 'Abrir menu'),
    );
  });
  return () => {
    disposed = true;
    stopScroll();
    listeners.forEach((remove) => remove());
    observers.forEach((observer) => observer.disconnect());
    frames.forEach((id) => window.cancelAnimationFrame(id));
    progress.remove();
    restores.forEach((restore) => restore());
  };
}
