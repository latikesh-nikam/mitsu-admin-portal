import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./index";

test("form submits successfully with valid email and password", async () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText("Enter your email");
  const passwordInput = screen.getByPlaceholderText("Enter your username");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(submitButton);
  expect(screen.getByRole("status")).toBeInTheDocument();
  const toastNotification = await screen.findByText("Logged In!");
  expect(toastNotification).toBeInTheDocument();
  expect(window.location.pathname).toBe("/admin");
});

test("form does not submit when email is invalid", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText("Enter your email");
  const passwordInput = screen.getByPlaceholderText("Enter your username");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  fireEvent.change(emailInput, { target: { value: "invalid email" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(submitButton);
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
  expect(window.location.pathname).not.toBe("/admin");
});

test("form does not submit when password is empty", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText("Enter your email");
  const passwordInput = screen.getByPlaceholderText("Enter your username");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "" } });
  fireEvent.click(submitButton);
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
  expect(window.location.pathname).not.toBe("/admin");
});

test("error message is displayed when email is invalid", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText("Enter your email");
  const passwordInput = screen.getByPlaceholderText("Enter your username");
  // const submitButton = screen.getByRole("button", { name: /submit/i });
  fireEvent.change(emailInput, { target: { value: "invalid email" } });
  fireEvent.change(passwordInput, { target: { value: "invalid password" } });
}); 
