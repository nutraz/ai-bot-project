import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, GitFork, Eye, Calendar, Code, TrendingUp } from 'lucide-react'

function Repositories() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLanguage, setFilterLanguage] = useState('all')
  const [sortBy, setSortBy] = useState('stars')

  const repositories = [
    {
      id: 1,
      owner: "ethereum",
      name: "defi-yield-farming",
      description: "Advanced yield farming protocol with automated compounding strategies for maximum returns",
      language: "Solidity",
      languageColor: "#3C3C3D",
      stars: 2847,
      forks: 456,
      watchers: 123,
      lastUpdated: "2 hours ago",
      topics: ["defi", "yield-farming", "smart-contracts", "ethereum"]
    },
    {
      id: 2,
      owner: "web3-labs",
      name: "nft-marketplace-v2",
      description: "Next-generation NFT marketplace with cross-chain support and advanced trading features",
      language: "TypeScript",
      languageColor: "#2b7489",
      stars: 1923,
      forks: 234,
      watchers: 89,
      lastUpdated: "5 hours ago",
      topics: ["nft", "marketplace", "cross-chain", "web3"]
    },
    {
      id: 3,
      owner: "defi-protocols",
      name: "liquidity-aggregator",
      description: "Multi-DEX liquidity aggregator for optimal trading routes and minimal slippage",
      language: "Rust",
      languageColor: "#dea584",
      stars: 1654,
      forks: 178,
      watchers: 67,
      lastUpdated: "1 day ago",
      topics: ["defi", "dex", "aggregator", "rust"]
    },
    {
      id: 4,
      owner: "crypto-tools",
      name: "wallet-connect-sdk",
      description: "Universal wallet connection SDK supporting 100+ wallets and multiple chains",
      language: "JavaScript",
      languageColor: "#f1e05a",
      stars: 1432,
      forks: 298,
      watchers: 156,
      lastUpdated: "3 days ago",
      topics: ["wallet", "sdk", "multichain", "integration"]
    },
    {
      id: 5,
      owner: "blockchain-dev",
      name: "dao-governance-suite",
      description: "Complete DAO governance framework with voting, proposals, and treasury management",
      language: "Solidity",
      languageColor: "#3C3C3D",
      stars: 1298,
      forks: 167,
      watchers: 94,
      lastUpdated: "1 week ago",
      topics: ["dao", "governance", "voting", "treasury"]
    },
    {
      id: 6,
      owner: "metaverse-builders",
      name: "vr-metaverse-engine",
      description: "High-performance VR engine for building immersive metaverse experiences",
      language: "C++",
      languageColor: "#f34b7d",
      stars: 987,
      forks: 123,
      watchers: 78,
      lastUpdated: "2 weeks ago",
      topics: ["vr", "metaverse", "engine", "3d"]
    },
    {
      id: 7,
      owner: "ai-crypto",
      name: "trading-bot-ai",
      description: "AI-powered cryptocurrency trading bot with machine learning algorithms",
      language: "Python",
      languageColor: "#3572A5",
      stars: 2156,
      forks: 445,
      watchers: 189,
      lastUpdated: "4 days ago",
      topics: ["ai", "trading", "bot", "machine-learning"]
    },
    {
      id: 8,
      owner: "security-audit",
      name: "smart-contract-analyzer",
      description: "Automated smart contract security analyzer with vulnerability detection",
      language: "Go",
      languageColor: "#00ADD8",
      stars: 876,
      forks: 145,
      watchers: 67,
      lastUpdated: "1 week ago",
      topics: ["security", "audit", "smart-contracts", "analyzer"]
    }
  ]

  const languages = ['all', 'Solidity', 'TypeScript', 'Rust', 'JavaScript', 'Python', 'C++', 'Go']

  const filteredRepos = repositories
    .filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(repo => filterLanguage === 'all' || repo.language === filterLanguage)
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars': return b.stars - a.stars
        case 'forks': return b.forks - a.forks
        case 'updated': return new Date(b.lastUpdated) - new Date(a.lastUpdated)
        default: return 0
      }
    })

  const trendingRepos = [
    { rank: 1, name: "ethereum/go-ethereum", description: "Official Go implementation of the Ethereum protocol", stars: "34.2k", language: "Go" },
    { rank: 2, name: "bitcoin/bitcoin", description: "Bitcoin Core integration/staging tree", stars: "76.1k", language: "C++" },
    { rank: 3, name: "OpenZeppelin/openzeppelin-contracts", description: "OpenZeppelin Contracts is a library for secure smart contract development", stars: "24.8k", language: "Solidity" }
  ]

  return (
    <div className="repositories">
      <div className="container">
        <div className="repositories-header">
          <h1>Discover Web3 Repositories</h1>
          <p>Explore cutting-edge blockchain projects and contribute to the future of decentralized technology</p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search repositories by name, description, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters">
            <select 
              className="filter-select"
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All Languages' : lang}
                </option>
              ))}
            </select>
            
            <select 
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="stars">Most Stars</option>
              <option value="forks">Most Forks</option>
              <option value="updated">Recently Updated</option>
            </select>
          </div>
        </div>

        {/* Repository Grid */}
        <div className="repositories-grid">
          {filteredRepos.map(repo => (
            <div key={repo.id} className="repository-card">
              <div className="repo-header">
                <div className="repo-title">
                  <Link to={`/${repo.owner}/${repo.name}`} className="repo-name-link">
                    <h3>{repo.owner}/{repo.name}</h3>
                  </Link>
                  <span className="repo-privacy">Public</span>
                </div>
                <div className="repo-stats">
                  <span className="stat">
                    <Star size={14} />
                    {repo.stars.toLocaleString()}
                  </span>
                  <span className="stat">
                    <GitFork size={14} />
                    {repo.forks}
                  </span>
                  <span className="stat">
                    <Eye size={14} />
                    {repo.watchers}
                  </span>
                </div>
              </div>
              
              <p className="repo-description">{repo.description}</p>
              
              <div className="repo-topics">
                {repo.topics.slice(0, 4).map(topic => (
                  <span key={topic} className="topic-tag">{topic}</span>
                ))}
                {repo.topics.length > 4 && (
                  <span className="topic-more">+{repo.topics.length - 4} more</span>
                )}
              </div>
              
              <div className="repo-footer">
                <div className="repo-language">
                  <span 
                    className="language-dot" 
                    style={{ backgroundColor: repo.languageColor }}
                  ></span>
                  {repo.language}
                </div>
                <div className="repo-updated">
                  <Calendar size={14} />
                  Updated {repo.lastUpdated}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Section */}
        <div className="trending-section">
          <div className="section-header">
            <h2>
              <TrendingUp size={24} />
              Trending This Week
            </h2>
          </div>
          
          <div className="trending-repos">
            {trendingRepos.map(repo => (
              <div key={repo.rank} className="trending-card">
                <div className="trending-rank">#{repo.rank}</div>
                <div className="trending-content">
                  <h4>{repo.name}</h4>
                  <p>{repo.description}</p>
                  <div className="trending-stats">
                    <span><Star size={14} /> {repo.stars}</span>
                    <span>{repo.language}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Repositories 