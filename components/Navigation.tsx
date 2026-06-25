'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { cn, RESTAURANT } from '@/lib/utils';

const links = [
  { href: '#about', label: 'Storia' },
  { href: '#experience', label: 'Experience' },
  { href: '#menu', label: 'Menu' },
  { href: '#atmosphere', label: 'Atmosphere' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' }
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-espresso-900/85 backdrop-blur-md border-b border-gold-500/15'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <Link
          href="/"
          className="flex flex-col leading-none text-cream-100 group"
          aria-label="La Mocca — Home"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold-400/80 group-hover:text-gold-400 transition">
            Barbecue & Grill
          </span>
          <span className="font-display text-2xl tracking-tight">
            La <span className="italic-accent text-gold-400">Mocca</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[12px] tracking-[0.22em] uppercase text-cream-100/75 hover:text-gold-400 transition-colors group"
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={RESTAURANT.phoneHref}
            className="flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-cream-100/75 hover:text-gold-400 transition"
            aria-label="Call the restaurant"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
          <a href="#reserve" className="btn-gold !py-3 !px-5 !text-[11px]">
            Reserve
          </a>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="lg:hidden text-cream-100 p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-espresso-900/98 backdrop-blur-xl border-t border-gold-500/15">
          <nav className="flex flex-col px-6 py-6 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-cream-100/85 tracking-[0.2em] uppercase text-sm border-b border-cream-100/5"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-6">
              <a href={RESTAURANT.phoneHref} className="btn-ghost flex-1 justify-center">
                <Phone className="w-3.5 h-3.5" /> Call
              </a>
              <a
                href="#reserve"
                onClick={() => setOpen(false)}
                className="btn-gold flex-1 justify-center"
              >
                Reserve
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
