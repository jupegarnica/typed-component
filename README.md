# typed-component

Another syntax to type props



## Get started

```bash
npm install typed-component

# or

yarn add typed-component

```

### Use


```jsx
import typed from 'typed-component';
import Component from './component';

// check constructor
const MyTypedComponent = typed({
     onClick: Function
})(Component)


```

```jsx
// check enums
const MyTypedComponent = typed({
     id: [undefined, String]   // optional prop
})(Component)

```


```jsx
// check primitives
const MyTypedComponent = typed({
     genre: ['male', 'female']
})(Component)

```



```jsx
// check with custom logic
const MyTypedComponent = typed({
     age: age => age > 18
})(Component)
```


```jsx
// check string with regex
const MyTypedComponent = typed({
     email:  /^((https?):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
})(Component)
```


## All it can do

```jsx
import React from 'react';
import ReactDom from 'react-dom';
import typedComponent from 'typed-component';

const RenderProps = props => (
  <pre>{JSON.stringify(props, null, 4)}</pre>
);

const CheckConstructors =
                typedComponent({
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
                })
                (RenderProps);
/*
...
*/

describe('basic use by Constructor', () => {
  test('should render and test valid props', () => {
    render(
      <CheckConstructors
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
      <CheckConstructors
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
    render(<CheckConstructors Undefined />);
    expect(global.console.error).toHaveBeenCalledTimes(10);
  });
});

describe('Primitives', () => {

    const Primitives = typedComponent({
         color: 'blue',
    })
    (RenderProps);

  test('should work primitives', () => {
    render(<Primitives color='blue' />);
    expect(global.console.error)
      .not.toHaveBeenCalled();
  });
  test('should warn primitives', () => {
    render(<Primitives color='red' />);
    expect(global.console.error)
      .toHaveBeenCalledTimes(1);
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
    render(<Shape shape={{ b: 2, c:'c' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});

describe('regex', () => {
  const Regex = typedComponent({
    '/a/': Number,
    '/c/': Function,
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
    render(<Regex shape={{ a: [] }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
  test('should work', () => {
    render(<Regex shape={{ regex: 'regex' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn', () => {
    render(<Regex shape={{ regex: 2 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
   test('should work recursively', () => {
     render(<Regex shape={{ regex: 'regex' }} />);
     expect(global.console.error).toHaveBeenCalledTimes(0);
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
     render(<Regex shape={{ a: 1, regex:1}} />);
     expect(global.console.error).toHaveBeenCalledTimes(1);
   });
  // test('should work ', () => {
  //   render(<Regex shape={{ ex: 'regex' }} />);
  //   expect(global.console.error).toHaveBeenCalledTimes(1);
  // });

});

describe('regex check in shapes recursively', () => {
  const Regex = typedComponent({
    shape: {
      [/.+/]: {
        a: Number
      },
    },
  })(RenderProps);
  test('should work ', () => {
    render(<Regex shape={{ any: {a: 2} }} />);
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
      [/^price/]: Number,
      [/^zip/]: String,
    },
  })(RenderProps);
  test('should work ', () => {
    render(<Regex shape={{ priceTotal: 1 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn ', () => {
    render(<Regex shape={{ zipCode:'hw30' }} />);
    expect(global.console.error).toHaveBeenCalledTimes(0);
  });
  test('should warn even if complex', () => {
    render(<Regex shape={{ zip: 123 }} />);
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});



```

## Roadmap
- [x] check type by constructor
- [x] enum type (oneOf & oneOfType)
- [x] shape type
- [x] default props
- [x] optional prop ([undefined, String])
- [x] custom prop validation with a function (value,props, propName, ComponentName)
- [x] Check RegEx
- [ ] Match prop name by RegEx
- [ ] arrayOf & objectOf
- [ ] instanceof
- [ ] global and local settings to change how to warn invalid prop (throw error , log error or custom log)
- [ ] support to handle static propTypes and static defaultProps