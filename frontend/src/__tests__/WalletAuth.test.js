import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

// Mock AuthClient for successful login
jest.mock("@dfinity/auth-client", () => {
  return {
    AuthClient: class {
      static async create() { return new this(); }
      async login({ onSuccess }) { onSuccess && onSuccess(); }
      async logout() {}
      async isAuthenticated() { return true; }
      async getIdentity() { return { getPrincipal: () => ({ toText: () => "mock-wallet-address" }) }; }
    }
  };
});

// Mock authService to use the above AuthClient
jest.mock("../services/auth", () => {
  const actual = jest.requireActual("../services/auth");
  return {
    ...actual,
    getIsAuthenticated: () => true,
    getPrincipal: () => "mock-wallet-address",
    init: async () => {},
    login: async () => {},
    logout: async () => {},
  };
});

describe("Wallet/Auth UI", () => {
  it("shows wallet address and sign out when authenticated", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/mock-w.*ress/i)).toBeInTheDocument();
  });
});
