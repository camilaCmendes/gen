import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { CardUser } from ".";

describe("CardUser Component", () => {
  const mockProps = {
    id: "1",
    userAccess: "ADMIN",
    name: "Camila de Carvalho Mendes",
    role: "Desenvolvedora Frontend",
    team: "Desenvolvimento",
    email: "camila@email.com",
    password: "123456",
    handleClickedCardUser: jest.fn(),
  };

  it("should render correctly and match snapshot", () => {
    const { asFragment } = render(<CardUser {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
