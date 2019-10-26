import React from 'react';
import ReactDom from 'react-dom';

import {
  ValidProps,
  InvalidProps,
  EnumType,
} from './typedComponent.stories';

const div = document.createElement('div');
const render = comp => ReactDom.render(comp, div);

describe('basic usage', () => {
  global.console = {
    error: jest.fn(),
    // TODO: REMOVE THIS, it shouldn't log valid prop
    log: jest.fn(),
  };

  test('should render checking valid props', () => {
    render(<ValidProps />);
    expect(global.console.error).not.toHaveBeenCalled();

    // expect(global.console.log).toHaveBeenCalled();
  });
  test('should log error on invalid props', () => {
    ReactDom.render(<InvalidProps />, div);
    expect(global.console.error).toHaveBeenCalled();
  });
  test('should understand enum type', () => {
    ReactDom.render(<EnumType />, div);
    // expect(global.console.log).toHaveBeenCalled();
    expect(global.console.error).not.toHaveBeenCalled();
  });
});
