import { useEffect } from 'react';

const easing = 'cubic-bezier(.22, .72, .25, 1)';

export function useScrollReveal(ref, selector, version) {
  useEffect(() => {
    if (!ref.current || !window.IntersectionObserver || !Element.prototype.animate) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = ref.current.querySelectorAll(selector);
    const pending = new Set(elements);
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(({ target }, index) => {
        observer.unobserve(target);
        pending.delete(target);
        if (preference.matches || target.contains(document.activeElement)) return;

        const editorial = target.matches('.collection-copy, .collection-image, .guide-image, .journal-card');
        const animation = target.animate(
          [
            { opacity: 0.55, transform: editorial ? 'translateY(20px)' : 'translateY(12px)' },
            { opacity: 1, transform: 'none' },
          ],
          {
            duration: editorial ? 600 : 380,
            delay: Math.min(index, 5) * 42,
            easing,
            fill: 'backwards',
          },
        );
        animations.add(animation);
        animation.onfinish = animation.oncancel = () => animations.delete(animation);
      });
    }, { threshold: 0.12 });

    const syncPreference = () => {
      if (preference.matches) {
        observer.disconnect();
        animations.forEach(animation => animation.cancel());
      } else {
        pending.forEach(element => observer.observe(element));
      }
    };

    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => {
      preference.removeEventListener('change', syncPreference);
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
    };
  }, [ref, selector, version]);
}
