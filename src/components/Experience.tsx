import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const EXPERIENCES = [
  {
    id: 1,
    date: "Feb - Mar 2026",
    role: "Full Stack Developer",
    company: "Sysslan It Solutions",
    location: "Remote",
    description: [
      "Developed a full-stack Event Feedback System using React.js, backend APIs, and database integration. ",
      "Built responsive UI with form validation and routing.",
      "Implemented APIs for data handling and ensured seamless database operations.",
      "Performed debugging and testing to improve system reliability and data flow."
    ]
  },
  {
    id: 2,
    date: "Feb 2025 - Jan 2026",
    role: "Full Stack Java Developer Training",
    company: "JSpiders",
    location: "Hyderabad, Telangana",
    description: [
      "Backend Development: Mastered Core and Advanced Java, implementing robust business logic using Spring Boot and Microservices architecture.",
      "Database Management: Designed and optimized relational schemas using MySQL and PostgreSQL, managing data persistence with JDBC and Hibernate.",
      "Frontend Integration: Developed dynamic, responsive user interfaces using React and Tailwind CSS, ensuring seamless API integration.",
      "Framework Proficiency: Built scalable web applications utilizing Spring MVC and simplified configuration through Spring Boot starters."
    ]
  },
  {
    id: 3,
    date: "Aug - Sep 2025",
    role: "Backend Developer",
    company: "Gwing IT Technologies",
    location: "Remote",
    description: [
      "Placement Management System: Engineered a comprehensive backend system using Spring Boot to automate the student placement lifecycle, implementing full CRUD functionality for managing candidate and recruiter data.",
      "Enterprise Web Application: Developed a dynamic web application utilizing Advanced Java, focusing on robust server-side logic and efficient request handling.",
      "Database Integration: Designed relational database schemas to support placement workflows, ensuring data integrity and optimized query performance."
    ]
  },
  {
    id: 4,
    date: "Jan - Feb 2025",
    role: "Python Programming",
    company: "CodTech It Solutions",
    location: "Remote",
    description: [
      "Completed a series of intensive logic-based projects designed to master core programming principles, including data structures, file handling, and algorithmic thinking.",
      "Developed a Contact Book application featuring search and storage functionality, and a To-Do List manager to practice state persistence and user input validation.",
      "Engineered a functional Calculator and other utility-based tools to refine expertise in control flow, error handling, and modular code design. "
    ]
  }
];

const ExperienceItem = ({ exp, index }: { exp: typeof EXPERIENCES[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative pl-8 md:pl-0" ref={ref}>
      {/* Desktop Layout is alternating, Mobile is left-aligned */}
      <div className={`md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

        {/* Timeline Dot */}
        <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full bg-neon-green shadow-[0_0_10px_#00FF88] z-10" />

        {/* Empty space for alternating layout on desktop */}
        <div className="hidden md:block w-5/12" />

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-5/12 mb-12 md:mb-0"
        >
          <div className={`glass-card p-6 md:p-8 hover:border-neon-green/30 transition-colors duration-300 relative group overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="font-mono text-neon-green text-sm mb-3">
              {exp.date}
            </div>

            <h3 className="font-space font-bold text-2xl text-white mb-1">
              {exp.role}
            </h3>

            <div className="font-space text-text-muted text-sm mb-6 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-white/80 font-medium">{exp.company}</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span>{exp.location}</span>
            </div>

            <ul className="space-y-3">
              {exp.description.map((desc, i) => (
                <li key={i} className="font-space font-light text-text-muted text-sm leading-[1.9] flex items-start gap-3">
                  <span className="text-neon-green/50 mt-1.5">▹</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export const Experience = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-24 relative z-10 bg-black/40 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">

        <div className="mb-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-neon-green" />
            <span className="font-mono text-neon-green text-sm uppercase tracking-widest">Career Path</span>
            <div className="w-12 h-[1px] bg-neon-green" />
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl">
            INTERNSHIPS AND TRAINING <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-violet">EXPERIENCE</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Background Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10" />

          {/* Timeline Animated Drawing Line */}
          <motion.div
            className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-neon-green via-neon-violet to-transparent origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 md:space-y-24 py-12">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceItem key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
