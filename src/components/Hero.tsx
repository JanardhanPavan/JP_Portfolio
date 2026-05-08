import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Briefcase, MessageSquare } from 'lucide-react';

const ROLES = [
  "Full Stack Developer",
  "Java Developer"
];

const CODE_SNIPPET = `@RestController
@RequestMapping("/api/v1/core")
public class BankController {
    
    @Autowired
    private TransactionService txService;

    @PostMapping("/transfer")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TxResponse> transfer(
        @RequestBody TxRequest req
    ) {
        log.info("Processing transfer...");
        TxResult result = txService.process(req);
        return ResponseEntity.ok(result);
    }
}`;

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentRoleText, setCurrentRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [codeText, setCodeText] = useState("");

  // Role Typewriter Effect
  useEffect(() => {
    const role = ROLES[roleIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentRoleText === role) {
      typingSpeed = 2000; // Pause at end of word
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    } else if (isDeleting && currentRoleText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentRoleText(
        role.substring(0, currentRoleText.length + (isDeleting ? -1 : 1))
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentRoleText, isDeleting, roleIndex]);

  // Code Window Typewriter Effect
  useEffect(() => {
    if (codeText.length < CODE_SNIPPET.length) {
      const timeout = setTimeout(() => {
        setCodeText(CODE_SNIPPET.substring(0, codeText.length + 1));
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [codeText]);

  // Parallax tilt logic
  const [tiltProps, setTiltProps] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const rotateY = ((clientX / width) - 0.5) * 16; // Max 8deg left/right
    const rotateX = -((clientY / height) - 0.5) * 16; // Max 8deg up/down

    setTiltProps({ rotateX, rotateY });
  };

  const staggerVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.15, duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <section
      id="hero"
      className="min-h-screen pt-24 pb-12 flex flex-col justify-center w-full relative z-10"
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        animate={{
          rotateX: tiltProps.rotateX,
          rotateY: tiltProps.rotateY
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >

        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div
            variants={staggerVariants} custom={1} initial="hidden" animate="visible"
            className="font-mono text-neon-green mb-6 bg-neon-green/10 px-4 py-1.5 rounded-sm border border-neon-green/30"
          >
            [ AVAILABLE FOR HIRE ] <span className="animate-ping">_</span>
          </motion.div>

          <motion.h1
            variants={staggerVariants} custom={2} initial="hidden" animate="visible"
            className="font-bebas leading-[0.85] mb-4"
            style={{ fontSize: 'clamp(5rem, 10vw, 9rem)' }}
          >
            <div className="text-white">JANARDHAN</div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-cyan to-neon-magenta">PAVAN</div>
          </motion.h1>

          <motion.div
            variants={staggerVariants} custom={3} initial="hidden" animate="visible"
            className="font-space text-2xl md:text-3xl font-light text-text-primary mb-6 h-10"
          >
            I am a <span className="text-neon-cyan font-medium">{currentRoleText}</span>
            <span className="text-neon-cyan animate-pulse ml-1">|</span>
          </motion.div>

          <motion.p
            variants={staggerVariants} custom={4} initial="hidden" animate="visible"
            className="font-space text-text-muted text-lg font-light max-w-xl mb-10 leading-relaxed"
          >
            Crafting high-performance enterprise applications with Java and modern, dynamic interfaces in React. Bringing robust backend architecture and stunning frontend aesthetics together.
          </motion.p>

          <motion.div
            variants={staggerVariants} custom={5} initial="hidden" animate="visible"
            className="flex flex-wrap items-center gap-6 mb-12"
          >
            <a href="#projects" className="magnetic group relative px-8 py-4 bg-neon-green text-black font-space font-bold uppercase tracking-wider overflow-hidden rounded-sm hover:scale-105 transition-transform duration-300">
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="absolute inset-0 shadow-[0_0_20px_rgba(0,255,136,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a href="#contact" className="magnetic group relative px-8 py-4 bg-transparent text-text-primary font-space font-bold uppercase tracking-wider overflow-hidden rounded-sm border border-neon-cyan hover:border-neon-magenta transition-colors duration-300">
              <span className="relative z-10 group-hover:text-neon-magenta transition-colors duration-300">Contact Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </a>
          </motion.div>

          <motion.div
            variants={staggerVariants} custom={6} initial="hidden" animate="visible"
            className="flex items-center gap-6"
          >
            {[
              { icon: Code2, href: "https://github.com" },
              { icon: Briefcase, href: "https://www.linkedin.com/in/janardhan-pavan-25130127b/" },
              { icon: MessageSquare, href: "https://twitter.com" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="magnetic w-12 h-12 flex items-center justify-center rounded-full bg-surface border border-white/10 text-text-muted hover:text-neon-green hover:border-neon-green/50 hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all duration-300"
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Content - Floating Code Window */}
        <motion.div
          variants={staggerVariants} custom={4} initial="hidden" animate="visible"
          className="lg:col-span-5 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel rounded-lg overflow-hidden relative"
          >
            {/* Animated glowing border */}
            <div className="absolute inset-0 border-2 border-neon-cyan/20 rounded-lg" />
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 border border-neon-cyan/60 rounded-lg pointer-events-none"
            />

            {/* Title bar */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-text-muted">BankController.java</span>
            </div>

            {/* Code content */}
            <div className="p-6 overflow-hidden bg-[#0a0a0a]">
              <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                <code className="text-green-400">
                  {codeText}
                  <span className="animate-pulse text-neon-green">_</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};
