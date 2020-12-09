(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vuex'), require('vue/types/umd')) :
  typeof define === 'function' && define.amd ? define(['vuex', 'vue/types/umd'], factory) :
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
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
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mount', 'beforeUpdate', 'update', 'beforeDestory', 'destoryed'];
  var strats = {};

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return [].concat(parentVal, childVal);
      } else {
        return childVal;
      }
    } else {
      return parentVal;
    }
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      // 不可被枚举
      enumerable: false,
      // 不可以被在修改
      configurable: false,
      // 值
      value: value
    });
  } // 合并用户传递进来的mixin options是父的选项  mixin是自己传递的

  function mergeOptions(parent, child) {
    var options = {};

    for (var key in parent) {
      mergeField(key);
    }

    for (var _key in child) {
      // 已经合并过来  就不需要在合并了
      // 父元素已经有这个属性了， 就不需要在合并了
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    } // 默认的合并策略是这样  但是有些属性  需要特殊的合并方式
    // 生命周期的合并


    function mergeField(key) {
      // 生命周期单独的策略去合并
      // watch computed 等各种合并 采用不同的策略
      if (strats[key]) {
        // console.log("1111")
        return options[key] = strats[key](parent[key], child[key]);
      }

      if (_typeof(parent[key]) === 'object' && _typeof(child[key]) == 'object') {
        options[key] = _objectSpread2(_objectSpread2({}, parent[key]), child[key]);
      } else if (child[key] == null) {
        options[key] = parent[key];
      } else {
        options[key] = child[key];
      }
    }

    return options;
  }

  var oldArrayMethods = Array.prototype;
  var arrayMethods = Object.create(oldArrayMethods); // 查找原型的方法  先从 __proto__ 上查找
  // 找不到的话  再去 prototype上查找
  // 
  // 原型链看一下

  var methods = ['unshift', 'shift', 'pop', 'push', 'splice', 'sort', 'reverse'];
  methods.forEach(function (method, index) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // console.log('用户改变了数组')
      var result = oldArrayMethods[method].apply(this, args);
      var ob = this.__ob__; // console.log(ob, 'ob方法')

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
        // console.log(inserted, 'inserted')
        ob.observerArray(inserted);
      }

      ob.dep.notify(); // 如果用户调用了 push，通知当前的dep更新

      return result;
    };
  });

  var id = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id++;
      this.subs = []; // age: [] 对应了很多个watcher

      this.watcherId = new Set();
      this.watchers = [];
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // 观察者模式  数据变了，就进行更新
        // 判断当前的watcher是否重复
        // this.subs.push(Dep.target)
        // console.log(this.subs, this.id, 'this.subs')
        // return
        // for(let i = 0; i < this.subs.length; i++) {
        //   if(this.subs[i].id !== Dep.target.id) {
        //     this.subs.push(Dep.target)
        //   }
        // }
        // if(this.subs.length === 0) {
        //   this.subs.push(Dep.target)
        // }
        // // console.log(this.id, 'this.id')
        // // 相同的wathcer只存放一个
        // console.log(this.subs, 'this.subs')
        // console.log(Dep.target.id, 'Dep.target.id')
        // 上面是我自己解决的方式
        // watcher 记住当前的Dep实例
        console.log("".concat(this.id, "---------------this.id"));
        Dep.target.addDep(this);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          watcher.update();
        });
      } // dep中存放watcher

    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher); // console.log(this.subs, `${this.id}---------------this.id`)
        // let id = watcher.id
        // if(!this.watcherId.has(id)) {
        //   this.watcherId.add(id)
        //   this.watchers.push(watcher)
        // }
      }
    }]);

    return Dep;
  }(); // 一个变量可能有多个watch
  var stack = []; // 第一次调用时 Dep.target 是渲染watcher

  function pushTarget(watcher) {
    Dep.target = watcher; // console.log(watcher.id, '当前的watcher的id')

    stack.push(watcher);
  } // 移除时把渲染watcher去除

  function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1]; // console.log(stack, '当前的stack')
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 创建一个dep属性给数组使用
      this.dep = new Dep(); // 如果数据的层次过多 需要递归的去解析对象中的属性  依次增加 get和set
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
  }(); // 判断数组里面的值是否还是对象，是对象继续继续观察，不是的话就停止观察


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
    // 这个是依赖的实例  依赖的实例  没有
    var dep = new Dep();
    console.log("初始化进行了数据的劫持"); // observer返回的就是一个Observer实例
    // 这里传递进去的value有可能是一个数组，也有可能是一个对象

    var childOb = observer(value);
    Object.defineProperty(data, key, {
      // 获取值的时候 做一些操作
      configurable: true,
      enumerable: true,
      get: function get() {
        console.log("取值"); // 这个是Dep大类的Target 渲染一次就有了

        if (Dep.target) {
          // 如果当前有watcher了
          // 取值的时候 先把wathcer存起来
          dep.depend(); // 我要将watcher存起来
          // 如果当前取值的时候，childOb是一个对象或者数组时

          if (childOb) {
            // 对象的依赖会收集 但是会被抛弃掉
            // childOb.dep.depend() // 数组的依赖收集
            // 当前是数组 需要进行依赖的收集  并且做一次循环递归处理
            // 防止数组里面套数组  依赖收集不全
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }

        return value;
      },
      // 设置值的时候 做一些操作
      set: function set(newValue) {
        console.log("重新设置了数据了");
        if (newValue === value) return; // 设置的值是对象  还需要再次进行数据的劫持

        observer(newValue);
        value = newValue; // 设置值的时候  通知依赖的wathcer来进行更新操作

        dep.notify();
      }
    });
  }

  function initSet(Vue, vm) {
    Vue.prototype.$set = function (target, key, value) {
      // 响应式处理
      defineReactive(target, key, value); // vm._data = target
    };
  }

  function dependArray(value) {
    for (var i = 0; i < value.length; i++) {
      var current = value[i];
      current.__ob__ && current.__ob__.dep.depend();

      if (Array.isArray(current)) {
        // 依赖收集数组的依赖
        dependArray(current);
      }
    }
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
  var stack$1 = [];
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
    stack$1.push(element);
  }

  function end(tagName) {
    var element = stack$1.pop();
    currentParent = stack$1[stack$1.length - 1];

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

    return root;
  }

  function compileToFunction(template) {
    var root = parseHTML(template); //   console.log(root)
    // 需要将ast语法树生成最终的render函数  就是字符串拼接（模版引擎）

    var code = generate(root); //   console.log(code)

    var render = "with(this){return ".concat(code, "}");
    var renderFn = new Function(render); //  console.log(renderFn)

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

  var id$1 = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, callback, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm; // this.exprOrFn = exprOrFn

      this.callback = callback;
      this.options = options;
      this.id = id$1++; // 集合不能重复

      this.depsId = new Set();
      this.deps = []; // 将内部传过来的回调函数 放到getter属性上

      this.getter = exprOrFn;
      this.get(); // 调用get方法  会执行渲染watcher
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        // 这里的watcher就是当前的watcher实例
        pushTarget(this); // 收集watcher  将watcher存在了Dep.target

        this.getter(); // 渲染watcher执行

        popTarget();
      }
    }, {
      key: "update",
      value: function update() {
        console.log("执行了更新了111");
        this.get();
      } // wathcer中存放Dep

    }, {
      key: "addDep",
      value: function addDep(dep) {
        // watcher不能放重复的Dep， Dep里不能放重复的watcher
        var id = dep.id;

        if (!this.depsId.has(id)) {
          this.depsId.add(id); // 保存当前的dep

          this.deps.push(dep); // 当前的watcher存放进去

          dep.addSub(this);
        } // 这个wacther 对应了两个Dep


        console.log(this.deps);
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
      parentEm.removeChild(oldElm); // 渲染好的结果返回

      return el;
    } // 2.递归创建真实节点 替换掉老得节点

  }

  function createElm(vnode) {
    // 根据虚拟节点创建真实节点
    // return document.createElement('div')
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text; // console.log(tag)
    // 是标签就创建标签 // 如果不是标签 就是文本

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
    // 执行生命周期 可以拿到el，但是el还没有被渲染完

    callHook(vm, 'beforeMount'); // 渲染页面
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

    callHook(vm, 'mounted');
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this; // console.log(vnode, 'vnode')

      vm.$el = patch(vm.$el, vnode);
    };
  } // _update 的patch 此时已经创建了真实的dom

  function callHook(vm, hook) {
    var handles = vm.$options[hook];

    if (handles) {
      for (var i = 0; i < handles.length; i++) {
        // 绑定了 当前的this  用户就可以获取当前this
        handles[i].call(vm);
      }
    }
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // 数据的劫持 当前的实例就是this
      var vm = this; // this.$options 指代的就是用户传递的属性
      // vm.$options = options
      // 将用户传递的和全局的合并  vm.constructor 指代的是子类
      // console.log(vm.constructor.options, 'vm.constructor.options')
      // console.log(options, 'options')
      // vm.constructor.options 保证谁调了这个类，options就指向谁
      // vue里面有extends方法  这个看看

      vm.$options = mergeOptions(vm.constructor.options, options); // 执行初始化的生命周期 beforeCreate 数据还没有被观察过，此时就没有什么get set这种东西

      callHook(vm, 'beforeCreate'); // 设置$set 定义响应式数据   这个响应式方法  会对数据进行观察

      initSet(Vue); // 初始化状态

      initState(vm); // 此时数据已经被观察过了

      callHook(vm, 'created'); // 用户传入了人el属性  那么就需要渲染数据
      // 执行数据的挂载

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
    // console.log(text, 'text')
    // 文本的虚拟节点
    return vnode(undefined, undefined, undefined, undefined, text);
  } // 虚拟节点  就是通过 _c _v 实现用对象来描述dom的操作

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
      var render = vm.$options.render; // console.log(render)

      var vnode = render.call(vm); // 绑定当前的this

      return vnode;
    };
  }

  function initGlobalAPI(Vue) {
    // 整个了所以全局相关的内容
    Vue.options = {};

    Vue.mixin = function (mixin) {
      // 实现两个对象的合并
      this.options = mergeOptions(this.options, mixin);
    }; // Vue.mixin({
    //   a: 1,
    //   beforeCreate() {
    //     console.log('mixin1')
    //   },
    //   created() {
    //   }
    // })
    // Vue.mixin({
    //   b: 2,
    //   beforeCreate() {
    //     console.log('mixin2')
    //   }
    // })
    // vue选项的合并 options合并
    // console.log(Vue.options, 'options')

  }

  // Vue的核心代码 这个文件相当于整合的功能

  function Vue(options) {
    // 进行vue的初始化
    this._init(options);
  } // let vue = require('vue')
  // console.log(vue)
  // 通过引入文件的方式，给vue原型上添加方法
  // 执行一下 把大 Vue传递进去
  // 初始化全局化 API


  initGlobalAPI(Vue);
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
