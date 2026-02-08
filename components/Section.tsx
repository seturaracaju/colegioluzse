
import React, { useEffect, useRef } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '', dark = false }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className={`py-20 px-6 reveal ${dark ? 'bg-cl-blue-dark text-white' : 'bg-white text-gray-800'} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4 font-sans">{title}</h2>}
            {subtitle && <p className={`text-lg italic font-serif ${dark ? 'text-cl-blue-light' : 'text-cl-blue-dark opacity-80'}`}>{subtitle}</p>}
            <div className={`h-1 w-20 mx-auto mt-6 ${dark ? 'bg-cl-yellow' : 'bg-cl-blue-dark opacity-20'}`}></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
