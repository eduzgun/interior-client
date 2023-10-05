import React from 'react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

import Home from '.';

describe('Homepage', () => {
    beforeEach(() => {
        render(<Home />)
    })

    afterEach(() => {
        cleanup()
    })

    // it('should display a heading with appropriate text', () => {
    //     const element = screen.getByRole('heading', {name: /Welcome/i})
    //     expect(element).toBeInTheDocument()
    // })

    // it("renders a paragraph", () => {
    //     const paragraph = screen.getByRole("paragraph")
    //     expect(paragraph).toBeInTheDocument()
    // })
})
