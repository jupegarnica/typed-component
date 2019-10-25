import React from 'react';

export const isType = type => val =>
  ![undefined, null].includes(val) && val.constructor === type;

export function isConstructor(f) {
  try {
    new f();
  } catch (err) {
    return false;
  }
  return true;
}

export const isPrimitive = value => Object(value) !== value;

export const checkShape = (shape, value) =>
  Object.keys(shape).every(key => isValidType(shape[key], value[key]));

export const isValidType = (type, value) => {
  if (isPrimitive(type)) {
    return value === type;
  } else if (isConstructor(type)) {
    return isType(type)(value);
  } else if (isType(Array)(type)) {
    return type.some(_type => isValidType(_type, value));
  } else if (isType(Object)(type) && isType(Object)(value)) {
    return checkShape(type, value);
  }
  return false;
};

const typedComponent = (types = {}, defaults = {}) => Component => props => {
  for (const prop in types) {
    if (types.hasOwnProperty(prop)) {
      const value = props[prop];
      const type = types[prop];
      if (typeof value === 'undefined') {
        continue;
      }

      if (isValidType(type, value)) {
        console.log('valid type!', type, value);
      } else {
        console.error('invalid type!', type, value);
      }
    }
  }
  const _props = { ...defaults, ...props };

  return <Component {..._props} />;
};


export default typedComponent;