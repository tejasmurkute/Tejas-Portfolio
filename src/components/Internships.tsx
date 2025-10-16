import { useEffect, useRef } from 'react';

export default function Internships() {
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

  const internships = [
    {
      company: 'Google for Developers',
      role: 'Android Developer Virtual Intern',
      duration: 'April – June 2025 (10 weeks)',
      description:
        ' Successfully completed a Virtual Internship in Android Development, organized by Google for Developers MENA India and EduSkills, hosted on the National Internship Portal',
      link: 'https://aictecert.eduskillsfoundation.org/pages/home/verify.php?cert=989fd649de8d8ab7b5523b46e02aff3f',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      company: 'Altair',
      role: 'Data Science Master Intern',
      duration: 'October – December 2024 (10 weeks)',
      description:
        'Successfully completed a Virtual Internship in Data Science, coordinated by Altair as Head of Academic Initiatives, through EduSkills and AICTE',
      link: 'https://aictecert.eduskillsfoundation.org/pages/home/verify.php?cert=89e2c3fb7224f8a18a532c5effa93a01',
      color: 'from-purple-400 to-pink-500',
    },
    {
      company: 'Zscaler',
      role: 'Zero Trust Cloud Security Intern',
      duration: 'January – March 2025 (10 weeks)',
      description:
        'Completed a Virtual Internship focusing on Zero Trust Cloud Security, organized via National Internship Portal with technical enablement from Zscaler and EduSkills',
      link: 'https://aictecert.eduskillsfoundation.org/pages/home/verify.php?cert=ae5104a04f0781470c189a59234905b1',
      color: 'from-yellow-400 to-red-500',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 slide-up-element opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Internships
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Hands-on experience gained at world-leading technology and aerospace organizations.
          </p>
        </div>

        {/* Internship Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {internships.map((intern, index) => (
            <a
              key={index}
              href={intern.link}
              target="_blank"
              rel="noopener noreferrer"
              className="slide-up-element opacity-0 block p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-cyan-400 transition-all duration-500 hover:scale-105 shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${intern.color} mb-2`}
              >
                {intern.company}
              </div>
              <div className="text-gray-300 font-medium mb-1">{intern.role}</div>
              <div className="text-gray-500 text-sm mb-3">{intern.duration}</div>
              <p className="text-gray-400 text-sm mb-3">{intern.description}</p>
              <div className="text-cyan-400 text-sm underline hover:text-cyan-300">
                Visit →
              </div>
            </a>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-6 slide-up-element opacity-0">
          {[
            { number: `${internships.length}`, label: 'Internships Completed' },
            { number: '3', label: 'Technologies Mastered' },
            { number: '3', label: 'MNCs Worked With' },
            { number: '100%', label: 'Learning Enthusiasm' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-5 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
