import { Phone, MapPin, Mail, Instagram, Facebook } from 'lucide-react';
import { RESTAURANT } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="relative bg-espresso-900 border-t border-gold-400/15 paper-noise overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-16">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-400/80">Barbecue & Grill</p>
            <p className="font-display text-3xl text-cream-100 mt-2">
              La <span className="italic-accent text-gold-400">Mocca</span>
            </p>
            <p className="mt-5 text-cream-100/65 leading-[1.85] max-w-sm">
              Ein gemütliches Barbecue-Restaurant im Herzen von München — langsam gegrilltes
              Fleisch, Pizza, Burger und frische Salate, serviert mit einem Lächeln.
            </p>
            <div className="flex gap-3 mt-7">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 border border-cream-100/15 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition rounded-full"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 border border-cream-100/15 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition rounded-full"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold-400/80">Adresse</p>
            <ul className="mt-4 space-y-2 text-cream-100/70 text-sm leading-relaxed">
              <li>{RESTAURANT.address.street}</li>
              <li>{RESTAURANT.address.city}</li>
              <li>{RESTAURANT.address.country}</li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold-400/80">Öffnungszeiten</p>
            <ul className="mt-4 space-y-2 text-cream-100/70 text-sm">
              <li className="flex justify-between">
                <span>Mo – So</span>
                <span>11:00 – 22:00</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold-400/80">Kontakt</p>
            <ul className="mt-4 space-y-3 text-cream-100/70 text-sm">
              <li>
                <a
                  href={RESTAURANT.phoneHref}
                  className="flex items-center gap-2 hover:text-gold-400 transition"
                >
                  <Phone className="w-3.5 h-3.5" /> {RESTAURANT.phone}
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-gold-400 transition"
                >
                  <MapPin className="w-3.5 h-3.5" /> Route planen
                </a>
              </li>
              <li>
                <a
                  href={`mailto:?subject=Reservation%20%E2%80%94%20La%20Passione%20di%20Napoli`}
                  className="flex items-center gap-2 hover:text-gold-400 transition"
                >
                  <Mail className="w-3.5 h-3.5" /> Reservierungsanfrage
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream-100/10 flex flex-col md:flex-row gap-3 justify-between text-[11px] tracking-[0.22em] uppercase text-cream-100/45">
          <p>© {new Date().getFullYear()} La Mocca München</p>
          <p>Mit <span className="text-tomato-400">♥</span> gegrillt in München</p>
          <p>
            Powered by{" "}
            <a
              href="https://clearline-ai.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream-100/70 transition-colors"
            >
              ClearLine Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
