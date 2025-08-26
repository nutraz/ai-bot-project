import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from '../App'

// Mock auth service
vi.mock('../services/auth', () => ({
  default: {
    init: vi.fn().mockResolvedValue(true),
    getIsAuthenticated: vi.fn().mockReturnValue(false),
    getPrincipal: vi.fn().mockReturnValue(null),
    login: vi.fn().mockResolvedValue(true),
    logout: vi.fn().mockResolvedValue(true)
  }
}))

// Mock demo store
vi.mock('../lib/demoStore', () => ({
  seedDemoRepos: vi.fn(),
  getRepos: vi.fn(() => [
    { id: 1, name: 'test/repo1', desc: 'Test repo 1', stars: 100, createdAt: Date.now() },
    { id: 2, name: 'test/repo2', desc: 'Test repo 2', stars: 200, createdAt: Date.now() }
  ]),
  addRepo: vi.fn(),
  removeRepo: vi.fn(),
  clearRepos: vi.fn()
}))

describe('Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('App Navigation', () => {
    it('renders the main app with navigation', async () => {
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      // Check navigation links
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /repositories/i })).toBeInTheDocument()
    })

    it('navigates between pages', async () => {
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      // Navigate to repositories page
      const repoLink = screen.getByRole('link', { name: /repositories/i })
      fireEvent.click(repoLink)
      
      await waitFor(() => {
        expect(screen.getByText('Create, manage, and explore repositories')).toBeInTheDocument()
      })
    })
  })

  describe('Repository Management Flow', () => {
    it('completes full repository creation workflow', async () => {
      const { addRepo, getRepos } = await import('../lib/demoStore')
      
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      // Navigate to repositories
      const repoLink = screen.getByRole('link', { name: /repositories/i })
      fireEvent.click(repoLink)
      
      await waitFor(() => {
        expect(screen.getByText('Create New Repository')).toBeInTheDocument()
      })
      
      // Fill out form
      const nameInput = screen.getByPlaceholderText(/owner\/repository-name/)
      const descInput = screen.getByPlaceholderText(/brief description/i)
      const createButton = screen.getByRole('button', { name: /create repository/i })
      
      fireEvent.change(nameInput, { target: { value: 'integration/test-repo' } })
      fireEvent.change(descInput, { target: { value: 'Integration test repository' } })
      fireEvent.click(createButton)
      
      // Verify function calls
      expect(addRepo).toHaveBeenCalledWith({
        name: 'integration/test-repo',
        desc: 'Integration test repository'
      })
      expect(getRepos).toHaveBeenCalled()
    })

    it('can seed demo data and display repositories', async () => {
      const { seedDemoRepos, getRepos } = await import('../lib/demoStore')
      
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      // Navigate to repositories
      const repoLink = screen.getByRole('link', { name: /repositories/i })
      fireEvent.click(repoLink)
      
      await waitFor(() => {
        expect(screen.getByText('Create New Repository')).toBeInTheDocument()
      })
      
      // Click seed demo data
      const seedButton = screen.getByRole('button', { name: /seed demo data/i })
      fireEvent.click(seedButton)
      
      expect(seedDemoRepos).toHaveBeenCalled()
      expect(getRepos).toHaveBeenCalled()
    })

    it('displays repository search functionality', async () => {
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      // Navigate to repositories
      const repoLink = screen.getByRole('link', { name: /repositories/i })
      fireEvent.click(repoLink)
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/search repositories/i)).toBeInTheDocument()
      })
      
      // Test search functionality
      const searchInput = screen.getByPlaceholderText(/search repositories/i)
      fireEvent.change(searchInput, { target: { value: 'test' } })
      
      expect(searchInput.value).toBe('test')
    })
  })

  describe('Homepage to Repository Flow', () => {
    it('navigates from homepage Try Demo to repositories', async () => {
      const { seedDemoRepos } = await import('../lib/demoStore')
      
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('Decentralized GitHub on ICP')).toBeInTheDocument()
      })
      
      // Click Try Demo button in hero
      const tryDemoButtons = screen.getAllByRole('button', { name: /try demo/i })
      fireEvent.click(tryDemoButtons[0])
      
      expect(seedDemoRepos).toHaveBeenCalled()
    })

    it('displays all homepage sections', async () => {
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      // Check all sections are present
      expect(screen.getByText('Decentralized GitHub on ICP')).toBeInTheDocument()
      expect(screen.getByText('Build in public. Verifiably.')).toBeInTheDocument()
      expect(screen.getByText('Trending on OpenKeyHub')).toBeInTheDocument()
      expect(screen.getByText('Ship verifiable software today')).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('works on mobile devices', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      // Verify mobile navigation works
      const repoLink = screen.getByRole('link', { name: /repositories/i })
      fireEvent.click(repoLink)
      
      await waitFor(() => {
        expect(screen.getByText('Create, manage, and explore repositories')).toBeInTheDocument()
      })
    })

    it('works on desktop devices', async () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      })
      
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      // Verify desktop navigation works
      const repoLink = screen.getByRole('link', { name: /repositories/i })
      fireEvent.click(repoLink)
      
      await waitFor(() => {
        expect(screen.getByText('Create, manage, and explore repositories')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('handles auth initialization errors gracefully', async () => {
      const authService = await import('../services/auth')
      authService.default.init.mockRejectedValueOnce(new Error('Auth failed'))
      
      render(<App />)
      
      // Should still render the app even if auth fails
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
    })

    it('handles empty repository states', async () => {
      const { getRepos } = await import('../lib/demoStore')
      getRepos.mockReturnValue([])
      
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      // Navigate to repositories
      const repoLink = screen.getByRole('link', { name: /repositories/i })
      fireEvent.click(repoLink)
      
      await waitFor(() => {
        expect(screen.getByText('No repositories yet')).toBeInTheDocument()
      })
    })
  })

  describe('Performance and Loading', () => {
    it('renders components without delay', async () => {
      const start = performance.now()
      
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      const end = performance.now()
      const renderTime = end - start
      
      // Should render in under 1 second
      expect(renderTime).toBeLessThan(1000)
    })

    it('handles navigation efficiently', async () => {
      render(<App />)
      
      await waitFor(() => {
        expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      })
      
      const start = performance.now()
      
      // Navigate to repositories
      const repoLink = screen.getByRole('link', { name: /repositories/i })
      fireEvent.click(repoLink)
      
      await waitFor(() => {
        expect(screen.getByText('Create, manage, and explore repositories')).toBeInTheDocument()
      })
      
      const end = performance.now()
      const navTime = end - start
      
      // Navigation should be fast
      expect(navTime).toBeLessThan(500)
    })
  })
})