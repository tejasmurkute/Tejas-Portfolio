import { useEffect, useRef } from 'react';
import { Satellite, Cpu, Zap } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.slide-up-element');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Satellite className="w-8 h-8" />,
      title: 'Space Innovation',
      description: 'Pushing boundaries with cutting-edge space technology solutions',
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Advanced Systems',
      description: 'Building intelligent systems for tomorrow\'s challenges',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'High Performance',
      description: 'Optimized for speed, reliability, and scalability',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 slide-up-element opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8" />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I’m a creative technologist blending design and code to craft meaningful digital experiences. As a Design Team Member at ACM, I contributed to impactful nonprofit projects while pursuing my B.Tech in Computer Science Engineering at Pimpri Chinchwad University. With certifications in Python, front-end development, and productivity tools, I’m passionate about exploring how cloud computing and AI can shape the future of human-centered design.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="slide-up-element opacity-0 group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-cyan-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="mb-6 text-cyan-400 group-hover:text-blue-400 transition-colors duration-300 group-hover:animate-float">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
