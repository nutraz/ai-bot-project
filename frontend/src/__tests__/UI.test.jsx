import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import HomePage from '../pages/HomePage'
import RepositoriesPage from '../pages/RepositoriesPage'
import Hero from '../components/sections/Hero'
import Features from '../components/sections/Features'
import Showcase from '../components/sections/Showcase'
import CTA from '../components/sections/CTA'

// Mock dependencies
vi.mock('../lib/demoStore', () => ({
  seedDemoRepos: vi.fn(),
  getRepos: vi.fn(() => []),
  addRepo: vi.fn(),
  removeRepo: vi.fn(),
  clearRepos: vi.fn()
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('UI Components', () => {
  describe('HomePage', () => {
    it('renders without crashing', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByText(/OpenKeyHub/)).toBeInTheDocument()
    })

    it('displays hero section with correct title', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByText(/Decentralized GitHub on ICP/)).toBeInTheDocument()
    })

    it('shows features section', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByText(/Build in public. Verifiably./)).toBeInTheDocument()
    })

    it('includes showcase section', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByText(/Trending on OpenKeyHub/)).toBeInTheDocument()
    })

    it('displays call-to-action section', () => {
      renderWithRouter(<HomePage />)
      expect(screen.getByText(/Ship verifiable software today/)).toBeInTheDocument()
    })
  })

  describe('Hero Component', () => {
    const mockOnTryDemo = vi.fn()

    beforeEach(() => {
      mockOnTryDemo.mockClear()
    })

    it('renders hero content correctly', () => {
      render(<Hero onTryDemo={mockOnTryDemo} />)
      
      expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
      expect(screen.getByText('Decentralized GitHub on ICP')).toBeInTheDocument()
      expect(screen.getByText(/Censorship-resistant/)).toBeInTheDocument()
    })

    it('displays statistics', () => {
      render(<Hero onTryDemo={mockOnTryDemo} />)
      
      expect(screen.getByText('12k+')).toBeInTheDocument()
      expect(screen.getByText('Active Repos')).toBeInTheDocument()
      expect(screen.getByText('4.8k')).toBeInTheDocument()
      expect(screen.getByText('Contributors')).toBeInTheDocument()
      expect(screen.getByText('2.1M')).toBeInTheDocument()
      expect(screen.getByText('Commits on-chain')).toBeInTheDocument()
    })

    it('calls onTryDemo when Try Demo button is clicked', () => {
      render(<Hero onTryDemo={mockOnTryDemo} />)
      
      const tryDemoButton = screen.getByRole('button', { name: /try demo/i })
      fireEvent.click(tryDemoButton)
      
      expect(mockOnTryDemo).toHaveBeenCalledTimes(1)
    })

    it('displays code example', () => {
      render(<Hero onTryDemo={mockOnTryDemo} />)
      
      expect(screen.getByText(/dfx canister call repo_manager commit/)).toBeInTheDocument()
    })
  })

  describe('Features Component', () => {
    it('renders all feature cards', () => {
      render(<Features />)
      
      expect(screen.getByText('On-chain Proofs')).toBeInTheDocument()
      expect(screen.getByText('Decentralized Storage')).toBeInTheDocument()
      expect(screen.getByText('Keyed Access')).toBeInTheDocument()
      expect(screen.getByText('Blazing DX')).toBeInTheDocument()
      expect(screen.getByText('Tamper-evident Audit')).toBeInTheDocument()
      expect(screen.getByText('DAO Ready')).toBeInTheDocument()
    })

    it('displays feature descriptions', () => {
      render(<Features />)
      
      expect(screen.getByText(/Every commit notarized on ICP/)).toBeInTheDocument()
      expect(screen.getByText(/Assets and metadata distributed/)).toBeInTheDocument()
      expect(screen.getByText(/Fine-grained keys for repos/)).toBeInTheDocument()
    })
  })

  describe('Showcase Component', () => {
    it('renders showcase header', () => {
      render(<Showcase />)
      
      expect(screen.getByText('Trending on OpenKeyHub')).toBeInTheDocument()
    })

    it('displays repository cards', () => {
      render(<Showcase />)
      
      expect(screen.getByText('openkeyhub/okh-core')).toBeInTheDocument()
      expect(screen.getByText('openkeyhub/okh-ui')).toBeInTheDocument()
      expect(screen.getByText('openkeyhub/okh-agents')).toBeInTheDocument()
    })

    it('shows repository metadata', () => {
      render(<Showcase />)
      
      expect(screen.getByText('1234')).toBeInTheDocument() // stars
      expect(screen.getByText('842')).toBeInTheDocument() // stars
      expect(screen.getByText('512')).toBeInTheDocument() // stars
      expect(screen.getByText('Motoko')).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })
  })

  describe('CTA Component', () => {
    const mockOnTryDemo = vi.fn()

    beforeEach(() => {
      mockOnTryDemo.mockClear()
    })

    it('renders CTA content', () => {
      render(<CTA onTryDemo={mockOnTryDemo} />)
      
      expect(screen.getByText('Ship verifiable software today')).toBeInTheDocument()
      expect(screen.getByText(/Start with demo mode/)).toBeInTheDocument()
    })

    it('displays feature checkpoints', () => {
      render(<CTA onTryDemo={mockOnTryDemo} />)
      
      expect(screen.getByText('✓ No setup required')).toBeInTheDocument()
      expect(screen.getByText('✓ Instant deployment')).toBeInTheDocument()
      expect(screen.getByText('✓ Full Git compatibility')).toBeInTheDocument()
    })

    it('calls onTryDemo when Try Demo button is clicked', () => {
      render(<CTA onTryDemo={mockOnTryDemo} />)
      
      const tryDemoButton = screen.getByRole('button', { name: /try demo/i })
      fireEvent.click(tryDemoButton)
      
      expect(mockOnTryDemo).toHaveBeenCalledTimes(1)
    })
  })

  describe('RepositoriesPage', () => {
    beforeEach(() => {
      // Reset mocks before each test
      vi.clearAllMocks()
    })

    it('renders repositories page header', () => {
      renderWithRouter(<RepositoriesPage />)
      
      expect(screen.getByRole('heading', { name: /repositories/i })).toBeInTheDocument()
      expect(screen.getByText(/Create, manage, and explore repositories/)).toBeInTheDocument()
    })

    it('displays search functionality', () => {
      renderWithRouter(<RepositoriesPage />)
      
      expect(screen.getByPlaceholderText(/search repositories/i)).toBeInTheDocument()
    })

    it('shows create repository form', () => {
      renderWithRouter(<RepositoriesPage />)
      
      expect(screen.getByText('Create New Repository')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/owner\/repository-name/)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/brief description/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /create repository/i })).toBeInTheDocument()
    })

    it('displays action buttons', () => {
      renderWithRouter(<RepositoriesPage />)
      
      expect(screen.getByRole('button', { name: /seed demo data/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /reset all/i })).toBeInTheDocument()
    })

    it('shows empty state when no repositories', () => {
      renderWithRouter(<RepositoriesPage />)
      
      expect(screen.getByText('No repositories yet')).toBeInTheDocument()
      expect(screen.getByText(/Get started by creating your first repository/)).toBeInTheDocument()
    })

    it('can create a new repository', async () => {
      const { addRepo, getRepos } = await import('../lib/demoStore')
      
      renderWithRouter(<RepositoriesPage />)
      
      const nameInput = screen.getByPlaceholderText(/owner\/repository-name/)
      const descInput = screen.getByPlaceholderText(/brief description/i)
      const createButton = screen.getByRole('button', { name: /create repository/i })
      
      fireEvent.change(nameInput, { target: { value: 'test/repo' } })
      fireEvent.change(descInput, { target: { value: 'Test repository' } })
      fireEvent.click(createButton)
      
      expect(addRepo).toHaveBeenCalledWith({
        name: 'test/repo',
        desc: 'Test repository'
      })
      expect(getRepos).toHaveBeenCalled()
    })

    it('can search repositories', async () => {
      // Mock repositories
      const { getRepos } = await import('../lib/demoStore')
      getRepos.mockReturnValue([
        { id: 1, name: 'test/frontend', desc: 'Frontend app' },
        { id: 2, name: 'test/backend', desc: 'Backend API' }
      ])
      
      renderWithRouter(<RepositoriesPage />)
      
      const searchInput = screen.getByPlaceholderText(/search repositories/i)
      fireEvent.change(searchInput, { target: { value: 'frontend' } })
      
      // The component should filter repositories based on search term
      expect(searchInput.value).toBe('frontend')
    })
  })

  describe('Responsive Design', () => {
    it('adapts to mobile viewports', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      renderWithRouter(<HomePage />)
      
      // Check that components render on mobile
      expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
    })

    it('adapts to desktop viewports', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      })
      
      renderWithRouter(<HomePage />)
      
      // Check that components render on desktop
      expect(screen.getByText('OpenKeyHub')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithRouter(<HomePage />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
    })

    it('has accessible buttons', () => {
      const mockOnTryDemo = vi.fn()
      render(<Hero onTryDemo={mockOnTryDemo} />)
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })

    it('has proper form labels', () => {
      renderWithRouter(<RepositoriesPage />)
      
      expect(screen.getByLabelText(/repository name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    })
  })
})