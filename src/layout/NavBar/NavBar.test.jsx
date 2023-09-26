import React, { Children } from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

import NavBar from '.';

describe('NavBar Component', () => { 
    beforeEach(() => {
        render(<MemoryRouter>
            <NavBar />
        </MemoryRouter>)
    })

    afterEach(() => {
        cleanup()
    })

    it("Displays NavBar with 2 children", () => {
        const nav = screen.getByRole("navigation")

        expect(nav).toBeInTheDocument()
        expect(nav.childNodes.length).toBe(2)
    })
    it("Nav has 3 links .",() => {
        const nav = screen.getAllByRole("link")
        expect(nav.length).toBe(3)
    })
    it("Names of links are Home, Rooms, Login", () => {
        const nav = screen.getAllByRole("link")
        var truthy = true;
        nav.forEach(a => {
            if(!(["Home","Rooms","Login"].includes(a.innerHTML))){
                truthy = false
            }
        })
        expect(truthy).toBe(true)
    })
 })