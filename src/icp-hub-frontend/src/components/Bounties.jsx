import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockBounties } from '../data/dummyData'
import { 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  User, 
  Star,
  Plus,
  MapPin,
  Tag,
  Calendar,
  Users,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

function Bounties() {
  const [bounties] = useState(mockBounties)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredBounties = bounties.filter(bounty => {
    const matchesSearch = bounty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bounty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bounty.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesDifficulty = selectedDifficulty === 'all' || bounty.difficulty === selectedDifficulty
    const matchesStatus = selectedStatus === 'all' || bounty.status === selectedStatus
    
    return matchesSearch && matchesDifficulty && matchesStatus
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100'
      case 'intermediate':
        return 'text-blue-600 bg-blue-100'
      case 'expert':
        return 'text-purple-600 bg-purple-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-green-600 bg-green-100'
      case 'in_progress':
        return 'text-blue-600 bg-blue-100'
      case 'completed':
        return 'text-gray-600 bg-gray-100'
      case 'cancelled':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatTimeLeft = (deadline) => {
    const now = new Date()
    const end = new Date(deadline)
    const diff = end - now
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days > 0) return `${days} days left`
    if (days === 0) return 'Ends today'
    return 'Expired'
  }

  const renderBountyCard = (bounty) => (
    <div key={bounty.id} className="bounty-card">
      <div className="bounty-header">
        <div className="bounty-title-section">
          <h3 className="bounty-title">{bounty.title}</h3>
          <div className="bounty-badges">
            <span className={`badge ${getDifficultyColor(bounty.difficulty)}`}>
              {bounty.difficulty}
            </span>
            <span className={`badge ${getStatusColor(bounty.status)}`}>
              {bounty.status.replace('_', ' ')}
            </span>
          </div>
        </div>
        <div className="bounty-amount">
          <DollarSign size={16} />
          <span className="amount">{bounty.amount}</span>
          <span className="currency">{bounty.currency}</span>
        </div>
      </div>

      <p className="bounty-description">{bounty.description}</p>

      <div className="bounty-tags">
        {bounty.tags.map((tag, index) => (
          <span key={index} className="tag">
            <Tag size={12} />
            {tag}
          </span>
        ))}
      </div>

      <div className="bounty-meta">
        <div className="meta-item">
          <MapPin size={14} />
          <Link to={`/repo/${bounty.repository}`} className="repo-link">
            {bounty.repository}
          </Link>
        </div>
        <div className="meta-item">
          <User size={14} />
          <span>{bounty.owner}</span>
        </div>
        <div className="meta-item">
          <Users size={14} />
          <span>{bounty.applicants} applicants</span>
        </div>
        <div className="meta-item">
          <Clock size={14} />
          <span className={formatTimeLeft(bounty.deadline).includes('Expired') ? 'text-red-500' : ''}>
            {formatTimeLeft(bounty.deadline)}
          </span>
        </div>
      </div>

      <div className="bounty-actions">
        <button className="btn-outline">
          View Details
        </button>
        {bounty.status === 'open' && (
          <button className="btn-primary">
            Apply for Bounty
          </button>
        )}
        {bounty.status === 'in_progress' && bounty.assignee && (
          <span className="assignee-info">
            <CheckCircle size={14} />
            Assigned to {bounty.assignee}
          </span>
        )}
      </div>
    </div>
  )

  const renderCreateBountyForm = () => (
    <div className="create-bounty-form">
      <div className="form-header">
        <h3>Create New Bounty</h3>
        <button 
          className="btn-outline"
          onClick={() => setShowCreateForm(false)}
        >
          Cancel
        </button>
      </div>

      <div className="form-content">
        <div className="form-group">
          <label>Bounty Title *</label>
          <input
            type="text"
            placeholder="Describe what needs to be done"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            placeholder="Provide detailed requirements and acceptance criteria"
            className="form-textarea"
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Repository *</label>
            <select className="form-select">
              <option value="">Select repository</option>
              <option value="defi-protocol">defi-protocol</option>
              <option value="nft-marketplace">nft-marketplace</option>
            </select>
          </div>

          <div className="form-group">
            <label>Difficulty Level *</label>
            <select className="form-select">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Reward Amount *</label>
            <div className="input-with-suffix">
              <input
                type="number"
                placeholder="100"
                className="form-input"
              />
              <select className="input-suffix-select">
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
                <option value="OKY">OKY</option>
                <option value="ETH">ETH</option>
                <option value="ICP">ICP</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Deadline *</label>
            <input
              type="date"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            placeholder="frontend, react, web3 (comma separated)"
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button className="btn-secondary">
            Save as Draft
          </button>
          <button className="btn-primary">
            <DollarSign size={16} />
            Create Bounty
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bounties-page">
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <h1>Bounties</h1>
            <p>Discover development opportunities and create bounties for your projects</p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus size={16} />
            Create Bounty
          </button>
        </div>

        {showCreateForm ? renderCreateBountyForm() : (
          <>
            {/* Search and Filters */}
            <div className="bounties-controls">
              <div className="search-section">
                <div className="search-input">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search bounties by title, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="filters-section">
                <div className="filter-group">
                  <label>Difficulty</label>
                  <select 
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Status</label>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bounties Stats */}
            <div className="bounties-stats">
              <div className="stat-card">
                <h3>Total Bounties</h3>
                <p className="stat-number">{bounties.length}</p>
              </div>
              <div className="stat-card">
                <h3>Open Bounties</h3>
                <p className="stat-number">{bounties.filter(b => b.status === 'open').length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Rewards</h3>
                <p className="stat-number">
                  ${bounties.reduce((sum, b) => sum + parseFloat(b.amount), 0).toLocaleString()}
                </p>
              </div>
              <div className="stat-card">
                <h3>Active Applicants</h3>
                <p className="stat-number">{bounties.reduce((sum, b) => sum + b.applicants, 0)}</p>
              </div>
            </div>

            {/* Bounties List */}
            <div className="bounties-content">
              {filteredBounties.length === 0 ? (
                <div className="empty-state">
                  <AlertCircle size={48} />
                  <h3>No bounties found</h3>
                  <p>Try adjusting your search criteria or create a new bounty</p>
                  <button 
                    className="btn-primary"
                    onClick={() => setShowCreateForm(true)}
                  >
                    <Plus size={16} />
                    Create First Bounty
                  </button>
                </div>
              ) : (
                <div className="bounties-grid">
                  {filteredBounties.map(renderBountyCard)}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Bounties 