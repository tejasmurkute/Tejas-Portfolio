import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Rocket, Satellite, Orbit } from 'lucide-react';

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const projects = [
    {
      title: 'Orbital Navigation System',
      description: 'Advanced 3D visualization for satellite tracking and orbital mechanics',
      icon: <Orbit className="w-12 h-12" />,
      tags: ['Three.js', 'React', 'WebGL'],
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Deep Space Explorer',
      description: 'Interactive space exploration platform with real-time data visualization',
      icon: <Rocket className="w-12 h-12" />,
      tags: ['TypeScript', 'WebGL', 'API'],
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Satellite Command Center',
      description: 'Mission control dashboard for satellite fleet management',
      icon: <Satellite className="w-12 h-12" />,
      tags: ['React', 'Node.js', 'WebSocket'],
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <section ref={sectionRef} className="">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 slide-up-element opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8" />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing innovative solutions at the intersection of space technology and web development
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="slide-up-element opacity-0 group relative"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 overflow-hidden transition-all duration-500 hover:border-transparent hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  <div className={`mb-6 text-cyan-400 transition-all duration-500 ${hoveredIndex === index ? 'animate-float scale-110' : ''}`}>
                    {project.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group/btn">
                      <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      <span>View Project</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                      <span>Code</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
