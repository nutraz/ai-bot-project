
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("renders connect wallet button", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // Wait for the button to appear after loading
  const button = await screen.findByText(/Connect Wallet|Sign in/i, {}, { timeout: 2000 });
  expect(button).toBeInTheDocument();
});
