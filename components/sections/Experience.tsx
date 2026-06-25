'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, revealSplitWords, prefersReducedMotion } from '@/lib/gsap';

const cards = [
  {
    tag: '01',
    name: 'Hausgemachte Burger',
    italic: 'frisch vom Grill',
    desc: 'Saftige Rindfleischpatties, geröstete Brioche-Brötchen, hausgemachte Saucen und knusprige Beilagen. Purer Genuss.',
    img: '/images/burger.png',
    accent: 'tomato'
  },
  {
    tag: '02',
    name: 'Vom Grill',
    italic: 'langsam & rauchig',
    desc: 'Perfekt gegrillte Steaks, Lachs und Hähnchen — einfach gewürzt, mit Geduld gegrillt.',
    img: '/images/steak.png',
    accent: 'olive'
  },
  {
    tag: '03',
    name: 'BBQ-Hähnchen',
    italic: 'zur Perfektion geräuchert',
    desc: 'Unser Signature-Grill-Hähnchen — rauchig, zart und goldbraun. Das Herzstück von La Mocca.',
    img: '/images/bbq-chicken.png',
    accent: 'gold'
  },
  {
    tag: '04',
    name: 'Pizza & Pasta',
    italic: 'täglich steingebacken',
    desc: 'Knusprige steingebackene Pizza mit saisonalen Belägen. Einfach, ehrlich und voller Geschmack.',
    img: '/images/pizza.png',
    accent: 'tomato'
  },
  {
    tag: '05',
    name: 'Frische Salate',
    italic: 'leicht & lebendig',
    desc: 'Knackiges Grün, saisonales Gemüse, Burrata und hausgemachte Dressings. Ein frischer Anfang.',
    img: '/images/salad.png',
    accent: 'gold'
  }
];

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (headline.current) {
        revealSplitWords(headline.current, { trigger: root.current!, stagger: 0.06 });
      }
      gsap.fromTo(
        '.exp-eyebrow, .exp-lead',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current!, start: 'top 75%' }
        }
      );

      gsap.fromTo(
        '.exp-card',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.exp-grid',
            start: 'top 80%'
          }
        }
      );

      if (!prefersReducedMotion()) {
        document.querySelectorAll<HTMLElement>('.exp-card').forEach((card) => {
          const image = card.querySelector<HTMLElement>('.exp-img');
          const overlay = card.querySelector<HTMLElement>('.exp-overlay');
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -10, duration: 0.6, ease: 'power3.out' });
            if (image) gsap.to(image, { scale: 1.08, duration: 1.2, ease: 'power3.out' });
            if (overlay) gsap.to(overlay, { opacity: 0.55, duration: 0.6 });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
            if (image) gsap.to(image, { scale: 1, duration: 1.2, ease: 'power3.out' });
            if (overlay) gsap.to(overlay, { opacity: 0.75, duration: 0.6 });
          });
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={root}
      className="relative py-32 md:py-44 bg-espresso-900 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-end mb-20">
          <div>
            <p className="exp-eyebrow eyebrow flex items-center gap-3">
              <span className="gold-line" /> Das Erlebnis
            </p>
            <h2
              ref={headline}
              className="display text-[clamp(2.2rem,4.5vw,4rem)] text-cream-100 mt-6"
            >
              Fünf Gründe, <span className="italic-accent text-gold-400">La Mocca</span> zu lieben.
            </h2>
          </div>
          <p className="exp-lead text-cream-100/70 text-base md:text-lg leading-[1.85] max-w-xl">
            Jedes Gericht erzählt einen Teil der Geschichte — das Knistern des Grills, der Geruch
            von gegrilltem Fleisch in der Luft und ein Tisch, an dem alle glücklich gehen.
            Komm und schmeck es selbst.
          </p>
        </div>

        <div className="exp-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {cards.map((c, i) => (
            <article
              key={c.tag}
              className={`exp-card group relative overflow-hidden cursor-pointer h-[440px] md:h-[480px] ${
                i === 2 ? 'lg:row-span-2 lg:h-[990px]' : ''
              }`}
            >
              {/* REPLACE: dish photography */}
              <Image
                src={c.img}
                alt={c.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="exp-img object-cover transition-transform"
              />
              <div className="exp-overlay absolute inset-0 bg-gradient-to-t from-espresso-900 via-espresso-900/55 to-transparent opacity-75" />
              <div className="absolute top-5 left-5 flex items-center gap-3">
                <span className="font-display italic-accent text-gold-400 text-xl">{c.tag}</span>
                <span className="h-px w-8 bg-gold-400/60" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <p className="italic-accent text-gold-300 text-base mb-1">{c.italic}</p>
                <h3 className="font-display text-3xl md:text-[2rem] text-cream-100 leading-tight">
                  {c.name}
                </h3>
                <p className="text-cream-100/75 text-sm leading-relaxed mt-3 max-w-xs">
                  {c.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
