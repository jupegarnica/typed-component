import React from 'react';

export const isType = type => val =>
  ![undefined, null].includes(val) && val.constructor === type;

export const isInstanceOf = type => val =>
  val instanceof type



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

export const checkShape = (shape, value) =>
  Object.keys(shape).every(key =>
    isValidType(shape[key], value[key]),
  );

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

const testOrWarn = (type, value, props, propName) => {
  try {
    isValidType(type, value, props, propName) ||
      warnInvalidPropType(
        `prop ${propName} with value ${value} do not match type ${type}`,
      );
  } catch (error) {
    warnInvalidPropType(error);
  }
};

const warnInvalidPropType = (message, type, value) =>
  console.error(message, type, value);

const stringToRegExp = string => new RegExp(eval(string));

const stringRegExp = /^\/.+\/$/;
const isRegExp = value => stringRegExp.test(value);
const notIsRegExp = value => !isRegExp(value);
const typedComponent = (
  types = {},
  defaults = {},
) => Component => props => {
  const propsToTest = Object.keys(types).filter(notIsRegExp);
  const regExpToCheck = Object.keys(types).filter(isRegExp);
  const untestedReceivedProps = Object.keys(props).filter(
    propName => !propsToTest.includes(propName),
  );

console.log('propsToTest', propsToTest);
console.log('regExpToCheck', regExpToCheck);
console.log('untestedReceivedProps', untestedReceivedProps)

  propsToTest.forEach(propName =>
    testOrWarn(
      types[propName],
      props[propName],
      props,
      propName,
    ),
  );

  const testedProps = propsToTest.filter(
    ([propName]) => !isRegExp(propName),
  );
  // const regExpPropNameArray = allPropNameToCheck
  // const allPropNameToCheck = Object.keys(types);

  // const regExpPropNameArray = allPropNameToCheck.filter(
  //   propName => stringRegExp.test(propName),
  // );

  // const stringPropNameArray = allPropNameToCheck.filter(
  //   propName => !stringRegExp.test(propName),
  // );

  //  CHECK PROP NAME WITH REGEXP
  //
  // const propsToCheckByRegExp = Object.keys(props).filter(
  //   propName => !stringPropNameArray.includes(propName),
  // );

  // for (const regExpPropName of regExpPropNameArray) {
  //   const regExp = stringToRegExp(types[regExpPropName]);
  //   for (const propName of propsToCheckByRegExp) {
  //     if(regExp.test(propName)) {
  //       const value = props[propName];
  //       const type = types[regExpPropName];

  //       try {
  //         isValidType(type, value, props, propName) ||
  //           warnInvalidPropType(
  //             `prop ${propName} with value ${value} do not match type ${type}`,
  //           );
  //       } catch (error) {
  //         warnInvalidPropType(error);
  //       }
  //     }
  //   }
  // }

  // for (const propName of stringPropNameArray) {
  //   const value = props[propName];
  //   const type = types[propName];
  //   if (typeof value === 'undefined') {
  //     continue;
  //   }

  //   try {
  //     isValidType(type, value, props, propName) ||
  //       warnInvalidPropType(
  //         `prop ${propName} with value ${value} do not match type ${type}`,
  //       );
  //   } catch (error) {
  //     warnInvalidPropType(error);
  //   }
  // }

  // for (const prop in types) {
  //   if (types.hasOwnProperty(prop)) {

  //   }
  // }
  const _props = {
    ...defaults,
    ...props,
  };

  return <Component {..._props} />;
};

export default typedComponent;
