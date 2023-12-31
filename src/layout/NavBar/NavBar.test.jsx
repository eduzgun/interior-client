import React, { Children } from 'react';
import { AuthProvider } from '../../contexts/index';
import { describe, it, expect, beforeEach, afterEach,vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 

import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

import NavBar from '.';

describe('NavBar Component', () => { 
    
    beforeEach(() => {

        axios.get = vi.fn(() =>
      Promise.resolve({
        data: {
          image_url: 'https://example.com/logo.png', 
        },
      })
    );

        render(
        <AuthProvider>
        <MemoryRouter>
            <NavBar />
        </MemoryRouter> </AuthProvider>)
       
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
            if(!(["Home","Explore","Login"].includes(a.innerHTML))){
                truthy = false
            }
        })
        expect(truthy).toBe(true)
    })

    it('setImageUrl is called and updates imageUrl correctly', async () => {
       
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(axios.get).toHaveBeenCalledWith(
          'https://lap-4-project.onrender.com//filestorage/static-files/logo.png'
        );
    
        const logoImage = screen.getByAltText('API Image');
        expect(logoImage).toHaveAttribute(
          'src',
          'https://example.com/logo.png' // Mocked image URL
        );
    });


  

 })
