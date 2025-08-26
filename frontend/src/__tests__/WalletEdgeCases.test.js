import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

// Edge case: User rejects login
jest.mock("@dfinity/auth-client", () => {
  return {
    AuthClient: class {
      static async create() { return new this(); }
      async login({ onError }) { onError && onError(new Error("User rejected login")); }
      async logout() {}
      async isAuthenticated() { return false; }
      async getIdentity() { return { getPrincipal: () => ({ toText: () => "" }) }; }
    }
  };
});

jest.mock("../services/auth", () => {
  const actual = jest.requireActual("../services/auth");
  return {
    ...actual,
    getIsAuthenticated: () => false,
    getPrincipal: () => null,
    init: async () => {},
    login: async () => { throw new Error("User rejected login"); },
    logout: async () => {},
  };
});

describe("Wallet/Auth Edge Cases", () => {
  it("shows sign in when user rejects login", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Sign in/i)).toBeInTheDocument();
  });
});
