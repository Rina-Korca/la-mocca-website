'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { Phone, Calendar } from 'lucide-react';
import { gsap, revealSplitWords, prefersReducedMotion } from '@/lib/gsap';
import { RESTAURANT } from '@/lib/utils';

export default function Reserve() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (headline.current) revealSplitWords(headline.current, { trigger: root.current!, stagger: 0.08 });
      gsap.fromTo(
        '.res-eyebrow, .res-body, .res-cta-row, .res-note',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current!, start: 'top 70%' }
        }
      );

      if (!prefersReducedMotion() && imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.2 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current!, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reserve"
      ref={root}
      className="relative min-h-[80vh] py-32 md:py-44 overflow-hidden flex items-center"
    >
      <div ref={imgRef} className="absolute inset-0">
        <Image
          src="/images/Screenshot%202026-06-25%20105657.png"
          alt="La Mocca warm restaurant interior"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso-900/85" />
      </div>
      <div className="absolute inset-0 paper-noise opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-3xl">
          <p className="res-eyebrow eyebrow flex items-center gap-3">
            <span className="gold-line" /> Riservazione
          </p>
          <h2
            ref={headline}
            className="display text-[clamp(2.6rem,6vw,6rem)] text-cream-100 mt-6 leading-[0.95]"
          >
            Reserve your seat at our <span className="italic-accent text-gold-400">table</span>.
          </h2>
          <p className="res-body text-cream-100/75 text-lg md:text-xl leading-[1.85] mt-8 max-w-2xl font-light">
            Pull up a chair. Let the grill do the talking — slow, smoky and full of flavour.
            Call us to reserve, order online, or drive through. We are open daily from 11:00.
          </p>

          <div className="res-cta-row mt-12 flex flex-wrap gap-3">
            <a href={RESTAURANT.phoneHref} className="btn-gold !py-5 !px-9 text-sm">
              <Phone className="w-4 h-4" /> Reserve by phone
            </a>
            <a
              href={`mailto:?subject=Reservation%20—%20La%20Passione%20di%20Napoli&body=Buongiorno%2C%0A%0AI%20would%20like%20to%20book%20a%20table.`}
              className="btn-ghost !py-5 !px-9 text-sm"
            >
              <Calendar className="w-4 h-4" /> Send a reservation enquiry
            </a>
          </div>

          <p className="res-note text-[11px] tracking-[0.3em] uppercase text-cream-100/55 mt-10 flex flex-wrap gap-x-8 gap-y-2">
            <span>Open Daily · 11:00 – 22:00</span>
            <span className="text-gold-400/80">{RESTAURANT.phone}</span>
            <span>{RESTAURANT.address.street}, {RESTAURANT.address.city}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
