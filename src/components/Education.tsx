import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const EDUCATIONS = [
  {
    id: 1,
    date: "2022 - 2025",
    degree: "Bachelors in Electonics and Communication",
    institution: "Sri Indu College Of Engineering And Technology",
    location: "Ibrahimpatnam",
    align: "right"
  },
  {
    id: 2,
    date: "2019 - 2022",
    degree: "Diploma in Electronics and Communication",
    institution: "T.R.R. College Of Technology",
    location: "Hyderabad",
    align: "center"
  },
  {
    id: 3,
    date: "2018 - 2019",
    degree: "Secondary School Certificate (SSC)",
    institution: "T.R.R.High School",
    location: "Hyderabad",
    align: "left"
  }
];

const EducationItem = ({ edu }: { edu: typeof EDUCATIONS[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Mobile layout uses left-aligned approach, Desktop uses the specific align property
  const alignmentClass =
    edu.align === 'right' ? 'md:self-end' :
      edu.align === 'center' ? 'md:self-center' :
        'md:self-start';

  return (
    <div className={`relative pl-8 md:pl-0 w-full md:w-1/3 flex flex-col ${alignmentClass}`} ref={ref}>

      {/* Timeline Dot - Mobile: Left, Desktop: Top Center of Card */}
      <div className="absolute left-[-5px] top-6 md:left-1/2 md:-translate-x-1/2 md:-top-3 w-3 h-3 rounded-full bg-neon-violet shadow-[0_0_10px_#8A2BE2] z-20" />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="w-full mb-12 md:mb-0 mt-0 md:mt-2"
      >
        <div className={`glass-card p-6 md:p-8 hover:border-neon-violet/30 transition-colors duration-300 relative group overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-neon-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="font-mono text-neon-violet text-sm mb-3">
            {edu.date}
          </div>

          <h3 className="font-space font-bold text-2xl text-white mb-1">
            {edu.degree}
          </h3>

          <div className="font-space text-text-muted text-sm mb-6 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-white/80 font-medium">{edu.institution}</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>{edu.location}</span>
          </div>


        </div>
      </motion.div>

    </div>
  );
};

export const Education = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" ref={containerRef} className="py-24 relative z-10 bg-black/40 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">

        <div className="mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-neon-violet" />
            <span className="font-mono text-neon-violet text-sm uppercase tracking-widest">Academic Journey</span>
            <div className="w-12 h-[1px] bg-neon-violet" />
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl">
            FORMAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-green">EDUCATION</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Mobile Timeline Line (Straight left) */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />
          <motion.div
            className="md:hidden absolute left-0 top-0 w-[2px] bg-gradient-to-b from-neon-violet via-neon-green to-transparent origin-top z-10"
            style={{ height: lineHeight }}
          />

          {/* Desktop Timeline Winding SVG Line */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0" style={{ top: '10px', bottom: '10px' }}>
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Background faded line */}
              <path
                d="M 83.33 0 L 83.33 15 C 83.33 35, 50 30, 50 50 C 50 70, 16.66 65, 16.66 85 L 16.66 100"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.2"
                fill="none"
              />
              {/* Animated progress line */}
              <motion.path
                d="M 83.33 0 L 83.33 15 C 83.33 35, 50 30, 50 50 C 50 70, 16.66 65, 16.66 85 L 16.66 100"
                stroke="url(#eduGradient)"
                strokeWidth="0.5"
                fill="none"
                style={{ pathLength: scrollYProgress }}
              />
              <defs>
                <linearGradient id="eduGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8A2BE2" />
                  <stop offset="50%" stopColor="#00FF88" />
                  <stop offset="100%" stopColor="#8A2BE2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col space-y-12 md:space-y-32 py-4">
            {EDUCATIONS.map((edu, index) => (
              <EducationItem key={edu.id} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
