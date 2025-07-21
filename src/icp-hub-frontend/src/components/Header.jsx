import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWallet } from '../services/walletService.jsx'
import { Home, Folder, Users, User, Plus, Wallet, LogOut, Settings, ChevronDown } from 'lucide-react'
import NewRepositoryModal from './NewRepositoryModal'
import WalletConnectionModal from './WalletConnectionModal'

function Header() {
  const { 
    isConnected, 
    currentWallet, 
    address,
    balance,
    network,
    walletType,
    disconnectWallet,
    loading,
    error,
    setError,
    formatAddress,
    formatBalance,
    getWalletDisplayName
  } = useWallet()
  
  const navigate = useNavigate()
  const [isNewRepoModalOpen, setIsNewRepoModalOpen] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false)

  const handleConnectWallet = () => {
    setError(null)
    setIsWalletModalOpen(true)
  }

  const handleDisconnectWallet = async () => {
    try {
      setError(null)
      await disconnectWallet()
      navigate('/')
      setIsWalletMenuOpen(false)
    } catch (error) {
      console.error('Disconnect error:', error)
    }
  }

  const handleNewRepository = () => {
    if (!isConnected) {
      handleConnectWallet()
    } else {
      setIsNewRepoModalOpen(true)
    }
  }

  const handleProfileClick = () => {
    setIsWalletMenuOpen(false)
    if (isConnected) {
      navigate('/profile')
    }
  }

  const closeWalletMenu = () => {
    setIsWalletMenuOpen(false)
  }

  // Close wallet menu when clicking outside
  const handleWalletMenuClick = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <header className="header" onClick={closeWalletMenu}>
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <span className="logo-text">GitForWeb3</span>
            </Link>
            
            <nav className="nav">
              <Link to="/" className="nav-link">
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link to="/repositories" className="nav-link">
                <Folder size={18} />
                <span>Repositories</span>
              </Link>
              <Link to="/community" className="nav-link">
                <Users size={18} />
                <span>Community</span>
              </Link>
              {isConnected && (
                <Link to="/profile" className="nav-link">
                  <User size={18} />
                  <span>Profile</span>
                </Link>
              )}
            </nav>

            <div className="header-actions">
              {isConnected && (
                <button 
                  className="btn-secondary new-btn"
                  onClick={handleNewRepository}
                  disabled={loading}
                >
                  <Plus size={16} />
                  New
                </button>
              )}

              <div className="wallet-section">
                {!isConnected ? (
                  <button 
                    className="btn-primary connect-wallet-btn"
                    onClick={handleConnectWallet}
                    disabled={loading}
                  >
                    <Wallet size={16} />
                    {loading ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                ) : (
                  <div className="wallet-menu-container">
                    <button 
                      className="wallet-menu-trigger"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsWalletMenuOpen(!isWalletMenuOpen)
                      }}
                    >
                      <div className="wallet-info">
                        <div className="wallet-main">
                          <Wallet size={16} />
                          <span className="wallet-address">
                            {formatAddress(address)}
                          </span>
                        </div>
                        <div className="wallet-details">
                          <span className="wallet-balance">
                            {formatBalance(balance)} {walletType === 'metamask' ? 'ETH' : 'ICP'}
                          </span>
                          <span className="wallet-network">
                            {network}
                          </span>
                        </div>
                      </div>
                      <ChevronDown size={16} className={`chevron ${isWalletMenuOpen ? 'open' : ''}`} />
                    </button>

                    {isWalletMenuOpen && (
                      <div className="wallet-menu" onClick={handleWalletMenuClick}>
                        <div className="wallet-menu-header">
                          <div className="wallet-status">
                            <div className="status-indicator connected"></div>
                            <div className="wallet-type">
                              {getWalletDisplayName(walletType)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="wallet-menu-info">
                          <div className="info-row">
                            <span className="label">Address:</span>
                            <span className="value">{formatAddress(address)}</span>
                          </div>
                          <div className="info-row">
                            <span className="label">Balance:</span>
                            <span className="value">
                              {formatBalance(balance)} {walletType === 'metamask' ? 'ETH' : 'ICP'}
                            </span>
                          </div>
                          <div className="info-row">
                            <span className="label">Network:</span>
                            <span className="value">{network}</span>
                          </div>
                        </div>
                        
                        <div className="wallet-menu-divider"></div>
                        
                        <button 
                          className="wallet-menu-item"
                          onClick={handleProfileClick}
                        >
                          <User size={16} />
                          Your Profile
                        </button>
                        
                        <button 
                          className="wallet-menu-item"
                          onClick={() => {
                            navigate('/repositories')
                            setIsWalletMenuOpen(false)
                          }}
                        >
                          <Folder size={16} />
                          Your Repositories
                        </button>
                        
                        <button 
                          className="wallet-menu-item"
                          onClick={() => {
                            setIsWalletModalOpen(true)
                            setIsWalletMenuOpen(false)
                          }}
                        >
                          <Settings size={16} />
                          Switch Wallet
                        </button>
                        
                        <div className="wallet-menu-divider"></div>
                        
                        <button 
                          className="wallet-menu-item wallet-menu-disconnect"
                          onClick={handleDisconnectWallet}
                          disabled={loading}
                        >
                          <LogOut size={16} />
                          {loading ? 'Disconnecting...' : 'Disconnect Wallet'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="header-error">
            <div className="container">
              <p>{error}</p>
              <button onClick={() => setError(null)}>×</button>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <NewRepositoryModal 
        isOpen={isNewRepoModalOpen}
        onClose={() => setIsNewRepoModalOpen(false)}
      />

      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  )
}

export default Header 