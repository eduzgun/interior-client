import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import QuestionHelp from '.';


describe('QuestionHelp Component', () => {
    beforeEach(() => {
      const dropDownContent = <div data-testid="dropDownContent">Drop-down Content</div>;
      render(
              <BrowserRouter>
                  <QuestionHelp active title="Test Title" content="Test Content"  drop_down={dropDownContent}/>
              </BrowserRouter>
      );
  });

    it('renders without crashing', () => {
      expect(screen.getByTestId('questions')).toBeTruthy();
    });

    it('toggles dropdown visibility', () => {
      const qMark = screen.getByTestId('qmark');
      const qBox = screen.getByTestId('qBox');

      expect(getComputedStyle(qBox).getPropertyValue('display')).to.equal('block');

      fireEvent.click(qMark);

      expect(getComputedStyle(qBox).getPropertyValue('display')).to.equal('block');

      fireEvent.click(qMark);

      expect(getComputedStyle(qBox).getPropertyValue('display')).to.equal('none');
    });

    it('displays title and content', () => {
      const title = screen.getByText('Test Title');
      const content = screen.getByText('Test Content');

      expect(title).toBeTruthy();
      expect(content).toBeTruthy();
    });

    it('renders drop-down content if provided', () => {
      const dropDownContentElement = screen.getByTestId('dropDownContent');

      expect(dropDownContentElement).toBeTruthy();
    });

    afterEach(() => {
      cleanup();
  });
});