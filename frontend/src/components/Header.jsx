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
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900 shadow-2xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GitBranch className="h-10 w-10 text-pink-400 drop-shadow-lg" />
              <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">OpenKeyHub</span>
            </Link>
          </div>
          {/* User Actions */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <span className="text-white/80 font-bold flex items-center">
                  <User className="h-6 w-6 mr-2" />
                  {principal}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-pink-400 hover:text-red-500 font-bold flex items-center px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow-md hover:bg-pink-600 hover:text-white transition-all"
                >
                  <LogOut className="h-6 w-6 mr-2" /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-blue-400 font-bold flex items-center px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow-md hover:bg-blue-600 hover:text-white transition-all"
              >
                <User className="h-6 w-6 mr-2" /> Login
              </button>
            )}
            <button
              onClick={() => navigate('/notifications')}
              className="text-white/80 hover:text-blue-400 font-bold flex items-center px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow-md hover:bg-blue-600 hover:text-white transition-all"
            >
              <Bell className="h-6 w-6 mr-2" />
            </button>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      {showNotification && <Notification message={notificationMessage} />}
    </header>
  );
}

export default Header;
