import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Profile } from ".";
import { AuthContextProvider } from "../../contexts/authContext";
import { ToastProvider } from "../../contexts/toastContext";

const mockUser = {
  id: "4",
  userAccess: "ADMIN",
  name: "Leonardo Marzeuski",
  role: "Analista de Sistemas",
  team: "Análise",
  email: "leonardo@email.com",
  password: "123456",
};

jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: mockUser,
    logout: jest.fn(),
    changePassword: jest.fn(),
    login: jest.fn(),
  }),
}));

jest.mock("../../hooks/useToast", () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}));

describe("Profile", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(
      <Router>
        <AuthContextProvider>
          <ToastProvider>
            <Profile />
          </ToastProvider>
        </AuthContextProvider>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should display user data correctly", () => {
    render(
      <Router>
        <AuthContextProvider>
          <Profile />
        </AuthContextProvider>
      </Router>
    );

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(
      screen.getByText("Especialidade: " + mockUser.role)
    ).toBeInTheDocument();
    expect(screen.getByText("Time: " + mockUser.team)).toBeInTheDocument();
  });
});
