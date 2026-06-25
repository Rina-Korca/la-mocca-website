'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, revealSplitWords, prefersReducedMotion } from '@/lib/gsap';

const panels = [
  {
    label: 'Das Mittagessen',
    title: 'Mittagessen im warmen Holzlicht.',
    sub: '11:00 — hereinspaziert, ankommen, den Duft des Grills die Arbeit machen lassen.',
    img: '/images/interior.png'
  },
  {
    label: 'Die Vorspeise',
    title: 'Fang mit etwas Gutem an.',
    sub: '11:00 — Prosciutto, Focaccia, Tagessuppe. Der perfekte Einstieg.',
    img: '/images/prosciutto.png'
  },
  {
    label: 'Das Abendessen',
    title: 'Abendessen frisch vom Grill.',
    sub: '18:00 — gegrilltes Fleisch, kalte Getränke, ein gemütlicher Raum. Bleib so lang du möchtest.',
    img: '/images/bbq-chicken.png'
  }
];

export default function Atmosphere() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (headline.current) revealSplitWords(headline.current, { trigger: root.current!, stagger: 0.06 });
      gsap.fromTo(
        '.atm-eyebrow, .atm-lead',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current!, start: 'top 75%' }
        }
      );

      if (!prefersReducedMotion()) {
        document.querySelectorAll<HTMLElement>('.atm-panel').forEach((panel, idx) => {
          const img = panel.querySelector<HTMLElement>('.atm-img');
          const text = panel.querySelector<HTMLElement>('.atm-text');

          gsap.fromTo(
            panel,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: panel, start: 'top 85%' }
            }
          );
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.18, clipPath: 'inset(20% 0 20% 0)' },
              {
                scale: 1,
                clipPath: 'inset(0% 0 0% 0)',
                ease: 'none',
                scrollTrigger: { trigger: panel, start: 'top 90%', end: 'bottom top', scrub: true }
              }
            );
            const tilt = idx % 2 === 0 ? -3 : 3;
            gsap.to(img, {
              yPercent: -10,
              rotate: tilt,
              ease: 'none',
              scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true }
            });
          }
          if (text) {
            gsap.fromTo(
              text,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: panel, start: 'top 75%' }
              }
            );
          }
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="atmosphere"
      ref={root}
      className="relative py-32 md:py-44 bg-espresso-900 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-24">
          <p className="atm-eyebrow eyebrow flex items-center justify-center gap-3">
            <span className="gold-line" /> Atmosphäre
          </p>
          <h2
            ref={headline}
            className="display text-[clamp(2.2rem,5vw,4.4rem)] text-cream-100 mt-6 max-w-3xl mx-auto"
          >
            Von <span className="italic-accent text-gold-400">11:00</span> bis <span className="italic-accent text-gold-400">22:00</span>.
          </h2>
          <p className="atm-lead text-cream-100/65 max-w-xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            Die Stimmung wechselt mit der Stunde — entspanntes Mittagessen tagsüber, gemütliches Grillabendessen bei Nacht.
          </p>
        </div>

        <div className="space-y-28 md:space-y-40">
          {panels.map((p, i) => (
            <div
              key={p.label}
              className={`atm-panel grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                i % 2 === 1 ? 'lg:[&>.atm-text]:order-2' : ''
              }`}
            >
              <div className="atm-text lg:col-span-5">
                <p className="italic-accent text-gold-400 text-2xl md:text-3xl">{p.label}</p>
                <h3 className="font-display text-3xl md:text-5xl text-cream-100 mt-3 leading-[1.05]">
                  {p.title}
                </h3>
                <p className="text-cream-100/70 mt-6 text-base md:text-lg leading-[1.8] max-w-md">
                  {p.sub}
                </p>
                <div className="flex items-center gap-3 mt-8 text-[11px] tracking-[0.3em] uppercase text-gold-400/80">
                  <span className="gold-line" />
                  <span>0{i + 1} · 03</span>
                </div>
              </div>
              <div className="relative lg:col-span-7 aspect-[16/10] overflow-hidden">
                {/* REPLACE: atmosphere photo */}
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="atm-img object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-espresso-900/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
