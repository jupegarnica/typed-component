import React from 'react';

export const isType = type => val =>
  ![undefined, null].includes(val) && val.constructor === type;

export const isInstanceOf = type => val => val instanceof type;

export const isNormalFunction = f =>
  typeof f === 'function' &&
  (!f.name || f.name[0] === f.name[0].toLowerCase());

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

export const isPrimitive = value => !(value instanceof Object);
// export const isPrimitive = value => Object(value) !== value;

const iterateObject = (whatToDo, types, props) => {
  const propsTypes = Object.keys(types).filter(notIsRegExp);
  const regExpToCheck = Object.keys(types).filter(isRegExp);

  const untestedReceivedProps = Object.keys(props).filter(
    propName => !propsTypes.includes(propName),
  );
  if (whatToDo.name === 'isValidType') {
    console.log('untestedReceivedProps', untestedReceivedProps);
    console.log('propsTypes', propsTypes);
    console.log('regExpToCheck', regExpToCheck);
  }
  let response;

  propsTypes.forEach(propName => {
    response = whatToDo(
      types[propName],
      props[propName],
      props,
      propName,
    );

  });
  regExpToCheck.forEach(regexpString => {
    untestedReceivedProps.forEach(propName => {
      if (stringToRegExp(regexpString).test(propName)) {
        response = whatToDo(
          types[regexpString],
          props[propName],
          props,
          propName,
        );
      }
    });
  });
  return response;
};

export const checkShape = (types, props) =>
  iterateObject(isValidType, types, props);

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

const toString = JSON.stringify;

const testOrWarn = (type, value, props, propName) => {
  try {
    isValidType(type, value, props, propName) ||
      error(
        `prop ${propName} with value ${toString(
          value,
        )} do not match type ${toString(type)}`,
      );
  } catch (error) {
    error(error);
  }
};

const error = (...args) => {
  console.error(...args);
  console.log(...args);
};

const checkRegExp = (regExp, value) => regExp.test(value);
const stringToRegExp = string => new RegExp(eval(string));
const isRegExp = value => value && /^\/.+\/$/.test(value);
const notIsRegExp = value => !isRegExp(value);

const typedComponent = (
  types = {},
  defaults = {},
) => Component => props => {
  iterateObject(testOrWarn, types, props);

  const _props = {
    ...defaults,
    ...props,
  };

  return <Component {..._props} />;
};

export default typedComponent;
