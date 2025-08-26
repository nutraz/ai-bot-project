import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("renders footer content", () => {
    render(<Footer />);
    // There may be multiple OpenKeyHub texts, just check at least one exists
    expect(screen.getAllByText(/OpenKeyHub/i).length).toBeGreaterThan(0);
  });
});
