import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Briefcase, MessageSquare, FileText, Check, Copy, Send } from 'lucide-react';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const email = "j.pavan5803@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { name: "GitHub", icon: Code2, href: "https://github.com/JanardhanPavan" },
    { name: "LinkedIn", icon: Briefcase, href: "https://www.linkedin.com/in/janardhan-pavan-25130127b/" },
    { name: "Twitter", icon: MessageSquare, href: "https://x.com/janardhanpavan1" },
    { name: "Resume", icon: FileText, href: "#" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    try {
      const response = await fetch("https://formsubmit.co/ajax/" + email, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'box'
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-2xl mx-auto px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-neon-cyan" />
            <span className="font-mono text-neon-cyan text-sm uppercase tracking-widest">What's Next?</span>
            <div className="w-12 h-[1px] bg-neon-cyan" />
          </div>

          <h2 className="font-bebas text-5xl md:text-7xl mb-6">
            LET'S BUILD SOMETHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">EXTRAORDINARY</span>
          </h2>

          <p className="font-space text-text-muted text-lg font-light leading-[1.9] mb-12">
            I'm currently looking for new opportunities. Whether you have a question, a project proposal, or just want to say hi, my inbox is always open.
          </p>

          {/* Email Click-to-copy */}
          <div className="mb-16 relative flex justify-center">
            <button
              onClick={handleCopy}
              className="magnetic group relative flex items-center justify-center gap-4"
            >
              <span className="font-bebas text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-muted group-hover:from-neon-green group-hover:to-neon-cyan transition-all duration-300">
                {email}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted group-hover:text-neon-green group-hover:border-neon-green/50 transition-colors">
                {copied ? <Check size={18} className="text-neon-green" /> : <Copy size={18} />}
              </div>
            </button>

            {/* Toast Notification */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -40, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-0 px-4 py-2 bg-neon-green text-black font-mono text-xs font-bold rounded shadow-[0_0_15px_rgba(0,255,136,0.5)] pointer-events-none"
                >
                  EMAIL COPIED TO CLIPBOARD
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="magnetic group w-14 h-14 rounded-xl glass-card flex items-center justify-center text-text-muted hover:text-neon-magenta hover:border-neon-magenta/50 hover:shadow-[0_0_20px_rgba(255,0,110,0.3)] transition-all duration-300 hover:-translate-y-2"
                aria-label={social.name}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          {/* Functional Form */}
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 flex flex-col gap-4 max-w-xl mx-auto text-left relative overflow-hidden">
            <h3 className="font-space font-bold text-xl mb-2 text-white">Send a Message</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 font-space text-sm text-white focus:outline-none focus:border-neon-green focus:bg-white/10 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 font-space text-sm text-white focus:outline-none focus:border-neon-green focus:bg-white/10 transition-colors"
              />
            </div>

            <textarea
              name="message"
              placeholder="Your message..."
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 font-space text-sm text-white focus:outline-none focus:border-neon-green focus:bg-white/10 transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="magnetic mt-2 flex items-center justify-center gap-2 w-full py-4 bg-neon-green/10 text-neon-green border border-neon-green/50 rounded-md font-space font-bold uppercase tracking-wider hover:bg-neon-green hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {/* Form Status Messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green mb-4">
                    <Check size={32} />
                  </div>
                  <h4 className="font-bebas text-3xl text-white mb-2">Message Sent!</h4>
                  <p className="font-space text-text-muted text-sm">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                    <br /><br />
                    <span className="text-neon-cyan/80 text-xs">Note: If this is your first time using the form, you may need to click 'Activate' in the email sent to {email}.</span>
                  </p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-10"
                >
                  <h4 className="font-bebas text-3xl text-red-500 mb-2">Oops!</h4>
                  <p className="font-space text-text-muted text-sm">
                    Something went wrong. Please try again or email me directly at {email}.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 rounded font-space text-sm transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 w-full text-center">
        <p className="font-mono text-xs text-text-muted">
          Designed & Built by Janardhan Pavan © {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};
