import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';

const TABS = ['All Projects', 'Web', 'Full Stack'];

const PROJECTS = [
  {
    id: 1,
    title: "UserStats",
    stream: "Full Stack",
    description: "A full-stack feedback management and analytics dashboard built with the MERN stack and Tailwind CSS to capture, process, and visualize real-time user engagement metrics.",
    stack: ["React", "Tailwind.css", "Express", "MongoDB"],
    icon: "📝",
    gradient: "from-blue-900 to-cyan-900",
    color: "#00CFFF"
  },
  {
    id: 2,
    title: "Ghost Controller",
    stream: "Full Stack",
    description: "Ghost Controller is a real-time traffic management engine designed to handle high-concurrency state calculations. It features an event-driven architecture with a 100ms heartbeat cycle, managing independent vehicle entities through thread-safe structures. The project demonstrates advanced multi-threading and asynchronous communication by allowing vehicles to autonomously react to a Tri-State Traffic Light logic.",
    stack: ["React", "Spring Boot", "WebSockets", "ConcurrentHashMap"],
    icon: "🚦",
    gradient: "from-emerald-900 to-teal-900",
    color: "#00FF88"
  },
  {
    id: 3,
    title: "Logistic Management System",
    stream: "Full Stack",
    description: "A centralized logistics platform designed to optimize supply chain efficiency by tracking real-time shipments, managing inventory levels, and streamlining distribution workflows.",
    stack: ["Java", "SpringBoot", "PostgreSQL"],
    icon: "🚚",
    gradient: "from-purple-900 to-pink-900",
    color: "#FF006E"
  },
  {
    id: 4,
    title: "Heavenly Bakes",
    stream: "Web",
    description: "A full-stack web application built to handle real-time inventory updates and customer feedback for a bakery, ensuring a seamless experience from product discovery to final purchase.",
    stack: ["HTML", "CSS", "JS", "Bootstrap"],
    icon: "🎂",
    gradient: "from-indigo-900 to-blue-900",
    color: "#00CFFF"
  },
  {
    id: 5,
    title: "HotWheels",
    stream: "Web",
    description: "A high-performance e-commerce platform for automotive enthusiasts, featuring a dynamic product catalog, and a seamless checkout experience.",
    stack: ["React", "Tailwind.css"],
    icon: "🏎️",
    gradient: "from-fuchsia-900 to-purple-900",
    color: "#A855F7"
  },
  {
    id: 6,
    title: "Mini-Excalidraw",
    stream: "Web",
    description: "A lightweight, browser-based whiteboarding tool that enables real-time sketching and diagramming through a high-performance HTML5 Canvas interface.",
    stack: ["React", "Tailwind.css"],
    icon: "✏️",
    gradient: "from-rose-900 to-orange-900",
    color: "#FF006E"
  }
];

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 12; // max 12deg
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4 }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full glass-card border-white/10 hover:border-[color:var(--hover-color)] transition-colors duration-300 overflow-hidden"
        style={{ transformStyle: "preserve-3d", "--hover-color": project.color } as any}
      >
        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 -translate-x-[150%] skew-x-[-30deg] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer z-20 pointer-events-none" />

        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-10 mix-blend-screen"
          style={{ background: `radial-gradient(circle at center, ${project.color}, transparent)` }}
        />

        {/* Header Visual */}
        <div
          className={`h-[180px] w-full bg-gradient-to-br ${project.gradient} relative flex items-center justify-center overflow-hidden`}
          style={{ transform: "translateZ(30px)" }} // 3D popup
        >
          {/* subtle mesh overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h20v20H0z\" fill=\"none\"/%3E%3Cpath d=\"M19.5 0v19.5H0\" fill=\"none\" stroke=\"%23ffffff\" stroke-opacity=\"0.05\" stroke-width=\"1\"/%3E%3C/svg%3E')" }}
          />
          <span className="text-6xl filter drop-shadow-xl">{project.icon}</span>
        </div>

        <div className="p-6 relative z-30 bg-[#080808]/90 h-[calc(100%-180px)] flex flex-col" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center justify-between mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-surface border"
              style={{ color: project.color, borderColor: `${project.color}40` }}
            >
              {project.stream}
            </span>
          </div>

          <h3 className="font-space font-bold text-xl mb-2 text-text-primary group-hover:text-white transition-colors">
            {project.title}
          </h3>

          <p className="font-space font-light text-sm text-text-muted mb-6 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech) => (
              <span key={tech} className="px-2 py-1 text-[11px] font-mono rounded bg-white/5 border border-white/10 text-text-muted">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 pt-4 border-t border-white/5">
            <a href="https://github.com/janardhanpavan" className="magnetic flex items-center gap-1.5 text-sm font-space font-medium text-text-muted hover:text-white transition-colors">
              <span>Code</span>
              <Code2 size={14} />
            </a>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export const Projects = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const filteredProjects = PROJECTS.filter(
    p => activeTab === 'All Projects' || p.stream === activeTab
  );

  return (
    <section id="projects" className="py-24 relative z-10 min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">

        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-neon-magenta" />
              <span className="font-mono text-neon-magenta text-sm uppercase tracking-widest">Featured Work</span>
            </div>
            <h2 className="font-bebas text-5xl md:text-7xl">
              SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta to-neon-violet">PROJECTS</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-3 bg-surface/50 p-1.5 rounded-lg border border-white/5 backdrop-blur-md">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`magnetic relative px-4 py-2 rounded-md font-space text-sm font-medium transition-all duration-300 ${isActive
                    ? 'text-black bg-gradient-to-r from-neon-cyan to-neon-magenta shadow-[0_0_15px_rgba(0,207,255,0.4)]'
                    : 'text-text-muted hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5'
                    }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
