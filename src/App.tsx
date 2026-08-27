import { AmbienceProvider } from '@/hooks/useAmbience';
import { Preloader } from '@/components/Preloader/Preloader';
import { CosmicBackground } from '@/components/CosmicBackground/CosmicBackground';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import { Home } from '@/sections/Home/Home';
import { Projects } from '@/sections/Projects/Projects';
import { Software } from '@/sections/Software/Software';
import { Experience } from '@/sections/Experience/Experience';
import { BeyondCode } from '@/sections/BeyondCode/BeyondCode';
import { About } from '@/sections/About/About';
import { Contact } from '@/sections/Contact/Contact';

export default function App() {
  return (
    <AmbienceProvider>
      <Preloader />
      {/* `grain` paints the film-grain overlay above everything via ::after */}
      <div className="grain relative min-h-screen">
        <a
          href="#home"
          className="sr-only z-[80] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:border focus:border-accent focus:bg-void focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>

        <CosmicBackground />
        <Navbar />

        <main className="relative z-10">
          <Home />
          <Projects />
          <Software />
          <Experience />
          <BeyondCode />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </AmbienceProvider>
  );
}
