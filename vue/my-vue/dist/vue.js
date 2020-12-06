(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vuex')) :
  typeof define === 'function' && define.amd ? define(['vuex'], factory) :
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function isObject(data) {
    if (_typeof(data) === 'object' && data !== null) {
      return true;
    } else {
      return false;
    }
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      // 不可被枚举
      enumerable: false,
      // 不可以被在修改
      configurable: false,
      // 值
      value: value
    });
  }

  var oldArrayMethods = Array.prototype;
  var arrayMethods = Object.create(oldArrayMethods); // 查找原型的方法  先从 __proto__ 上查找
  // 找不到的话  再去 prototype上查找
  // 
  // 原型链看一下

  var methods = ['unshift', 'shift', 'pop', 'push', 'splice', 'sort', 'reverse'];
  methods.forEach(function (method, index) {
    arrayMethods[method] = function () {
      console.log('用户改变了数组');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args);
      var ob = this.__ob__;
      console.log(ob, 'ob方法');
      var inserted; // 插入的元素是对象还需要在劫持
      // 获取到插入的数据

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
      }

      if (inserted) {
        console.log(inserted, 'inserted');
        ob.observerArray(inserted);
      }

      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 如果数据的层次过多 需要递归的去解析对象中的属性  依次增加 get和set
      // vue3 使用了proxy 就不需要依次的递归了 支持监听整个对象 也不需要set和get
      // 给每一个监控过的对象都加一个 __ob__ 属性 指向当前的Observer实例
      // value.__ob__ = this
      def(value, '__ob__', this); // Object.defineProperty(value, '__ob__', {
      //   // 不可被枚举
      //   enumerable: false,
      //   // 不可以被在修改
      //   configurable: false,
      //   // 值
      //   value: this
      // })

      if (Array.isArray(value)) {
        // 改变数组的原型上的方法 7个变异的方法  其他没有重写，还是直接走数组原先的方法
        // 不会被拦截
        value.__proto__ = arrayMethods; // setArray()

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
        // 判断数组是否还有对象  也是需要进行劫持的
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
  } // function setArray() {
  //   let methods = [
  //     'unshift',
  //     'shift',
  //     'pop',
  //     'push',
  //     'splice',
  //     'sort',
  //     'reverse'
  //   ]
  //   let oldPrototype = Array.prototype
  //   methods.forEach((method) => {
  //     Array.prototype[method] = function(value) {
  //       console.log(oldPrototype)
  //       // 这个会导致死循环
  //       // let r = oldPrototype[method].call(this, value)
  //       // return r
  //     }
  //   })
  // }
  // for(let i = 0; i < methods.length; i++) {
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
      initData(vm); // console.log("111111xxxxx")

      var keys = Object.keys(vm._data); // 这边也是需要进行递归处理的
      // 做一个代理  让用户可以直接通过 实例.xx 获取属性

      keys.forEach(function (key, index) {
        // 也就是做一个引用而已  还是指向vm._data里面的数据
        proxy(vm, '_data', key);
      });
    }

    if (opts.data) ;

    if (opts.data) ;
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  function initData(vm) {
    // console.log('初始化数据')
    var data = vm.$options.data; // data里面的this指向还是实例

    data = vm._data = typeof data == 'function' ? data.call(vm) : data; // 初始化数据后，处理数据 让用户可以直接修改data里面的数据
    // 将数据挂载到 vm._data 上面
    // console.log(vm._data, 'vm._data')
    // 对象劫持 用户改变了数据 我希望可以得到通知刷新页面

    observer(data); // 响应式原理
  }

  // ast语法树  是用对象来描述原生语法的  虚拟dom 用对象来描述dom节点
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // abc-aaa

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // <aaa:abc> 

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 > 自闭和标签

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配vue的模版语法 {{}}
  // 正则
  // 匹配标签、匹配属性

  var root;
  var currentParent;
  var stack = [];
  var ELEMENT_TYPE = 1;
  var TEXT_TYPE = 3;

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: ELEMENT_TYPE,
      children: [],
      attrs: attrs,
      parent: null
    };
  }

  function start(tagName, attrs) {
    var element = createASTElement(tagName, attrs);

    if (!root) {
      root = element;
    }

    currentParent = element;
    stack.push(element);
  }

  function end(tagName) {
    var element = stack.pop();
    currentParent = stack[stack.length - 1];

    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }

  function chars(text) {
    text = text.replace(/\s/g, '');

    if (text) {
      currentParent.children.push({
        type: TEXT_TYPE,
        text: text
      });
    }
  }

  function parseHTML(html) {
    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      var text = void 0;

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var attr, _end;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push({
            name: attr[1],
            value: attr[3]
          });
        }

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      }
    }
  }

  function compileToFunction(template) {
    parseHTML(template); //   console.log(root)
    // 需要将ast语法树生成最终的render函数  就是字符串拼接（模版引擎）

    var code = generate(root); //   console.log(code)

    var render = "with(this){return ".concat(code, "}");
    var renderFn = new Function(render); //   console.log(renderFn)

    return renderFn;
  }

  function gen(node) {
    if (node.type == 1) {
      return generate(node);
    } else {
      var text = node.text;

      if (!defaultTagRE.test(text)) {
        return "_v(".concat(JSON.stringify(text), ")");
      }

      var lastIndex = defaultTagRE.lastIndex = 0;
      var tokens = [];
      var match, index;

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return "_v(".concat(tokens.join('+'), ")");
    }
  }

  function getChildren(el) {
    // 生成儿子节点
    var children = el.children;

    if (children) {
      return "".concat(children.map(function (c) {
        return gen(c);
      }).join(','));
    } else {
      return false;
    }
  }

  function genProps(attrs) {
    // 生成属性
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function generate(el) {
    var children = getChildren(el);
    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? "".concat(genProps(el.attrs)) : 'undefined').concat(children ? ",".concat(children) : '', ")");
    return code;
  }

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, callback, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm; // this.exprOrFn = exprOrFn

      this.callback = callback;
      this.options = options; // 将内部传过来的回调函数 放到getter属性上

      this.getter = exprOrFn;
      this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        this.getter();
      }
    }]);

    return Watcher;
  }();

  function patch(oldVnode, vnode) {
    // 1.判断是更新还是渲染
    var isRealElement = oldVnode.nodeType; // 判断是否是真实的元素

    if (isRealElement) {
      var oldElm = oldVnode; // div id="app"

      var parentEm = oldElm.parentNode; // body

      var el = createElm(vnode); // 插入到老元素的下一个元素

      parentEm.insertBefore(el, oldElm.nextSibling);
      parentEm.removeChild(oldElm);
    } // 2.递归创建真实节点 替换掉老得节点

  }

  function createElm(vnode) {
    // 根据虚拟节点创建真实节点
    // return document.createElement('div')
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text;
    console.log(tag); // 是标签就创建标签 // 如果不是标签 就是文本

    if (typeof tag === 'string') {
      vnode.el = document.createElement(tag); // 往标签上添加属性

      updateProperties(vnode);
      children.forEach(function (child) {
        // 递归创建儿子节点, 将儿子节点放入父节点
        return vnode.el.appendChild(createElm(child));
      });
    } else {
      // 虚拟dom上映射的真实dom  方便后续的更新操作
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProperties(vnode) {
    var newProps = vnode.data;
    var keys = Object.keys(newProps);
    keys.forEach(function (key, index) {
      vnode.el.setAttribute(key, newProps[key]);
    });
  }

  function mountComponent(vm, el) {
    var options = vm.$options; // 真是的el挂载到$el

    vm.$el = el; // console.log(vm)
    // 渲染页面
    // 更新组件 

    var updateComponent = function updateComponent() {
      // 无论是渲染还是更新都会调用此方法
      // 返回的是虚拟的dom
      // 虚拟的dom生成真实的dom
      // vm._render() 获取到的是虚拟的节点
      vm._update(vm._render());
    }; // 渲染watcher 每个组件都有一个watcher
    // 默认渲染wathcer是没有回调的


    new Watcher(vm, updateComponent, function () {}, true); // 这是一个渲染watcher
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      console.log(vnode, 'vnode');
      vm.$el = patch(vm.$el, vnode);
    };
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // 数据的劫持 当前的实例就是this
      var vm = this; // this.$options 指代的就是用户传递的属性

      vm.$options = options;
      initSet(Vue); // 初始化状态

      initState(vm); // 用户传入了人el属性  那么就需要渲染数据

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // 默认会先查找render，没有render，会采用template， temeplate也没有会使用el中的内容

      if (!options.render) {
        // 对模版进行编译
        var template = options.template;

        if (!template && el) {
          // el.outerHTML包含了el所有的元素
          template = el.outerHTML;
        } // console.log(template)
        // 把template变成虚拟节点


        var render = compileToFunction(template);
        options.render = render;
      } // 需要将当前的组件 挂载这个组件


      mountComponent(vm, el);
    };
  }

  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var key = data.key;

    if (key) {
      delete data.key;
    } // 元素的虚拟节点


    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vnode(tag, data, key, children, undefined);
  }
  function createTextNode(text) {
    console.log(text, 'text'); // 文本的虚拟节点

    return vnode(undefined, undefined, undefined, undefined, text);
  } // // 虚拟节点  就是通过 _c _v 实现用对象来描述dom的操作

  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      key: key,
      data: data,
      children: children,
      text: text
    };
  }

  function renderMixin(Vue) {
    // _c 创建元素的虚拟节点
    // _v 创建文本的虚拟节点
    // _s JSON.stringify
    Vue.prototype._c = function () {
      return createElement.apply(void 0, arguments); // 标签名 属性 children
    };

    Vue.prototype._v = function (text) {
      return createTextNode(text);
    };

    Vue.prototype._s = function (val) {
      // 变量的值 可能是一个对象  普通字符串直接返回
      // 是一个对象展示的话 需要JSON.stringify一下 不然页面无法展示
      return val === '' ? '' : _typeof(val) === 'object' ? JSON.stringify(val) : val;
    };

    Vue.prototype._render = function () {
      // console.log('render')
      var vm = this;
      var render = vm.$options.render;
      console.log(render);
      var vnode = render.call(vm); // 绑定当前的this

      return vnode;
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


  initMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue); // initRender(Vue)
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
