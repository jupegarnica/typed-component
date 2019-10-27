"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.RegExpTest=exports.DefaultsType=exports.PrimitiveType=exports.ShapeType=exports.EnumType=exports.InvalidProps=exports.ValidProps=void 0;var _react=_interopRequireDefault(require("react"));var _index=_interopRequireDefault(require("./index"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var _RenderProps=function _RenderProps(props){return _react.default.createElement("pre",null,JSON.stringify(props,null,4))};var ValidTypes=(0,_index.default)({a:String,b:Array,c:Object,d:String,e:Number,f:Function,h:Map})(_RenderProps);var ValidProps=function ValidProps(){return _react.default.createElement("div",null,_react.default.createElement(ValidTypes,{a:"1",b:[2,3],c:{c:4},d:"text",e:5,f:function f(){},h:new Map}))};exports.ValidProps=ValidProps;var InvalidProps=function InvalidProps(){return _react.default.createElement("div",null,_react.default.createElement(ValidTypes,{a:2,b:"[2, 3]"}))};exports.InvalidProps=InvalidProps;var Car=function Car(){_classCallCheck(this,Car)};var Enums=(0,_index.default)({a:[String,Number],b:[Object,[Function,Car]]})(_RenderProps);var EnumType=function EnumType(){return _react.default.createElement("div",null,_react.default.createElement(Enums,{a:"2"}),_react.default.createElement(Enums,{a:2}),_react.default.createElement(Enums,{b:{d:3}}),_react.default.createElement(Enums,{b:new Car}))};exports.EnumType=EnumType;var Shape=(0,_index.default)({a:{b:String,c:[Number,String]}})(_RenderProps);var ShapeType=function ShapeType(){return _react.default.createElement("div",null,_react.default.createElement(Shape,{a:{b:"b",c:3}}),_react.default.createElement(Shape,{a:{b:"b",c:"3"}}),_react.default.createElement(Shape,{a:{b:2,c:"3"}})," ")};exports.ShapeType=ShapeType;var Primitive=(0,_index.default)({b:"hola",c:[2,3]})(_RenderProps);var PrimitiveType=function PrimitiveType(){return _react.default.createElement("div",null,_react.default.createElement(Primitive,{b:"hola"}),_react.default.createElement(Primitive,{c:2}),_react.default.createElement(Primitive,{c:3}),_react.default.createElement(Primitive,{c:4})," ")};exports.PrimitiveType=PrimitiveType;var Defaults=(0,_index.default)(undefined,{b:"hola",c:[2,3]})(_RenderProps);var DefaultsType=function DefaultsType(){return _react.default.createElement("div",null,_react.default.createElement(Defaults,null),_react.default.createElement(Defaults,{c:"3"}),_react.default.createElement(Defaults,{b:"b",c:"3"}))};exports.DefaultsType=DefaultsType;var RegExp=(0,_index.default)({"/[bc]/":["3","b"]})(_RenderProps);var RegExpTest=function RegExpTest(){return _react.default.createElement("div",null,_react.default.createElement(RegExp,null),_react.default.createElement(RegExp,{c:"3"}),_react.default.createElement(RegExp,{b:"b",c:"3"}),_react.default.createElement(RegExp,{b:"a",c:"3"}),_react.default.createElement(RegExp,{b:"a",c:"2"}))};exports.RegExpTest=RegExpTest;var _default={title:"typedComponent"};exports.default=_default;
//# sourceMappingURL=typedComponent.stories.js.map