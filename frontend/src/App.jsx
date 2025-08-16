import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import RepositoriesPage from './pages/RepositoriesPage'
import RepositoryDetailPage from './pages/RepositoryDetailPage'
import CreateRepositoryPage from './pages/CreateRepositoryPage'
import ProfilePage from './pages/ProfilePage'
import NotificationsPage from './pages/NotificationsPage'
import SearchPage from './pages/SearchPage'
import authService from './services/auth'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [principal, setPrincipal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authService.init()
        setIsAuthenticated(authService.getIsAuthenticated())
        setPrincipal(authService.getPrincipal())
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading OpenKeyHub...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repositories" element={<RepositoriesPage />} />
          <Route path="/repo/:id" element={<RepositoryDetailPage />} />
          <Route path="/repo/create" element={<CreateRepositoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
