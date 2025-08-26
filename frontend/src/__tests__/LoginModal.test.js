import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginModal from "../components/Auth/LoginModal";

describe("LoginModal", () => {
  it("renders login modal and calls onLogin", async () => {
    const onLogin = jest.fn();
    render(<LoginModal isOpen={true} onClose={() => {}} onLogin={onLogin} />);
    const button = await screen.findByRole('button', { name: /continue with internet identity/i });
    fireEvent.click(button);
    expect(onLogin).toHaveBeenCalled();
  });
});
