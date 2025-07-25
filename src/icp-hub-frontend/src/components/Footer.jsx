import { Github, Twitter, MessageSquare, MessageCircle, Globe, Code, Book, Shield, Zap, ExternalLink, Mail, Heart } from 'lucide-react'
import SystemStatus from './SystemStatus'

function Footer() {
  const blockchainNetworks = [
    { name: "Ethereum", icon: "⟠", url: "https://ethereum.org", color: "#627eea" },
    { name: "Internet Computer", icon: "∞", url: "https://internetcomputer.org", color: "#29abe2" },
    { name: "Polygon", icon: "⬟", url: "https://polygon.technology", color: "#8247e5" },
    { name: "Avalanche", icon: "🔺", url: "https://www.avax.network", color: "#e84142" },
    { name: "BSC", icon: "⬢", url: "https://www.bnbchain.org", color: "#f3ba2f" },
    { name: "Arbitrum", icon: "🔷", url: "https://arbitrum.io", color: "#28a0f0" }
  ]

  const ecosystemPartners = [
    { name: "MetaMask", url: "https://metamask.io" },
    { name: "Plug Wallet", url: "https://plugwallet.ooo" },
    { name: "OpenZeppelin", url: "https://openzeppelin.com" },
    { name: "Chainlink", url: "https://chain.link" },
    { name: "IPFS", url: "https://ipfs.io" },
    { name: "The Graph", url: "https://thegraph.com" }
  ]

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-brand">
              <h3 className="footer-logo">OpenKey</h3>
              <p className="footer-tagline">
                The ultimate multichain development platform connecting all blockchain ecosystems
              </p>
              
              {/* Supported Networks */}
              <div className="footer-networks">
                <span className="networks-label">Supported Networks:</span>
                <div className="networks-grid">
                  {blockchainNetworks.map((network, index) => (
                    <a 
                      key={index}
                      href={network.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="network-link"
                      style={{ borderColor: network.color }}
                    >
                      <span className="network-icon" style={{ color: network.color }}>
                        {network.icon}
                      </span>
                      <span className="network-name">{network.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="footer-social">
                <a href="https://github.com/openkey" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://twitter.com/openkey" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://discord.gg/openkey" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                  <MessageSquare size={20} />
                </a>
                <a href="https://t.me/openkey" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            {/* Platform Links */}
            <div className="footer-section">
              <h4>
                <Code size={16} />
                Platform
              </h4>
              <ul>
                <li><a href="/repositories">Browse Projects</a></li>
                <li><a href="/community">Developer Community</a></li>
                <li><a href="/profile">Create Profile</a></li>
                <li><a href="/pricing">Pricing Plans</a></li>
                <li><a href="/enterprise">Enterprise</a></li>
              </ul>
            </div>

            {/* Developer Resources */}
            <div className="footer-section">
              <h4>
                <Book size={16} />
                Resources
              </h4>
              <ul>
                <li><a href="/docs">Documentation</a></li>
                <li><a href="/api">API Reference</a></li>
                <li><a href="/tutorials">Tutorials</a></li>
                <li><a href="/examples">Code Examples</a></li>
                <li><a href="/blog">Developer Blog</a></li>
                <li><a href="/changelog">Changelog</a></li>
              </ul>
            </div>

            {/* Tools & Services */}
            <div className="footer-section">
              <h4>
                <Zap size={16} />
                Tools & Services
              </h4>
              <ul>
                <li><a href="/cli">CLI Tools</a></li>
                <li><a href="/sdk">SDK Downloads</a></li>
                <li><a href="/security">Security Audits</a></li>
                <li><a href="/analytics">Project Analytics</a></li>
                <li><a href="/ci-cd">CI/CD Integration</a></li>
                <li><a href="/marketplace">Extension Marketplace</a></li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div className="footer-section">
              <h4>
                <Shield size={16} />
                Support & Legal
              </h4>
              <ul>
                <li><a href="/help">Help Center</a></li>
                <li><a href="/status">System Status</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/security">Security Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Ecosystem Partners */}
          <div className="footer-ecosystem">
            <h4>
              <Globe size={16} />
              Ecosystem Partners
            </h4>
            <div className="ecosystem-links">
              {ecosystemPartners.map((partner, index) => (
                <a 
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ecosystem-link"
                >
                  {partner.name}
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; 2024 OpenKey. All rights reserved.</p>
              <p className="footer-tagline-small">Building the multichain future, one project at a time.</p>
            </div>
            
            <div className="footer-built-with">
              <span>Built with</span>
              <Heart size={14} className="heart-icon" />
              <span>for the Web3 community</span>
            </div>

            <div className="footer-contact">
              <SystemStatus showDetailedStatus={false} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 