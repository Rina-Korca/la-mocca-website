'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
  silk: 'cubic-bezier(0.22, 1, 0.36, 1)'
};

/**
 * Reveal an element (or stagger of children) from below with mask-like overflow.
 * Use inside a useLayoutEffect + gsap.context block for cleanup.
 */
export function revealFromBelow(
  target: gsap.TweenTarget,
  options?: {
    stagger?: number;
    delay?: number;
    y?: number;
    duration?: number;
    trigger?: Element | string;
  }
) {
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }
  return gsap.fromTo(
    target,
    { opacity: 0, y: options?.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1,
      ease: EASE.out,
      delay: options?.delay ?? 0,
      stagger: options?.stagger,
      scrollTrigger: options?.trigger
        ? {
            trigger: options.trigger,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        : undefined
    }
  );
}

/**
 * Word-by-word reveal — splits text into spans manually so it works without SplitText plugin.
 * Pass an element ref; it will tokenise textContent into spans.
 */
export function splitWords(el: HTMLElement) {
  if (!el || el.dataset.split === 'true') return;
  const text = el.textContent ?? '';
  el.textContent = '';
  text.split(/(\s+)/).forEach((token) => {
    if (token.trim() === '') {
      el.appendChild(document.createTextNode(token));
      return;
    }
    const outer = document.createElement('span');
    outer.className = 'inline-block overflow-hidden align-bottom';
    const inner = document.createElement('span');
    inner.className = 'inline-block will-change-transform';
    inner.textContent = token;
    outer.appendChild(inner);
    el.appendChild(outer);
  });
  el.dataset.split = 'true';
}

export function revealSplitWords(
  el: HTMLElement,
  options?: { delay?: number; trigger?: Element | string; stagger?: number }
) {
  splitWords(el);
  const inners = el.querySelectorAll<HTMLElement>('span > span');
  if (prefersReducedMotion()) {
    gsap.set(inners, { yPercent: 0, opacity: 1 });
    return;
  }
  return gsap.fromTo(
    inners,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: EASE.expo,
      stagger: options?.stagger ?? 0.06,
      delay: options?.delay ?? 0,
      scrollTrigger: options?.trigger
        ? {
            trigger: options.trigger,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        : undefined
    }
  );
}

/**
 * Slow parallax pan on a target image. Moves -y as we scroll past it.
 */
export function parallaxImage(
  target: gsap.TweenTarget,
  trigger: Element | string,
  distance = 120
) {
  if (prefersReducedMotion()) return;
  return gsap.to(target, {
    yPercent: -distance / 4,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

/**
 * Slow zoom on a hero image driven by scroll progress within its trigger.
 */
export function scrollZoom(
  target: gsap.TweenTarget,
  trigger: Element | string,
  scale = 1.18
) {
  if (prefersReducedMotion()) return;
  return gsap.fromTo(
    target,
    { scale: 1 },
    {
      scale,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    }
  );
}

export { gsap, ScrollTrigger, EASE };
