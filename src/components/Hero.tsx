import { useEffect, useRef, useState } from 'react';
import { Rocket, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [titleVisible, setTitleVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setTitleVisible(true), 300);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center mb-6 space-x-3">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-cyan-400" />
            <Rocket className="w-8 h-8 text-cyan-400 animate-float" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
            Tejas Murkute
          </h1>

          <div className="text-3xl md:text-5xl font-light mb-6 text-gray-300">
            <span className="inline-block animate-type-writer">Portfolio</span>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            CSE Undergraduate | Python • React • Adobe | Deep Learning & GenAI Enthusiast | ACM Design Team Member | RedHat • Google • Meta Certified
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50">
              <span className="relative z-10">Resume</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="px-8 py-4 border-2 border-cyan-400 rounded-full font-semibold text-lg hover:bg-cyan-400/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30">
            Connect with me
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:text-cyan-400 transition-colors"
      >
        <ChevronDown className="w-10 h-10" />
      </button>
    </section>
  );
}
