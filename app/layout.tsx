import type { Metadata } from 'next';
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap'
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap'
});

const italic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic', 'normal'],
  variable: '--font-italic',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://la-mocca-muenchen.de'),
  title: {
    default: 'La Mocca — Barbecue Restaurant in München',
    template: '%s · La Mocca München'
  },
  description:
    'Barbecue-Restaurant in München — langsam gegrilltes Fleisch, Pizza, Burger und frische Salate. Bewertet mit 5,0 von 54 Gästen. Kurt-Eisner-Str. 30, 81735 München.',
  keywords: [
    'BBQ Restaurant München',
    'Barbecue München',
    'La Mocca München',
    'Grill Restaurant München',
    'Burger München Ramersdorf'
  ],
  openGraph: {
    title: 'La Mocca München',
    description:
      'Ein gemütliches Barbecue-Restaurant in München — langsam gegrilltes Fleisch, Pizza, Burger und frische Salate. Täglich ab 11:00 Uhr geöffnet.',
    type: 'website',
    locale: 'de_DE',
    siteName: 'La Mocca'
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${italic.variable}`}
    >
      <body className="bg-espresso-900 text-cream-100 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'La Mocca',
              servesCuisine: ['Barbecue', 'Grill', 'Pizza', 'Burgers'],
              priceRange: '€',
              telephone: '+49 1516 4683008',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Kurt-Eisner-Str. 30',
                postalCode: '81735',
                addressLocality: 'München',
                addressCountry: 'DE'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                reviewCount: '54'
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                  ],
                  opens: '11:00',
                  closes: '22:00'
                }
              ]
            })
          }}
        />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
