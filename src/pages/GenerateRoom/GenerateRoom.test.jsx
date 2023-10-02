import React, { Children } from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { AuthProvider } from '../../contexts';

import { MemoryRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

import GenerateRoom from '.';

describe('NavBar Component', () => { 
    beforeEach(() => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <GenerateRoom />
                </MemoryRouter>
            </AuthProvider>
        )       
    })

    afterEach(() => {
        cleanup()
    })

    it("Has wrapper element.", () => {
        const wrapper = screen.getByTestId("wrapper")
        expect(wrapper).toBeTruthy()
    })
    it("Wrapper has 1 child.", () => {
        const wrapper = screen.getByTestId("wrapper")
        expect(wrapper.childNodes.length).toBe(1)
    })
    it("Child node has 6 children.",() => {
        const container = screen.getByTestId("generator-container")
        console.log(container.childNodes.length)
        expect(container.childNodes.length).toBe(6)
    })
 })