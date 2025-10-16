import { useEffect, useRef } from 'react';

export default function Licenses() {
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

  const certifications = [
    {
      title: 'Full-stack Development with Django: Managing Migrations',
      issuer: 'Coursera Project Network',
      year: '2025',
      credential: 'Credential ID: PBE97KSF5U01',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/0e4638e294fea403d0a76517d948eaad',
    },
    {
      title: 'Django Web Framework',
      issuer: 'Meta',
      year: '2025',
      credential: 'Credential ID: 4HHQ9DLD8NP0',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/c8ad9173bd3fc4aa13b0c211400d243f',
    },
    {
      title: 'Introduction to Front-End Development',
      issuer: 'Meta',
      year: '2022',
      credential: 'Credential ID: WOSN7P0OJY4S',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/4872b76b81474e5320598c9bf386b5e7',
    },
    {
      title: 'Programming for Everybody (Getting Started with Python)',
      issuer: 'University of Michigan',
      year: '2024',
      credential: 'Credential ID: QHGA6M0GDBUO',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/9182b9c54bb7856c9d66a0f15f2b7836',
    },
    {
      title: 'Python Data Structures',
      issuer: 'University of Michigan',
      year: '2024',
      credential: 'Credential ID: XE2XRI6TOOW5',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/129be018fb33380d2f4734935b452d22',
    },
    {
      title: 'Red Hat Application Development I: Programming in Java EE',
      issuer: 'Red Hat',
      year: '2025',
      credential: 'Credential ID: d87d82b0-e939-494a-a9e7-fc59213ed709',
      color: 'from-blue-400 to-green-500',
      link: 'https://www.credly.com/badges/d87d82b0-e939-494a-a9e7-fc59213ed709/public_url',
    },
    {
      title: 'Developing Applications with Google Cloud: Foundations',
      issuer: 'Google Cloud',
      year: '2025',
      color: 'from-blue-400 to-green-500',
      link: 'https://www.cloudskillsboost.google/public_profiles/8f2f8497-ae5b-4400-8a67-872ceb4dc682',
    },
    {
      title: 'Google Cloud Fundamentals: Core Infrastructure',
      issuer: 'Google Cloud',
      year: '2025',
      color: 'from-blue-400 to-green-500',
      link: 'https://www.cloudskillsboost.google/public_profiles/8f2f8497-ae5b-4400-8a67-872ceb4dc682',
    },
    {
      title: 'Tools of the Trade: Linux and SQL',
      issuer: 'Google',
      year: '2025',
      credential: 'Credential ID: LR4LCKDUKBQ3',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/9c89f0db15a02f9d317b25aa35717dd9',
    },
    {
      title: 'Red Hat System Administration II',
      issuer: 'Red Hat',
      year: '2025',
      credential: 'Credential ID: d1400e66-4a49-4ece-a6ab-1e48c1a56dbe',
      color: 'from-blue-400 to-green-500',
      link: 'https://www.credly.com/badges/d1400e66-4a49-4ece-a6ab-1e48c1a56dbe/public_url',
    },
    {
      title: 'Agile with Atlassian Jira',
      issuer: 'Atlassian',
      year: '2025',
      credential: 'Credential ID: 3HOPE3IA8FWM',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/10dc861e19f60c4035eac2023be97262',
    },
    {
      title: 'Agile Project Management',
      issuer: 'Google',
      year: '2025',
      credential: 'Credential ID: G5DI3OT31U80',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/ba31bb269b165da858a95d5add87b5a7',
    },
    {
      title: 'Connect and Protect: Networks and Network Security',
      issuer: 'Google',
      year: '2025',
      credential: 'Credential ID: W1U18IHKK2J7',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/a1e5c4bc938bfed1dd663f513e3c25bf',
    },
    {
      title: 'Play It Safe: Manage Security Risks',
      issuer: 'Google',
      year: '2025',
      credential: 'Credential ID: DFK5UG2D0MZK',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/526a2c9363c2d1d37d33bfe1b79e7649',
    },
    {
      title: 'Foundations of Cybersecurity',
      issuer: 'Google',
      year: '2025',
      credential: 'Credential ID: O35HXYUMBU9Z',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/bdf95337f9ec93c4cdd500f0921cda10',
    },
    {
      title: 'Play It Safe: Manage Security Risks',
      issuer: 'Google',
      year: '2025',
      credential: 'Credential ID: DFK5UG2D0MZK',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/526a2c9363c2d1d37d33bfe1b79e7649',
    },
    {
      title: 'Software Engineering: Modeling Software Systems using UML',
      issuer: 'The Hong Kong University of Science and Technology',
      year: '2025',
      credential: 'Credential ID: VFYT4B599UFT',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/92fc51d7c850160e0427afb1fd96ec30',
    },
    {
      title: 'Software Engineering: Implementation and Testing',
      issuer: 'The Hong Kong University of Science and Technology',
      year: '2025',
      credential: 'Credential ID: 4RLCTGADKRIC',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/937ced8ec4b81b3574bfcc1a7c90ce5f',
    },
    {
      title: 'Software Engineering: Software Design and Project Management',
      issuer: 'The Hong Kong University of Science and Technology',
      year: '2025',
      credential: 'Credential ID: 6RJ5U8B95V73',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/fb07e50e7492b9374e223b02ff7a2f31',
    },
    {
      title: 'Personal Productivity, Time Management and Prioritization',
      issuer: 'Starweaver',
      year: '2025',
      credential: 'Credential ID: 42JSSEDNANQ',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/8d70067b55a1a61b415bf95e4ddbd3b3',
    },
    {
      title: 'Blockchain Basics',
      issuer: 'University at Buffalo',
      year: '2025',
      credential: 'Credential ID: MNB2T35DFQ89',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/9c4853d3992cbbd253538db14ad9c625',
    },
    {
      title: 'Smart Contracts',
      issuer: 'University at Buffalo',
      year: '2025',
      credential: 'Credential ID: AVA9YLTUXXLK',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/a59b7a3301652060251435cc2b0f5deb',
    },
    {
      title: 'Decentralized Applications',
      issuer: 'University at Buffalo',
      year: '2025',
      credential: 'Credential ID: 0PMO7NHTJ7QV',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/3a58ac44dbda5edfae165691cb49c35d',
    },
    {
      title: 'Blockchain Platforms',
      issuer: 'University at Buffalo',
      year: '2025',
      credential: 'Credential ID: DZV2JHO0BB06',
      color: 'from-blue-400 to-green-500',
      link: 'https://coursera.org/share/b184daba39a1a612da75cef6ddb7005b',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 slide-up-element opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Licenses & Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Verified achievements showcasing technical expertise and professional excellence.
          </p>
        </div>

        {/* Clickable Compact Certification Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="slide-up-element opacity-0 block p-4 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-cyan-400 transition-all duration-400 hover:scale-105 hover:shadow-cyan-500/30 shadow-lg"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div
                className={`text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r ${cert.color} mb-1`}
              >
                {cert.title}
              </div>
              <div className="text-gray-300 text-sm">{cert.issuer}</div>
              <div className="text-gray-500 text-xs">{cert.year}</div>
              <div className="text-gray-400 text-xs italic mt-1">{cert.credential}</div>
              <div className="text-cyan-400 text-xs mt-2 underline hover:text-cyan-300">
                Verify →
              </div>
            </a>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-6 slide-up-element opacity-0">
          {[
            { number: `${certifications.length}+`, label: 'Licenses & Certifications' },
            { number: '2+', label: 'Cloud Platforms' },
            { number: '10+', label: 'Frontend & Backend' },
            { number: '∞', label: 'Continuous Learning' },
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
