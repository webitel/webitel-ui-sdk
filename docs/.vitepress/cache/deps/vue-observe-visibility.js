import {
  nextTick
} from "./chunk-2YWP3TL2.js";
import "./chunk-ROME4SDB.js";

// node_modules/vue-observe-visibility/dist/vue-observe-visibility.esm.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
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
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function processOptions(value) {
  var options;
  if (typeof value === "function") {
    options = {
      callback: value
    };
  } else {
    options = value;
  }
  return options;
}
function throttle(callback, delay) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var timeout;
  var lastState;
  var currentArgs;
  var throttled = function throttled2(state) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    currentArgs = args;
    if (timeout && state === lastState)
      return;
    var leading = options.leading;
    if (typeof leading === "function") {
      leading = leading(state, lastState);
    }
    if ((!timeout || state !== lastState) && leading) {
      callback.apply(void 0, [state].concat(_toConsumableArray(currentArgs)));
    }
    lastState = state;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      callback.apply(void 0, [state].concat(_toConsumableArray(currentArgs)));
      timeout = 0;
    }, delay);
  };
  throttled._clear = function() {
    clearTimeout(timeout);
    timeout = null;
  };
  return throttled;
}
function deepEqual(val1, val2) {
  if (val1 === val2)
    return true;
  if (_typeof(val1) === "object") {
    for (var key in val1) {
      if (!deepEqual(val1[key], val2[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
}
var VisibilityState = function() {
  function VisibilityState2(el, options, vnode) {
    _classCallCheck(this, VisibilityState2);
    this.el = el;
    this.observer = null;
    this.frozen = false;
    this.createObserver(options, vnode);
  }
  _createClass(VisibilityState2, [{
    key: "createObserver",
    value: function createObserver(options, vnode) {
      var _this = this;
      if (this.observer) {
        this.destroyObserver();
      }
      if (this.frozen)
        return;
      this.options = processOptions(options);
      this.callback = function(result, entry) {
        _this.options.callback(result, entry);
        if (result && _this.options.once) {
          _this.frozen = true;
          _this.destroyObserver();
        }
      };
      if (this.callback && this.options.throttle) {
        var _ref = this.options.throttleOptions || {}, _leading = _ref.leading;
        this.callback = throttle(this.callback, this.options.throttle, {
          leading: function leading(state) {
            return _leading === "both" || _leading === "visible" && state || _leading === "hidden" && !state;
          }
        });
      }
      this.oldResult = void 0;
      this.observer = new IntersectionObserver(function(entries) {
        var entry = entries[0];
        if (entries.length > 1) {
          var intersectingEntry = entries.find(function(e) {
            return e.isIntersecting;
          });
          if (intersectingEntry) {
            entry = intersectingEntry;
          }
        }
        if (_this.callback) {
          var result = entry.isIntersecting && entry.intersectionRatio >= _this.threshold;
          if (result === _this.oldResult)
            return;
          _this.oldResult = result;
          _this.callback(result, entry);
        }
      }, this.options.intersection);
      nextTick(function() {
        if (_this.observer) {
          _this.observer.observe(_this.el);
        }
      });
    }
  }, {
    key: "destroyObserver",
    value: function destroyObserver() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      if (this.callback && this.callback._clear) {
        this.callback._clear();
        this.callback = null;
      }
    }
  }, {
    key: "threshold",
    get: function get() {
      return this.options.intersection && typeof this.options.intersection.threshold === "number" ? this.options.intersection.threshold : 0;
    }
  }]);
  return VisibilityState2;
}();
function beforeMount(el, _ref2, vnode) {
  var value = _ref2.value;
  if (!value)
    return;
  if (typeof IntersectionObserver === "undefined") {
    console.warn("[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill");
  } else {
    var state = new VisibilityState(el, value, vnode);
    el._vue_visibilityState = state;
  }
}
function updated(el, _ref3, vnode) {
  var value = _ref3.value, oldValue = _ref3.oldValue;
  if (deepEqual(value, oldValue))
    return;
  var state = el._vue_visibilityState;
  if (!value) {
    unmounted(el);
    return;
  }
  if (state) {
    state.createObserver(value, vnode);
  } else {
    beforeMount(el, {
      value
    }, vnode);
  }
}
function unmounted(el) {
  var state = el._vue_visibilityState;
  if (state) {
    state.destroyObserver();
    delete el._vue_visibilityState;
  }
}
var ObserveVisibility = {
  beforeMount,
  updated,
  unmounted
};
function install(app) {
  app.directive("observe-visibility", ObserveVisibility);
}
var plugin = {
  // eslint-disable-next-line no-undef
  version: "2.0.0-alpha.1",
  install
};
var vue_observe_visibility_esm_default = plugin;
export {
  ObserveVisibility,
  vue_observe_visibility_esm_default as default,
  install
};
//# sourceMappingURL=vue-observe-visibility.js.map
