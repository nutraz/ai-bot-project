// src/services/auth.js
// Mock authentication service for OpenKeyHub (to be replaced with actual ICP Internet Identity)

import { AuthClient } from "@dfinity/auth-client";

let authClient = null;
let isAuthenticated = false;
let principal = null;

// Initialize auth client
export const init = async () => {
  if (authClient) return;

  authClient = await AuthClient.create({
    idleOptions: {
      disableIdle: true, // Keep session alive
    },
  });

  // Check if already authenticated
  isAuthenticated = await authClient.isAuthenticated();
  if (isAuthenticated) {
    const identity = authClient.getIdentity();
    principal = identity.getPrincipal().toString();
  }
};

// Login function
export const login = async () => {
  return new Promise((resolve, reject) => {
    authClient.login({
      identityProvider: "https://identity.ic0.app", // Mainnet II
      onSuccess: async () => {
        isAuthenticated = true;
        const identity = authClient.getIdentity();
        principal = identity.getPrincipal().toString();
        console.log("Logged in:", principal);
        resolve();
      },
      onError: (error) => {
        console.error("Login failed:", error);
        reject(error);
      },
    });
  });
};

// Logout function
export const logout = async () => {
  if (authClient) {
    await authClient.logout();
    isAuthenticated = false;
    principal = null;
  }
};

// Get current auth status
export const getIsAuthenticated = () => isAuthenticated;

// Get principal ID
export const getPrincipal = () => principal;

// Default export for backward compatibility (if needed)
const authService = {
  init,
  login,
  logout,
  getIsAuthenticated,
  getPrincipal,
};

export default authService;
