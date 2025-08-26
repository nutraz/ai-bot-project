import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

describe("HomePage", () => {
  it('renders OpenKeyHub title and subtitle', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    // There may be multiple OpenKeyHub texts, check at least one
    expect(screen.getAllByText(/OpenKeyHub/i).length).toBeGreaterThan(0);
    // Subtitle is inside a span, so use a function matcher
    expect(screen.getByText((content, element) =>
      element.tagName.toLowerCase() === 'span' && /Decentralized GitHub on ICP/i.test(content)
    )).toBeInTheDocument();
  });
});
