import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    title: "⚡ Frontend",
    accent: "from-neon-green to-emerald-500",
    color: "#00FF88",
    skills: [
      { name: "React 18", value: 80 },
      { name: "TypeScript", value: 50 },
      { name: "JavaScript ES2024", value: 85 },
      { name: "Tailwind CSS", value: 85 },
      { name: "HTML5/CSS3", value: 98 },
      { name: "Vite", value: 90 }
    ]
  },
  {
    title: "☕ Java & Spring",
    accent: "from-neon-cyan to-blue-500",
    color: "#00CFFF",
    skills: [
      { name: "Java 21", value: 90 },
      { name: "Spring Boot 3", value: 80 },
      { name: "Spring Security", value: 70 },
      { name: "Hibernate/JPA", value: 70 },
      { name: "Maven/Gradle", value: 70 },
      { name: "Microservices", value: 70 },
      { name: "REST/GraphQL", value: 75 },
      { name: "JUnit 5", value: 50 }
    ]
  },
  {
    title: "☁️ Infrastructure",
    accent: "from-neon-violet to-purple-500",
    color: "#A855F7",
    skills: [
      { name: "PostgreSQL", value: 80 },
      { name: "MySQL", value: 80 },
      { name: "MongoDB", value: 70 },
      { name: "Redis", value: 60 },
      { name: "Docker", value: 60 },
      { name: "CI/CD (GitHub Actions)", value: 60 }
    ]
  }
];

const SkillBar = ({ name, value, color, delay }: { name: string, value: number, color: string, delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="mb-4" ref={ref}>
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-xs text-text-primary">{name}</span>
        <span className="font-mono text-xs text-text-muted">{value}%</span>
      </div>
      <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}80` }}
          initial={{ width: "0%" }}
          animate={inView ? { width: `${value}%` } : { width: "0%" }}
          transition={{ duration: 1.2, delay: delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={containerRef} className="py-24 relative z-10 bg-black/40 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-neon-cyan" />
            <span className="font-mono text-neon-cyan text-sm uppercase tracking-widest">Technical Arsenal</span>
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl">
            CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-violet">COMPETENCIES</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              className="glass-card p-8 group transition-all duration-300 hover:-translate-y-2 hover:border-white/20 relative overflow-hidden"
            >
              {/* Hover gradient border effect using a pseudo-element style setup */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at 50% 0%, ${category.color}15, transparent 40%)`
                }}
              />

              <h3 className="font-space text-xl font-bold mb-8 flex items-center gap-3">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${category.accent}`}>
                  {category.title}
                </span>
              </h3>

              <div className="relative z-10">
                {category.skills.map((skill, sIdx) => (
                  <SkillBar
                    key={sIdx}
                    name={skill.name}
                    value={skill.value}
                    color={category.color}
                    delay={0.4 + idx * 0.1 + sIdx * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
