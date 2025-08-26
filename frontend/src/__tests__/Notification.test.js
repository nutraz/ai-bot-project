import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Notification from "../components/Notification";

describe("Notification", () => {
  it("renders message and calls onClose", () => {
    const onClose = jest.fn();
    render(<Notification message="Test notification" onClose={onClose} />);
    expect(screen.getByText(/Test notification/i)).toBeInTheDocument();
    // Simulate close button click if present
    const closeBtn = screen.queryByRole('button');
    if (closeBtn) {
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalled();
    }
  });
});
