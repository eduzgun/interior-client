import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LightSwitch from '.';

describe('LightSwitch component', () => {
 
    beforeEach(() => {
        render(
            <BrowserRouter>
                <LightSwitch changeState={() => {}} toggleSwitch={true}/>
            </BrowserRouter>
        );
    });

    it('Container <div> exists.', () => {
        const container = screen.getByTestId("container");
        expect(container).toBeTruthy()
    });



    afterEach(() => {
        cleanup();
    });
});
