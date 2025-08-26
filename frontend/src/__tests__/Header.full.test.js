import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

jest.mock("../services/auth", () => {
  const actual = jest.requireActual("../services/auth");
  return {
    ...actual,
    getIsAuthenticated: () => true,
    getPrincipal: () => "mock-principal",
    init: async () => {},
    login: async () => {},
    logout: async () => {},
  };
});

describe("Header full coverage", () => {
  it("renders all nav links and user menu when authenticated", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/mock-p.*ipal/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Repositories/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/New Repository/i)).toBeInTheDocument();
  });

  it("opens and closes mobile menu", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  const menuBtn = screen.getByRole('button', { name: '' });
  fireEvent.click(menuBtn);
  // There may be multiple 'Repositories' links, just check at least one exists
  expect(screen.getAllByText(/Repositories/i).length).toBeGreaterThan(1);
  fireEvent.click(menuBtn); // close
  });
});
