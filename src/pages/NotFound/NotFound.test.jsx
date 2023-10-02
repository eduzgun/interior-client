import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NotFound from '.';

describe('NotFound Component', () => {
  beforeEach(() => {
    render(<MemoryRouter>
        <NotFound />
    </MemoryRouter>)
  })

  afterEach(() => {
    cleanup()
  })

  it('should display a heading with appropriate text', () => {
    const element = screen.getByRole('heading')
    expect(element).toBeInTheDocument()
  })
  it("NotFound has 1 link",() => {
    const link = screen.getAllByRole("link")
    expect(link.length).toBe(1)
})


})
