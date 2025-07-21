import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, Star, GitFork, TrendingUp, Users, Code, Zap, Shield, ArrowRight, Play, Link as LinkIcon, Globe, Layers } from 'lucide-react'
import ThreeBackground from './ThreeBackground'

function Home() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const featuredRepos = [
    {
      name: "ethereum/defi-protocol",
      description: "Advanced DeFi protocol with cross-chain yield farming capabilities",
      language: "Solidity",
      stars: 2341,
      forks: 456,
      chains: ["Ethereum", "Polygon"]
    },
    {
      name: "web3/multichain-nft",
      description: "Cross-chain NFT marketplace supporting multiple blockchain networks",
      language: "TypeScript", 
      stars: 1876,
      forks: 324,
      chains: ["Ethereum", "BSC", "Avalanche"]
    },
    {
      name: "icp/dao-governance",
      description: "Decentralized governance platform built on Internet Computer",
      language: "Motoko",
      stars: 1234,
      forks: 289,
      chains: ["Internet Computer"]
    }
  ]

  const supportedChains = [
    { name: "Ethereum", icon: "⟠", color: "#627eea" },
    { name: "Internet Computer", icon: "∞", color: "#29abe2" },
    { name: "Polygon", icon: "⬟", color: "#8247e5" },
    { name: "Avalanche", icon: "🔺", color: "#e84142" },
    { name: "BSC", icon: "⬢", color: "#f3ba2f" },
    { name: "Arbitrum", icon: "🔷", color: "#28a0f0" }
  ]

  const features = [
    {
      icon: <Layers size={40} />,
      title: "Multichain Integration",
      description: "Deploy and manage projects across Ethereum, Internet Computer, Polygon, BSC, and more blockchain networks seamlessly"
    },
    {
      icon: <Code size={40} />,
      title: "Smart Contract Suite",
      description: "Complete development environment for Solidity, Motoko, Rust, and other blockchain programming languages"
    },
    {
      icon: <Shield size={40} />,
      title: "Cross-Chain Security",
      description: "Advanced security scanning and audit tools that work across all supported blockchain networks"
    },
    {
      icon: <LinkIcon size={40} />,
      title: "Interoperability Hub",
      description: "Build applications that seamlessly interact across multiple blockchain ecosystems and protocols"
    },
    {
      icon: <Zap size={40} />,
      title: "Lightning Deployment",
      description: "One-click deployment to multiple networks with optimized gas costs and performance monitoring"
    },
    {
      icon: <Users size={40} />,
      title: "Web3 Community",
      description: "Connect with developers from all blockchain ecosystems and collaborate on cross-chain innovations"
    }
  ]

  return (
    <div className="home">
      <ThreeBackground />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <Globe size={16} />
                <span>Multichain • Cross-Platform • Decentralized</span>
              </div>
              <h1 className="hero-title">
                The Ultimate
                <span className="gradient-text"> Multichain Development</span>
                Platform
              </h1>
              <p className="hero-description">
                GitForWeb3 is the world's first multichain development platform that seamlessly connects 
                Ethereum, Internet Computer, Polygon, BSC, Avalanche, and beyond. Build, deploy, and 
                collaborate across all major blockchain networks from a single unified interface.
              </p>

              <div className="hero-buttons">
                <Link to="/repositories" className="btn-primary">
                  <Github size={20} />
                  Explore Multichain Projects
                  <ArrowRight size={16} />
                </Link>
                <button className="btn-secondary">
                  <Play size={16} />
                  Watch Demo
                </button>
              </div>
              
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">6+</span>
                  <span className="stat-label">Blockchain Networks</span>
                </div>
                <div className="stat">
                  <span className="stat-number">75K+</span>
                  <span className="stat-label">Cross-Chain Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-number">40K+</span>
                  <span className="stat-label">Web3 Developers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500M+</span>
                  <span className="stat-label">Lines of Code</span>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="floating-card">
                <div className="card-content">
                  <div className="card-icon">
                    <Layers size={48} />
                  </div>
                  <h3>Multichain Ready</h3>
                  <p>Deploy everywhere at once</p>
                  <div className="card-chains">
                    {supportedChains.slice(0, 4).map((chain, index) => (
                      <span key={index} className="mini-chain" style={{ color: chain.color }}>
                        {chain.icon}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">Why Choose GitForWeb3?</h2>
            <p className="section-subtitle">
              The most comprehensive multichain development platform for building the future of Web3
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-overlay" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Repositories */}
      <section className="latest-repos">
        <div className="container">
          <div className="section-header">
            <h2>
              <TrendingUp size={32} />
              Trending Multichain Projects
            </h2>
            <Link to="/repositories" className="view-all-btn">
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="repos-preview">
            {featuredRepos.map((repo, index) => (
              <div key={index} className="repo-card-preview">
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
                <div className="repo-chains">
                  {repo.chains.map((chain, chainIndex) => (
                    <span key={chainIndex} className="chain-tag">
                      {supportedChains.find(c => c.name === chain)?.icon} {chain}
                    </span>
                  ))}
                </div>
                <div className="repo-meta">
                  <span className="language">{repo.language}</span>
                  <span><Star size={14} /> {repo.stars}</span>
                  <span><GitFork size={14} /> {repo.forks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multichain Stats */}
      <section className="multichain-stats">
        <div className="container">
          <div className="stats-header">
            <h2>Powering Web3 Development Across All Chains</h2>
            <p>Join thousands of developers building the multichain future</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">⟠</div>
              <div className="stat-info">
                <span className="stat-number">25K+</span>
                <span className="stat-label">Ethereum Projects</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">∞</div>
              <div className="stat-info">
                <span className="stat-number">15K+</span>
                <span className="stat-label">Internet Computer Canisters</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⬟</div>
              <div className="stat-info">
                <span className="stat-number">18K+</span>
                <span className="stat-label">Polygon DApps</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔺</div>
              <div className="stat-info">
                <span className="stat-number">12K+</span>
                <span className="stat-label">Avalanche Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Build Across All Chains?</h2>
            <p>
              Join the multichain revolution and create applications that work seamlessly 
              across Ethereum, Internet Computer, Polygon, BSC, Avalanche, and beyond.
            </p>
            <div className="hero-buttons">
              <Link to="/repositories" className="btn-primary">
                <Code size={20} />
                Start Building
                <ArrowRight size={16} />
              </Link>
              <Link to="/community" className="btn-secondary">
                <Users size={16} />
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 