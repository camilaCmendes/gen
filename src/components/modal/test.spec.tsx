import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from ".";
import { UserDTO } from "../../dtos/userDTO";

describe("Modal Component", () => {
  const mockHandleClose = jest.fn();
  const mockHandleUpdateUser = jest.fn();
  const mockHandleRemoveUser = jest.fn();
  const userData: UserDTO = {
    id: "1",
    userAccess: "ADMIN",
    name: "Camila de Carvalho Mendes",
    role: "Desenvolvedora Frontend",
    team: "Desenvolvimento",
    email: "camila@email.com",
    password: "123456",
  };

  beforeEach(() => {
    render(
      <Modal
        open={true}
        userData={userData}
        handleClose={mockHandleClose}
        handleUpdateUser={mockHandleUpdateUser}
        handleRemoveUser={mockHandleRemoveUser}
      />
    );
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Modal
        open={true}
        userData={userData}
        handleClose={mockHandleClose}
        handleUpdateUser={mockHandleUpdateUser}
        handleRemoveUser={mockHandleRemoveUser}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should update inputs correctly", () => {
    const inputName: HTMLInputElement = screen.getByLabelText("Nome");
    fireEvent.change(inputName, { target: { value: "Guilherme Briggs" } });
    expect(inputName.value).toBe("Guilherme Briggs");
  });
});
