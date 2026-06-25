import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const RESTAURANT = {
  name: 'La Mocca',
  shortName: 'La Mocca',
  cuisine: 'Barbecue Restaurant',
  address: {
    street: 'Kurt-Eisner-Str. 30',
    city: '81735 München',
    country: 'Germany'
  },
  phone: '+49 1516 4683008',
  phoneHref: 'tel:+4915164683008',
  rating: 5.0,
  reviewCount: 54,
  priceRange: '€10–20',
  hours: [
    { day: 'Monday', value: '11:00 – 22:00', closed: false },
    { day: 'Tuesday', value: '11:00 – 22:00', closed: false },
    { day: 'Wednesday', value: '11:00 – 22:00', closed: false },
    { day: 'Thursday', value: '11:00 – 22:00', closed: false },
    { day: 'Friday', value: '11:00 – 22:00', closed: false },
    { day: 'Saturday', value: '11:00 – 22:00', closed: false },
    { day: 'Sunday', value: '11:00 – 22:00', closed: false }
  ] as Array<{ day: string; value: string; closed: boolean }>,
  services: ['Dine-in', 'Drive-through', 'Delivery'],
  mapsUrl:
    'https://www.google.com/maps/place/La+Mocca/@48.1047664,11.652971,1404m/data=!3m1!1e3!4m6!3m5!1s0x479de1003040126d:0xe68f19e6c0605e8f!8m2!3d48.1046787!4d11.6526167!16s%2Fg%2F11mm776715!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDYyMi4wIKXMDSoASAFQAw%3D%3D',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=48.1046787,11.6526167&hl=en&z=16&output=embed'
} as const;
