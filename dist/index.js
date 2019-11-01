"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.isConstructor=isConstructor;exports.default=exports.isValidType=exports.checkShape=exports.isPrimitive=exports.isNormalFunction=exports.isInstanceOf=exports.isType=void 0;var _react=_interopRequireDefault(require("react"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach(function(key){_defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var isType=function isType(type){return function(val){return![undefined,null].includes(val)&&val.constructor===type}};exports.isType=isType;var isInstanceOf=function isInstanceOf(type){return function(val){return val instanceof type}};exports.isInstanceOf=isInstanceOf;var isNormalFunction=function isNormalFunction(f){return typeof f==="function"&&(!f.name||f.name[0]===f.name[0].toLowerCase())};exports.isNormalFunction=isNormalFunction;function isConstructor(f){if(isNormalFunction(f))return false;try{new f}catch(err){return false}return true}var isPrimitive=function isPrimitive(value){return!(value instanceof Object)};exports.isPrimitive=isPrimitive;var iterateObject=function iterateObject(whatToDo,types,props){var propsTypes=Object.keys(types).filter(notIsRegExp);var regExpToCheck=Object.keys(types).filter(isRegExp);var untestedReceivedProps=Object.keys(props).filter(function(propName){return!propsTypes.includes(propName)});if(whatToDo.name==="isValidType"){console.log("untestedReceivedProps",untestedReceivedProps);console.log("propsTypes",propsTypes);console.log("regExpToCheck",regExpToCheck)}var response;propsTypes.forEach(function(propName){response=whatToDo(types[propName],props[propName],props,propName)});regExpToCheck.forEach(function(regexpString){untestedReceivedProps.forEach(function(propName){if(stringToRegExp(regexpString).test(propName)){response=whatToDo(types[regexpString],props[propName],props,propName)}})});return response};var checkShape=function checkShape(types,props){return iterateObject(isValidType,types,props)};exports.checkShape=checkShape;var isValidType=function isValidType(type,value,props,propName){if(isType(RegExp)(type)){return checkRegExp(type,value)}else if(isPrimitive(type)){return value===type}else if(isNormalFunction(type)){return type(value,props,propName)}else if(isConstructor(type)){return isType(type)(value)}else if(isType(Array)(type)){return type.some(function(_type){return isValidType(_type,value)})}else if(isType(Object)(type)&&isType(Object)(value)){return checkShape(type,value)}return false};exports.isValidType=isValidType;var toString=JSON.stringify;var testOrWarn=function testOrWarn(type,value,props,propName){try{isValidType(type,value,props,propName)||error("prop ".concat(propName," with value ").concat(toString(value)," do not match type ").concat(toString(type)))}catch(error){error(error)}};var error=function error(){var _console,_console2;(_console=console).error.apply(_console,arguments);(_console2=console).log.apply(_console2,arguments)};var checkRegExp=function checkRegExp(regExp,value){return regExp.test(value)};var stringToRegExp=function stringToRegExp(string){return new RegExp(eval(string))};var isRegExp=function isRegExp(value){return value&&/^\/.+\/$/.test(value)};var notIsRegExp=function notIsRegExp(value){return!isRegExp(value)};var typedComponent=function typedComponent(){var types=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var defaults=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return function(Component){return function(props){iterateObject(testOrWarn,types,props);var _props=_objectSpread({},defaults,{},props);return _react.default.createElement(Component,_props)}}};var _default=typedComponent;exports.default=_default;
//# sourceMappingURL=index.js.map