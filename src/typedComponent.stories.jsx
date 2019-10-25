import React from 'react';
import typedComponent from './index';

const _RenderProps = props => <pre>{JSON.stringify(props, null, 4)}</pre>;

const ValidTypes = typedComponent({
  a: String,
  b: Array,
  c: Object,
  d: String,
  e: Number,
  f: Function,
  h: Map,
})(_RenderProps);

export const ValidProps = () => {
  return (
    <div>
      <ValidTypes
        a='1'
        b={[2, 3]}
        c={{ c: 4 }}
        d={'text'}
        e={5}
        f={() => {}}
        h={new Map()}
      />
    </div>
  );
};

export const InvalidProps = () => {
  return (
    <div>
      <ValidTypes a={2} b={'[2, 3]'} />
    </div>
  );
};

class Car {}
const Enums = typedComponent({
  a: [String, Number],
  b: [Object, [Function, Car]],
})(_RenderProps);

export const EnumType = () => {
  return (
    <div>
      <Enums a='2' />
      <Enums a={2} />
      <Enums b={{ d: 3 }} />
      <Enums b={new Car()} />
    </div>
  );
};

const Shape = typedComponent({
  a: {
    b: String,
    c: [Number, String],
  },
})(_RenderProps);

export const ShapeType = () => {
  return (
    <div>
      <Shape a={{ b: 'b', c: 3 }} />
      <Shape a={{ b: 'b', c: '3' }} />
      <Shape a={{ b: 2, c: '3' }} /> {/* invalid */}
    </div>
  );
};

const Primitive = typedComponent({
  b: 'hola',
  c: [2, 3],
})(_RenderProps);

export const PrimitiveType = () => {
  return (
    <div>
      <Primitive b='hola' />
      <Primitive c={2} />
      <Primitive c={3} />
      <Primitive c={4} /> {/* invalid */}
    </div>
  );
};



const Defaults = typedComponent(undefined,{
  b: 'hola',
  c: [2, 3],
})(_RenderProps);

export const DefaultsType = () => {
  return (
    <div>
      <Defaults />
      <Defaults c='3' />
      <Defaults b='b' c='3' />
    </div>
  );
};

export default {
  title: 'typedComponent',
};
