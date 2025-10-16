import { useEffect, useRef, useState } from 'react';
import { Mail, Send, Github, Linkedin, InstagramIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SuccessAnimation from './SuccessAnimation';
import './SuccessAnimation.css';
import { FaDiscord } from 'react-icons/fa'

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        '@Tejas#04',            // Service ID
        'template_g4iuqew',     // Template ID
        formRef.current,
        'ow2we_vuQkr5TFZvS'     // Public Key
      )
      .then(
        () => {
          setShowSuccess(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setShowSuccess(false), 2000);
        },
        (error) => {
          console.error('EmailJS Error:', error.text);
          alert('❌ Failed to send message. Try again later.');
        }
      )
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-slide-up');
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.slide-up-element');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, href: 'https://github.com/tejasmurkute', label: 'GitHub' },
    { icon: <Linkedin className="w-6 h-6" />, href: 'https://www.linkedin.com/in/tejas-murkute-7ba932289', label: 'LinkedIn' },
    { icon: <InstagramIcon className="w-6 h-6" />, href: 'https://www.instagram.com/tejas._.1794', label: 'Instagram' },
    { icon: <FaDiscord className="w-6 h-6" />, href: 'https://discord.com/users/917696080873914388', label: 'FaDiscord' },
  ];

  return (
    <section ref={sectionRef} className="relative">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20 slide-up-element opacity-0">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8" />
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind? Let's create something extraordinary together
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="slide-up-element opacity-0">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-white resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="slide-up-element opacity-0 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">Let's Connect</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-4 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:tejasmurkute2004@gmail.com" className="hover:underline">
                    tejasmurkute2004@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-4 rounded-full bg-gray-900 border border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center text-gray-500 slide-up-element opacity-0">
          <p>&copy; Bringing futuristic ideas to life, one pixel at a time.</p>
        </div>
      </div>

      {/* ✅ Apple Face ID-style success animation */}
      {showSuccess && <SuccessAnimation />}
    </section>
  );
}
