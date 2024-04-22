import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";

describe("Input Component", () => {
  it("should render correctly and matches snapshot", () => {
    const { asFragment } = render(<Input label="Test Input" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should update value on user input", () => {
    render(<Input label="Test Input" />);
    const inputElement: HTMLInputElement = screen.getByLabelText("Test Input");

    fireEvent.change(inputElement, { target: { value: "Hello World" } });

    expect(inputElement?.value).toBe("Hello World");
  });

  it("should display error message when provided", () => {
    const errorMessage = "Error: Incorrect input";
    render(<Input label="Test Input" errorMessage={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
