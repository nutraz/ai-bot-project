import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GitBranch, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from './ParticleBackground';
import heroImage from '@/assets/hero-web3.jpg';

export const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 particle-bg"></div>
      <ParticleBackground />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full"
            >
              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse-slow"></div>
              <span className="text-sm font-medium">Decentralized • Collaborative • Multi-Chain</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-inter font-bold leading-tight"
            >
              <span className="gradient-text">ICPHub</span>
              <br />
              <span className="text-foreground">GitHub for</span>
              <br />
              <span className="neon-text">Web3</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-muted-foreground max-w-md"
            >
              Build, collaborate, and deploy across multiple chains like never before. 
              The decentralized platform for Web3 development.
            </motion.p>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-cyber-purple/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyber-purple" />
                </div>
                <span className="text-sm font-medium">Decentralized</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-neon-cyan/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-neon-cyan" />
                </div>
                <span className="text-sm font-medium">Multi-Chain</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-terminal-green/20 rounded-lg flex items-center justify-center">
                  <GitBranch className="w-4 h-4 text-terminal-green" />
                </div>
                <span className="text-sm font-medium">Git Workflow</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button className="btn-neon group" onClick={handleGetStarted}>
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button className="btn-ghost" onClick={scrollToFeatures}>
                View Features
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-muted-foreground">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Blockchains</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100K+</div>
                <div className="text-sm text-muted-foreground">Repositories</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass-card">
              <img
                src={heroImage}
                alt="Web3 Development Platform"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 glass-card p-3 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse-slow"></div>
                  <span className="text-sm font-medium">Live</span>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-4 glass-card p-3 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-4 h-4 text-cyber-purple" />
                  <span className="text-sm font-medium">main</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};