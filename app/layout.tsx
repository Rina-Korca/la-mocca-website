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
    'Barbecue restaurant in München — slow-grilled meats, pizza, burgers and fresh salads. Rated 5.0 from 54 guests. Kurt-Eisner-Str. 30, 81735 München.',
  keywords: [
    'BBQ restaurant München',
    'Barbecue München',
    'La Mocca München',
    'Grill Restaurant München',
    'Burger München Ramersdorf'
  ],
  openGraph: {
    title: 'La Mocca München',
    description:
      'A cozy barbecue restaurant in München — slow-grilled meats, pizza, burgers and fresh salads. Open daily from 11:00.',
    type: 'website',
    locale: 'en_DE',
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
