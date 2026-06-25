'use client';

import { useLayoutEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Car } from 'lucide-react';
import { gsap, revealSplitWords } from '@/lib/gsap';
import { RESTAURANT } from '@/lib/utils';

export default function Visit() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (headline.current) revealSplitWords(headline.current, { trigger: root.current!, stagger: 0.06 });
      gsap.fromTo(
        '.visit-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: root.current!, start: 'top 75%' }
        }
      );
      gsap.fromTo(
        '.visit-map',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.visit-map', start: 'top 80%' }
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visit"
      ref={root}
      className="relative py-32 md:py-44 bg-espresso-900 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="gold-line" /> Komm uns besuchen
            </p>
            <h2
              ref={headline}
              className="display text-[clamp(2.2rem,4.5vw,4rem)] text-cream-100 mt-6"
            >
              Finden Sie uns im Herzen von <span className="italic-accent text-gold-400">München</span>.
            </h2>

            <div className="mt-12 space-y-6">
              <a
                href={RESTAURANT.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="visit-card group flex gap-5 p-6 card-warm hover:border-gold-400/50 transition-colors"
              >
                <span className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 border border-gold-400/30">
                  <MapPin className="w-5 h-5 text-gold-400" />
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-gold-400/80">Adresse</p>
                  <p className="font-display text-xl text-cream-100 mt-1">
                    {RESTAURANT.address.street}
                  </p>
                  <p className="text-cream-100/70 mt-1">{RESTAURANT.address.city}</p>
                  <p className="text-cream-100/70">{RESTAURANT.address.country}</p>
                </div>
              </a>

              <a
                href={RESTAURANT.phoneHref}
                className="visit-card group flex gap-5 p-6 card-warm hover:border-gold-400/50 transition-colors"
              >
                <span className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 border border-gold-400/30">
                  <Phone className="w-5 h-5 text-gold-400" />
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-gold-400/80">Reservierungen</p>
                  <p className="font-display text-xl text-cream-100 mt-1">
                    {RESTAURANT.phone}
                  </p>
                  <p className="text-cream-100/70 mt-1 text-sm">
                    Tippen zum Anrufen — wir antworten während der Öffnungszeiten.
                  </p>
                </div>
              </a>

              <div className="visit-card flex gap-5 p-6 card-warm">
                <span className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 border border-gold-400/30">
                  <Clock className="w-5 h-5 text-gold-400" />
                </span>
                <div className="flex-1">
                  <p className="text-[11px] tracking-[0.3em] uppercase text-gold-400/80">Öffnungszeiten</p>
                  <div className="mt-3 space-y-1.5">
                    {RESTAURANT.hours.map((h) => (
                      <div
                        key={h.day}
                        className={`flex justify-between text-sm ${
                          h.closed ? 'text-cream-100/40' : 'text-cream-100/85'
                        }`}
                      >
                        <span>{h.day}</span>
                        <span className="font-mono">{h.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="visit-card flex gap-5 p-6 card-warm">
                <span className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 border border-gold-400/30">
                  <Car className="w-5 h-5 text-gold-400" />
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase text-gold-400/80">Services</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {RESTAURANT.services.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 text-xs border border-cream-100/15 text-cream-100/80 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="visit-map relative aspect-square w-full overflow-hidden border border-gold-400/20">
              <iframe
                src={RESTAURANT.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(40%) contrast(0.9) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map to La Mocca"
              />
              <div className="absolute inset-0 pointer-events-none bg-espresso-900/10" />
            </div>
            <a
              href={RESTAURANT.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-center mt-4 text-[11px] tracking-[0.3em] uppercase text-gold-400 hover:text-gold-300"
            >
              In Google Maps öffnen →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
