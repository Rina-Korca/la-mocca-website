'use client';

import { useLayoutEffect, useRef } from 'react';

import { Phone, MapPin, Calendar } from 'lucide-react';
import { gsap, revealSplitWords, prefersReducedMotion } from '@/lib/gsap';
import { RESTAURANT } from '@/lib/utils';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (titleRef.current) revealSplitWords(titleRef.current, { delay: 0.2, stagger: 0.08 });
      if (subRef.current) revealSplitWords(subRef.current, { delay: 0.9, stagger: 0.04 });

      if (!prefersReducedMotion()) {
        gsap.fromTo(
          '.hero-eyebrow',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
        );
        gsap.fromTo(
          '.hero-divider',
          { width: 0 },
          { width: 80, duration: 1.2, ease: 'power2.inOut', delay: 0.7 }
        );
        gsap.fromTo(
          '.hero-cta',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 1.4
          }
        );
        gsap.fromTo(
          '.hero-meta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 1.6, stagger: 0.08, ease: 'power2.out' }
        );

        // slow zoom + parallax on hero image
        gsap.fromTo(
          imgRef.current,
          { scale: 1.15 },
          { scale: 1, duration: 3.4, ease: 'power2.out' }
        );
        gsap.to(imgRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
        gsap.to('.hero-overlay-text', {
          yPercent: -30,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
        // floating side accents
        gsap.to('.hero-tag-1', { yPercent: -25, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.hero-tag-2', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] w-full overflow-hidden bg-espresso-900"
      aria-label="Hero"
    >
      <div ref={imgRef} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/bbq-chicken.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/herosection.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-espresso-900/30 via-espresso-900/55 to-espresso-900" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* paper noise overlay */}
      <div className="absolute inset-0 paper-noise opacity-40 pointer-events-none" />

      {/* floating side decoration */}
      <div className="hero-tag-1 hidden md:block absolute top-32 left-6 lg:left-10 rotate-[-90deg] origin-left text-[10px] tracking-[0.5em] uppercase text-cream-100/40">
        Gegr. München · Mit Feuer gemacht
      </div>
      <div className="hero-tag-2 hidden md:block absolute bottom-40 right-6 lg:right-10 rotate-90 origin-right text-[10px] tracking-[0.5em] uppercase text-cream-100/40">
        5.0 ★ · 54 zufriedene Gäste
      </div>

      <div className="hero-overlay-text relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 min-h-[100svh] flex flex-col justify-center pt-24 pb-16">
        <p className="hero-eyebrow eyebrow flex items-center gap-3">
          <span className="gold-line" />
          Barbecue & Grill · Im Herzen von München
        </p>

        <h1
          ref={titleRef}
          className="display text-[clamp(3.2rem,8.5vw,8.5rem)] text-cream-100 mt-6"
        >
          La <span className="italic-accent text-gold-400">Mocca</span>
        </h1>

        <div className="hero-divider mx-0 my-8 h-px bg-gold-400" style={{ width: 0 }} />

        <h2
          ref={subRef}
          className="max-w-2xl text-cream-100/85 text-lg md:text-xl leading-relaxed font-light"
        >
          Ein gemütliches Barbecue-Restaurant in München — langsam gegrilltes Fleisch, knusprige Pizza, herzhafte Burger und frische Salate, täglich serviert ab 11:00 Uhr.
        </h2>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href="#reserve" className="hero-cta btn-gold">
            <Calendar className="w-4 h-4" /> Tisch reservieren
          </a>
          <a href={RESTAURANT.phoneHref} className="hero-cta btn-ghost">
            <Phone className="w-4 h-4" /> Jetzt anrufen
          </a>
          <a
            href={RESTAURANT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="hero-cta btn-ghost"
          >
            <MapPin className="w-4 h-4" /> Route planen
          </a>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-5 items-center text-[11px] tracking-[0.22em] uppercase text-cream-100/55">
          <div className="hero-meta flex items-center gap-3">
            <span className="text-gold-400 text-base">★ 5.0</span>
            <span>aus 54 Bewertungen</span>
          </div>
          <div className="hero-meta flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-gold-400/60" />
            <span>€10 – €20 pro Person</span>
          </div>
          <div className="hero-meta flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-gold-400/60" />
            <span>Täglich geöffnet · 11:00 – 22:00</span>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3">
        <span className="text-[10px] tracking-[0.4em] uppercase text-cream-100/45">
          Scrollen
        </span>
        <span className="block w-px h-12 bg-gradient-to-b from-gold-400 to-transparent" />
      </div>
    </section>
  );
}
