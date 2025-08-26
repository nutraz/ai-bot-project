import React from "react";
import { render, screen } from "@testing-library/react";
import RepositoriesPage from "../pages/RepositoriesPage";

describe("RepositoriesPage", () => {
  it("renders repositories page", () => {
    render(<RepositoriesPage />);
    expect(screen.getAllByText(/repositories/i).length).toBeGreaterThan(0);
  });
});
