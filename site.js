(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#mobile-nav');
  const compact = window.matchMedia('(max-width: 760px)');
  const close = (returnFocus = false) => {
    navigation.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  };
  // Keep navigation available when JavaScript is disabled.
  close();
  document.documentElement.classList.add('js');
  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opening));
    navigation.hidden = !opening;
  });
  navigation.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    close();
    const destination = document.querySelector(link.getAttribute('href'));
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !navigation.hidden) close(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header') && !navigation.hidden) close();
  });
  compact.addEventListener('change', () => close());
  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });
  document.querySelectorAll('a[hreflang]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.location.hash) link.href = link.getAttribute('href').split('#')[0] + window.location.hash;
    });
  });
})();
