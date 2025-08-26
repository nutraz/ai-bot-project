import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header", () => {
  it("renders logo and nav links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/OpenKeyHub/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Repositories/i)[0]).toBeInTheDocument();
  });

  it("shows Sign in button when not authenticated", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Sign in/i)).toBeInTheDocument();
  });
});
