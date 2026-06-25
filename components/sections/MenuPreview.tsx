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
  Starters: [
    {
      name: 'Prosciutto & Rucola',
      italic: 'antipasto della casa',
      desc: 'Cured prosciutto, fresh rocket, shaved Parmigiano, lemon and olive oil.',
      price: '€9',
      img: '/images/Screenshot%202026-06-25%20105507.png'
    },
    {
      name: 'Focaccia Artigianale',
      italic: 'con rosmarino',
      desc: 'Crispy stone-baked focaccia with rosemary, sea salt and extra-virgin olive oil.',
      price: '€6',
      img: '/images/Screenshot%202026-06-25%20105519.png'
    },
    {
      name: 'Zuppa del Giorno',
      italic: "today's soup",
      desc: 'A hearty daily soup made fresh from seasonal ingredients. Ask your server.',
      price: '€8',
      img: '/images/Screenshot%202026-06-25%20105627.png'
    }
  ],
  'From the Grill': [
    {
      name: 'BBQ Chicken',
      italic: 'slow-smoked',
      desc: 'Slow-grilled chicken with our house BBQ rub, served with roasted vegetables.',
      price: '€14',
      img: '/images/Screenshot%202026-06-25%20105228.png'
    },
    {
      name: 'Grilled Steak',
      italic: 'con verdure',
      desc: 'Juicy grilled steak, roasted cherry tomatoes and seasonal vegetables.',
      price: '€18',
      img: '/images/Screenshot%202026-06-25%20105534.png'
    },
    {
      name: 'Grilled Salmon',
      italic: 'con contorno',
      desc: 'Fresh salmon fillet from the grill, served with sautéed greens and cherry tomatoes.',
      price: '€16',
      img: '/images/Screenshot%202026-06-25%20105431.png'
    }
  ],
  'Pizza & Burgers': [
    {
      name: 'Margherita',
      italic: 'stone-baked',
      desc: 'Classic stone-baked pizza with tomato sauce, mozzarella and fresh basil.',
      price: '€11',
      img: '/images/Screenshot%202026-06-25%20105329.png'
    },
    {
      name: 'Classic Burger',
      italic: 'con patatine',
      desc: 'Juicy beef burger on a brioche bun with salad, tomato, pickles and house sauce.',
      price: '€13',
      img: '/images/Screenshot%202026-06-25%20105401.png'
    },
    {
      name: 'Crispy Fried Chicken',
      italic: 'con insalata',
      desc: 'Golden fried chicken with a lemon wedge and warm potato salad on the side.',
      price: '€12',
      img: '/images/Screenshot%202026-06-25%20105615.png'
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
            <span className="gold-line" /> Il Menu <span className="gold-line" />
          </p>
          <h2
            ref={headline}
            className="display text-[clamp(2.2rem,5vw,4.4rem)] text-cream-100 mt-6 max-w-3xl mx-auto"
          >
            A preview of <span className="italic-accent text-gold-400">today's</span> menu.
          </h2>
          <p className="menu-lead text-cream-100/65 max-w-xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            Selections change with the season. Ask your server for today's specials or order online.
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
            Reserve to taste the full menu
          </a>
        </div>
      </div>
    </section>
  );
}
