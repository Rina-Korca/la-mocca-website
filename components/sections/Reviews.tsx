'use client';

import { useLayoutEffect, useRef } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { gsap, revealSplitWords, prefersReducedMotion } from '@/lib/gsap';
import { RESTAURANT } from '@/lib/utils';

const reviews = [
  {
    text: 'The BBQ chicken is absolutely incredible — perfectly smoked, fall-off-the-bone tender and full of flavour. Best grill in München by far. We are already planning our next visit.',
    author: 'Klaus M.',
    role: 'München',
    rating: 5
  },
  {
    text: 'Great burgers, crispy pizza and super friendly service. The prices are unbeatable for the quality you get. This is our new favourite spot in the neighbourhood.',
    author: 'Sarah L.',
    role: 'München',
    rating: 5
  },
  {
    text: 'Been coming here every week since they opened. The atmosphere is cosy and the food never disappoints. The grilled steak with roasted tomatoes is a must-try.',
    author: 'Thomas W.',
    role: 'München Ramersdorf',
    rating: 5
  }
];

export default function Reviews() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const ratingRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (headline.current) revealSplitWords(headline.current, { trigger: root.current!, stagger: 0.07 });
      gsap.fromTo(
        '.rev-eyebrow, .rev-stars, .rev-meta, .rev-cta',
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
        '.rev-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.rev-grid', start: 'top 80%' }
        }
      );

      // animate rating counter
      if (ratingRef.current && !prefersReducedMotion()) {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: 5.0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.rev-stars', start: 'top 80%' },
          onUpdate: () => {
            if (ratingRef.current) ratingRef.current.textContent = counter.v.toFixed(1);
          }
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={root}
      className="relative py-32 md:py-44 bg-espresso-800 overflow-hidden paper-noise"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <p className="rev-eyebrow eyebrow flex items-center justify-center gap-3">
            <span className="gold-line" /> Loved by guests
          </p>
          <h2
            ref={headline}
            className="display text-[clamp(2.2rem,5vw,4.4rem)] text-cream-100 mt-6 max-w-3xl mx-auto"
          >
            Their words, our <span className="italic-accent text-gold-400">pride</span>.
          </h2>
          <div className="rev-stars flex items-center justify-center gap-5 mt-10">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-7 h-7 text-gold-400 fill-gold-400"
                  strokeWidth={1}
                />
              ))}
            </div>
            <span className="font-display text-5xl md:text-6xl text-cream-100">
              <span ref={ratingRef}>0.0</span>
              <span className="text-gold-400">/5</span>
            </span>
          </div>
          <p className="rev-meta text-[11px] tracking-[0.3em] uppercase text-cream-100/55 mt-3">
            From {RESTAURANT.reviewCount} Google reviews
          </p>
        </div>

        <div className="rev-grid grid md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r) => (
            <article
              key={r.author}
              className="rev-card relative card-warm p-8 md:p-10 flex flex-col"
            >
              <div className="absolute top-6 right-6 font-display text-7xl text-gold-400/15 leading-none italic-accent">"</div>
              <div className="flex gap-1 mb-6">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" strokeWidth={1} />
                ))}
              </div>
              <p className="italic-accent text-cream-100/90 text-lg md:text-xl leading-[1.7] flex-1">
                "{r.text}"
              </p>
              <div className="mt-8 pt-6 border-t border-cream-100/10">
                <p className="font-display text-lg text-gold-400">{r.author}</p>
                <p className="text-[11px] tracking-[0.25em] uppercase text-cream-100/55 mt-1">
                  {r.role}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="rev-cta flex justify-center mt-16">
          <a
            href={RESTAURANT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
          >
            Read all reviews on Google
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
