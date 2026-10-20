import { t } from './i18n.js';
export function initializeInteractions() {
  let disposed = false;
  const listeners = [],
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

  document.fonts.ready.then(() => {
    if (disposed) return;
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

  // Roda do mouse suave sem interferir na inércia nativa do toque ou em áreas roláveis.
  let scrollFrame = 0;
  let scrollTarget = scrollY;
  let previousTime = 0;
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
    menu.setAttribute(
      'aria-label',
      t(menu.getAttribute('aria-expanded') === 'true' ? 'Fechar menu' : 'Abrir menu'),
    );
  });
  return () => {
    disposed = true;
    stopScroll();
    listeners.forEach((remove) => remove());
    frames.forEach((id) => window.cancelAnimationFrame(id));
    progress.remove();
    restores.forEach((restore) => restore());
  };
}
