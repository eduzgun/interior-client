import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import ReactThreeTestRenderer from "@react-three/test-renderer";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../contexts/index";
// import reactThreeTestRenderer from '@react-three/test-renderer/dist/react-three-test-renderer.cjs';

import Chimney from ".";

describe("Chimney", () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Chimney />{" "}
        </BrowserRouter>
      </AuthProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("expect to have a chimney", async () => {
    const renderer = await ReactThreeTestRenderer.create(<Chimney />);
    expect(renderer).toBeInTheDocument();
  });
});
