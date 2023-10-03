// import React from 'react';
// import { screen, render, cleanup } from '@testing-library/react';
// import { AuthProvider } from '../../contexts';

// import { MemoryRouter } from 'react-router-dom';
// import * as matchers from '@testing-library/jest-dom/matchers';

// expect.extend(matchers);

// import GenerateRoom from '.';

// describe('NavBar Component', () => { 
//     beforeEach(() => {
//         render(
//             <AuthProvider>
//                 <MemoryRouter>
//                     <GenerateRoom />
//                 </MemoryRouter>
//             </AuthProvider>
//         )       
//     })

//     afterEach(() => {
//         cleanup()
//     })

//     it("Has wrapper element.", () => {
//         const wrapper = screen.getByTestId("wrapper")
//         expect(wrapper).toBeTruthy()
//     })
//     it("Wrapper has 1 child.", () => {
//         const wrapper = screen.getByTestId("wrapper")
//         expect(wrapper.childNodes.length).toBe(1)
//     })
//     it("Child node has 6 children.",() => {
//         const container = screen.getByTestId("generator-container")
//         console.log(container.childNodes.length)
//         expect(container.childNodes.length).toBe(6)
//     })
//  })


import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { expect } from 'chai';
import GenerateRoom from '.';
import { describe, it, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import { useAuth, AuthProvider } from '../../__mocks__/useAuth';

jest.mock('../../__mocks__/canvas.js', () => {
    const mockCanvas = () => {
      const getContext = jest.fn(() => ({ 
        drawImage: jest.fn(), 
        getImageData: jest.fn(() => ({ width: 800, height: 600 })),
        putImageData: jest.fn(),
        toBlob: jest.fn()
      }));
      return { current: { getContext } };
    };
    return mockCanvas;
  });

jest.mock('../../__mocks__/useAuth', () => ({
    ...jest.requireActual('../../__mocks__/useAuth'),
    useAuth: jest.fn()
  }));

describe('GenerateRoom Component', () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <GenerateRoom />
                </BrowserRouter>
           </AuthProvider>
        );
    });

    it('renders without crashing', () => {
        useAuth.mockReturnValue({
            user: {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            },
        });
    
        expect(screen.getByTestId('wrapper')).to.exist;
        });

    it('uploads a file', () => {       
        const file = new File(['(⌐□_□)'], 'sample.jpg', { type: 'image/jpeg' });
        const fileInput = screen.getByPlaceholderText('>');

        fireEvent.change(fileInput, { target: { files: [file] } });

    });

    it('fills out form fields', () => {
        const filenameInput = screen.getByPlaceholderText('> file');
        const dimensionsInput = screen.getByPlaceholderText('> 12m x 12m');
        const descriptionInput = screen.getByPlaceholderText('> Fun description');
        const themeInput = screen.getByPlaceholderText('> Modern, minimalist');

        fireEvent.change(filenameInput, { target: { value: 'Test Filename' } });
        fireEvent.change(dimensionsInput, { target: { value: '10m x 10m' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
        fireEvent.change(themeInput, { target: { value: 'Test Theme' } });

    });

    it('handles form submission correctly', () => {
        const file = new File(['(⌐□_□)'], 'sample.jpg', { type: 'image/jpeg' });
        const fileInput = screen.getByPlaceholderText('>');
        fireEvent.change(fileInput, { target: { files: [file] } });

        const filenameInput = screen.getByPlaceholderText('> file');
        fireEvent.change(filenameInput, { target: { value: 'Test Filename' } });

        const dimensionsInput = screen.getByPlaceholderText('> 12m x 12m');
        fireEvent.change(dimensionsInput, { target: { value: '10m x 10m' } });

        const descriptionInput = screen.getByPlaceholderText('> Fun description');
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

        const themeInput = screen.getByPlaceholderText('> Modern, minimalist');
        fireEvent.change(themeInput, { target: { value: 'Test Theme' } });

        const categoryDropdown = screen.getByLabelText('Category');
        fireEvent.change(categoryDropdown, { target: { value: 'Bedroom' } });

        const form = screen.getByTestId('form');
        fireEvent.submit(form);

    });

    it('handles file input and updates state', () => {    
        const file = new File(['(⌐□_□)'], 'dummy.png', { type: 'image/png' });
        const fileInput = screen.getByPlaceholderText('>');
    
        fireEvent.change(fileInput, { target: { files: [file] } });
    
        expect(fileInput.files[0]).toBe(file);
      });
    
      it('handles filename input and updates state', () => {    
        const filenameInput = screen.getByPlaceholderText('> file');
        fireEvent.change(filenameInput, { target: { value: 'my_file' } });
    
        expect(filenameInput.value).toBe('my_file');
      });



    it('displays "File Created!" message after successful submission', () => {
        const file = new File(['(⌐□_□)'], 'sample.jpg', { type: 'image/jpeg' });
        const fileInput = screen.getByPlaceholderText('>');
        fireEvent.change(fileInput, { target: { files: [file] } });

        const filenameInput = screen.getByPlaceholderText('> file');
        fireEvent.change(filenameInput, { target: { value: 'Test Filename' } });

        const dimensionsInput = screen.getByPlaceholderText('> 12m x 12m');
        fireEvent.change(dimensionsInput, { target: { value: '10m x 10m' } });

        const descriptionInput = screen.getByPlaceholderText('> Fun description');
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

        const themeInput = screen.getByPlaceholderText('> Modern, minimalist');
        fireEvent.change(themeInput, { target: { value: 'Test Theme' } });

        const categoryDropdown = screen.getByLabelText('Category');
        fireEvent.change(categoryDropdown, { target: { value: 'Bedroom' } });

        const form = screen.getByTestId('form');
        fireEvent.submit(form);

        const successMessage = screen.getByText('File Created!');
        expect(successMessage).to.exist;
    });



    it('displays "Return Home" button after successful submission', () => {
        const file = new File(['(⌐□_□)'], 'sample.jpg', { type: 'image/jpeg' });
        const fileInput = screen.getByPlaceholderText('>');
        fireEvent.change(fileInput, { target: { files: [file] } });

        const filenameInput = screen.getByPlaceholderText('> file');
        fireEvent.change(filenameInput, { target: { value: 'Test Filename' } });

        const dimensionsInput = screen.getByPlaceholderText('> 12m x 12m');
        fireEvent.change(dimensionsInput, { target: { value: '10m x 10m' } });

        const descriptionInput = screen.getByPlaceholderText('> Fun description');
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

        const themeInput = screen.getByPlaceholderText('> Modern, minimalist');
        fireEvent.change(themeInput, { target: { value: 'Test Theme' } });

        const categoryDropdown = screen.getByLabelText('Category');
        fireEvent.change(categoryDropdown, { target: { value: 'Bedroom' } });

        const form = screen.getByTestId('form');
        fireEvent.submit(form);

        const homeButton = screen.getByText('Return Home');
        expect(homeButton).to.exist;
    });

    afterEach(() => {
        cleanup();
    });
});
