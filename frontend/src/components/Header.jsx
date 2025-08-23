import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, Bell, Search, GitBranch } from 'lucide-react'
import authService from '../services/auth'
import Notification from './Notification'
import LoginModal from './Auth/LoginModal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [principal, setPrincipal] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.init()
        setIsAuthenticated(authService.getIsAuthenticated())
        setPrincipal(authService.getPrincipal())
      } catch (error) {
        console.error('Auth check failed:', error)
      }
    }

    checkAuth()
  }, [])

  const handleLogin = async () => {
    try {
      await authService.login()
      setIsAuthenticated(true)
      setPrincipal(authService.getPrincipal())
      setIsLoginModalOpen(false)
      showNotificationMessage('Login successful!')
    } catch (error) {
      showNotificationMessage('Login failed. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
      setIsAuthenticated(false)
      setPrincipal(null)
      showNotificationMessage('Logged out successfully')
    } catch (error) {
      showNotificationMessage('Logout failed')
    }
  }

  const showNotificationMessage = (message) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GitBranch className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">OpenKeyHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/repositories" className="text-gray-700 hover:text-gray-900 font-medium">
              Repositories
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/repositories" className="text-gray-700 hover:text-gray-900 font-medium">
                  Dashboard
                </Link>
                <Link to="/repo/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                  New Repository
                </Link>
              </>
            )}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="relative text-gray-700 hover:text-gray-900">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {principal ? `${principal.slice(0, 6)}...${principal.slice(-4)}` : 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
              >
                Sign in
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/repositories" 
                className="text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Repositories
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/repositories" 
                    className="text-gray-700 hover:text-gray-900 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/repo/create" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    New Repository
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="text-gray-700 hover:text-gray-900 flex items-center justify-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 w-full"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Notification */}
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </header>
  )
}

export default Header
