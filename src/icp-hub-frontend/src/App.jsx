import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WalletProvider, useWallet } from './services/walletService.jsx'
import Header from './components/Header'
import Home from './components/Home'
import Repositories from './components/Repositories'
import Community from './components/Community'
import Profile from './components/Profile'
import UserProfile from './components/UserProfile'
import RepositoryDetail from './components/RepositoryDetail'
import Footer from './components/Footer'
import './App.css'
import { useState, useEffect } from 'react'

// Loading component
function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Connecting to Internet Computer...</p>
    </div>
  )
}

// Error boundary component
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleError = (error) => {
      setHasError(true)
      setError(error)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Something went wrong</h2>
          <p>We're experiencing technical difficulties. Please try again later.</p>
          <button 
            className="btn-primary"
            onClick={() => {
              setHasError(false)
              setError(null)
              window.location.reload()
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return children
}

// Main App content component
function AppContent() {
  const { loading, error } = useWallet()

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Connection Error</h2>
          <p>{error}</p>
          <button 
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repositories" element={<Repositories />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/:owner/:repo" element={<RepositoryDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <WalletProvider>
        <Router>
          <AppContent />
        </Router>
      </WalletProvider>
    </ErrorBoundary>
  )
}

export default App
