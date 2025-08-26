import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

jest.mock("../services/auth", () => ({
  ...jest.requireActual("../services/auth"),
  getIsAuthenticated: () => true,
  getPrincipal: () => "mock-principal",
  init: async () => {},
}));

describe("Header conditional rendering", () => {
  it("shows user menu when authenticated", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Sign out/i)).toBeInTheDocument();
    // The principal is truncated in the UI, so match the truncated version
    expect(screen.getByText(/mock-p.*ipal/i)).toBeInTheDocument();
  });
});
