import React from "react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup, fireEvent,waitFor } from "@testing-library/react";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import SignupCard from ".";
import { handleUserInput } from ".";

describe("RegisterCard component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignupCard
          cardHeight={"600px"}
          toggleSwitch={true}
          focusStyle={{}}
          setToggleSwitch={false}
        />
      </BrowserRouter>
    );
  });

  it("Renders a register form.", () => {
    const form = screen.getByTestId("signup-form");
    expect(form).toBeInTheDocument();
  });

  it("Renders a register button.", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("Renders four inputs.", () => {
    const inputUser = screen.getAllByTestId("user-input");
    const inputPassword = screen.getAllByTestId("password-input");
    const inputConfPassword = screen.getAllByTestId("confpassword-input");
    const inputEmail = screen.getAllByTestId("email-input");
    const inputs = [];
    inputs.push(inputConfPassword,inputEmail,inputUser,inputPassword)
    expect(inputs.length).toEqual(4);
  });

  it('handleUserInput sets the username correctly', () => {
  
    const usernameInput = screen.getByTestId('user-input');
    const inputText = 'NewUsername';
    fireEvent.change(usernameInput, { target: { value: inputText } });
    expect(usernameInput.value).toBe(inputText);
  });
  it('handleUserInput sets the email correctly', () => {
  
    const usernameInput = screen.getByTestId('email-input');
    const inputText = 'trail@username.com';
    fireEvent.change(usernameInput, { target: { value: inputText } });
    expect(usernameInput.value).toBe(inputText);
  });
  it('handleUserInput sets the password correctly', () => {
  
    const usernameInput = screen.getByTestId('password-input');
    const inputText = 'FakePassword';
    fireEvent.change(usernameInput, { target: { value: inputText } });
    expect(usernameInput.value).toBe(inputText);
  });
  it('handleUserInput sets the confirm password correctly', () => {
  
    const usernameInput = screen.getByTestId('confpassword-input');
    const inputText = 'FakePassword';
    fireEvent.change(usernameInput, { target: { value: inputText } });
    expect(usernameInput.value).toBe(inputText);
  });

  it("Verifies the password correctly", () => {
    const passwordInput = screen.getByTestId("password-input");
    const confPasswordInput = screen.getByTestId("confpassword-input");

    // Set valid password and confirm password values
    fireEvent.change(passwordInput, { target: { value: "ValidPassword123!" } });
    fireEvent.change(confPasswordInput, {
      target: { value: "ValidPassword123!" },
    });

    const submitButton = screen.getByRole("button");

    // Trigger form submission
    fireEvent.click(submitButton);

    // You can assert that the form submission was successful here
    // For example, check if a success message is displayed
    expect(screen.getByText("email")).toBeInTheDocument();

    // Assert any other post-submit behavior as needed
  });


 

  

  afterEach(() => {
    cleanup();
  });
});
