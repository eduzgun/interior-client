import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LightSwitch from '.';

describe('LightSwitch component', () => {
  let originalAudio;

  beforeEach(() => {
    originalAudio = window.Audio;
    window.Audio = class {
      play() {}
    };

    render(
      <BrowserRouter>
        <LightSwitch changeState={true} toggleSwitch={true}/>
      </BrowserRouter>
    );
  });

  it('Container <div> exists.', () => {
    const container = screen.getByTestId("container");
    expect(container).toBeTruthy()
  });

  it('plays audio on click', () => {
    const playSpy = jest.spyOn(window.Audio.prototype, 'play');

    // Render the component
    const { container } = render(
      <LightSwitch changeState={() => {}} toggleSwitch={false} />
    );

    // Simulate a click event
    container.querySelector('.switch').click();

    // Assert that play was called
    expect(playSpy).toHaveBeenCalled();

    // Restore the original Audio constructor
    window.Audio = originalAudio;
  });

  it('toggles switch styles on click', () => {
    const changeStateMock = jest.fn();
    render(<LightSwitch changeState={changeStateMock} toggleSwitch={false} />);
    
    const switchElement = screen.getByRole('button');
    fireEvent.click(switchElement);

    const mainBit = screen.getByTestId('mainbit');
    const shadedBit = screen.getByTestId('shadedbit');

    expect(mainBit).toHaveStyle('background: linear-gradient(0deg, rgb(35,36,37) 0%, rgb(160, 160, 160) 91%)');
    expect(shadedBit).toHaveStyle('background: linear-gradient(0deg, rgb(170, 170, 170) 0%, rgb(120,121,122) 81%)');
  });

  afterEach(() => {
    cleanup();
  });
});