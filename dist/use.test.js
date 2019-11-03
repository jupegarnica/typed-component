"use strict";var _react=_interopRequireDefault(require("react"));var _reactDom=_interopRequireDefault(require("react-dom"));var _index=_interopRequireDefault(require("./index"));var _typedComponent;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var RenderProps=function RenderProps(props){return _react.default.createElement("pre",null,JSON.stringify(props,null,4))};var ValidTypes=(0,_index.default)((_typedComponent={String:String,Boolean:Boolean,Array:Array,Object:Object},_defineProperty(_typedComponent,"String",String),_defineProperty(_typedComponent,"Number",Number),_defineProperty(_typedComponent,"Function",Function),_defineProperty(_typedComponent,"RegExp",RegExp),_defineProperty(_typedComponent,"Map",Map),_defineProperty(_typedComponent,"Undefined",undefined),_defineProperty(_typedComponent,"Null",null),_typedComponent))(RenderProps);var Primitives=(0,_index.default)({color:"blue"})(RenderProps);var div=document.createElement("div");var render=function render(c){return _reactDom.default.render(c,div)};beforeAll(function(){global.console={error:jest.fn(),log:jest.fn()}});describe("basic usage by Constructor",function(){test("should render and test valid props",function(){var _React$createElement;render(_react.default.createElement(ValidTypes,(_React$createElement={String:"1"},_defineProperty(_React$createElement,"String","text"),_defineProperty(_React$createElement,"Number",5),_defineProperty(_React$createElement,"Boolean",true),_defineProperty(_React$createElement,"Boolean",false),_defineProperty(_React$createElement,"Array",[2,3]),_defineProperty(_React$createElement,"Object",{c:4}),_defineProperty(_React$createElement,"Function",function Function(){}),_defineProperty(_React$createElement,"RegExp",/hola/),_defineProperty(_React$createElement,"Map",new Map),_defineProperty(_React$createElement,"Undefined",undefined),_defineProperty(_React$createElement,"Null",null),_React$createElement)));expect(global.console.error).not.toHaveBeenCalled()});test("should render and log error on invalid props",function(){render(_react.default.createElement(ValidTypes,{String:true,Number:true,Boolean:0,Array:true,Object:true,Function:true,RegExp:true,Map:true,Undefined:true,Null:true}));expect(global.console.error).toHaveBeenCalledTimes(10)});test("should detect all types props are required",function(){render(_react.default.createElement(ValidTypes,{Undefined:true}));expect(global.console.error).toHaveBeenCalledTimes(10)})});describe("Primitives",function(){test("should work primitives",function(){render(_react.default.createElement(Primitives,{color:"blue"}));expect(global.console.error).not.toHaveBeenCalled()});test("should warn primitives",function(){render(_react.default.createElement(Primitives,{color:"red"}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("Shapes",function(){var Shape=(0,_index.default)({shape:{a:String}})(RenderProps);test("should work shapes",function(){render(_react.default.createElement(Shape,{shape:{a:"a"}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn shapes",function(){render(_react.default.createElement(Shape,{shape:{a:1}}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn shapes",function(){render(_react.default.createElement(Shape,{shape:{b:2,c:"c"}}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("Shapes multiple required keys",function(){var Shape=(0,_index.default)({shape:{a:String,b:Number}})(RenderProps);test("should work",function(){render(_react.default.createElement(Shape,{shape:{a:"a",b:2}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(Shape,{shape:{a:"a"}}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("Shapes recursively",function(){var Shape=(0,_index.default)({shape:{person:{name:String,age:Number},id:String}})(RenderProps);test("should work",function(){render(_react.default.createElement(Shape,{shape:{person:{name:"juan",age:2},id:"asdasd"}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(Shape,{shape:{person:{name:"juan",age:"2"},id:"asdasd"}}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("Should check a function",function(){var Comp=(0,_index.default)({a:function a(value){return value>1}})(RenderProps);test("should work",function(){render(_react.default.createElement(Comp,{a:2}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(Comp,{a:0}));expect(global.console.error).toHaveBeenCalledTimes(1)});var Comp2=(0,_index.default)({start:function start(value,allProps,key){return value<allProps.end}})(RenderProps);test("multiple props works",function(){render(_react.default.createElement(Comp2,{start:1,end:4}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("multiple props warn",function(){render(_react.default.createElement(Comp2,{start:1,end:0}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("Should check string by regex",function(){var Comp=(0,_index.default)({a:/^a/i})(RenderProps);test("should work",function(){render(_react.default.createElement(Comp,{a:"a"}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should work",function(){render(_react.default.createElement(Comp,{a:"A"}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(Comp,{a:"ba"}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("match key by regex",function(){var _typedComponent2;var Regex=(0,_index.default)((_typedComponent2={"/a/":Number},_defineProperty(_typedComponent2,/c/,Function),_defineProperty(_typedComponent2,"/d/",["hola","adios"]),_typedComponent2))(RenderProps);test("should work",function(){render(_react.default.createElement(Regex,{a:2}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should work",function(){render(_react.default.createElement(Regex,{a:2,c:function c(){}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should work",function(){render(_react.default.createElement(Regex,{a:2,c:function c(){}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should work",function(){render(_react.default.createElement(Regex,{d:"hola"}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should work",function(){render(_react.default.createElement(Regex,{d:"adios"}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(Regex,{d:"nada"}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn",function(){render(_react.default.createElement(Regex,{a:"a",b:"b"}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn",function(){render(_react.default.createElement(Regex,{a:"a",c:"b"}));expect(global.console.error).toHaveBeenCalledTimes(2)})});describe("Handle Events",function(){var HandleEvents=(0,_index.default)(_defineProperty({},/^on/,Function))(RenderProps);test("should work",function(){render(_react.default.createElement(HandleEvents,{onClick:function onClick(){},onHover:function onHover(){}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(HandleEvents,{onClick:function onClick(){},onHover:1}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn",function(){render(_react.default.createElement(HandleEvents,{onClick:1,onHover:1}));expect(global.console.error).toHaveBeenCalledTimes(2)})});describe("onOnly valid props",function(){var HandleEvents=(0,_index.default)(_defineProperty({onClick:Function},/.+/,function __(){return false}))(RenderProps);test("should warn",function(){render(_react.default.createElement(HandleEvents,{onClick:function onClick(){}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(HandleEvents,{onClick:function onClick(){},id:"id"}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("regex advanced",function(){var Regex=(0,_index.default)({a:String,"/a|b/":Number})(RenderProps);test("should work",function(){render(_react.default.createElement(Regex,{a:"a"}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should work",function(){render(_react.default.createElement(Regex,{a:"a",b:2}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(Regex,null));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn",function(){render(_react.default.createElement(Regex,{b:"b"}));expect(global.console.error).toHaveBeenCalledTimes(2)});test("should warn",function(){render(_react.default.createElement(Regex,{a:2}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn",function(){render(_react.default.createElement(Regex,{a:"a",b:"b"}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn",function(){render(_react.default.createElement(Regex,{a:2,b:"b"}));expect(global.console.error).toHaveBeenCalledTimes(2)})});describe("regex check in shapes",function(){var Regex=(0,_index.default)({shape:{"/.+/":Number,"/regex/":/regex/}})(RenderProps);test("should work",function(){render(_react.default.createElement(Regex,{shape:{a:2}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(Regex,{shape:{a:2,regex:"regex"}}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn",function(){render(_react.default.createElement(Regex,{shape:{a:"12",regex:"2"}}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn",function(){render(_react.default.createElement(Regex,{shape:{}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn",function(){render(_react.default.createElement(Regex,{shape:{a:[]}}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should work",function(){render(_react.default.createElement(Regex,{shape:{regex:"regex"}}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn",function(){render(_react.default.createElement(Regex,{shape:{regex:2}}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should work recursively",function(){render(_react.default.createElement(Regex,{shape:{regex:"regex"}}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("regex check in shapes mixed",function(){var Regex=(0,_index.default)({shape:{a:Number,"/ex/":"regex"}})(RenderProps);test("should work ",function(){render(_react.default.createElement(Regex,{shape:{a:1,regex:"regex"}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn ",function(){render(_react.default.createElement(Regex,{shape:{a:"1"}}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn ",function(){render(_react.default.createElement(Regex,{shape:{a:1,regex:1}}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("regex check in shapes recursively",function(){var Regex=(0,_index.default)({shape:_defineProperty({},/.+/,{a:Number})})(RenderProps);test("should work ",function(){render(_react.default.createElement(Regex,{shape:{any:{a:2}}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn ",function(){render(_react.default.createElement(Regex,{shape:{whatever:{a:"a"}}}));expect(global.console.error).toHaveBeenCalledTimes(1)});test("should warn even if complex",function(){render(_react.default.createElement(Regex,{shape:{whatever:{a:"a"}}}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("regex check in shapes recursively even if complex",function(){var _shape2;var Regex=(0,_index.default)({shape:(_shape2={},_defineProperty(_shape2,/^price/,function _Price_(v){return v>0}),_defineProperty(_shape2,/^zip/,String),_shape2)})(RenderProps);test("should work ",function(){render(_react.default.createElement(Regex,{shape:{priceTotal:1}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn ",function(){render(_react.default.createElement(Regex,{shape:{zipCode:"hw30"}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn even if complex",function(){render(_react.default.createElement(Regex,{shape:{zip:123}}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("Common cases",function(){describe("arrayOf",function(){var Comp=(0,_index.default)({arrayOfStrings:{"/[0-9]+/":String}})(RenderProps);test("should work ",function(){render(_react.default.createElement(Comp,{arrayOfStrings:["a","b"]}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn ",function(){render(_react.default.createElement(Comp,{arrayOfStrings:["a",1]}));expect(global.console.error).toHaveBeenCalledTimes(1)})});describe("ObjectOf",function(){var Comp=(0,_index.default)({obj:{"/.+/":Number}})(RenderProps);test("should work ",function(){render(_react.default.createElement(Comp,{obj:{a:1,b:2}}));expect(global.console.error).toHaveBeenCalledTimes(0)});test("should warn ",function(){render(_react.default.createElement(Comp,{obj:{a:1,b:"2"}}));expect(global.console.error).toHaveBeenCalledTimes(1)})})});
//# sourceMappingURL=use.test.js.map