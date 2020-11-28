(() => {
  var __webpack_modules__ = {
    "./src/a.js": (module, __unused_webpack_exports, __webpack_require__) => {
      eval(
        "let b = __webpack_require__(/*! ./base/b */ \"./src/base/b.js\")\nmodule.exports = 'a' + b\n\n//# sourceURL=webpack://web-dev/./src/a.js?"
      );
    },

    "./src/base/b.js": (module) => {
      eval(
        "module.exports = 'b'\n\n//# sourceURL=webpack://web-dev/./src/base/b.js?"
      );
    },
  };
  var __webpack_module_cache__ = {};

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
      'let str = __webpack_require__(/*! ./a.js */ "./src/a.js")\nconsole.log(str)\n\n//# sourceURL=webpack://web-dev/./src/index.js?'
    );
  })();
})();
