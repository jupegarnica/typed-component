import React from 'react';
import ReactDom from 'react-dom';
import { InvalidProps } from './typedComponent.stories';
import typedComponent from './index';

const RenderProps = props => (
  <pre>{JSON.stringify(props, null, 4)}</pre>
);

const ValidTypes = typedComponent({
  String: String,
  Boolean: Boolean,
  Array: Array,
  Object: Object,
  String: String,
  Number: Number,
  Function: Function,
  RegExp: RegExp,
  Map: Map,
  Undefined: undefined,
})(RenderProps);

const Primitives = typedComponent({
  color: 'blue',
})(RenderProps);

const div = document.createElement('div');
const render = c => ReactDom.render(c, div);
beforeAll(() => {
  global.console = {
    error: jest.fn(),
    //  error: console.error,
    // TODO: REMOVE THIS, it shouldn't log valid prop
    log: jest.fn(),
    // log: console.log,
  };
});
describe('basic usage by Constructor', () => {
  test('should render and test valid props', () => {
    render(
      <ValidTypes
        String='1'
        String={'text'}
        Number={5}
        Boolean
        Boolean={false}
        Array={[2, 3]}
        Object={{ c: 4 }}
        Function={() => {}}
        RegExp={/hola/}
        Map={new Map()}
        Undefined={undefined}
      />,
    );
    expect(global.console.error).not.toHaveBeenCalled();

    // expect(global.console.log).toHaveBeenCalled();
  });
  test('should render and log error on invalid props', () => {
    render(
      <ValidTypes
        String
        Number
        Boolean={0}
        Array
        Object
        Function
        RegExp
        Map
        Undefined
      />,
    );
    expect(global.console.error).toHaveBeenCalledTimes(9);
  });
  test('should detect all types props are required', () => {
    render(<ValidTypes Undefined />);
    expect(global.console.error).toHaveBeenCalledTimes(9);
  });
});

describe('Primitives', () => {
  test('should work primitives', () => {
    render(<Primitives color='blue' />);
    expect(global.console.error).not.toHaveBeenCalled();
  });
  test('should warn primitives', () => {
    render(<Primitives color='red' />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('Shapes', () => {
  const Shape = typedComponent({
    shape: {
      a: String,
    },
  })(RenderProps);
  test('should work shapes', () => {
    render(<Shape shape={{ a: 'a' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should work shapes', () => {
    render(<Shape shape={{ a: 1 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});
