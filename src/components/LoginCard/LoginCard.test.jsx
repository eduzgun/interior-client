import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/index";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { useState } from "react";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import LoginCard from ".";

describe("LoginCard component", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <LoginCard
            cardHeight={"600px"}
            toggleSwitch={false}
            focusStyle={{}}
            setToggleSwitch={false}
          />
        </BrowserRouter>
      </AuthProvider>
    );
  });

  it("Renders a register form.", () => {
    const form = screen.getByTestId("login-form");
    expect(form).toBeInTheDocument();
  });

  it("Renders a register button.", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("Renders two inputs.", () => {
    const inputUsername = screen.getByTestId("user-input");
    const inputPassword = screen.getByTestId("password-input");
    const inputs = [];
    inputs.push(inputPassword, inputUsername);
    expect(inputs.length).toEqual(2);
  });

  it("handleUserInput sets the username correctly", () => {
    const usernameInput = screen.getByTestId("user-input");
    const inputText = "NewUsername";
    fireEvent.change(usernameInput, { target: { value: inputText } });
    expect(usernameInput.value).toBe(inputText);
  });

  it("handlePassInput sets the password correctly", () => {
    const passwordInput = screen.getByTestId("password-input");
    const inputText = "NewPassword";
    fireEvent.change(passwordInput, { target: { value: inputText } });
    expect(passwordInput.value).toBe(inputText);
  });

  it("Sends login request on form submission", async () => {
    const form = screen.getByTestId("login-form");
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      status: 204,
    });

    const usernameInput = screen.getByTestId("user-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.submit(form);

    
    await Promise.resolve();

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:5000/auth/login", expect.anything());


    fetchMock.mockRestore();
  });

  afterEach(() => {
    cleanup();
  });
});
