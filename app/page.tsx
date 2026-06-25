import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import MenuPreview from '@/components/sections/MenuPreview';
import Atmosphere from '@/components/sections/Atmosphere';
import Reviews from '@/components/sections/Reviews';
import Visit from '@/components/sections/Visit';
import Reserve from '@/components/sections/Reserve';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <MenuPreview />
      <Atmosphere />
      <Reviews />
      <Visit />
      <Reserve />
    </>
  );
}
