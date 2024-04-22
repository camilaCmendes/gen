import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from ".";
import { AuthContext } from "../../contexts/authContext";

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => jest.fn()),
}));

describe("Header Component", () => {
  it("should displays the user's first name when user data is provided", () => {
    const fakeContext = {
      user: {
        id: "1",
        userAccess: "ADMIN",
        name: "Camila de Carvalho Mendes",
        role: "Desenvolvedora Frontend",
        team: "Desenvolvimento",
        email: "camila@email.com",
        password: "123456",
      },
      logout: jest.fn(),
      login: jest.fn(),
      changePassword: jest.fn(),
    };

    jest
      .requireMock("../../hooks/useAuth")
      .useAuth.mockReturnValue(fakeContext);

    render(
      <BrowserRouter>
        <AuthContext.Provider value={fakeContext}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Camila")).toBeInTheDocument();
  });
});
