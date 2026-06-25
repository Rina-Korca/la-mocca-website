const items = [
  'La Mocca München',
  '★ 5.0 · 54 guests',
  'BBQ & Grill',
  'Pizza & Burgers',
  'Dine-in · Drive-through · Delivery',
  'Open Daily · 11:00 – 22:00',
  'Mangia bene, ridi spesso'
];

export default function Marquee() {
  const list = [...items, ...items];
  return (
    <div
      aria-hidden
      className="relative border-y border-gold-400/15 py-7 bg-espresso-800 overflow-hidden"
    >
      <div className="flex marquee-track gap-12 whitespace-nowrap text-cream-100/65 text-sm tracking-[0.3em] uppercase font-display italic-accent">
        {list.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
