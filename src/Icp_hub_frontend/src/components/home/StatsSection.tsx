import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  {
    value: 10000,
    label: 'Active Developers',
    suffix: '+',
    color: 'text-cyber-purple',
    description: 'Building the future of Web3'
  },
  {
    value: 50,
    label: 'Supported Blockchains',
    suffix: '+',
    color: 'text-neon-cyan',
    description: 'Multi-chain compatibility'
  },
  {
    value: 100000,
    label: 'Repositories',
    suffix: '+',
    color: 'text-terminal-green',
    description: 'Open source projects'
  },
  {
    value: 99.9,
    label: 'Uptime',
    suffix: '%',
    color: 'text-warning-orange',
    description: 'Reliable infrastructure'
  }
];

interface AnimatedCounterProps {
  value: number;
  duration: number;
  suffix?: string;
}

const AnimatedCounter = ({ value, duration, suffix = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration * 60); // 60 FPS
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyber-purple/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Stats Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-8 text-center group hover:scale-105 transition-transform duration-300">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 to-neon-cyan/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                    <AnimatedCounter value={stat.value} duration={2} suffix={stat.suffix} />
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-terminal-green rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-cyber-purple rounded-full animate-pulse-slow"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-lg">
            Trusted by developers worldwide to build the next generation of decentralized applications
          </p>
        </motion.div>
      </div>
    </section>
  );
};