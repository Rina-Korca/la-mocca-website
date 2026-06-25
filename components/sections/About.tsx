'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, revealSplitWords, parallaxImage, prefersReducedMotion } from '@/lib/gsap';

export default function About() {
  const root = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        revealSplitWords(headlineRef.current, {
          trigger: root.current!,
          stagger: 0.07
        });
      }

      gsap.fromTo(
        '.about-body p',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.about-body',
            start: 'top 80%'
          }
        }
      );

      gsap.fromTo(
        '.about-stat',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.about-stats', start: 'top 85%' }
        }
      );

      if (!prefersReducedMotion()) {
        parallaxImage('.about-img-main', '.about-image-stage', 80);
        parallaxImage('.about-img-back', '.about-image-stage', 40);
        gsap.to('.about-img-card', {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-image-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
        gsap.fromTo(
          '.about-img-card',
          { opacity: 0, scale: 0.92, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.about-image-stage', start: 'top 70%' }
          }
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative py-32 md:py-44 bg-espresso-900 overflow-hidden paper-noise"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* TEXT COLUMN */}
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-line" /> Unsere Geschichte
          </p>
          <h2
            ref={headlineRef}
            className="display text-[clamp(2.2rem,4.5vw,4.2rem)] text-cream-100 mt-6"
          >
            Ein Geschmack von Feuer, serviert in <span className="italic-accent text-gold-400">München</span>.
          </h2>

          <div className="about-body mt-10 space-y-5 text-cream-100/75 text-base md:text-lg leading-[1.85] max-w-xl">
            <p>
              La Mocca entstand aus einer Leidenschaft für den Grill — das Zischen von
              perfekt gewürztem Fleisch über offenem Feuer, die Wärme eines gemütlichen
              Holzraums und die einfache Freude an einem Tisch mit guter Gesellschaft.
            </p>
            <p>
              Jedes Gericht wird mit Sorgfalt zubereitet: frische Zutaten, langsames Garen
              und die Aufmerksamkeit, die nur entsteht, wenn man wirklich liebt, was man tut.
              Von rauchigem BBQ-Hähnchen bis zu knuspriger steingebackener Pizza und
              herzhaften Burgern — unsere Speisekarte wurde für Menschen gemacht, die glauben,
              dass großartiges Essen sich immer wie zu Hause anfühlen sollte.
            </p>
            <p>
              Der Geruch von Holzkohle und Gewürzen in der Luft, ein kaltes Getränk in der
              Hand und ein Teller vor dir, der dich zum Lächeln bringt. Das ist La Mocca.
            </p>
          </div>

          <div className="about-stats mt-14 grid grid-cols-3 gap-6 max-w-lg">
            <div className="about-stat">
              <p className="font-display text-4xl md:text-5xl gold-text">5.0</p>
              <p className="text-[11px] tracking-[0.22em] uppercase text-cream-100/55 mt-2">
                Google-Bewertung
              </p>
            </div>
            <div className="about-stat">
              <p className="font-display text-4xl md:text-5xl gold-text">54</p>
              <p className="text-[11px] tracking-[0.22em] uppercase text-cream-100/55 mt-2">
                Zufriedene Gäste
              </p>
            </div>
            <div className="about-stat">
              <p className="font-display text-4xl md:text-5xl gold-text">€10</p>
              <p className="text-[11px] tracking-[0.22em] uppercase text-cream-100/55 mt-2">
                Ab
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE COLUMN */}
        <div className="about-image-stage relative h-[600px] md:h-[680px]">
          <div className="about-img-main absolute top-0 right-0 w-[78%] h-[68%] overflow-hidden">
            <Image
              src="/images/interior.png"
              alt="La Mocca Restaurant Innenraum"
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-espresso-900/15" />
          </div>

          <div className="about-img-back absolute bottom-12 left-0 w-[55%] h-[45%] overflow-hidden border border-gold-500/20">
            <Image
              src="/images/steak.png"
              alt="Gegrilltes Steak frisch vom Grill"
              fill
              sizes="(min-width: 1024px) 30vw, 60vw"
              className="object-cover"
            />
          </div>

          {/* floating quote card */}
          <div className="about-img-card absolute bottom-6 right-2 lg:-right-6 w-[260px] md:w-[300px] card-warm p-6">
            <p className="font-display italic-accent text-2xl text-gold-300 leading-tight">
              "Good food, good mood."
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-cream-100/55 mt-4">
              — La Mocca, München
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
