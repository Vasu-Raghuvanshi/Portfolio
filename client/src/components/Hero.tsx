import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${50 + i * 20}% ${50 + i * 10}%, rgba(var(--primary), 0.15), transparent 40%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-20 flex items-center bg-gradient-to-b from-background to-background/50">
      <AnimatedBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">John Doe</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              BCA Student & Aspiring Data Scientist
            </motion.p>
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <Button 
                className="bg-primary hover:bg-primary/90" 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
              </Button>
              <Button variant="outline" className="border-primary/20 hover:bg-primary/10" asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
                alt="Profile"
                className="rounded-full w-64 h-64 object-cover mx-auto ring-4 ring-primary/20"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}