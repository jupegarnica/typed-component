import React from 'react';

export const isType = type => val =>
  ![undefined, null].includes(val) && val.constructor === type;

export const isNormalFunction = f =>
  typeof f === 'function' && (!f.name || f.name[0] === f.name[0].toLowerCase());

export function isConstructor(f) {
  // detect is a normal function (anonymous or its name starts with lowercase)
  if (isNormalFunction(f)) return false;

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

const checkRegExp = (regExp, value) => regExp.test(value);

export const isValidType = (type, value, props, propName) => {
  if (isType(RegExp)(type)) {
    return checkRegExp(type, value);
  } else if (isPrimitive(type)) {
    return value === type;
  } else if (isNormalFunction(type)) {
    return type(value, props, propName);
  } else if (isConstructor(type)) {
    return isType(type)(value);
  } else if (isType(Array)(type)) {
    return type.some(_type => isValidType(_type, value));
  } else if (isType(Object)(type) && isType(Object)(value)) {
    return checkShape(type, value);
  }
  return false;
};

const warnInvalidPropType = (message, type, value) =>
  console.error(message, type, value);

const typedComponent = (types = {}, defaults = {}) => Component => props => {

  for (const prop in types) {
    if (types.hasOwnProperty(prop)) {
      const value = props[prop];
      const type = types[prop];
      if (typeof value === 'undefined') {
        continue;
      }

      try {
        isValidType(type, value, props, prop) ||
          warnInvalidPropType(`prop value ${value} do not match type ${type}`);
      } catch (error) {
        warnInvalidPropType(error);
      }
    }
  }
  const _props = { ...defaults, ...props };

  return <Component {..._props} />;
};

export default typedComponent;
