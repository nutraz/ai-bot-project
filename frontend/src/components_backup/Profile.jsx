import { useState } from 'react'
import { 
  User, MapPin, Link as LinkIcon, Calendar, GitBranch, Star, 
  GitCommit, Users, Settings, Edit, Plus, X, Save, Award, Code
} from 'lucide-react'

function Profile() {
  const [activeTab, setActiveTab] = useState('repositories')
  const [showEditAchievements, setShowEditAchievements] = useState(false)
  const [showEditLanguages, setShowEditLanguages] = useState(false)
  const [achievements, setAchievements] = useState([
    "Open Source Contributor",
    "Web3 Pioneer", 
    "Smart Contract Auditor",
    "DeFi Expert"
  ])
  const [languages, setLanguages] = useState([
    "Solidity", "TypeScript", "Rust", "JavaScript", "Python", "Go"
  ])
  const [newAchievement, setNewAchievement] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  const user = {
    name: "Alex Chen",
    username: "alex-chen",
    bio: "Full-stack Web3 developer passionate about DeFi protocols and smart contract security. Building the decentralized future one commit at a time.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    joinDate: "Joined March 2021",
    followers: 1247,
    following: 89,
    repos: 47,
    contributions: 2847
  }

  const repositories = [
    {
      id: 1,
      name: "defi-yield-optimizer",
      description: "Advanced yield farming optimizer with automated rebalancing strategies",
      language: "Solidity",
      languageColor: "#3C3C3D",
      stars: 234,
      forks: 45,
      isPrivate: false,
      lastUpdated: "Updated 2 hours ago"
    },
    {
      id: 2,
      name: "cross-chain-bridge",
      description: "Secure cross-chain asset bridge supporting multiple EVM chains",
      language: "TypeScript",
      languageColor: "#2b7489",
      stars: 156,
      forks: 23,
      isPrivate: false,
      lastUpdated: "Updated yesterday"
    },
    {
      id: 3,
      name: "smart-contract-auditor",
      description: "Automated smart contract vulnerability scanner",
      language: "Rust",
      languageColor: "#dea584",
      stars: 89,
      forks: 12,
      isPrivate: true,
      lastUpdated: "Updated 3 days ago"
    }
  ]

  const activities = [
    { type: 'commit', repo: 'defi-yield-optimizer', message: 'Add liquidity pool optimization', time: '2 hours ago' },
    { type: 'star', repo: 'ethereum/go-ethereum', message: 'Starred repository', time: '5 hours ago' },
    { type: 'fork', repo: 'OpenZeppelin/openzeppelin-contracts', message: 'Forked repository', time: '1 day ago' },
    { type: 'commit', repo: 'cross-chain-bridge', message: 'Fix bridge validation logic', time: '2 days ago' },
  ]

  const contributionData = Array.from({ length: 365 }, (_, i) => ({
    date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
    count: Math.floor(Math.random() * 5)
  }))

  const handleAddAchievement = () => {
    if (newAchievement.trim() && !achievements.includes(newAchievement.trim())) {
      setAchievements([...achievements, newAchievement.trim()])
      setNewAchievement('')
    }
  }

  const handleRemoveAchievement = (achievement) => {
    setAchievements(achievements.filter(a => a !== achievement))
  }

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()])
      setNewLanguage('')
    }
  }

  const handleRemoveLanguage = (language) => {
    setLanguages(languages.filter(l => l !== language))
  }

  return (
    <div className="profile">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-main-info">
            <div className="profile-info">
              <img src={user.avatar} alt={user.name} className="profile-avatar" />
              <div className="profile-details">
                <div className="profile-name-section">
                  <h1 className="text-2xl font-bold my-4">{user.name}</h1>
                  <p className="username">@{user.username}</p>
                  <button className="edit-profile-btn">
                    <Settings size={16} />
                    Edit Profile
                  </button>
                </div>
                
                <p className="bio">{user.bio}</p>
                
                <div className="profile-meta">
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </div>
                  <div className="meta-item">
                    <LinkIcon size={16} />
                    <a href={user.website} target="_blank" rel="noopener noreferrer">
                      {user.website}
                    </a>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{user.joinDate}</span>
                  </div>
                </div>
                
                <div className="profile-stats">
                  <div className="stat">
                    <strong>{user.followers}</strong> followers
                  </div>
                  <div className="stat">
                    <strong>{user.following}</strong> following
                  </div>
                  <div className="stat">
                    <strong>{user.repos}</strong> repositories
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="achievements">
              <div className="section-header">
                <h3>
                  <Award size={16} />
                  Achievements
                </h3>
                <button 
                  className="edit-btn"
                  onClick={() => setShowEditAchievements(true)}
                >
                  <Edit size={14} />
                </button>
              </div>
              <div className="badges">
                {achievements.map((achievement, index) => (
                  <span key={index} className="achievement-badge">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>

            <div className="languages">
              <div className="section-header">
                <h3>
                  <Code size={16} />
                  Languages
                </h3>
                <button 
                  className="edit-btn"
                  onClick={() => setShowEditLanguages(true)}
                >
                  <Edit size={14} />
                </button>
              </div>
              <div className="language-list">
                {languages.map((language, index) => (
                  <span key={index} className="language-item">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="profile-nav">
          <button 
            className={`nav-tab ${activeTab === 'repositories' ? 'active' : ''}`}
            onClick={() => setActiveTab('repositories')}
          >
            <GitBranch size={16} />
            Repositories
          </button>
          <button 
            className={`nav-tab ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button 
            className={`nav-tab ${activeTab === 'contributions' ? 'active' : ''}`}
            onClick={() => setActiveTab('contributions')}
          >
            Contributions
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'repositories' && (
          <div className="user-repos">
            {repositories.map(repo => (
              <div key={repo.id} className="user-repo-card">
                <div className="repo-header">
                  <div className="repo-title">
                    <h3>{repo.name}</h3>
                    {repo.isPrivate && <span className="private-badge">Private</span>}
                  </div>
                  <button className="action-btn">
                    <Star size={16} />
                  </button>
                </div>
                <p className="repo-description">{repo.description}</p>
                <div className="repo-footer">
                  <div className="repo-language">
                    <span 
                      className="language-dot" 
                      style={{ backgroundColor: repo.languageColor }}
                    ></span>
                    {repo.language}
                  </div>
                  <div className="repo-stats">
                    <span><Star size={14} /> {repo.stars}</span>
                    <span><GitBranch size={14} /> {repo.forks}</span>
                  </div>
                  <div className="repo-updated">{repo.lastUpdated}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-feed">
            {activities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'commit' && <GitCommit size={16} />}
                  {activity.type === 'star' && <Star size={16} />}
                  {activity.type === 'fork' && <GitBranch size={16} />}
                </div>
                <div className="activity-content">
                  <p>{activity.message} in <strong>{activity.repo}</strong></p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contributions' && (
          <div className="contributions-section">
            <div className="contributions-stats">
              <div className="contrib-stat">
                <strong>{user.contributions}</strong>
                <span>contributions this year</span>
              </div>
            </div>
            <div className="contribution-graph">
              <div className="graph-months">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                  <span key={month}>{month}</span>
                ))}
              </div>
              <div className="graph-grid">
                {contributionData.map((day, index) => (
                  <div 
                    key={index}
                    className={`contribution-day level-${day.count}`}
                    title={`${day.count} contributions on ${day.date.toDateString()}`}
                  />
                ))}
              </div>
              <div className="graph-legend">
                <span>Less</span>
                <div className="legend-levels">
                  <div className="level level-0"></div>
                  <div className="level level-1"></div>
                  <div className="level level-2"></div>
                  <div className="level level-3"></div>
                  <div className="level level-4"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Achievements Modal */}
      {showEditAchievements && (
        <div className="modal-overlay" onClick={() => setShowEditAchievements(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Achievements</h2>
              <button 
                className="modal-close"
                onClick={() => setShowEditAchievements(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="add-item-section">
                <div className="add-item-form">
                  <input
                    type="text"
                    placeholder="Add new achievement..."
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddAchievement()}
                    className="form-input"
                  />
                  <button 
                    className="add-btn"
                    onClick={handleAddAchievement}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="current-items">
                <h4>Current Achievements</h4>
                <div className="editable-badges">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="editable-badge">
                      <span>{achievement}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveAchievement(achievement)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowEditAchievements(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => setShowEditAchievements(false)}
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Languages Modal */}
      {showEditLanguages && (
        <div className="modal-overlay" onClick={() => setShowEditLanguages(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Languages</h2>
              <button 
                className="modal-close"
                onClick={() => setShowEditLanguages(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="add-item-section">
                <div className="add-item-form">
                  <input
                    type="text"
                    placeholder="Add new language..."
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                    className="form-input"
                  />
                  <button 
                    className="add-btn"
                    onClick={handleAddLanguage}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="current-items">
                <h4>Current Languages</h4>
                <div className="editable-badges">
                  {languages.map((language, index) => (
                    <div key={index} className="editable-badge">
                      <span>{language}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveLanguage(language)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowEditLanguages(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => setShowEditLanguages(false)}
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile 