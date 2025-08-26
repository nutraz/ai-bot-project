import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

// Mock the auth service with rate limiting simulation
jest.mock("../services/auth", () => {
  let attemptCount = 0;
  
  return {
    init: async () => {},
    login: async () => {
      attemptCount++;
      
      // Simulate rate limit error after 3 attempts
      if (attemptCount > 3) {
        const error = new Error("GitHub API rate limit reached. Please wait a few minutes and try again.");
        error.isRateLimitError = true;
        throw error;
      }
      
      // Simulate other errors for testing retry logic
      if (attemptCount === 2) {
        const error = new Error("API rate limit exceeded for user ID 126004303");
        error.isRateLimitError = true;
        throw error;
      }
      
      return Promise.resolve();
    },
    logout: async () => {},
    getIsAuthenticated: () => false,
    getPrincipal: () => null,
  };
});

describe("Authentication Rate Limiting", () => {
  beforeEach(() => {
    // Reset modules to reset attempt count
    jest.resetModules();
  });

  it("shows appropriate error message for GitHub API rate limits", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Click sign in to open modal
    const signInButton = screen.getByText(/Sign in/i);
    fireEvent.click(signInButton);

    // Wait for modal to appear
    await waitFor(() => {
      expect(screen.getByText(/Sign In to OpenKeyHub/i)).toBeInTheDocument();
    });

    // Click login button multiple times to trigger rate limiting
    const loginButton = screen.getByText(/Continue with Internet Identity/i);
    
    // First attempt should show rate limit error
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/API rate limit exceeded/i)).toBeInTheDocument();
    });
  });

  it("shows loading state during authentication", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const signInButton = screen.getByText(/Sign in/i);
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText(/Sign In to OpenKeyHub/i)).toBeInTheDocument();
    });

    const loginButton = screen.getByText(/Continue with Internet Identity/i);
    fireEvent.click(loginButton);

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText(/Signing in.../i)).toBeInTheDocument();
    });
  });

  it("disables buttons during authentication", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const signInButton = screen.getByText(/Sign in/i);
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText(/Sign In to OpenKeyHub/i)).toBeInTheDocument();
    });

    const loginButton = screen.getByText(/Continue with Internet Identity/i);
    const walletButton = screen.getByText(/Connect Wallet/i);
    
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginButton).toBeDisabled();
      expect(walletButton).toBeDisabled();
    });
  });
});