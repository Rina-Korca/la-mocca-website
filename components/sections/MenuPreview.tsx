'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, revealSplitWords, prefersReducedMotion } from '@/lib/gsap';

type Dish = {
  name: string;
  italic: string;
  desc: string;
  price: string;
  img: string;
};

const menu: Record<string, Dish[]> = {
  Vorspeisen: [
    {
      name: 'Prosciutto & Rucola',
      italic: 'Antipasto della Casa',
      desc: 'Luftgetrockneter Prosciutto, frischer Rucola, gehobelter Parmigiano, Zitrone und Olivenöl.',
      price: '€9',
      img: '/images/prosciutto.png'
    },
    {
      name: 'Focaccia Artigianale',
      italic: 'mit Rosmarin',
      desc: 'Knusprige steingebackene Focaccia mit Rosmarin, Meersalz und nativem Olivenöl extra.',
      price: '€6',
      img: '/images/focaccia.png'
    },
    {
      name: 'Tagessuppe',
      italic: 'frisch zubereitet',
      desc: 'Eine herzhafte Tagessuppe aus frischen saisonalen Zutaten. Fragen Sie Ihren Kellner.',
      price: '€8',
      img: '/images/soup.png'
    }
  ],
  'Vom Grill': [
    {
      name: 'BBQ-Hähnchen',
      italic: 'langsam geräuchert',
      desc: 'Langsam gegrilltes Hähnchen mit unserem Haus-BBQ-Rub, serviert mit geröstetem Gemüse.',
      price: '€14',
      img: '/images/bbq-chicken.png'
    },
    {
      name: 'Gegrilltes Steak',
      italic: 'mit Gemüse',
      desc: 'Saftiges gegrilltes Steak, geröstete Kirschtomaten und saisonales Gemüse.',
      price: '€18',
      img: '/images/steak.png'
    },
    {
      name: 'Gegrillter Lachs',
      italic: 'mit Beilagen',
      desc: 'Frisches Lachsfilet vom Grill, serviert mit sautiertem Grün und Kirschtomaten.',
      price: '€16',
      img: '/images/salmon.png'
    }
  ],
  'Pizza & Burger': [
    {
      name: 'Margherita',
      italic: 'steingebacken',
      desc: 'Klassische steingebackene Pizza mit Tomatensauce, Mozzarella und frischem Basilikum.',
      price: '€11',
      img: '/images/pizza.png'
    },
    {
      name: 'Classic Burger',
      italic: 'mit Pommes',
      desc: 'Saftiger Rindfleischburger im Brioche-Brötchen mit Salat, Tomate, Pickles und Haussauce.',
      price: '€13',
      img: '/images/burger.png'
    },
    {
      name: 'Knuspriges Fried Chicken',
      italic: 'mit Salat',
      desc: 'Goldbraun frittiertes Hähnchen mit einer Zitronenspalte und warmem Kartoffelsalat.',
      price: '€12',
      img: '/images/fried-chicken.png'
    }
  ]
};

const categories = Object.keys(menu);

export default function MenuPreview() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(categories[0]);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      if (headline.current) revealSplitWords(headline.current, { trigger: root.current! });
      gsap.fromTo(
        '.menu-eyebrow, .menu-lead, .menu-tabs',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current!, start: 'top 70%' }
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-item',
        { opacity: 0, y: 40, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1
        }
      );
    }, root);
    return () => ctx.revert();
  }, [active]);

  return (
    <section
      id="menu"
      ref={root}
      className="relative py-32 md:py-44 bg-espresso-800 overflow-hidden paper-noise"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="menu-eyebrow eyebrow flex items-center justify-center gap-3">
            <span className="gold-line" /> Speisekarte <span className="gold-line" />
          </p>
          <h2
            ref={headline}
            className="display text-[clamp(2.2rem,5vw,4.4rem)] text-cream-100 mt-6 max-w-3xl mx-auto"
          >
            Ein Vorgeschmack auf die <span className="italic-accent text-gold-400">heutige</span> Karte.
          </h2>
          <p className="menu-lead text-cream-100/65 max-w-xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            Die Auswahl wechselt mit den Jahreszeiten. Fragen Sie nach den Tagesempfehlungen oder bestellen Sie online.
          </p>
        </div>

        <div className="menu-tabs flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase border transition-all ${
                active === c
                  ? 'bg-gold-400 text-espresso-900 border-gold-400'
                  : 'border-cream-100/15 text-cream-100/65 hover:border-gold-400 hover:text-gold-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div key={active} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu[active].map((d) => (
            <article
              key={d.name}
              className="menu-item group card-warm flex flex-col overflow-hidden"
            >
              {/* REPLACE: dish image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/70 to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="italic-accent text-gold-300 text-sm">{d.italic}</p>
                    <h3 className="font-display text-2xl text-cream-100 leading-tight mt-1">
                      {d.name}
                    </h3>
                  </div>
                  <span className="font-display text-2xl text-gold-400 shrink-0">{d.price}</span>
                </div>
                <p className="text-cream-100/70 text-sm leading-relaxed mt-4">{d.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <a href="#reserve" className="btn-ghost">
            Jetzt reservieren und die volle Karte genießen
          </a>
        </div>
      </div>
    </section>
  );
}
