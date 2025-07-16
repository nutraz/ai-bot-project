import { Link } from 'react-router-dom';
import { Github, Twitter, MessageCircle, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-card border-t border-glass-border/50 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyber-purple to-neon-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IH</span>
              </div>
              <span className="font-inter font-bold text-xl gradient-text">
                ICPHub
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              The decentralized platform for collaborative Web3 development across multiple blockchains.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/repositories" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Repositories
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-cyber-purple transition-colors">
                  Contributors
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-glass-border/50 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <p>© 2024 ICPHub. All rights reserved.</p>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-cyber-purple fill-current" />
              <span>for Web3</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-cyber-purple transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-cyber-purple transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-cyber-purple transition-colors"
              aria-label="Discord"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};