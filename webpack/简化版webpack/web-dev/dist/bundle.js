(() => {
  var __webpack_modules__ = {
    
      "./src/index.js": (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          `let str = __webpack_require__("./src/a.js");

__webpack_require__("./src/index.less");

console.log(str);`
        )
      },
    
      "./src/a.js": (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          `let b = __webpack_require__("./src/base/b.js");

module.exports = 'a' + b;`
        )
      },
    
      "./src/base/b.js": (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          `module.exports = 'b';`
        )
      },
    
      "./src/index.less": (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          `let style = document.createElement('style');
style.innerHTML = ".a {  font-size: 18px;  color: yellow;}.text {  color: red;}";
console.log('样式不生效');
document.head.appendChild(style);`
        )
      },
    
  }

  var __webpack_module_cache__ = {}

  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }

  (() => {
    eval(
      'let str = __webpack_require__(/*! ./a.js */ "./src/index.js")\nconsole.log(str)\n\n//# sourceURL=webpack://web-dev/"./src/index.js"?'
    )
  })()

})()
