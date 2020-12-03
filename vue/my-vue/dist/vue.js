(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function isObject(data) {
    if (_typeof(data) === 'object' && data !== null) {
      return true;
    } else {
      return false;
    }
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 如果数据的层次过多 需要递归的去解析对象中的属性  依次增加 get和set
      // vue3 使用了proxy 就不需要依次的递归了 支持监听整个对象 也不需要set和get
      if (Array.isArray(value)) {
        // value.__proto__ = arrayMethods
        setArray();
        this.observerArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observerArray",
      value: function observerArray(value) {
        value.forEach(function (item, index) {
          observer(item);
        });
      }
    }]);

    return Observer;
  }();

  function observer(data) {
    // 数据的劫持
    // console.log("数据的劫持")
    // 判断是否是对象
    var isObj = isObject(data); // console.log(isObj)

    if (!isObj) {
      return;
    } // 观测这个对象


    return new Observer(data);
  } // 定义响应式数据
  // data对象里面的key 定义为响应式数据

  function defineReactive(data, key, value) {
    // console.log(key, value)
    observer(value);
    Object.defineProperty(data, key, {
      // 获取值的时候 做一些操作
      get: function get() {
        return value;
      },
      // 设置值的时候 做一些操作
      set: function set(newValue) {
        console.log("重新设置了数据了");
        if (newValue === value) return; // 设置的值是对象  还需要再次进行数据的劫持

        observer(newValue);
        value = newValue;
      }
    });
  }

  function initSet(Vue, vm) {
    Vue.prototype.$set = function (target, key, value) {
      // 响应式处理
      defineReactive(target, key, value); // vm._data = target
    };
  }

  function setArray() {
    var methods = ['unshift', 'shift', 'pop', 'push', 'splice', 'sort', 'reverse'];
    var oldPrototype = Array.prototype;
    methods.forEach(function (method) {
      Array.prototype[method] = function (value) {
        console.log(oldPrototype); // 这个会导致死循环
        // let r = oldPrototype[method].call(this, value)
        // return r
      };
    });
  } // for(let i = 0; i < methods.length; i++) {
  //   Array.prototype[methods[i]] = function(value) {
  //     console.log(value)
  //     // oldPrototype
  //     // oldPrototype[methods[i]].call(this, value)
  //     observer(value)
  //   }
  // }

  // 初始化状态
  function initState(vm) {
    var opts = vm.$options; // console.log(opts)
    // vue的数据来源 属性 方法 数据 计算属性 watch
    // 初始化 先属性 在方法

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
      console.log("111111xxxxx");
      var keys = Object.keys(vm._data); // 这边也是需要进行递归处理的
      // 做一个代理  让用户可以直接通过 实例.xx 获取属性

      keys.forEach(function (key, index) {
        // 也就是做一个引用而已  还是指向vm._data里面的数据
        Object.defineProperty(vm, key, {
          get: function get() {
            return vm._data[key];
          },
          set: function set(newValue) {
            vm._data[key] = newValue;
          }
        });
      });
    }

    if (opts.data) ;

    if (opts.data) ;
  }

  function initData(vm) {
    console.log('初始化数据');
    var data = vm.$options.data; // data里面的this指向还是实例

    data = vm._data = typeof data == 'function' ? data.call(vm) : data; // 初始化数据后，处理数据 让用户可以直接修改data里面的数据
    // 将数据挂载到 vm._data 上面
    // console.log(vm._data, 'vm._data')
    // 对象劫持 用户改变了数据 我希望可以得到通知刷新页面

    observer(data); // 响应式原理
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // 数据的劫持 当前的实例就是this
      var vm = this; // this.$options 指代的就是用户传递的属性

      vm.$options = options;
      initSet(Vue); // 初始化状态

      initState(vm);
    };
  }

  // Vue的核心代码 这个文件相当于整合的功能

  function Vue(options) {
    // 进行vue的初始化
    this._init(options);
  } // let vue = require('vue')
  // console.log(vue)
  // 通过引入文件的方式，给vue原型上添加方法
  // 执行一下 把大 Vue传递进去


  initMixin(Vue); // initRender(Vue)
  //   console.log('react')
  //   this.a = 'sgjm'
  //   this._init()
  // }
  // // 原型上的方法 可以获取当前的实例
  // React.prototype._init = function() {
  //   console.log(this)
  // }
  // new React()

  return Vue;

})));
//# sourceMappingURL=vue.js.map
