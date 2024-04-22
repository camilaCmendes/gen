import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from ".";
import { act } from "react-dom/test-utils";

jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    login: jest.fn((email, password) => {
      return email === "test@example.com" && password === "password";
    }),
    logout: jest.fn(),
    changePassword: jest.fn(),
    user: {},
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("should navigate to the homepage when user enters correct credentials", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole("button", { name: /acessar/i });

    await act(async () => {
      await userEvent.type(emailInput, "test@example.com");
      await userEvent.type(passwordInput, "password");
      userEvent.click(loginButton);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
