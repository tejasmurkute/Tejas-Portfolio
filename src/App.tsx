import { useState, useEffect } from 'react';
import { AmbienceProvider } from '@/hooks/useAmbience';
import { Preloader } from '@/components/Preloader/Preloader';
import { PortfolioIndex } from '@/sections/PortfolioIndex/PortfolioIndex';
import { About } from '@/sections/About/About';
import { Skills } from '@/sections/Skills/Skills';
import { LatestWork } from '@/sections/LatestWork/LatestWork';
import { GlobalHeader } from '@/components/GlobalHeader/GlobalHeader';
import { GlobalFooter } from '@/components/GlobalFooter/GlobalFooter';
import { ReactLenis } from 'lenis/react';

export default function App() {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Prevent the browser from restoring the scroll position on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Ensure we start at the top
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis root>
      <AmbienceProvider>
        <Preloader onRevealStart={() => setIsRevealed(true)} />
        <GlobalHeader isRevealed={isRevealed} />
        
        {/* The grain overlay provides the physical, architectural texture */}
        <div className="grain relative min-h-screen">
          <main className="relative z-10 flex flex-col">
            <PortfolioIndex isRevealed={isRevealed} />
            
            {/* 
              The About section and subsequent sections sit on top of the sticky homepage.
              We wrap it in a solid dark background so it physically covers the homepage as it scrolls up.
            */}
            <div className="relative z-20 bg-black">
              <About />
              <Skills />
              <LatestWork />
              <GlobalFooter />
            </div>
          </main>
        </div>
      </AmbienceProvider>
    </ReactLenis>
  );
}
