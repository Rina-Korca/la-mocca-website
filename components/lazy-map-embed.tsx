'use client';

import { useState } from 'react';

type LazyMapEmbedProps = {
  src: string;
  title?: string;
  style?: React.CSSProperties;
};

export function LazyMapEmbed({
  src,
  title = 'Standort auf Google Maps',
  style,
}: LazyMapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={style}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-cream-100/10 px-6 text-center text-sm text-cream-100/80 transition-colors hover:bg-cream-100/15"
    >
      <span className="font-medium">Karte laden</span>
      <span className="text-xs text-cream-100/60">
        Beim Laden wird eine Verbindung zu Google Maps hergestellt und Daten an Google übertragen.
      </span>
    </button>
  );
}
