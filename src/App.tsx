import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import StarField from './components/StarField';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import Licenses from './components/Licences'; 
import Internships from './components/Internships';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <Cursor />
      <StarField />

      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Licenses />
        <Internships />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}

export default App;
