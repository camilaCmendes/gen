import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Home } from ".";
import { AuthContextProvider } from "../../contexts/authContext";
import { USER_LIST } from "../../mock/user.mock";
import userEvent from "@testing-library/user-event";

jest.mock("../../storages/storageUserList", () => ({
  storageUserListGet: jest.fn(() => USER_LIST),
}));

jest.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { userAccess: "ADMIN" },
  }),
}));

describe("Home", () => {
  it("should open the modal when the 'Criar' button is clicked", async () => {
    render(
      <Router>
        <AuthContextProvider>
          <Home />
        </AuthContextProvider>
      </Router>
    );

    const createButton = screen.getByRole("button", { name: /criar/i });
    userEvent.click(createButton);

    await waitFor(() => {
      expect(screen.getByText(/detalhes usuário/i)).toBeInTheDocument();
    });
  });
});
