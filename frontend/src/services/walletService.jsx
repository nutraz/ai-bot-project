import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Dynamically import auth client
        const authModule = await import('@dfinity/auth-client');
        const AuthClient = authModule.AuthClient;
        
        // Create auth client instance
        const client = await AuthClient.create();
        setAuthClient(client);

        // Check if already authenticated
        const authenticated = await client.isAuthenticated();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const identity = client.getIdentity();
          setPrincipal(identity.getPrincipal().toText());
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async () => {
    if (!authClient) return;
    
    try {
      await authClient.login({
        identityProvider: import.meta.env.VITE_INTERNET_IDENTITY_URL || "https://identity.ic0.app",
        onSuccess: () => {
          setIsAuthenticated(true);
          const identity = authClient.getIdentity();
          setPrincipal(identity.getPrincipal().toText());
        },
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    if (!authClient) return;
    
    try {
      await authClient.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <WalletContext.Provider value={{
      authClient,
      isAuthenticated,
      principal,
      isLoading,
      login,
      logout
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
