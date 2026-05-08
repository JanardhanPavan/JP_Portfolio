import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { 
  Cursor, 
  ParticleBackground, 
  Navbar, 
  Hero, 
  About, 
  Skills, 
  Projects, 
  Experience, 
  Education,
  Contact 
} from './components';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      <Cursor />
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10 w-full min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  );
}

export default App;
