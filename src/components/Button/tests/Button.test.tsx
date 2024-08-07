import {fireEvent, render, screen} from '@testing-library/react';
import MyButton from '../implementation/Button';
import React from 'react';
import '@testing-library/jest-dom';

test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

test('Test for Button Rendering Correctly', () => {
    render(<MyButton/>);
})

test('Test for checking if there is text in the button when there should be', () => {
    render(<MyButton>Wowie Zowie</MyButton>);
    expect(screen.queryByText(/Wowie Zowie/i)).toBeVisible();
})

test('Test making a function and clicking the button', () => {

    const mockOnClick = jest.fn()
    render(<MyButton onClick = {mockOnClick}>Wowie Zowie</MyButton>);

    fireEvent.click(screen.getByText(/Wowie Zowie/i));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
})