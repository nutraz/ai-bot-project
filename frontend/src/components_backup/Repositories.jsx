import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, GitFork, Eye, Calendar, Code, TrendingUp, Plus, Settings, Trash2, Edit3, Copy, Globe, Lock, AlertCircle, X, Check, MoreHorizontal, ExternalLink, Download, Upload } from 'lucide-react'
import apiService from '../services/api'

function Repositories() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLanguage, setFilterLanguage] = useState('all')
  const [sortBy, setSortBy] = useState('stars')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userRepositories, setUserRepositories] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showDropdown, setShowDropdown] = useState(null)

  // Repository creation form data
  const [createFormData, setCreateFormData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    initializeWithReadme: true,
    license: '',
    gitignoreTemplate: ''
  })

  // Repository edit form data
  const [editFormData, setEditFormData] = useState({
    description: '',
    settings: {
      defaultBranch: 'main',
      allowForking: true,
      allowIssues: true,
      allowWiki: true,
      allowProjects: true,
      visibility: { Public: null },
      license: '',
      topics: []
    }
  })

  const [newTopic, setNewTopic] = useState('')

  // Mock repositories for display (fallback)
  const mockRepositories = [
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
      topics: ["defi", "yield-farming", "smart-contracts", "ethereum"],
      isPrivate: false
    },
    // ... other mock repositories
  ]

  useEffect(() => {
    initializeData()
  }, [])

  const initializeData = async () => {
    setLoading(true)
    try {
      // Initialize API service
      const initialized = await apiService.init()
      if (initialized) {
        setIsAuthenticated(apiService.isAuthenticated)
        
        if (apiService.isAuthenticated && apiService.currentUser) {
          // Fetch user's repositories
          await fetchUserRepositories()
        }
      }
    } catch (error) {
      console.error('Failed to initialize:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserRepositories = async () => {
    try {
      const principal = apiService.getPrincipal()
      if (principal) {
        const result = await apiService.listRepositories(principal)
        if (result.success) {
          setUserRepositories(result.data.repositories)
        }
      }
    } catch (error) {
      console.error('Failed to fetch repositories:', error)
    }
  }

  const handleCreateRepository = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await apiService.createRepository(createFormData)
      
      if (result.success) {
        setShowCreateModal(false)
        setCreateFormData({
          name: '',
          description: '',
          isPrivate: false,
          initializeWithReadme: true,
          license: '',
          gitignoreTemplate: ''
        })
        
        // Refresh repositories list
        await fetchUserRepositories()
        
        alert('Repository created successfully!')
      } else {
        alert(`Failed to create repository: ${apiService.getErrorMessage(result.error)}`)
      }
    } catch (error) {
      console.error('Failed to create repository:', error)
      alert('Failed to create repository. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditRepository = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await apiService.updateRepository(selectedRepo.id, editFormData)
      
      if (result.success) {
        setShowEditModal(false)
        setSelectedRepo(null)
        
        // Refresh repositories list
        await fetchUserRepositories()
        
        alert('Repository updated successfully!')
      } else {
        alert(`Failed to update repository: ${apiService.getErrorMessage(result.error)}`)
      }
    } catch (error) {
      console.error('Failed to update repository:', error)
      alert('Failed to update repository. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRepository = async (repositoryId) => {
    if (!confirm('Are you sure you want to delete this repository? This action cannot be undone.')) {
      return
    }

    setLoading(true)
    try {
      const result = await apiService.deleteRepository(repositoryId)
      
      if (result.success) {
        await fetchUserRepositories()
        alert('Repository deleted successfully!')
      } else {
        alert(`Failed to delete repository: ${apiService.getErrorMessage(result.error)}`)
      }
    } catch (error) {
      console.error('Failed to delete repository:', error)
      alert('Failed to delete repository. Please try again.')
    } finally {
      setLoading(false)
      setShowDropdown(null)
    }
  }

  const openEditModal = (repo) => {
    setSelectedRepo(repo)
    setEditFormData({
      description: repo.description || '',
      settings: {
        defaultBranch: repo.settings?.defaultBranch || 'main',
        allowForking: repo.settings?.allowForking ?? true,
        allowIssues: repo.settings?.allowIssues ?? true,
        allowWiki: repo.settings?.allowWiki ?? true,
        allowProjects: repo.settings?.allowProjects ?? true,
        visibility: repo.isPrivate ? { Private: null } : { Public: null },
        license: repo.settings?.license || '',
        topics: repo.settings?.topics || []
      }
    })
    setShowEditModal(true)
    setShowDropdown(null)
  }

  const addTopic = () => {
    if (newTopic.trim() && !editFormData.settings.topics.includes(newTopic.trim())) {
      setEditFormData(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          topics: [...prev.settings.topics, newTopic.trim()]
        }
      }))
      setNewTopic('')
    }
  }

  const removeTopic = (topicToRemove) => {
    setEditFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        topics: prev.settings.topics.filter(topic => topic !== topicToRemove)
      }
    }))
  }

  // Use backend repositories if available, otherwise fallback to mock data
  const allRepositories = userRepositories.length > 0 ? userRepositories : mockRepositories
  
  const languages = ['all', 'Solidity', 'TypeScript', 'Rust', 'JavaScript', 'Python', 'C++', 'Go']

  const filteredRepos = allRepositories
    .filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (repo.topics && repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .filter(repo => filterLanguage === 'all' || repo.language === filterLanguage)
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars': return (b.stars || 0) - (a.stars || 0)
        case 'forks': return (b.forks || 0) - (a.forks || 0)
        case 'updated': return new Date(b.updatedAt || b.lastUpdated) - new Date(a.updatedAt || a.lastUpdated)
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
          <div className="header-content">
            <div className="header-text">
              <h1>Repositories</h1>
              <p>Explore cutting-edge blockchain projects and manage your code</p>
            </div>
            {isAuthenticated && (
              <button 
                className="btn-primary create-repo-btn"
                onClick={() => setShowCreateModal(true)}
                disabled={loading}
              >
                <Plus size={20} />
                New Repository
              </button>
            )}
          </div>
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
                  <Link to={`/repo/${repo.id}`} className="repo-name-link">
                    <h3>
                      {repo.owner?.username || repo.owner}/{repo.name}
                    </h3>
                  </Link>
                  <div className="repo-badges">
                    <span className={`repo-privacy ${repo.isPrivate ? 'private' : 'public'}`}>
                      {repo.isPrivate ? <Lock size={12} /> : <Globe size={12} />}
                      {repo.isPrivate ? 'Private' : 'Public'}
                    </span>
                  </div>
                </div>
                <div className="repo-actions">
                  <div className="repo-stats">
                    <span className="stat">
                      <Star size={14} />
                      {(repo.stars || 0).toLocaleString()}
                    </span>
                    <span className="stat">
                      <GitFork size={14} />
                      {repo.forks || 0}
                    </span>
                    {repo.watchers && (
                      <span className="stat">
                        <Eye size={14} />
                        {repo.watchers}
                      </span>
                    )}
                  </div>
                  
                  {isAuthenticated && apiService.currentUser && 
                   (repo.owner === apiService.getPrincipal()?.toString() || 
                    (repo.owner?.principal && repo.owner.principal.toString() === apiService.getPrincipal()?.toString())) && (
                    <div className="repo-menu">
                      <button 
                        className="menu-trigger"
                        onClick={() => setShowDropdown(showDropdown === repo.id ? null : repo.id)}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      
                      {showDropdown === repo.id && (
                        <div className="dropdown-menu">
                          <button onClick={() => openEditModal(repo)}>
                            <Edit3 size={14} />
                            Edit Repository
                          </button>
                          <button onClick={() => navigator.clipboard.writeText(window.location.origin + `/repo/${repo.id}`)}>
                            <Copy size={14} />
                            Copy Link
                          </button>
                          <Link to={`/repo/${repo.id}`}>
                            <ExternalLink size={14} />
                            View Repository
                          </Link>
                          <hr />
                          <button 
                            onClick={() => handleDeleteRepository(repo.id)}
                            className="danger"
                          >
                            <Trash2 size={14} />
                            Delete Repository
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <p className="repo-description">
                {repo.description || 'No description provided.'}
              </p>
              
              {repo.topics && repo.topics.length > 0 && (
                <div className="repo-topics">
                  {repo.topics.slice(0, 4).map(topic => (
                    <span key={topic} className="topic-tag">{topic}</span>
                  ))}
                  {repo.topics.length > 4 && (
                    <span className="topic-more">+{repo.topics.length - 4} more</span>
                  )}
                </div>
              )}
              
              <div className="repo-footer">
                {repo.language && (
                  <div className="repo-language">
                    <span 
                      className="language-dot" 
                      style={{ backgroundColor: repo.languageColor || '#ccc' }}
                    ></span>
                    {repo.language}
                  </div>
                )}
                <div className="repo-updated">
                  <Calendar size={14} />
                  Updated {repo.lastUpdated || 
                    (repo.updatedAt ? new Date(Number(repo.updatedAt) / 1000000).toLocaleDateString() : 'Unknown')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="empty-state">
            <Code size={48} />
            <h3>No repositories found</h3>
            <p>Try adjusting your search or filters, or create a new repository to get started.</p>
            {isAuthenticated && (
              <button 
                className="btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus size={20} />
                Create your first repository
              </button>
            )}
          </div>
        )}

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

      {/* Create Repository Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => !loading && setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create a new repository</h2>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateRepository} className="create-repo-form">
              <div className="form-group">
                <label htmlFor="repo-name">Repository name *</label>
                <input
                  id="repo-name"
                  type="text"
                  value={createFormData.name}
                  onChange={(e) => setCreateFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="my-awesome-project"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="repo-description">Description</label>
                <textarea
                  id="repo-description"
                  value={createFormData.description}
                  onChange={(e) => setCreateFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="A short description of your project"
                  rows={3}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <div className="form-section">
                  <h4>Visibility</h4>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="visibility"
                        checked={!createFormData.isPrivate}
                        onChange={() => setCreateFormData(prev => ({ ...prev, isPrivate: false }))}
                        disabled={loading}
                      />
                      <div className="radio-content">
                        <div className="radio-header">
                          <Globe size={16} />
                          <strong>Public</strong>
                        </div>
                        <p>Anyone on the internet can see this repository</p>
                      </div>
                    </label>
                    
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="visibility"
                        checked={createFormData.isPrivate}
                        onChange={() => setCreateFormData(prev => ({ ...prev, isPrivate: true }))}
                        disabled={loading}
                      />
                      <div className="radio-content">
                        <div className="radio-header">
                          <Lock size={16} />
                          <strong>Private</strong>
                        </div>
                        <p>Only you can see this repository</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <h4>Initialize this repository with:</h4>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={createFormData.initializeWithReadme}
                    onChange={(e) => setCreateFormData(prev => ({ ...prev, initializeWithReadme: e.target.checked }))}
                    disabled={loading}
                  />
                  <span>Add a README file</span>
                </label>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading || !createFormData.name.trim()}
                >
                  {loading ? 'Creating...' : 'Create repository'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Repository Modal */}
      {showEditModal && selectedRepo && (
        <div className="modal-overlay" onClick={() => !loading && setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit repository</h2>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditRepository} className="edit-repo-form">
              <div className="form-group">
                <label htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="A short description of your project"
                  rows={3}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-topics">Topics</label>
                <div className="topics-input">
                  <input
                    id="edit-topics"
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Add a topic"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
                    disabled={loading}
                  />
                  <button type="button" onClick={addTopic} disabled={loading || !newTopic.trim()}>
                    Add
                  </button>
                </div>
                <div className="topics-list">
                  {editFormData.settings.topics.map(topic => (
                    <span key={topic} className="topic-tag">
                      {topic}
                      <button 
                        type="button"
                        onClick={() => removeTopic(topic)}
                        disabled={loading}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <h4>Features</h4>
                <div className="checkbox-group">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={editFormData.settings.allowIssues}
                      onChange={(e) => setEditFormData(prev => ({
                        ...prev,
                        settings: { ...prev.settings, allowIssues: e.target.checked }
                      }))}
                      disabled={loading}
                    />
                    <span>Issues</span>
                  </label>
                  
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={editFormData.settings.allowWiki}
                      onChange={(e) => setEditFormData(prev => ({
                        ...prev,
                        settings: { ...prev.settings, allowWiki: e.target.checked }
                      }))}
                      disabled={loading}
                    />
                    <span>Wiki</span>
                  </label>
                  
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={editFormData.settings.allowProjects}
                      onChange={(e) => setEditFormData(prev => ({
                        ...prev,
                        settings: { ...prev.settings, allowProjects: e.target.checked }
                      }))}
                      disabled={loading}
                    />
                    <span>Projects</span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowEditModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  )
}

export default Repositories 