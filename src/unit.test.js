import { isType, isPrimitive, isConstructor } from './index';

describe('test type by constructor', () => {
  test('should return true for basic JS types', () => {
    expect(isType(Object)({ a: 1 })).toBe(true);
    expect(isType(Object)(new Object({ b: 2 }))).toBe(true);

    expect(isType(Boolean)(true)).toBe(true);
    expect(isType(Boolean)(false)).toBe(true);

    expect(isType(String)('xs')).toBe(true);
    expect(isType(String)('')).toBe(true);
    expect(isType(String)('')).toBe(true);
    expect(isType(String)(``)).toBe(true);

    expect(isType(Number)(1)).toBe(true);
    expect(isType(Number)(NaN)).toBe(true);
    expect(isType(Number)(Infinity)).toBe(true);
    expect(isType(Number)(0.34)).toBe(true);
    expect(isType(Number)(3.1e12)).toBe(true);

    expect(isType(Array)([1, 2])).toBe(true);
    expect(isType(Array)(new Array(1, 2))).toBe(true);

    expect(isType(Map)(new Map())).toBe(true);
    expect(isType(WeakMap)(new WeakMap())).toBe(true);
    expect(isType(Set)(new Set())).toBe(true);
    expect(isType(WeakSet)(new WeakSet())).toBe(true);

    // not yet supported in jsdom
    // expect(isType(BigInt)(new BigInt(2))).toBe(true);
    // expect(isType(BigInt)(2n)).toBe(true);
  });

  test('should return false is it not a type', () => {

    expect(isType(Object)('{ a: 1 }')).toBe(false);

    expect(isType(Boolean)('true')).toBe(false);

    expect(isType(String)(1)).toBe(false);
    expect(isType(String)([])).toBe(false);
    expect(isType(String)({})).toBe(false);
    expect(isType(String)()).toBe(false);

    expect(isType(Number)('1')).toBe(false);
  });

  test('should recognize instance of classes', () => {

    class Car {};
    expect(isType(Car)(new Car())).toBe(true);


    class Porsche extends Car {}

    expect(isType(Car)(new Porsche())).toBe(false);


    expect(isType(Object)(new Array())).toBe(false);

  })

});



describe('isPrimitive', () => {


  test(' should recognize primitive types', () => {
      expect(isPrimitive('hola')).toBe(true);
      expect(isPrimitive(1)).toBe(true);
      expect(isPrimitive(false)).toBe(true);
      expect(isPrimitive(NaN)).toBe(true);

      expect(isPrimitive(undefined)).toBe(true);
      expect(isPrimitive(null)).toBe(true);

      expect(isPrimitive({})).toBe(false);
      expect(isPrimitive([])).toBe(false);
  })

});


describe('isConstructor',()=> {
  test('should detect if a value can be instantiated with new', () => {

    expect(isConstructor(Object)).toBe(true);
    expect(isConstructor(Array)).toBe(true);
    expect(isConstructor(console)).toBe(false);
    expect(isConstructor(12)).toBe(false);

  })

});