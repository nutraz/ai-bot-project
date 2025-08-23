import { useState, useEffect } from 'react'
import { AuthClient } from '@dfinity/auth-client'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [principal, setPrincipal] = useState(null)
  const [authClient, setAuthClient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const client = await AuthClient.create()
        setAuthClient(client)

        const authenticated = await client.isAuthenticated()
        setIsAuthenticated(authenticated)

        if (authenticated) {
          const identity = client.getIdentity()
          setPrincipal(identity.getPrincipal().toText())
        }
      } catch (error) {
        console.error('Auth initialization failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async () => {
    if (!authClient) return

    try {
      await authClient.login({
        identityProvider: process.env.REACT_APP_INTERNET_IDENTITY_URL || "https://identity.ic0.app",
        onSuccess: () => {
          setIsAuthenticated(true)
          const identity = authClient.getIdentity()
          setPrincipal(identity.getPrincipal().toText())
        },
      })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const logout = async () => {
    if (!authClient) return

    try {
      await authClient.logout()
      setIsAuthenticated(false)
      setPrincipal(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return {
    isAuthenticated,
    principal,
    isLoading,
    login,
    logout,
  }
}
