import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { AuthProvider } from '../../contexts';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LoginCard from '.';

describe('LoginCard component', () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <LoginCard cardHeight={"600px"} toggleSwitch={true} focusStyle={{}} setToggleSwitch={false}/>
                </BrowserRouter>
            </AuthProvider>

        );
    });

    it('Renders a register form.', () => {
        const form = screen.getByTestId("login-form");
        expect(form).toBeInTheDocument();
    });

    it('Renders a register button.', () => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('Renders two inputs.', () => {
        const inputs = screen.getAllByTestId('input');
        expect(inputs.length).toEqual(2);
    });

    afterEach(() => {
        cleanup();
    });
});
