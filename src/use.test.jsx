import React from 'react';
import ReactDom from 'react-dom';
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
  Null: null,
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
    log: console.log,
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
        Null={null}
      />,
    );
    expect(global.console.error).not.toHaveBeenCalled();
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
        Null
      />,
    );
    expect(global.console.error).toHaveBeenCalledTimes(10);
  });
  test('should detect all types props are required', () => {
    render(<ValidTypes Undefined />);
    expect(global.console.error).toHaveBeenCalledTimes(10);
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
  test('should warn shapes', () => {
    render(<Shape shape={{ a: 1 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn shapes', () => {
    render(<Shape shape={{ b: 2, c: 'c' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('Shapes multiple required keys', () => {
  const Shape = typedComponent({
    shape: {
      a: String,
      b: Number,
    },
  })(RenderProps);
  test('should work', () => {
    render(<Shape shape={{ a: 'a', b: 2 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(<Shape shape={{ a: 'a' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('Shapes recursively', () => {
  const Shape = typedComponent({
    shape: {
      person: {
        name: String,
        age: Number,
      },
      id: String,
    },
  })(RenderProps);
  test('should work', () => {
    render(
      <Shape
        shape={{
          person: {
            name: 'juan',
            age: 2,
          },
          id: 'asdasd',
        }}
      />,
    );
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(
      <Shape
        shape={{
          person: {
            name: 'juan',
            age: '2',
          },
          id: 'asdasd',
        }}
      />,
    );
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('Should check a function', () => {
  const Comp = typedComponent({
    a: value => value > 1,
  })(RenderProps);
  test('should work', () => {
    render(<Comp a={2} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(<Comp a={0} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  const Comp2 = typedComponent({
    start: (value, allProps, key) => value < allProps.end,
  })(RenderProps);

  test('multiple props works', () => {
    render(<Comp2 start={1} end={4} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('multiple props warn', () => {
    render(<Comp2 start={1} end={0} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('regex', () => {
  const Regex = typedComponent({
    '/a/': Number,
    [/c/]: Function,
    '/d/': ['hola', 'adios'],
  })(RenderProps);
  test('should work', () => {
    render(<Regex a={2} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should work', () => {
    render(<Regex a={2} c={() => {}} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should work', () => {
    render(<Regex a={2} c={() => {}} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should work', () => {
    render(<Regex d='hola' />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should work', () => {
    render(<Regex d='adios' />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(<Regex d='nada' />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn', () => {
    render(<Regex a='a' b='b' />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn', () => {
    render(<Regex a='a' c='b' />);
    expect(global.console.error).toHaveBeenCalledTimes(2);
  });
});

describe('Handle Events', () => {
  const HandleEvents = typedComponent({
    [/^on/]: Function,
  })(RenderProps);
  test('should work', () => {
    render(
      <HandleEvents onClick={() => {}} onHover={() => {}} />,
    );
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(<HandleEvents onClick={() => {}} onHover={1} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn', () => {
    render(<HandleEvents onClick={1} onHover={1} />);
    expect(global.console.error).toHaveBeenCalledTimes(2);
  });
});

describe('onOnly valid props', () => {
  const HandleEvents = typedComponent({
    onClick: Function,
    [/.+/]: () => false,
  })(RenderProps);

  test('should warn', () => {
    render(<HandleEvents onClick={() => {}} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(<HandleEvents onClick={() => {}} id='id' />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('regex advanced', () => {
  const Regex = typedComponent({
    a: String, // this is mandatory over a regex match
    '/a|b/': Number,
  })(RenderProps);
  test('should work', () => {
    render(<Regex a='a' />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });

  test('should work', () => {
    render(<Regex a='a' b={2} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(<Regex />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn', () => {
    render(<Regex b='b' />);
    expect(global.console.error).toHaveBeenCalledTimes(2);
  });
  test('should warn', () => {
    render(<Regex a={2} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn', () => {
    render(<Regex a='a' b='b' />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn', () => {
    render(<Regex a={2} b='b' />);
    expect(global.console.error).toHaveBeenCalledTimes(2);
  });
});

describe('regex check in shapes', () => {
  const Regex = typedComponent({
    shape: {
      '/.+/': Number,
      '/regex/': /regex/,
    },
  })(RenderProps);
  test('should work', () => {
    render(<Regex shape={{ a: 2 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(<Regex shape={{ a: 2, regex: 'regex' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn', () => {
    render(<Regex shape={{ a: '12', regex: '2' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn', () => {
    render(<Regex shape={{}} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(<Regex shape={{ a: [] }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });

  test('should work', () => {
    render(<Regex shape={{ regex: 'regex' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn', () => {
    render(<Regex shape={{ regex: 2 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should work recursively', () => {
    render(<Regex shape={{ regex: 'regex' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('regex check in shapes mixed', () => {
  const Regex = typedComponent({
    shape: {
      a: Number,
      '/ex/': 'regex',
    },
  })(RenderProps);
  test('should work ', () => {
    render(<Regex shape={{ a: 1, regex: 'regex' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn ', () => {
    render(<Regex shape={{ a: '1' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn ', () => {
    render(<Regex shape={{ a: 1, regex: 1 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('regex check in shapes recursively', () => {
  const Regex = typedComponent({
    shape: {
      [/.+/]: {
        a: Number,
      },
    },
  })(RenderProps);
  test('should work ', () => {
    render(<Regex shape={{ any: { a: 2 } }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn ', () => {
    render(<Regex shape={{ whatever: { a: 'a' } }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should warn even if complex', () => {
    render(<Regex shape={{ whatever: { a: 'a' } }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('regex check in shapes recursively even if complex', () => {
  const Regex = typedComponent({
    shape: {
      [/^price/]: v => v > 0,
      [/^zip/]: String,
    },
  })(RenderProps);
  test('should work ', () => {
    render(<Regex shape={{ priceTotal: 1 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn ', () => {
    render(<Regex shape={{ zipCode: 'hw30' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn even if complex', () => {
    render(<Regex shape={{ zip: 123 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('Common cases', () => {
  describe('arrayOfStrings', () => {
    const Comp = typedComponent({
      arrayOfStrings: {
        '/[0-9]+/': String,
      },
    })(RenderProps);
    test('should work ', () => {
      render(<Comp arrayOfStrings={['a', 'b']} />);
      expect(global.console.error).toHaveBeenCalledTimes(0);
    });
    test('should warn ', () => {
      render(<Comp arrayOfStrings={['a', 1]} />);
      expect(global.console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('Object of Number', () => {
    const Comp = typedComponent({
      obj: {
        '/.+/': Number,
      },
    })(RenderProps);
    test('should work ', () => {
      render(<Comp obj={{a:1,b:2}} />);
      expect(global.console.error).toHaveBeenCalledTimes(0);
    });
    test('should warn ', () => {
      render(<Comp obj={{ a: 1, b: '2' }} />);
      expect(global.console.error).toHaveBeenCalledTimes(1);
    });
  });
});
