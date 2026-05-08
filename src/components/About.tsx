import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = "+" }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(v) + suffix;
          }
        }
      });
      return controls.stop;
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    { value: 3, label: "Projects Shipped" },
    { value: 0, label: "Years Experience" },
    { value: 10, suffix: "K+", label: "Lines of Code" }
  ];

  const floatingBadges = [
    { icon: "⚛️", top: "10%", left: "-5%", delay: 0 },
    { icon: "☕", top: "70%", left: "-10%", delay: 1.5 },
    { icon: "🍃", top: "40%", right: "-8%", delay: 3 }
  ];

  return (
    <section id="about" ref={containerRef} className="py-24 relative z-10 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-neon-green" />
            <span className="font-mono text-neon-green text-sm uppercase tracking-widest">About Me</span>
          </div>

          <h2 className="font-bebas text-5xl md:text-7xl mb-8">
            ENGINEERING THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-cyan">FUTURE</span> OF WEB
          </h2>

          <div className="space-y-6 font-space font-light text-text-muted leading-[1.9] mb-12">
            <p>
              I am a passionate Full Stack Developer focused on building robust, scalable enterprise applications and dynamic, user-centric web experiences. My expertise bridges the gap between powerful backend systems and sleek frontend interfaces.
            </p>
            <p>
              With a deep understanding of Java, Spring Boot, and React, I engineer full-scale solutions that don't just work flawlessly behind the scenes, but also provide an unforgettable experience for the end user.
            </p>
            <p>
              When I'm not writing code, I'm exploring new technologies, refining my architecture patterns, or contributing to the developer community.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="flex flex-col"
              >
                <div className="font-bebas text-5xl text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-cyan mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix || "+"} />
                </div>
                <div className="font-space text-sm text-text-muted font-light uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Content - Avatar Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative lg:ml-auto w-full max-w-md aspect-square"
        >
          {/* Animated Neon Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-neon-green via-transparent to-neon-cyan animate-[spin_4s_linear_infinite] opacity-50 blur-md" />
          <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-tr from-neon-green via-surface to-neon-cyan animate-[spin_4s_linear_infinite]" />

          <div className="absolute inset-[2px] rounded-2xl glass-card bg-[#0a0a0a] flex items-center justify-center overflow-hidden z-10 shadow-[0_0_40px_rgba(0,255,136,0.15)]">
            <div className="font-bebas text-[12rem] text-surface drop-shadow-[0_0_3px_rgba(0,255,136,0.3)] select-none">
              JP
            </div>
            {/* Grain overlay for the card */}
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\"/%3E%3C/svg%3E')" }}
            />
          </div>

          {/* Orbiting skill badges */}
          {floatingBadges.map((badge, i) => (
            <motion.div
              key={i}
              className="absolute z-20 w-14 h-14 rounded-full glass-card flex items-center justify-center text-2xl border-neon-cyan/30 shadow-[0_0_15px_rgba(0,207,255,0.2)]"
              style={{ top: badge.top, left: badge.left, right: badge.right }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: badge.delay,
                ease: "easeInOut"
              }}
            >
              {badge.icon}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
