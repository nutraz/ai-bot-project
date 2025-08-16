import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Bell, Search, GitBranch, User, LogOut } from 'lucide-react'

const Header = () => {
  const { isAuthenticated, principal, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GitBranch className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">OpenKeyHub</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/repo/create" className="text-gray-700 hover:text-gray-900 font-medium">
                  New
                </Link>
                <Link to="/notifications" className="relative text-gray-700 hover:text-gray-900">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {principal ? `${principal.slice(0, 6)}...${principal.slice(-4)}` : 'User'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-gray-900 flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => window.location.href = '/api/auth/login'}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
