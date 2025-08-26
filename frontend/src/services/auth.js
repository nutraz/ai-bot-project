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

// Rate limiting for authentication attempts
let lastLoginAttempt = 0;
let loginAttempts = 0;
const MAX_LOGIN_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RETRY_DELAYS = [1000, 3000, 5000]; // Exponential backoff delays

// Check if we're hitting rate limits
const checkRateLimit = () => {
  const now = Date.now();
  
  // Reset counter if window has passed
  if (now - lastLoginAttempt > RATE_LIMIT_WINDOW) {
    loginAttempts = 0;
  }
  
  return loginAttempts < MAX_LOGIN_ATTEMPTS;
};

// Sleep utility for retry delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Enhanced login function with retry logic and rate limiting
export const login = async (retryCount = 0) => {
  // Check rate limiting
  if (!checkRateLimit()) {
    const waitTime = Math.ceil((RATE_LIMIT_WINDOW - (Date.now() - lastLoginAttempt)) / 1000);
    throw new Error(`Rate limit exceeded. Please wait ${waitTime} seconds before trying again.`);
  }

  return new Promise(async (resolve, reject) => {
    try {
      lastLoginAttempt = Date.now();
      loginAttempts++;

      await authClient.login({
        identityProvider: "https://identity.ic0.app", // Mainnet II
        onSuccess: async () => {
          // Reset rate limiting on success
          loginAttempts = 0;
          isAuthenticated = true;
          const identity = authClient.getIdentity();
          principal = identity.getPrincipal().toString();
          console.log("Logged in:", principal);
          resolve();
        },
        onError: async (error) => {
          console.error("Login failed:", error);
          
          // Check if error is related to GitHub API rate limiting
          const isRateLimitError = error.message && (
            error.message.includes("rate limit") ||
            error.message.includes("API rate limit exceeded") ||
            error.message.includes("403") ||
            error.message.includes("429")
          );
          
          // Implement retry logic for rate limit errors
          if (isRateLimitError && retryCount < RETRY_DELAYS.length) {
            console.log(`Rate limit detected, retrying in ${RETRY_DELAYS[retryCount]}ms...`);
            
            try {
              await sleep(RETRY_DELAYS[retryCount]);
              const result = await login(retryCount + 1);
              resolve(result);
              return;
            } catch (retryError) {
              reject(retryError);
              return;
            }
          }
          
          // Format user-friendly error messages
          let userMessage = "Sign in failed. Please try again.";
          
          if (isRateLimitError) {
            userMessage = "GitHub API rate limit reached. Please wait a few minutes and try again.";
          } else if (error.message?.includes("User rejected")) {
            userMessage = "Sign in was cancelled.";
          } else if (error.message?.includes("network")) {
            userMessage = "Network error. Please check your connection and try again.";
          }
          
          const enhancedError = new Error(userMessage);
          enhancedError.originalError = error;
          enhancedError.isRateLimitError = isRateLimitError;
          
          reject(enhancedError);
        },
      });
    } catch (error) {
      reject(error);
    }
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
