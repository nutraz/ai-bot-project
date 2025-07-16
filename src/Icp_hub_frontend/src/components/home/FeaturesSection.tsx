import { motion } from 'framer-motion';
import { Shield, Zap, GitBranch, Users, Globe, Lock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Decentralized & Censorship-Resistant',
    description: 'Built on blockchain technology ensuring your code and data remain secure and accessible.',
    gradient: 'from-cyber-purple to-cyber-purple-dark',
    glowColor: 'shadow-glow'
  },
  {
    icon: Zap,
    title: 'Multi-Chain Development',
    description: 'Deploy across multiple blockchains seamlessly with our unified development environment.',
    gradient: 'from-neon-cyan to-neon-cyan-dark',
    glowColor: 'shadow-glow-secondary'
  },
  {
    icon: GitBranch,
    title: 'Familiar Git Workflow',
    description: 'Use the Git commands you know and love with enhanced Web3 capabilities.',
    gradient: 'from-terminal-green to-cyber-purple',
    glowColor: 'shadow-glow'
  },
  {
    icon: Users,
    title: 'Collaborative Development',
    description: 'Work together with your team using decentralized collaboration tools.',
    gradient: 'from-warning-orange to-neon-cyan',
    glowColor: 'shadow-glow-secondary'
  },
  {
    icon: Globe,
    title: 'Cross-Chain Compatibility',
    description: 'Build applications that work across different blockchain networks.',
    gradient: 'from-cyber-purple to-neon-cyan',
    glowColor: 'shadow-glow'
  },
  {
    icon: Lock,
    title: 'Secure by Design',
    description: 'Enterprise-grade security with smart contract auditing and vulnerability scanning.',
    gradient: 'from-neon-cyan to-cyber-purple-dark',
    glowColor: 'shadow-glow-secondary'
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-inter font-bold mb-4">
            <span className="gradient-text">Powerful Features</span>
            <br />
            <span className="text-foreground">for Web3 Development</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale decentralized applications 
            across multiple blockchain networks.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="interactive-card group"
            >
              <div className="p-6 space-y-4">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} ${feature.glowColor}`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-cyber-purple transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Ready to get started?</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of developers building the future of Web3.
            </p>
            <button className="btn-neon">
              Start Building Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};