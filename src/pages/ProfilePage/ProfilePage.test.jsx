import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import ProfilePage from "./index"

describe("Profile Page", () => {
    beforeEach(() => {
        render(<ProfilePage />)
    })

    afterEach(() => {
        cleanup();
    });

    it("renders a 'Profile' heading in the main content", () => {
        const heading = screen.getByRole("heading1")
        expect(heading).toBeInTheDocument()
    })

    it("renders a 'Profile' heading in the side content", () => {
        const heading = screen.getByRole("heading2")
        expect(heading).toBeInTheDocument()
    })

    it("renders a 'Likes' heading in the side content", () => {
        const heading = screen.getByRole("heading3")
        expect(heading).toBeInTheDocument()
    })

    it("renders a 'Likes' heading in the main content", () => {
        const heading = screen.getByRole("heading4")
        expect(heading).toBeInTheDocument()
    })

    it("renders exactly 2 links", () => {
        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(2);
    });

    it("renders 2 other headings, Name and Username", () => {
        const heading = screen.getAllByRole("heading");
        expect(heading).toHaveLength(2);
    });

    it("renders exactly 2 inputs", () => {
        const input = screen.getAllByRole("textbox");
        expect(input).toHaveLength(2);
    });

    it("renders an icon", () => {
        const icon = screen.getByRole("profile-icon")
        expect(icon).toBeInTheDocument()
    })
})