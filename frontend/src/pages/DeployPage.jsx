import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mockDeployments, mockRepositories, supportedChains } from '../data/dummyData'
import deploymentService from '../services/deployment'
import { 
  Rocket, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Settings,
  Play,
  RefreshCw,
  Eye,
  Activity,
  Zap,
  Filter,
  Plus,
  GitBranch,
  Server,
  Loader2
} from 'lucide-react'

function DeployPage() {
  const [deployments, setDeployments] = useState(mockDeployments)
  const [repositories] = useState(mockRepositories)
  const [selectedRepo, setSelectedRepo] = useState('')
  const [selectedChain, setSelectedChain] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDeployForm, setShowDeployForm] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentForm, setDeploymentForm] = useState({
    repository: '',
    targetChain: '',
    contractFile: '',
    gasLimit: '3000000'
  })

  // Load deployments on component mount
  useEffect(() => {
    const loadDeployments = async () => {
      try {
        const result = await deploymentService.getDeployments()
        if (result.success) {
          // Merge with mock data for now
          setDeployments([...mockDeployments, ...result.deployments])
        }
      } catch (error) {
        console.error('Failed to load deployments:', error)
      }
    }
    
    loadDeployments()
  }, [])

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'N/A'
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const filteredDeployments = deployments.filter(deployment => {
    const matchesRepo = !selectedRepo || deployment.repository === selectedRepo
    const matchesChain = !selectedChain || deployment.chain === selectedChain
    const matchesStatus = statusFilter === 'all' || deployment.status === statusFilter
    
    return matchesRepo && matchesChain && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed':
        return 'text-green-600 bg-green-100 border-green-200'
      case 'pending':
        return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'failed':
        return 'text-red-600 bg-red-100 border-red-200'
      case 'deploying':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed':
        return <CheckCircle size={16} />
      case 'pending':
        return <Clock size={16} />
      case 'failed':
        return <AlertCircle size={16} />
      case 'deploying':
        return <Activity size={16} className="animate-spin" />
      default:
        return <Clock size={16} />
    }
  }

  const getChainIcon = (chainId) => {
    const chain = supportedChains.find(c => c.id === chainId)
    return <span className="text-lg">{chain?.icon || '⚪'}</span>
  }

  const handleDeploy = async (e) => {
    e.preventDefault()
    
    if (!deploymentForm.repository || !deploymentForm.targetChain) {
      alert('Please select a repository and target chain')
      return
    }

    setIsDeploying(true)

    try {
      const deploymentRequest = {
        repositoryId: deploymentForm.repository,
        contractPath: deploymentForm.contractFile || 'contracts/main.sol',
        targetChain: deploymentForm.targetChain,
        network: 'testnet',
        gasLimit: parseInt(deploymentForm.gasLimit)
      }

      const result = await deploymentService.deployContract(deploymentRequest)

      if (result.success) {
        // Subscribe to deployment updates
        deploymentService.subscribeToDeployment(result.deploymentId, (status) => {
          // Update local state when deployment status changes
          setDeployments(prev => prev.map(d => 
            d.id === result.deploymentId ? { ...d, ...status } : d
          ))
        })

        // Add new deployment to list
        const newDeployment = {
          id: result.deploymentId,
          repository: deploymentForm.repository,
          chain: deploymentForm.targetChain,
          status: 'deploying',
          txHash: result.transactionHash,
          deployer: 'current_user',
          deployedAt: '',
          contractAddress: '',
          gasUsed: '',
          version: 'v1.0.0'
        }

        setDeployments(prev => [newDeployment, ...prev])
        setShowDeployForm(false)
        setDeploymentForm({
          repository: '',
          targetChain: '',
          contractFile: '',
          gasLimit: '3000000'
        })

        alert('Deployment initiated successfully! Monitor the progress below.')
      } else {
        alert(`Deployment failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Deployment error:', error)
      alert(`Deployment failed: ${error.message}`)
    } finally {
      setIsDeploying(false)
    }
  }

  const handleRetryDeployment = async (deploymentId) => {
    try {
      const result = await deploymentService.retryDeployment(deploymentId)
      
      if (result.success) {
        // Update deployment status
        setDeployments(prev => prev.map(d => 
          d.id === deploymentId ? { ...d, status: 'deploying', txHash: result.transactionHash } : d
        ))
        alert('Deployment retry initiated successfully!')
      } else {
        alert(`Retry failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Retry error:', error)
      alert(`Retry failed: ${error.message}`)
    }
  }

  const renderDeploymentCard = (deployment) => {
    const chain = supportedChains.find(c => c.id === deployment.chain)
    
    return (
      <div key={deployment.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <GitBranch size={20} className="text-gray-500" />
              <span className="font-medium text-gray-900">{deployment.repository}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {getChainIcon(deployment.chain)}
              <span>{chain?.name}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(deployment.status)}`}>
              {getStatusIcon(deployment.status)}
              <span className="ml-1 capitalize">{deployment.status}</span>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {deployment.contractAddress && (
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Contract Address:</span>
              <div className="flex items-center space-x-2">
                <code className="text-sm font-mono text-gray-800 bg-white px-2 py-1 rounded border">
                  {deployment.contractAddress.slice(0, 10)}...{deployment.contractAddress.slice(-8)}
                </code>
                <a 
                  href={`${chain?.explorerUrl}/address/${deployment.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}
          
          {deployment.gasUsed && (
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Gas Used:</span>
              <span className="text-sm font-medium text-gray-800">{deployment.gasUsed}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Deployed:</span>
            <span className="text-sm font-medium text-gray-800">{formatTimeAgo(deployment.deployedAt)}</span>
          </div>
          
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Deployer:</span>
            <span className="text-sm font-medium text-gray-800">{deployment.deployer}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-200">
          <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Eye size={16} />
            <span>View Details</span>
          </button>
          
          {deployment.status === 'deployed' && (
            <button className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Settings size={16} />
              <span>Manage</span>
            </button>
          )}
          
          {deployment.status === 'failed' && (
            <button 
              className="flex items-center space-x-1 px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              onClick={() => handleRetryDeployment(deployment.id)}
            >
              <RefreshCw size={16} />
              <span>Retry Deploy</span>
            </button>
          )}

          {deployment.txHash && (
            <a 
              href={`${chain?.explorerUrl}/tx/${deployment.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              <span>View Transaction</span>
            </a>
          )}
        </div>
      </div>
    )
  }

  const renderDeployForm = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Deploy New Contract</h3>
        <button 
          className="text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setShowDeployForm(false)}
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleDeploy} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Repository *</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={deploymentForm.repository}
            onChange={(e) => setDeploymentForm(prev => ({ ...prev, repository: e.target.value }))}
            required
          >
            <option value="">Select repository</option>
            {repositories.map(repo => (
              <option key={repo.id} value={repo.name}>{repo.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Network *</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={deploymentForm.targetChain}
            onChange={(e) => setDeploymentForm(prev => ({ ...prev, targetChain: e.target.value }))}
            required
          >
            <option value="">Select network</option>
            {supportedChains.map(chain => (
              <option key={chain.id} value={chain.id}>
                {chain.icon} {chain.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contract File</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={deploymentForm.contractFile}
            onChange={(e) => setDeploymentForm(prev => ({ ...prev, contractFile: e.target.value }))}
          >
            <option value="">Select contract file</option>
            <option value="contracts/Token.sol">contracts/Token.sol</option>
            <option value="contracts/NFT.sol">contracts/NFT.sol</option>
            <option value="contracts/Marketplace.sol">contracts/Marketplace.sol</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gas Limit</label>
          <input 
            type="number" 
            placeholder="3000000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={deploymentForm.gasLimit}
            onChange={(e) => setDeploymentForm(prev => ({ ...prev, gasLimit: e.target.value }))}
          />
        </div>

        <div className="flex items-center space-x-3 pt-4">
          <button 
            type="submit"
            disabled={isDeploying}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeploying ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <Rocket size={16} />
                <span>Deploy Contract</span>
              </>
            )}
          </button>
          <button 
            type="button"
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => setShowDeployForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Server className="text-blue-600" size={28} />
            <span>Deployments</span>
          </h1>
          <p className="text-gray-600 mt-1">Manage your smart contract deployments across multiple chains</p>
        </div>
        <button 
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setShowDeployForm(true)}
        >
          <Plus size={16} />
          <span>New Deployment</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Deployed</h3>
              <p className="text-2xl font-bold text-gray-900">{deployments.filter(d => d.status === 'deployed').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <p className="text-2xl font-bold text-gray-900">{deployments.filter(d => d.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Failed</h3>
              <p className="text-2xl font-bold text-gray-900">{deployments.filter(d => d.status === 'failed').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Networks</h3>
              <p className="text-2xl font-bold text-gray-900">{new Set(deployments.map(d => d.chain)).size}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deploy Form */}
      {showDeployForm && renderDeployForm()}

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Repository:</label>
            <select 
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All repositories</option>
              {repositories.map(repo => (
                <option key={repo.id} value={repo.name}>{repo.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Chain:</label>
            <select 
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All chains</option>
              {supportedChains.map(chain => (
                <option key={chain.id} value={chain.id}>{chain.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Status:</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All statuses</option>
              <option value="deployed">Deployed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Deployments List */}
      <div className="space-y-4">
        {filteredDeployments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Rocket size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No deployments found</h3>
            <p className="text-gray-600 mb-4">Deploy your first smart contract to get started</p>
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
              onClick={() => setShowDeployForm(true)}
            >
              <Rocket size={16} />
              <span>Create First Deployment</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredDeployments.map(renderDeploymentCard)}
          </div>
        )}
      </div>
    </div>
  )
}

export default DeployPage