import React from 'react';
import ReactDom from 'react-dom';
import { InvalidProps } from './typedComponent.stories';
import typedComponent from './index';

const RenderProps = props => (
  <pre>{JSON.stringify(props, null, 4)}</pre>
);

const ValidTypes = typedComponent({
  a: String,
  b: Array,
  c: Object,
  d: String,
  e: Number,
  f: Function,
  h: Map,
})(RenderProps);

describe('basic usage', () => {
  const div = document.createElement('div');
  global.console = {
    error: jest.fn(),
    // TODO: REMOVE THIS, it shouldn't log valid prop
    log: jest.fn(),
  };

  test('should render checking valid props', () => {
    ReactDom.render(
      <ValidTypes
        a='1'
        b={[2, 3]}
        c={{ c: 4 }}
        d={'text'}
        e={5}
        f={() => {}}
        h={new Map()}
      />,
      div,
    );
    expect(global.console.error).not.toHaveBeenCalled();

    // expect(global.console.log).toHaveBeenCalled();
  });
  test('should log error on invalid props', () => {
    ReactDom.render(<InvalidProps />, div);
    expect(global.console.error).toHaveBeenCalled();
  });
});
