import "./chunk-ROME4SDB.js";

// node_modules/plyr/dist/plyr.min.mjs
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var i = 0; i < t.length; i++) {
    var n = t[i];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(e, n.key, n);
  }
}
function _createClass(e, t, i) {
  return t && _defineProperties(e.prototype, t), i && _defineProperties(e, i), e;
}
function _defineProperty(e, t, i) {
  return t in e ? Object.defineProperty(e, t, { value: i, enumerable: true, configurable: true, writable: true }) : e[t] = i, e;
}
function ownKeys(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(t2) {
      return Object.getOwnPropertyDescriptor(e, t2).enumerable;
    })), i.push.apply(i, n);
  }
  return i;
}
function _objectSpread2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys(Object(i), true).forEach(function(t2) {
      _defineProperty(e, t2, i[t2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ownKeys(Object(i)).forEach(function(t2) {
      Object.defineProperty(e, t2, Object.getOwnPropertyDescriptor(i, t2));
    });
  }
  return e;
}
function _objectWithoutPropertiesLoose(e, t) {
  if (null == e)
    return {};
  var i, n, s = {}, a = Object.keys(e);
  for (n = 0; n < a.length; n++)
    i = a[n], t.indexOf(i) >= 0 || (s[i] = e[i]);
  return s;
}
function _objectWithoutProperties(e, t) {
  if (null == e)
    return {};
  var i, n, s = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      i = a[n], t.indexOf(i) >= 0 || Object.prototype.propertyIsEnumerable.call(e, i) && (s[i] = e[i]);
  }
  return s;
}
function _slicedToArray(e, t) {
  return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _unsupportedIterableToArray(e, t) || _nonIterableRest();
}
function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread();
}
function _arrayWithoutHoles(e) {
  if (Array.isArray(e))
    return _arrayLikeToArray(e);
}
function _arrayWithHoles(e) {
  if (Array.isArray(e))
    return e;
}
function _iterableToArray(e) {
  if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
    return Array.from(e);
}
function _iterableToArrayLimit(e, t) {
  if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
    var i = [], n = true, s = false, a = void 0;
    try {
      for (var r, o = e[Symbol.iterator](); !(n = (r = o.next()).done) && (i.push(r.value), !t || i.length !== t); n = true)
        ;
    } catch (e2) {
      s = true, a = e2;
    } finally {
      try {
        n || null == o.return || o.return();
      } finally {
        if (s)
          throw a;
      }
    }
    return i;
  }
}
function _unsupportedIterableToArray(e, t) {
  if (e) {
    if ("string" == typeof e)
      return _arrayLikeToArray(e, t);
    var i = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === i && e.constructor && (i = e.constructor.name), "Map" === i || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? _arrayLikeToArray(e, t) : void 0;
  }
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var i = 0, n = new Array(t); i < t; i++)
    n[i] = e[i];
  return n;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _classCallCheck$1(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(e, t) {
  for (var i = 0; i < t.length; i++) {
    var n = t[i];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(e, n.key, n);
  }
}
function _createClass$1(e, t, i) {
  return t && _defineProperties$1(e.prototype, t), i && _defineProperties$1(e, i), e;
}
function _defineProperty$1(e, t, i) {
  return t in e ? Object.defineProperty(e, t, { value: i, enumerable: true, configurable: true, writable: true }) : e[t] = i, e;
}
function ownKeys$1(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(t2) {
      return Object.getOwnPropertyDescriptor(e, t2).enumerable;
    })), i.push.apply(i, n);
  }
  return i;
}
function _objectSpread2$1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys$1(Object(i), true).forEach(function(t2) {
      _defineProperty$1(e, t2, i[t2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ownKeys$1(Object(i)).forEach(function(t2) {
      Object.defineProperty(e, t2, Object.getOwnPropertyDescriptor(i, t2));
    });
  }
  return e;
}
var defaults = { addCSS: true, thumbWidth: 15, watch: true };
function matches(e, t) {
  return (function() {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }).call(e, t);
}
function trigger(e, t) {
  if (e && t) {
    var i = new Event(t, { bubbles: true });
    e.dispatchEvent(i);
  }
}
var getConstructor = function(e) {
  return null != e ? e.constructor : null;
};
var instanceOf = function(e, t) {
  return !!(e && t && e instanceof t);
};
var isNullOrUndefined = function(e) {
  return null == e;
};
var isObject = function(e) {
  return getConstructor(e) === Object;
};
var isNumber = function(e) {
  return getConstructor(e) === Number && !Number.isNaN(e);
};
var isString = function(e) {
  return getConstructor(e) === String;
};
var isBoolean = function(e) {
  return getConstructor(e) === Boolean;
};
var isFunction = function(e) {
  return getConstructor(e) === Function;
};
var isArray = function(e) {
  return Array.isArray(e);
};
var isNodeList = function(e) {
  return instanceOf(e, NodeList);
};
var isElement = function(e) {
  return instanceOf(e, Element);
};
var isEvent = function(e) {
  return instanceOf(e, Event);
};
var isEmpty = function(e) {
  return isNullOrUndefined(e) || (isString(e) || isArray(e) || isNodeList(e)) && !e.length || isObject(e) && !Object.keys(e).length;
};
var is = { nullOrUndefined: isNullOrUndefined, object: isObject, number: isNumber, string: isString, boolean: isBoolean, function: isFunction, array: isArray, nodeList: isNodeList, element: isElement, event: isEvent, empty: isEmpty };
function getDecimalPlaces(e) {
  var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
}
function round(e, t) {
  if (1 > t) {
    var i = getDecimalPlaces(t);
    return parseFloat(e.toFixed(i));
  }
  return Math.round(e / t) * t;
}
var RangeTouch = function() {
  function e(t, i) {
    _classCallCheck$1(this, e), is.element(t) ? this.element = t : is.string(t) && (this.element = document.querySelector(t)), is.element(this.element) && is.empty(this.element.rangeTouch) && (this.config = _objectSpread2$1({}, defaults, {}, i), this.init());
  }
  return _createClass$1(e, [{ key: "init", value: function() {
    e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(true), this.element.rangeTouch = this);
  } }, { key: "destroy", value: function() {
    e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(false), this.element.rangeTouch = null);
  } }, { key: "listeners", value: function(e2) {
    var t = this, i = e2 ? "addEventListener" : "removeEventListener";
    ["touchstart", "touchmove", "touchend"].forEach(function(e3) {
      t.element[i](e3, function(e4) {
        return t.set(e4);
      }, false);
    });
  } }, { key: "get", value: function(t) {
    if (!e.enabled || !is.event(t))
      return null;
    var i, n = t.target, s = t.changedTouches[0], a = parseFloat(n.getAttribute("min")) || 0, r = parseFloat(n.getAttribute("max")) || 100, o = parseFloat(n.getAttribute("step")) || 1, l = n.getBoundingClientRect(), c = 100 / l.width * (this.config.thumbWidth / 2) / 100;
    return 0 > (i = 100 / l.width * (s.clientX - l.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), a + round(i / 100 * (r - a), o);
  } }, { key: "set", value: function(t) {
    e.enabled && is.event(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), trigger(t.target, "touchend" === t.type ? "change" : "input"));
  } }], [{ key: "setup", value: function(t) {
    var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, n = null;
    if (is.empty(t) || is.string(t) ? n = Array.from(document.querySelectorAll(is.string(t) ? t : 'input[type="range"]')) : is.element(t) ? n = [t] : is.nodeList(t) ? n = Array.from(t) : is.array(t) && (n = t.filter(is.element)), is.empty(n))
      return null;
    var s = _objectSpread2$1({}, defaults, {}, i);
    if (is.string(t) && s.watch) {
      var a = new MutationObserver(function(i2) {
        Array.from(i2).forEach(function(i3) {
          Array.from(i3.addedNodes).forEach(function(i4) {
            is.element(i4) && matches(i4, t) && new e(i4, s);
          });
        });
      });
      a.observe(document.body, { childList: true, subtree: true });
    }
    return n.map(function(t2) {
      return new e(t2, i);
    });
  } }, { key: "enabled", get: function() {
    return "ontouchstart" in document.documentElement;
  } }]), e;
}();
var getConstructor$1 = function(e) {
  return null != e ? e.constructor : null;
};
var instanceOf$1 = function(e, t) {
  return Boolean(e && t && e instanceof t);
};
var isNullOrUndefined$1 = function(e) {
  return null == e;
};
var isObject$1 = function(e) {
  return getConstructor$1(e) === Object;
};
var isNumber$1 = function(e) {
  return getConstructor$1(e) === Number && !Number.isNaN(e);
};
var isString$1 = function(e) {
  return getConstructor$1(e) === String;
};
var isBoolean$1 = function(e) {
  return getConstructor$1(e) === Boolean;
};
var isFunction$1 = function(e) {
  return getConstructor$1(e) === Function;
};
var isArray$1 = function(e) {
  return Array.isArray(e);
};
var isWeakMap = function(e) {
  return instanceOf$1(e, WeakMap);
};
var isNodeList$1 = function(e) {
  return instanceOf$1(e, NodeList);
};
var isElement$1 = function(e) {
  return instanceOf$1(e, Element);
};
var isTextNode = function(e) {
  return getConstructor$1(e) === Text;
};
var isEvent$1 = function(e) {
  return instanceOf$1(e, Event);
};
var isKeyboardEvent = function(e) {
  return instanceOf$1(e, KeyboardEvent);
};
var isCue = function(e) {
  return instanceOf$1(e, window.TextTrackCue) || instanceOf$1(e, window.VTTCue);
};
var isTrack = function(e) {
  return instanceOf$1(e, TextTrack) || !isNullOrUndefined$1(e) && isString$1(e.kind);
};
var isPromise = function(e) {
  return instanceOf$1(e, Promise) && isFunction$1(e.then);
};
var isEmpty$1 = function(e) {
  return isNullOrUndefined$1(e) || (isString$1(e) || isArray$1(e) || isNodeList$1(e)) && !e.length || isObject$1(e) && !Object.keys(e).length;
};
var isUrl = function(e) {
  if (instanceOf$1(e, window.URL))
    return true;
  if (!isString$1(e))
    return false;
  var t = e;
  e.startsWith("http://") && e.startsWith("https://") || (t = "http://".concat(e));
  try {
    return !isEmpty$1(new URL(t).hostname);
  } catch (e2) {
    return false;
  }
};
var is$1 = { nullOrUndefined: isNullOrUndefined$1, object: isObject$1, number: isNumber$1, string: isString$1, boolean: isBoolean$1, function: isFunction$1, array: isArray$1, weakMap: isWeakMap, nodeList: isNodeList$1, element: isElement$1, textNode: isTextNode, event: isEvent$1, keyboardEvent: isKeyboardEvent, cue: isCue, track: isTrack, promise: isPromise, url: isUrl, empty: isEmpty$1 };
var transitionEndEvent = function() {
  var e = document.createElement("span"), t = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }, i = Object.keys(t).find(function(t2) {
    return void 0 !== e.style[t2];
  });
  return !!is$1.string(i) && t[i];
}();
function repaint(e, t) {
  setTimeout(function() {
    try {
      e.hidden = true, e.offsetHeight, e.hidden = false;
    } catch (e2) {
    }
  }, t);
}
var browser = { isIE: (
  /* @cc_on!@ */
  !!document.documentMode
), isEdge: window.navigator.userAgent.includes("Edge"), isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent), isIPhone: /(iPhone|iPod)/gi.test(navigator.platform), isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform) };
function cloneDeep(e) {
  return JSON.parse(JSON.stringify(e));
}
function getDeep(e, t) {
  return t.split(".").reduce(function(e2, t2) {
    return e2 && e2[t2];
  }, e);
}
function extend() {
  for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    i[n - 1] = arguments[n];
  if (!i.length)
    return e;
  var s = i.shift();
  return is$1.object(s) ? (Object.keys(s).forEach(function(t2) {
    is$1.object(s[t2]) ? (Object.keys(e).includes(t2) || Object.assign(e, _defineProperty({}, t2, {})), extend(e[t2], s[t2])) : Object.assign(e, _defineProperty({}, t2, s[t2]));
  }), extend.apply(void 0, [e].concat(i))) : e;
}
function wrap(e, t) {
  var i = e.length ? e : [e];
  Array.from(i).reverse().forEach(function(e2, i2) {
    var n = i2 > 0 ? t.cloneNode(true) : t, s = e2.parentNode, a = e2.nextSibling;
    n.appendChild(e2), a ? s.insertBefore(n, a) : s.appendChild(n);
  });
}
function setAttributes(e, t) {
  is$1.element(e) && !is$1.empty(t) && Object.entries(t).filter(function(e2) {
    var t2 = _slicedToArray(e2, 2)[1];
    return !is$1.nullOrUndefined(t2);
  }).forEach(function(t2) {
    var i = _slicedToArray(t2, 2), n = i[0], s = i[1];
    return e.setAttribute(n, s);
  });
}
function createElement(e, t, i) {
  var n = document.createElement(e);
  return is$1.object(t) && setAttributes(n, t), is$1.string(i) && (n.innerText = i), n;
}
function insertAfter(e, t) {
  is$1.element(e) && is$1.element(t) && t.parentNode.insertBefore(e, t.nextSibling);
}
function insertElement(e, t, i, n) {
  is$1.element(t) && t.appendChild(createElement(e, i, n));
}
function removeElement(e) {
  is$1.nodeList(e) || is$1.array(e) ? Array.from(e).forEach(removeElement) : is$1.element(e) && is$1.element(e.parentNode) && e.parentNode.removeChild(e);
}
function emptyElement(e) {
  if (is$1.element(e))
    for (var t = e.childNodes.length; t > 0; )
      e.removeChild(e.lastChild), t -= 1;
}
function replaceElement(e, t) {
  return is$1.element(t) && is$1.element(t.parentNode) && is$1.element(e) ? (t.parentNode.replaceChild(e, t), e) : null;
}
function getAttributesFromSelector(e, t) {
  if (!is$1.string(e) || is$1.empty(e))
    return {};
  var i = {}, n = extend({}, t);
  return e.split(",").forEach(function(e2) {
    var t2 = e2.trim(), s = t2.replace(".", ""), a = t2.replace(/[[\]]/g, "").split("="), r = _slicedToArray(a, 1)[0], o = a.length > 1 ? a[1].replace(/["']/g, "") : "";
    switch (t2.charAt(0)) {
      case ".":
        is$1.string(n.class) ? i.class = "".concat(n.class, " ").concat(s) : i.class = s;
        break;
      case "#":
        i.id = t2.replace("#", "");
        break;
      case "[":
        i[r] = o;
    }
  }), extend(n, i);
}
function toggleHidden(e, t) {
  if (is$1.element(e)) {
    var i = t;
    is$1.boolean(i) || (i = !e.hidden), e.hidden = i;
  }
}
function toggleClass(e, t, i) {
  if (is$1.nodeList(e))
    return Array.from(e).map(function(e2) {
      return toggleClass(e2, t, i);
    });
  if (is$1.element(e)) {
    var n = "toggle";
    return void 0 !== i && (n = i ? "add" : "remove"), e.classList[n](t), e.classList.contains(t);
  }
  return false;
}
function hasClass(e, t) {
  return is$1.element(e) && e.classList.contains(t);
}
function matches$1(e, t) {
  var i = Element.prototype;
  return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function() {
    return Array.from(document.querySelectorAll(t)).includes(this);
  }).call(e, t);
}
function closest(e, t) {
  return (Element.prototype.closest || function() {
    var e2 = this;
    do {
      if (matches$1.matches(e2, t))
        return e2;
      e2 = e2.parentElement || e2.parentNode;
    } while (null !== e2 && 1 === e2.nodeType);
    return null;
  }).call(e, t);
}
function getElements(e) {
  return this.elements.container.querySelectorAll(e);
}
function getElement(e) {
  return this.elements.container.querySelector(e);
}
function setFocus() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  is$1.element(e) && (e.focus({ preventScroll: true }), t && toggleClass(e, this.config.classNames.tabFocus));
}
var defaultCodecs = { "audio/ogg": "vorbis", "audio/wav": "1", "video/webm": "vp8, vorbis", "video/mp4": "avc1.42E01E, mp4a.40.2", "video/ogg": "theora" };
var support = { audio: "canPlayType" in document.createElement("audio"), video: "canPlayType" in document.createElement("video"), check: function(e, t, i) {
  var n = browser.isIPhone && i && support.playsinline, s = support[e] || "html5" !== t;
  return { api: s, ui: s && support.rangeInput && ("video" !== e || !browser.isIPhone || n) };
}, pip: !(browser.isIPhone || !is$1.function(createElement("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || createElement("video").disablePictureInPicture)), airplay: is$1.function(window.WebKitPlaybackTargetAvailabilityEvent), playsinline: "playsInline" in document.createElement("video"), mime: function(e) {
  if (is$1.empty(e))
    return false;
  var t = _slicedToArray(e.split("/"), 1)[0], i = e;
  if (!this.isHTML5 || t !== this.type)
    return false;
  Object.keys(defaultCodecs).includes(i) && (i += '; codecs="'.concat(defaultCodecs[e], '"'));
  try {
    return Boolean(i && this.media.canPlayType(i).replace(/no/, ""));
  } catch (e2) {
    return false;
  }
}, textTracks: "textTracks" in document.createElement("video"), rangeInput: function() {
  var e = document.createElement("input");
  return e.type = "range", "range" === e.type;
}(), touch: "ontouchstart" in document.documentElement, transitions: false !== transitionEndEvent, reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches };
var supportsPassiveListeners = function() {
  var e = false;
  try {
    var t = Object.defineProperty({}, "passive", { get: function() {
      return e = true, null;
    } });
    window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
  } catch (e2) {
  }
  return e;
}();
function toggleListener(e, t, i) {
  var n = this, s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], r = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
  if (e && "addEventListener" in e && !is$1.empty(t) && is$1.function(i)) {
    var o = t.split(" "), l = r;
    supportsPassiveListeners && (l = { passive: a, capture: r }), o.forEach(function(t2) {
      n && n.eventListeners && s && n.eventListeners.push({ element: e, type: t2, callback: i, options: l }), e[s ? "addEventListener" : "removeEventListener"](t2, i, l);
    });
  }
}
function on(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 ? arguments[2] : void 0, n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
  toggleListener.call(this, e, t, i, true, n, s);
}
function off(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 ? arguments[2] : void 0, n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
  toggleListener.call(this, e, t, i, false, n, s);
}
function once(e) {
  var t = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 ? arguments[2] : void 0, s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], r = function r2() {
    off(e, i, r2, s, a);
    for (var o = arguments.length, l = new Array(o), c = 0; c < o; c++)
      l[c] = arguments[c];
    n.apply(t, l);
  };
  toggleListener.call(this, e, i, r, true, s, a);
}
function triggerEvent(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
  if (is$1.element(e) && !is$1.empty(t)) {
    var s = new CustomEvent(t, { bubbles: i, detail: _objectSpread2(_objectSpread2({}, n), {}, { plyr: this }) });
    e.dispatchEvent(s);
  }
}
function unbindListeners() {
  this && this.eventListeners && (this.eventListeners.forEach(function(e) {
    var t = e.element, i = e.type, n = e.callback, s = e.options;
    t.removeEventListener(i, n, s);
  }), this.eventListeners = []);
}
function ready() {
  var e = this;
  return new Promise(function(t) {
    return e.ready ? setTimeout(t, 0) : on.call(e, e.elements.container, "ready", t);
  }).then(function() {
  });
}
function silencePromise(e) {
  is$1.promise(e) && e.then(null, function() {
  });
}
function validateRatio(e) {
  return !!(is$1.array(e) || is$1.string(e) && e.includes(":")) && (is$1.array(e) ? e : e.split(":")).map(Number).every(is$1.number);
}
function reduceAspectRatio(e) {
  if (!is$1.array(e) || !e.every(is$1.number))
    return null;
  var t = _slicedToArray(e, 2), i = t[0], n = t[1], s = function e2(t2, i2) {
    return 0 === i2 ? t2 : e2(i2, t2 % i2);
  }(i, n);
  return [i / s, n / s];
}
function getAspectRatio(e) {
  var t = function(e2) {
    return validateRatio(e2) ? e2.split(":").map(Number) : null;
  }, i = t(e);
  if (null === i && (i = t(this.config.ratio)), null === i && !is$1.empty(this.embed) && is$1.array(this.embed.ratio) && (i = this.embed.ratio), null === i && this.isHTML5) {
    var n = this.media;
    i = reduceAspectRatio([n.videoWidth, n.videoHeight]);
  }
  return i;
}
function setAspectRatio(e) {
  if (!this.isVideo)
    return {};
  var t = this.elements.wrapper, i = getAspectRatio.call(this, e), n = _slicedToArray(is$1.array(i) ? i : [0, 0], 2), s = 100 / n[0] * n[1];
  if (t.style.paddingBottom = "".concat(s, "%"), this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
    var a = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10), r = (a - s) / (a / 50);
    this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = "translateY(-".concat(r, "%)");
  } else
    this.isHTML5 && t.classList.toggle(this.config.classNames.videoFixedRatio, null !== i);
  return { padding: s, ratio: i };
}
var html5 = { getSources: function() {
  var e = this;
  return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter(function(t) {
    var i = t.getAttribute("type");
    return !!is$1.empty(i) || support.mime.call(e, i);
  }) : [];
}, getQualityOptions: function() {
  return this.config.quality.forced ? this.config.quality.options : html5.getSources.call(this).map(function(e) {
    return Number(e.getAttribute("size"));
  }).filter(Boolean);
}, setup: function() {
  if (this.isHTML5) {
    var e = this;
    e.options.speed = e.config.speed.options, is$1.empty(this.config.ratio) || setAspectRatio.call(e), Object.defineProperty(e.media, "quality", { get: function() {
      var t = html5.getSources.call(e).find(function(t2) {
        return t2.getAttribute("src") === e.source;
      });
      return t && Number(t.getAttribute("size"));
    }, set: function(t) {
      if (e.quality !== t) {
        if (e.config.quality.forced && is$1.function(e.config.quality.onChange))
          e.config.quality.onChange(t);
        else {
          var i = html5.getSources.call(e).find(function(e2) {
            return Number(e2.getAttribute("size")) === t;
          });
          if (!i)
            return;
          var n = e.media, s = n.currentTime, a = n.paused, r = n.preload, o = n.readyState, l = n.playbackRate;
          e.media.src = i.getAttribute("src"), ("none" !== r || o) && (e.once("loadedmetadata", function() {
            e.speed = l, e.currentTime = s, a || silencePromise(e.play());
          }), e.media.load());
        }
        triggerEvent.call(e, e.media, "qualitychange", false, { quality: t });
      }
    } });
  }
}, cancelRequests: function() {
  this.isHTML5 && (removeElement(html5.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
} };
function dedupe(e) {
  return is$1.array(e) ? e.filter(function(t, i) {
    return e.indexOf(t) === i;
  }) : e;
}
function closest$1(e, t) {
  return is$1.array(e) && e.length ? e.reduce(function(e2, i) {
    return Math.abs(i - t) < Math.abs(e2 - t) ? i : e2;
  }) : null;
}
function generateId(e) {
  return "".concat(e, "-").concat(Math.floor(1e4 * Math.random()));
}
function format(e) {
  for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    i[n - 1] = arguments[n];
  return is$1.empty(e) ? e : e.toString().replace(/{(\d+)}/g, function(e2, t2) {
    return i[t2].toString();
  });
}
function getPercentage(e, t) {
  return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2);
}
var replaceAll = function() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
  return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString());
};
var toTitleCase = function() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
  return e.toString().replace(/\w\S*/g, function(e2) {
    return e2.charAt(0).toUpperCase() + e2.substr(1).toLowerCase();
  });
};
function toPascalCase() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = e.toString();
  return t = replaceAll(t, "-", " "), t = replaceAll(t, "_", " "), t = toTitleCase(t), replaceAll(t, " ", "");
}
function toCamelCase() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = e.toString();
  return (t = toPascalCase(t)).charAt(0).toLowerCase() + t.slice(1);
}
function stripHTML(e) {
  var t = document.createDocumentFragment(), i = document.createElement("div");
  return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
}
function getHTML(e) {
  var t = document.createElement("div");
  return t.appendChild(e), t.innerHTML;
}
var resources = { pip: "PIP", airplay: "AirPlay", html5: "HTML5", vimeo: "Vimeo", youtube: "YouTube" };
var i18n = { get: function() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  if (is$1.empty(e) || is$1.empty(t))
    return "";
  var i = getDeep(t.i18n, e);
  if (is$1.empty(i))
    return Object.keys(resources).includes(e) ? resources[e] : "";
  var n = { "{seektime}": t.seekTime, "{title}": t.title };
  return Object.entries(n).forEach(function(e2) {
    var t2 = _slicedToArray(e2, 2), n2 = t2[0], s = t2[1];
    i = replaceAll(i, n2, s);
  }), i;
} };
var Storage = function() {
  function e(t) {
    _classCallCheck(this, e), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key;
  }
  return _createClass(e, [{ key: "get", value: function(t) {
    if (!e.supported || !this.enabled)
      return null;
    var i = window.localStorage.getItem(this.key);
    if (is$1.empty(i))
      return null;
    var n = JSON.parse(i);
    return is$1.string(t) && t.length ? n[t] : n;
  } }, { key: "set", value: function(t) {
    if (e.supported && this.enabled && is$1.object(t)) {
      var i = this.get();
      is$1.empty(i) && (i = {}), extend(i, t), window.localStorage.setItem(this.key, JSON.stringify(i));
    }
  } }], [{ key: "supported", get: function() {
    try {
      if (!("localStorage" in window))
        return false;
      var e2 = "___test";
      return window.localStorage.setItem(e2, e2), window.localStorage.removeItem(e2), true;
    } catch (e3) {
      return false;
    }
  } }]), e;
}();
function fetch(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
  return new Promise(function(i, n) {
    try {
      var s = new XMLHttpRequest();
      if (!("withCredentials" in s))
        return;
      s.addEventListener("load", function() {
        if ("text" === t)
          try {
            i(JSON.parse(s.responseText));
          } catch (e2) {
            i(s.responseText);
          }
        else
          i(s.response);
      }), s.addEventListener("error", function() {
        throw new Error(s.status);
      }), s.open("GET", e, true), s.responseType = t, s.send();
    } catch (e2) {
      n(e2);
    }
  });
}
function loadSprite(e, t) {
  if (is$1.string(e)) {
    var i = "cache", n = is$1.string(t), s = function() {
      return null !== document.getElementById(t);
    }, a = function(e2, t2) {
      e2.innerHTML = t2, n && s() || document.body.insertAdjacentElement("afterbegin", e2);
    };
    if (!n || !s()) {
      var r = Storage.supported, o = document.createElement("div");
      if (o.setAttribute("hidden", ""), n && o.setAttribute("id", t), r) {
        var l = window.localStorage.getItem("".concat(i, "-").concat(t));
        if (null !== l) {
          var c = JSON.parse(l);
          a(o, c.content);
        }
      }
      fetch(e).then(function(e2) {
        is$1.empty(e2) || (r && window.localStorage.setItem("".concat(i, "-").concat(t), JSON.stringify({ content: e2 })), a(o, e2));
      }).catch(function() {
      });
    }
  }
}
var getHours = function(e) {
  return Math.trunc(e / 60 / 60 % 60, 10);
};
var getMinutes = function(e) {
  return Math.trunc(e / 60 % 60, 10);
};
var getSeconds = function(e) {
  return Math.trunc(e % 60, 10);
};
function formatTime() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  if (!is$1.number(e))
    return formatTime(void 0, t, i);
  var n = function(e2) {
    return "0".concat(e2).slice(-2);
  }, s = getHours(e), a = getMinutes(e), r = getSeconds(e);
  return s = t || s > 0 ? "".concat(s, ":") : "", "".concat(i && e > 0 ? "-" : "").concat(s).concat(n(a), ":").concat(n(r));
}
var controls = { getIconUrl: function() {
  var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || browser.isIE && !window.svg4everybody;
  return { url: this.config.iconUrl, cors: e };
}, findElements: function() {
  try {
    return this.elements.controls = getElement.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = { play: getElements.call(this, this.config.selectors.buttons.play), pause: getElement.call(this, this.config.selectors.buttons.pause), restart: getElement.call(this, this.config.selectors.buttons.restart), rewind: getElement.call(this, this.config.selectors.buttons.rewind), fastForward: getElement.call(this, this.config.selectors.buttons.fastForward), mute: getElement.call(this, this.config.selectors.buttons.mute), pip: getElement.call(this, this.config.selectors.buttons.pip), airplay: getElement.call(this, this.config.selectors.buttons.airplay), settings: getElement.call(this, this.config.selectors.buttons.settings), captions: getElement.call(this, this.config.selectors.buttons.captions), fullscreen: getElement.call(this, this.config.selectors.buttons.fullscreen) }, this.elements.progress = getElement.call(this, this.config.selectors.progress), this.elements.inputs = { seek: getElement.call(this, this.config.selectors.inputs.seek), volume: getElement.call(this, this.config.selectors.inputs.volume) }, this.elements.display = { buffer: getElement.call(this, this.config.selectors.display.buffer), currentTime: getElement.call(this, this.config.selectors.display.currentTime), duration: getElement.call(this, this.config.selectors.display.duration) }, is$1.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip))), true;
  } catch (e) {
    return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(true), false;
  }
}, createIcon: function(e, t) {
  var i = "http://www.w3.org/2000/svg", n = controls.getIconUrl.call(this), s = "".concat(n.cors ? "" : n.url, "#").concat(this.config.iconPrefix), a = document.createElementNS(i, "svg");
  setAttributes(a, extend(t, { "aria-hidden": "true", focusable: "false" }));
  var r = document.createElementNS(i, "use"), o = "".concat(s, "-").concat(e);
  return "href" in r && r.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), r.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), a.appendChild(r), a;
}, createLabel: function(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = i18n.get(e, this.config), n = _objectSpread2(_objectSpread2({}, t), {}, { class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ") });
  return createElement("span", n, i);
}, createBadge: function(e) {
  if (is$1.empty(e))
    return null;
  var t = createElement("span", { class: this.config.classNames.menu.value });
  return t.appendChild(createElement("span", { class: this.config.classNames.menu.badge }, e)), t;
}, createButton: function(e, t) {
  var i = this, n = extend({}, t), s = toCamelCase(e), a = { element: "button", toggle: false, label: null, icon: null, labelPressed: null, iconPressed: null };
  switch (["element", "icon", "label"].forEach(function(e2) {
    Object.keys(n).includes(e2) && (a[e2] = n[e2], delete n[e2]);
  }), "button" !== a.element || Object.keys(n).includes("type") || (n.type = "button"), Object.keys(n).includes("class") ? n.class.split(" ").some(function(e2) {
    return e2 === i.config.classNames.control;
  }) || extend(n, { class: "".concat(n.class, " ").concat(this.config.classNames.control) }) : n.class = this.config.classNames.control, e) {
    case "play":
      a.toggle = true, a.label = "play", a.labelPressed = "pause", a.icon = "play", a.iconPressed = "pause";
      break;
    case "mute":
      a.toggle = true, a.label = "mute", a.labelPressed = "unmute", a.icon = "volume", a.iconPressed = "muted";
      break;
    case "captions":
      a.toggle = true, a.label = "enableCaptions", a.labelPressed = "disableCaptions", a.icon = "captions-off", a.iconPressed = "captions-on";
      break;
    case "fullscreen":
      a.toggle = true, a.label = "enterFullscreen", a.labelPressed = "exitFullscreen", a.icon = "enter-fullscreen", a.iconPressed = "exit-fullscreen";
      break;
    case "play-large":
      n.class += " ".concat(this.config.classNames.control, "--overlaid"), s = "play", a.label = "play", a.icon = "play";
      break;
    default:
      is$1.empty(a.label) && (a.label = s), is$1.empty(a.icon) && (a.icon = e);
  }
  var r = createElement(a.element);
  return a.toggle ? (r.appendChild(controls.createIcon.call(this, a.iconPressed, { class: "icon--pressed" })), r.appendChild(controls.createIcon.call(this, a.icon, { class: "icon--not-pressed" })), r.appendChild(controls.createLabel.call(this, a.labelPressed, { class: "label--pressed" })), r.appendChild(controls.createLabel.call(this, a.label, { class: "label--not-pressed" }))) : (r.appendChild(controls.createIcon.call(this, a.icon)), r.appendChild(controls.createLabel.call(this, a.label))), extend(n, getAttributesFromSelector(this.config.selectors.buttons[s], n)), setAttributes(r, n), "play" === s ? (is$1.array(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(r)) : this.elements.buttons[s] = r, r;
}, createRange: function(e, t) {
  var i = createElement("input", extend(getAttributesFromSelector(this.config.selectors.inputs[e]), { type: "range", min: 0, max: 100, step: 0.01, value: 0, autocomplete: "off", role: "slider", "aria-label": i18n.get(e, this.config), "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": 0 }, t));
  return this.elements.inputs[e] = i, controls.updateRangeFill.call(this, i), RangeTouch.setup(i), i;
}, createProgress: function(e, t) {
  var i = createElement("progress", extend(getAttributesFromSelector(this.config.selectors.display[e]), { min: 0, max: 100, value: 0, role: "progressbar", "aria-hidden": true }, t));
  if ("volume" !== e) {
    i.appendChild(createElement("span", null, "0"));
    var n = { played: "played", buffer: "buffered" }[e], s = n ? i18n.get(n, this.config) : "";
    i.innerText = "% ".concat(s.toLowerCase());
  }
  return this.elements.display[e] = i, i;
}, createTime: function(e, t) {
  var i = getAttributesFromSelector(this.config.selectors.display[e], t), n = createElement("div", extend(i, { class: "".concat(i.class ? i.class : "", " ").concat(this.config.classNames.display.time, " ").trim(), "aria-label": i18n.get(e, this.config) }), "00:00");
  return this.elements.display[e] = n, n;
}, bindMenuItemShortcuts: function(e, t) {
  var i = this;
  on.call(this, e, "keydown keyup", function(n) {
    if ([32, 38, 39, 40].includes(n.which) && (n.preventDefault(), n.stopPropagation(), "keydown" !== n.type)) {
      var s, a = matches$1(e, '[role="menuitemradio"]');
      if (!a && [32, 39].includes(n.which))
        controls.showMenuPanel.call(i, t, true);
      else
        32 !== n.which && (40 === n.which || a && 39 === n.which ? (s = e.nextElementSibling, is$1.element(s) || (s = e.parentNode.firstElementChild)) : (s = e.previousElementSibling, is$1.element(s) || (s = e.parentNode.lastElementChild)), setFocus.call(i, s, true));
    }
  }, false), on.call(this, e, "keyup", function(e2) {
    13 === e2.which && controls.focusFirstMenuItem.call(i, null, true);
  });
}, createMenuItem: function(e) {
  var t = this, i = e.value, n = e.list, s = e.type, a = e.title, r = e.badge, o = void 0 === r ? null : r, l = e.checked, c = void 0 !== l && l, u = getAttributesFromSelector(this.config.selectors.inputs[s]), d = createElement("button", extend(u, { type: "button", role: "menuitemradio", class: "".concat(this.config.classNames.control, " ").concat(u.class ? u.class : "").trim(), "aria-checked": c, value: i })), h = createElement("span");
  h.innerHTML = a, is$1.element(o) && h.appendChild(o), d.appendChild(h), Object.defineProperty(d, "checked", { enumerable: true, get: function() {
    return "true" === d.getAttribute("aria-checked");
  }, set: function(e2) {
    e2 && Array.from(d.parentNode.children).filter(function(e3) {
      return matches$1(e3, '[role="menuitemradio"]');
    }).forEach(function(e3) {
      return e3.setAttribute("aria-checked", "false");
    }), d.setAttribute("aria-checked", e2 ? "true" : "false");
  } }), this.listeners.bind(d, "click keyup", function(e2) {
    if (!is$1.keyboardEvent(e2) || 32 === e2.which) {
      switch (e2.preventDefault(), e2.stopPropagation(), d.checked = true, s) {
        case "language":
          t.currentTrack = Number(i);
          break;
        case "quality":
          t.quality = i;
          break;
        case "speed":
          t.speed = parseFloat(i);
      }
      controls.showMenuPanel.call(t, "home", is$1.keyboardEvent(e2));
    }
  }, s, false), controls.bindMenuItemShortcuts.call(this, d, s), n.appendChild(d);
}, formatTime: function() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  if (!is$1.number(e))
    return e;
  var i = getHours(this.duration) > 0;
  return formatTime(e, i, t);
}, updateTimeDisplay: function() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  is$1.element(e) && is$1.number(t) && (e.innerText = controls.formatTime(t, i));
}, updateVolume: function() {
  this.supported.ui && (is$1.element(this.elements.inputs.volume) && controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), is$1.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
}, setRange: function(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  is$1.element(e) && (e.value = t, controls.updateRangeFill.call(this, e));
}, updateProgress: function(e) {
  var t = this;
  if (this.supported.ui && is$1.event(e)) {
    var i = 0;
    if (e)
      switch (e.type) {
        case "timeupdate":
        case "seeking":
        case "seeked":
          i = getPercentage(this.currentTime, this.duration), "timeupdate" === e.type && controls.setRange.call(this, this.elements.inputs.seek, i);
          break;
        case "playing":
        case "progress":
          !function(e2, i2) {
            var n = is$1.number(i2) ? i2 : 0, s = is$1.element(e2) ? e2 : t.elements.display.buffer;
            if (is$1.element(s)) {
              s.value = n;
              var a = s.getElementsByTagName("span")[0];
              is$1.element(a) && (a.childNodes[0].nodeValue = n);
            }
          }(this.elements.display.buffer, 100 * this.buffered);
      }
  }
}, updateRangeFill: function(e) {
  var t = is$1.event(e) ? e.target : e;
  if (is$1.element(t) && "range" === t.getAttribute("type")) {
    if (matches$1(t, this.config.selectors.inputs.seek)) {
      t.setAttribute("aria-valuenow", this.currentTime);
      var i = controls.formatTime(this.currentTime), n = controls.formatTime(this.duration), s = i18n.get("seekLabel", this.config);
      t.setAttribute("aria-valuetext", s.replace("{currentTime}", i).replace("{duration}", n));
    } else if (matches$1(t, this.config.selectors.inputs.volume)) {
      var a = 100 * t.value;
      t.setAttribute("aria-valuenow", a), t.setAttribute("aria-valuetext", "".concat(a.toFixed(1), "%"));
    } else
      t.setAttribute("aria-valuenow", t.value);
    browser.isWebkit && t.style.setProperty("--value", "".concat(t.value / t.max * 100, "%"));
  }
}, updateSeekTooltip: function(e) {
  var t = this;
  if (this.config.tooltips.seek && is$1.element(this.elements.inputs.seek) && is$1.element(this.elements.display.seekTooltip) && 0 !== this.duration) {
    var i = "".concat(this.config.classNames.tooltip, "--visible"), n = function(e2) {
      return toggleClass(t.elements.display.seekTooltip, i, e2);
    };
    if (this.touch)
      n(false);
    else {
      var s = 0, a = this.elements.progress.getBoundingClientRect();
      if (is$1.event(e))
        s = 100 / a.width * (e.pageX - a.left);
      else {
        if (!hasClass(this.elements.display.seekTooltip, i))
          return;
        s = parseFloat(this.elements.display.seekTooltip.style.left, 10);
      }
      s < 0 ? s = 0 : s > 100 && (s = 100), controls.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * s), this.elements.display.seekTooltip.style.left = "".concat(s, "%"), is$1.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && n("mouseenter" === e.type);
    }
  }
}, timeUpdate: function(e) {
  var t = !is$1.element(this.elements.display.duration) && this.config.invertTime;
  controls.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || controls.updateProgress.call(this, e);
}, durationUpdate: function() {
  if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
    if (this.duration >= Math.pow(2, 32))
      return toggleHidden(this.elements.display.currentTime, true), void toggleHidden(this.elements.progress, true);
    is$1.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
    var e = is$1.element(this.elements.display.duration);
    !e && this.config.displayDuration && this.paused && controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), controls.updateSeekTooltip.call(this);
  }
}, toggleMenuButton: function(e, t) {
  toggleHidden(this.elements.settings.buttons[e], !t);
}, updateSetting: function(e, t, i) {
  var n = this.elements.settings.panels[e], s = null, a = t;
  if ("captions" === e)
    s = this.currentTrack;
  else {
    if (s = is$1.empty(i) ? this[e] : i, is$1.empty(s) && (s = this.config[e].default), !is$1.empty(this.options[e]) && !this.options[e].includes(s))
      return void this.debug.warn("Unsupported value of '".concat(s, "' for ").concat(e));
    if (!this.config[e].options.includes(s))
      return void this.debug.warn("Disabled value of '".concat(s, "' for ").concat(e));
  }
  if (is$1.element(a) || (a = n && n.querySelector('[role="menu"]')), is$1.element(a)) {
    this.elements.settings.buttons[e].querySelector(".".concat(this.config.classNames.menu.value)).innerHTML = controls.getLabel.call(this, e, s);
    var r = a && a.querySelector('[value="'.concat(s, '"]'));
    is$1.element(r) && (r.checked = true);
  }
}, getLabel: function(e, t) {
  switch (e) {
    case "speed":
      return 1 === t ? i18n.get("normal", this.config) : "".concat(t, "&times;");
    case "quality":
      if (is$1.number(t)) {
        var i = i18n.get("qualityLabel.".concat(t), this.config);
        return i.length ? i : "".concat(t, "p");
      }
      return toTitleCase(t);
    case "captions":
      return captions.getLabel.call(this);
    default:
      return null;
  }
}, setQualityMenu: function(e) {
  var t = this;
  if (is$1.element(this.elements.settings.panels.quality)) {
    var i = "quality", n = this.elements.settings.panels.quality.querySelector('[role="menu"]');
    is$1.array(e) && (this.options.quality = dedupe(e).filter(function(e2) {
      return t.config.quality.options.includes(e2);
    }));
    var s = !is$1.empty(this.options.quality) && this.options.quality.length > 1;
    if (controls.toggleMenuButton.call(this, i, s), emptyElement(n), controls.checkMenu.call(this), s) {
      var a = function(e2) {
        var i2 = i18n.get("qualityBadge.".concat(e2), t.config);
        return i2.length ? controls.createBadge.call(t, i2) : null;
      };
      this.options.quality.sort(function(e2, i2) {
        var n2 = t.config.quality.options;
        return n2.indexOf(e2) > n2.indexOf(i2) ? 1 : -1;
      }).forEach(function(e2) {
        controls.createMenuItem.call(t, { value: e2, list: n, type: i, title: controls.getLabel.call(t, "quality", e2), badge: a(e2) });
      }), controls.updateSetting.call(this, i, n);
    }
  }
}, setCaptionsMenu: function() {
  var e = this;
  if (is$1.element(this.elements.settings.panels.captions)) {
    var t = "captions", i = this.elements.settings.panels.captions.querySelector('[role="menu"]'), n = captions.getTracks.call(this), s = Boolean(n.length);
    if (controls.toggleMenuButton.call(this, t, s), emptyElement(i), controls.checkMenu.call(this), s) {
      var a = n.map(function(t2, n2) {
        return { value: n2, checked: e.captions.toggled && e.currentTrack === n2, title: captions.getLabel.call(e, t2), badge: t2.language && controls.createBadge.call(e, t2.language.toUpperCase()), list: i, type: "language" };
      });
      a.unshift({ value: -1, checked: !this.captions.toggled, title: i18n.get("disabled", this.config), list: i, type: "language" }), a.forEach(controls.createMenuItem.bind(this)), controls.updateSetting.call(this, t, i);
    }
  }
}, setSpeedMenu: function() {
  var e = this;
  if (is$1.element(this.elements.settings.panels.speed)) {
    var t = "speed", i = this.elements.settings.panels.speed.querySelector('[role="menu"]');
    this.options.speed = this.options.speed.filter(function(t2) {
      return t2 >= e.minimumSpeed && t2 <= e.maximumSpeed;
    });
    var n = !is$1.empty(this.options.speed) && this.options.speed.length > 1;
    controls.toggleMenuButton.call(this, t, n), emptyElement(i), controls.checkMenu.call(this), n && (this.options.speed.forEach(function(n2) {
      controls.createMenuItem.call(e, { value: n2, list: i, type: t, title: controls.getLabel.call(e, "speed", n2) });
    }), controls.updateSetting.call(this, t, i));
  }
}, checkMenu: function() {
  var e = this.elements.settings.buttons, t = !is$1.empty(e) && Object.values(e).some(function(e2) {
    return !e2.hidden;
  });
  toggleHidden(this.elements.settings.menu, !t);
}, focusFirstMenuItem: function(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  if (!this.elements.settings.popup.hidden) {
    var i = e;
    is$1.element(i) || (i = Object.values(this.elements.settings.panels).find(function(e2) {
      return !e2.hidden;
    }));
    var n = i.querySelector('[role^="menuitem"]');
    setFocus.call(this, n, t);
  }
}, toggleMenu: function(e) {
  var t = this.elements.settings.popup, i = this.elements.buttons.settings;
  if (is$1.element(t) && is$1.element(i)) {
    var n = t.hidden, s = n;
    if (is$1.boolean(e))
      s = e;
    else if (is$1.keyboardEvent(e) && 27 === e.which)
      s = false;
    else if (is$1.event(e)) {
      var a = is$1.function(e.composedPath) ? e.composedPath()[0] : e.target, r = t.contains(a);
      if (r || !r && e.target !== i && s)
        return;
    }
    i.setAttribute("aria-expanded", s), toggleHidden(t, !s), toggleClass(this.elements.container, this.config.classNames.menu.open, s), s && is$1.keyboardEvent(e) ? controls.focusFirstMenuItem.call(this, null, true) : s || n || setFocus.call(this, i, is$1.keyboardEvent(e));
  }
}, getMenuSize: function(e) {
  var t = e.cloneNode(true);
  t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
  var i = t.scrollWidth, n = t.scrollHeight;
  return removeElement(t), { width: i, height: n };
}, showMenuPanel: function() {
  var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(t));
  if (is$1.element(n)) {
    var s = n.parentNode, a = Array.from(s.children).find(function(e2) {
      return !e2.hidden;
    });
    if (support.transitions && !support.reducedMotion) {
      s.style.width = "".concat(a.scrollWidth, "px"), s.style.height = "".concat(a.scrollHeight, "px");
      var r = controls.getMenuSize.call(this, n), o = function t2(i2) {
        i2.target === s && ["width", "height"].includes(i2.propertyName) && (s.style.width = "", s.style.height = "", off.call(e, s, transitionEndEvent, t2));
      };
      on.call(this, s, transitionEndEvent, o), s.style.width = "".concat(r.width, "px"), s.style.height = "".concat(r.height, "px");
    }
    toggleHidden(a, true), toggleHidden(n, false), controls.focusFirstMenuItem.call(this, n, i);
  }
}, setDownloadUrl: function() {
  var e = this.elements.buttons.download;
  is$1.element(e) && e.setAttribute("href", this.download);
}, create: function(e) {
  var t = this, i = controls.bindMenuItemShortcuts, n = controls.createButton, s = controls.createProgress, a = controls.createRange, r = controls.createTime, o = controls.setQualityMenu, l = controls.setSpeedMenu, c = controls.showMenuPanel;
  this.elements.controls = null, is$1.array(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(n.call(this, "play-large"));
  var u = createElement("div", getAttributesFromSelector(this.config.selectors.controls.wrapper));
  this.elements.controls = u;
  var d = { class: "plyr__controls__item" };
  return dedupe(is$1.array(this.config.controls) ? this.config.controls : []).forEach(function(o2) {
    if ("restart" === o2 && u.appendChild(n.call(t, "restart", d)), "rewind" === o2 && u.appendChild(n.call(t, "rewind", d)), "play" === o2 && u.appendChild(n.call(t, "play", d)), "fast-forward" === o2 && u.appendChild(n.call(t, "fast-forward", d)), "progress" === o2) {
      var l2 = createElement("div", { class: "".concat(d.class, " plyr__progress__container") }), h = createElement("div", getAttributesFromSelector(t.config.selectors.progress));
      if (h.appendChild(a.call(t, "seek", { id: "plyr-seek-".concat(e.id) })), h.appendChild(s.call(t, "buffer")), t.config.tooltips.seek) {
        var m = createElement("span", { class: t.config.classNames.tooltip }, "00:00");
        h.appendChild(m), t.elements.display.seekTooltip = m;
      }
      t.elements.progress = h, l2.appendChild(t.elements.progress), u.appendChild(l2);
    }
    if ("current-time" === o2 && u.appendChild(r.call(t, "currentTime", d)), "duration" === o2 && u.appendChild(r.call(t, "duration", d)), "mute" === o2 || "volume" === o2) {
      var p = t.elements.volume;
      if (is$1.element(p) && u.contains(p) || (p = createElement("div", extend({}, d, { class: "".concat(d.class, " plyr__volume").trim() })), t.elements.volume = p, u.appendChild(p)), "mute" === o2 && p.appendChild(n.call(t, "mute")), "volume" === o2 && !browser.isIos) {
        var g = { max: 1, step: 0.05, value: t.config.volume };
        p.appendChild(a.call(t, "volume", extend(g, { id: "plyr-volume-".concat(e.id) })));
      }
    }
    if ("captions" === o2 && u.appendChild(n.call(t, "captions", d)), "settings" === o2 && !is$1.empty(t.config.settings)) {
      var f = createElement("div", extend({}, d, { class: "".concat(d.class, " plyr__menu").trim(), hidden: "" }));
      f.appendChild(n.call(t, "settings", { "aria-haspopup": true, "aria-controls": "plyr-settings-".concat(e.id), "aria-expanded": false }));
      var y = createElement("div", { class: "plyr__menu__container", id: "plyr-settings-".concat(e.id), hidden: "" }), v = createElement("div"), b = createElement("div", { id: "plyr-settings-".concat(e.id, "-home") }), w = createElement("div", { role: "menu" });
      b.appendChild(w), v.appendChild(b), t.elements.settings.panels.home = b, t.config.settings.forEach(function(n2) {
        var s2 = createElement("button", extend(getAttributesFromSelector(t.config.selectors.buttons.settings), { type: "button", class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--forward"), role: "menuitem", "aria-haspopup": true, hidden: "" }));
        i.call(t, s2, n2), on.call(t, s2, "click", function() {
          c.call(t, n2, false);
        });
        var a2 = createElement("span", null, i18n.get(n2, t.config)), r2 = createElement("span", { class: t.config.classNames.menu.value });
        r2.innerHTML = e[n2], a2.appendChild(r2), s2.appendChild(a2), w.appendChild(s2);
        var o3 = createElement("div", { id: "plyr-settings-".concat(e.id, "-").concat(n2), hidden: "" }), l3 = createElement("button", { type: "button", class: "".concat(t.config.classNames.control, " ").concat(t.config.classNames.control, "--back") });
        l3.appendChild(createElement("span", { "aria-hidden": true }, i18n.get(n2, t.config))), l3.appendChild(createElement("span", { class: t.config.classNames.hidden }, i18n.get("menuBack", t.config))), on.call(t, o3, "keydown", function(e2) {
          37 === e2.which && (e2.preventDefault(), e2.stopPropagation(), c.call(t, "home", true));
        }, false), on.call(t, l3, "click", function() {
          c.call(t, "home", false);
        }), o3.appendChild(l3), o3.appendChild(createElement("div", { role: "menu" })), v.appendChild(o3), t.elements.settings.buttons[n2] = s2, t.elements.settings.panels[n2] = o3;
      }), y.appendChild(v), f.appendChild(y), u.appendChild(f), t.elements.settings.popup = y, t.elements.settings.menu = f;
    }
    if ("pip" === o2 && support.pip && u.appendChild(n.call(t, "pip", d)), "airplay" === o2 && support.airplay && u.appendChild(n.call(t, "airplay", d)), "download" === o2) {
      var k = extend({}, d, { element: "a", href: t.download, target: "_blank" });
      t.isHTML5 && (k.download = "");
      var T = t.config.urls.download;
      !is$1.url(T) && t.isEmbed && extend(k, { icon: "logo-".concat(t.provider), label: t.provider }), u.appendChild(n.call(t, "download", k));
    }
    "fullscreen" === o2 && u.appendChild(n.call(t, "fullscreen", d));
  }), this.isHTML5 && o.call(this, html5.getQualityOptions.call(this)), l.call(this), u;
}, inject: function() {
  var e = this;
  if (this.config.loadSprite) {
    var t = controls.getIconUrl.call(this);
    t.cors && loadSprite(t.url, "sprite-plyr");
  }
  this.id = Math.floor(1e4 * Math.random());
  var i = null;
  this.elements.controls = null;
  var n = { id: this.id, seektime: this.config.seekTime, title: this.config.title }, s = true;
  is$1.function(this.config.controls) && (this.config.controls = this.config.controls.call(this, n)), this.config.controls || (this.config.controls = []), is$1.element(this.config.controls) || is$1.string(this.config.controls) ? i = this.config.controls : (i = controls.create.call(this, { id: this.id, seektime: this.config.seekTime, speed: this.speed, quality: this.quality, captions: captions.getLabel.call(this) }), s = false);
  var a, r;
  if (s && is$1.string(this.config.controls) && (a = i, Object.entries(n).forEach(function(e2) {
    var t2 = _slicedToArray(e2, 2), i2 = t2[0], n2 = t2[1];
    a = replaceAll(a, "{".concat(i2, "}"), n2);
  }), i = a), is$1.string(this.config.selectors.controls.container) && (r = document.querySelector(this.config.selectors.controls.container)), is$1.element(r) || (r = this.elements.container), r[is$1.element(i) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", i), is$1.element(this.elements.controls) || controls.findElements.call(this), !is$1.empty(this.elements.buttons)) {
    var o = function(t2) {
      var i2 = e.config.classNames.controlPressed;
      Object.defineProperty(t2, "pressed", { enumerable: true, get: function() {
        return hasClass(t2, i2);
      }, set: function() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        toggleClass(t2, i2, e2);
      } });
    };
    Object.values(this.elements.buttons).filter(Boolean).forEach(function(e2) {
      is$1.array(e2) || is$1.nodeList(e2) ? Array.from(e2).filter(Boolean).forEach(o) : o(e2);
    });
  }
  if (browser.isEdge && repaint(r), this.config.tooltips.controls) {
    var l = this.config, c = l.classNames, u = l.selectors, d = "".concat(u.controls.wrapper, " ").concat(u.labels, " .").concat(c.hidden), h = getElements.call(this, d);
    Array.from(h).forEach(function(t2) {
      toggleClass(t2, e.config.classNames.hidden, false), toggleClass(t2, e.config.classNames.tooltip, true);
    });
  }
} };
function parseUrl(e) {
  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = e;
  if (t) {
    var n = document.createElement("a");
    n.href = i, i = n.href;
  }
  try {
    return new URL(i);
  } catch (e2) {
    return null;
  }
}
function buildUrlParams(e) {
  var t = new URLSearchParams();
  return is$1.object(e) && Object.entries(e).forEach(function(e2) {
    var i = _slicedToArray(e2, 2), n = i[0], s = i[1];
    t.set(n, s);
  }), t;
}
var captions = { setup: function() {
  if (this.supported.ui)
    if (!this.isVideo || this.isYouTube || this.isHTML5 && !support.textTracks)
      is$1.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this);
    else {
      if (is$1.element(this.elements.captions) || (this.elements.captions = createElement("div", getAttributesFromSelector(this.config.selectors.captions)), insertAfter(this.elements.captions, this.elements.wrapper)), browser.isIE && window.URL) {
        var e = this.media.querySelectorAll("track");
        Array.from(e).forEach(function(e2) {
          var t2 = e2.getAttribute("src"), i2 = parseUrl(t2);
          null !== i2 && i2.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i2.protocol) && fetch(t2, "blob").then(function(t3) {
            e2.setAttribute("src", window.URL.createObjectURL(t3));
          }).catch(function() {
            removeElement(e2);
          });
        });
      }
      var t = dedupe((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map(function(e2) {
        return e2.split("-")[0];
      })), i = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
      if ("auto" === i)
        i = _slicedToArray(t, 1)[0];
      var n = this.storage.get("captions");
      if (is$1.boolean(n) || (n = this.config.captions.active), Object.assign(this.captions, { toggled: false, active: n, language: i, languages: t }), this.isHTML5) {
        var s = this.config.captions.update ? "addtrack removetrack" : "removetrack";
        on.call(this, this.media.textTracks, s, captions.update.bind(this));
      }
      setTimeout(captions.update.bind(this), 0);
    }
}, update: function() {
  var e = this, t = captions.getTracks.call(this, true), i = this.captions, n = i.active, s = i.language, a = i.meta, r = i.currentTrackNode, o = Boolean(t.find(function(e2) {
    return e2.language === s;
  }));
  this.isHTML5 && this.isVideo && t.filter(function(e2) {
    return !a.get(e2);
  }).forEach(function(t2) {
    e.debug.log("Track added", t2), a.set(t2, { default: "showing" === t2.mode }), "showing" === t2.mode && (t2.mode = "hidden"), on.call(e, t2, "cuechange", function() {
      return captions.updateCues.call(e);
    });
  }), (o && this.language !== s || !t.includes(r)) && (captions.setLanguage.call(this, s), captions.toggle.call(this, n && o)), toggleClass(this.elements.container, this.config.classNames.captions.enabled, !is$1.empty(t)), is$1.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this);
}, toggle: function(e) {
  var t = this, i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  if (this.supported.ui) {
    var n = this.captions.toggled, s = this.config.classNames.captions.active, a = is$1.nullOrUndefined(e) ? !n : e;
    if (a !== n) {
      if (i || (this.captions.active = a, this.storage.set({ captions: a })), !this.language && a && !i) {
        var r = captions.getTracks.call(this), o = captions.findTrack.call(this, [this.captions.language].concat(_toConsumableArray(this.captions.languages)), true);
        return this.captions.language = o.language, void captions.set.call(this, r.indexOf(o));
      }
      this.elements.buttons.captions && (this.elements.buttons.captions.pressed = a), toggleClass(this.elements.container, s, a), this.captions.toggled = a, controls.updateSetting.call(this, "captions"), triggerEvent.call(this, this.media, a ? "captionsenabled" : "captionsdisabled");
    }
    setTimeout(function() {
      a && t.captions.toggled && (t.captions.currentTrackNode.mode = "hidden");
    });
  }
}, set: function(e) {
  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = captions.getTracks.call(this);
  if (-1 !== e)
    if (is$1.number(e))
      if (e in i) {
        if (this.captions.currentTrack !== e) {
          this.captions.currentTrack = e;
          var n = i[e], s = n || {}, a = s.language;
          this.captions.currentTrackNode = n, controls.updateSetting.call(this, "captions"), t || (this.captions.language = a, this.storage.set({ language: a })), this.isVimeo && this.embed.enableTextTrack(a), triggerEvent.call(this, this.media, "languagechange");
        }
        captions.toggle.call(this, true, t), this.isHTML5 && this.isVideo && captions.updateCues.call(this);
      } else
        this.debug.warn("Track not found", e);
    else
      this.debug.warn("Invalid caption argument", e);
  else
    captions.toggle.call(this, false, t);
}, setLanguage: function(e) {
  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  if (is$1.string(e)) {
    var i = e.toLowerCase();
    this.captions.language = i;
    var n = captions.getTracks.call(this), s = captions.findTrack.call(this, [i]);
    captions.set.call(this, n.indexOf(s), t);
  } else
    this.debug.warn("Invalid language argument", e);
}, getTracks: function() {
  var e = this, t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], i = Array.from((this.media || {}).textTracks || []);
  return i.filter(function(i2) {
    return !e.isHTML5 || t || e.captions.meta.has(i2);
  }).filter(function(e2) {
    return ["captions", "subtitles"].includes(e2.kind);
  });
}, findTrack: function(e) {
  var t, i = this, n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], s = captions.getTracks.call(this), a = function(e2) {
    return Number((i.captions.meta.get(e2) || {}).default);
  }, r = Array.from(s).sort(function(e2, t2) {
    return a(t2) - a(e2);
  });
  return e.every(function(e2) {
    return !(t = r.find(function(t2) {
      return t2.language === e2;
    }));
  }), t || (n ? r[0] : void 0);
}, getCurrentTrack: function() {
  return captions.getTracks.call(this)[this.currentTrack];
}, getLabel: function(e) {
  var t = e;
  return !is$1.track(t) && support.textTracks && this.captions.toggled && (t = captions.getCurrentTrack.call(this)), is$1.track(t) ? is$1.empty(t.label) ? is$1.empty(t.language) ? i18n.get("enabled", this.config) : e.language.toUpperCase() : t.label : i18n.get("disabled", this.config);
}, updateCues: function(e) {
  if (this.supported.ui)
    if (is$1.element(this.elements.captions))
      if (is$1.nullOrUndefined(e) || Array.isArray(e)) {
        var t = e;
        if (!t) {
          var i = captions.getCurrentTrack.call(this);
          t = Array.from((i || {}).activeCues || []).map(function(e2) {
            return e2.getCueAsHTML();
          }).map(getHTML);
        }
        var n = t.map(function(e2) {
          return e2.trim();
        }).join("\n");
        if (n !== this.elements.captions.innerHTML) {
          emptyElement(this.elements.captions);
          var s = createElement("span", getAttributesFromSelector(this.config.selectors.caption));
          s.innerHTML = n, this.elements.captions.appendChild(s), triggerEvent.call(this, this.media, "cuechange");
        }
      } else
        this.debug.warn("updateCues: Invalid input", e);
    else
      this.debug.warn("No captions element to render to");
} };
var defaults$1 = { enabled: true, title: "", debug: false, autoplay: false, autopause: true, playsinline: true, seekTime: 10, volume: 1, muted: false, duration: null, displayDuration: true, invertTime: true, toggleInvert: true, ratio: null, clickToPlay: true, hideControls: true, resetOnEnd: false, disableContextMenu: true, loadSprite: true, iconPrefix: "plyr", iconUrl: "https://cdn.plyr.io/3.6.3/plyr.svg", blankVideo: "https://cdn.plyr.io/static/blank.mp4", quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240], forced: false, onChange: null }, loop: { active: false }, speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] }, keyboard: { focused: true, global: false }, tooltips: { controls: false, seek: true }, captions: { active: false, language: "auto", update: false }, fullscreen: { enabled: true, fallback: true, iosNative: false }, storage: { enabled: true, key: "plyr" }, controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"], settings: ["captions", "quality", "speed"], i18n: { restart: "Restart", rewind: "Rewind {seektime}s", play: "Play", pause: "Pause", fastForward: "Forward {seektime}s", seek: "Seek", seekLabel: "{currentTime} of {duration}", played: "Played", buffered: "Buffered", currentTime: "Current time", duration: "Duration", volume: "Volume", mute: "Mute", unmute: "Unmute", enableCaptions: "Enable captions", disableCaptions: "Disable captions", download: "Download", enterFullscreen: "Enter fullscreen", exitFullscreen: "Exit fullscreen", frameTitle: "Player for {title}", captions: "Captions", settings: "Settings", pip: "PIP", menuBack: "Go back to previous menu", speed: "Speed", normal: "Normal", quality: "Quality", loop: "Loop", start: "Start", end: "End", all: "All", reset: "Reset", disabled: "Disabled", enabled: "Enabled", advertisement: "Ad", qualityBadge: { 2160: "4K", 1440: "HD", 1080: "HD", 720: "HD", 576: "SD", 480: "SD" } }, urls: { download: null, vimeo: { sdk: "https://player.vimeo.com/api/player.js", iframe: "https://player.vimeo.com/video/{0}?{1}", api: "https://vimeo.com/api/oembed.json?url={0}" }, youtube: { sdk: "https://www.youtube.com/iframe_api", api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}" }, googleIMA: { sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js" } }, listeners: { seek: null, play: null, pause: null, restart: null, rewind: null, fastForward: null, mute: null, volume: null, captions: null, download: null, fullscreen: null, pip: null, airplay: null, speed: null, quality: null, loop: null, language: null }, events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"], selectors: { editable: "input, textarea, select, [contenteditable]", container: ".plyr", controls: { container: null, wrapper: ".plyr__controls" }, labels: "[data-plyr]", buttons: { play: '[data-plyr="play"]', pause: '[data-plyr="pause"]', restart: '[data-plyr="restart"]', rewind: '[data-plyr="rewind"]', fastForward: '[data-plyr="fast-forward"]', mute: '[data-plyr="mute"]', captions: '[data-plyr="captions"]', download: '[data-plyr="download"]', fullscreen: '[data-plyr="fullscreen"]', pip: '[data-plyr="pip"]', airplay: '[data-plyr="airplay"]', settings: '[data-plyr="settings"]', loop: '[data-plyr="loop"]' }, inputs: { seek: '[data-plyr="seek"]', volume: '[data-plyr="volume"]', speed: '[data-plyr="speed"]', language: '[data-plyr="language"]', quality: '[data-plyr="quality"]' }, display: { currentTime: ".plyr__time--current", duration: ".plyr__time--duration", buffer: ".plyr__progress__buffer", loop: ".plyr__progress__loop", volume: ".plyr__volume--display" }, progress: ".plyr__progress", captions: ".plyr__captions", caption: ".plyr__caption" }, classNames: { type: "plyr--{0}", provider: "plyr--{0}", video: "plyr__video-wrapper", embed: "plyr__video-embed", videoFixedRatio: "plyr__video-wrapper--fixed-ratio", embedContainer: "plyr__video-embed__container", poster: "plyr__poster", posterEnabled: "plyr__poster-enabled", ads: "plyr__ads", control: "plyr__control", controlPressed: "plyr__control--pressed", playing: "plyr--playing", paused: "plyr--paused", stopped: "plyr--stopped", loading: "plyr--loading", hover: "plyr--hover", tooltip: "plyr__tooltip", cues: "plyr__cues", hidden: "plyr__sr-only", hideControls: "plyr--hide-controls", isIos: "plyr--is-ios", isTouch: "plyr--is-touch", uiSupported: "plyr--full-ui", noTransition: "plyr--no-transition", display: { time: "plyr__time" }, menu: { value: "plyr__menu__value", badge: "plyr__badge", open: "plyr--menu-open" }, captions: { enabled: "plyr--captions-enabled", active: "plyr--captions-active" }, fullscreen: { enabled: "plyr--fullscreen-enabled", fallback: "plyr--fullscreen-fallback" }, pip: { supported: "plyr--pip-supported", active: "plyr--pip-active" }, airplay: { supported: "plyr--airplay-supported", active: "plyr--airplay-active" }, tabFocus: "plyr__tab-focus", previewThumbnails: { thumbContainer: "plyr__preview-thumb", thumbContainerShown: "plyr__preview-thumb--is-shown", imageContainer: "plyr__preview-thumb__image-container", timeContainer: "plyr__preview-thumb__time-container", scrubbingContainer: "plyr__preview-scrubbing", scrubbingContainerShown: "plyr__preview-scrubbing--is-shown" } }, attributes: { embed: { provider: "data-plyr-provider", id: "data-plyr-embed-id" } }, ads: { enabled: false, publisherId: "", tagUrl: "" }, previewThumbnails: { enabled: false, src: "" }, vimeo: { byline: false, portrait: false, title: false, speed: true, transparent: false, customControls: true, referrerPolicy: null, premium: false }, youtube: { rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1, customControls: true, noCookie: false } };
var pip = { active: "picture-in-picture", inactive: "inline" };
var providers = { html5: "html5", youtube: "youtube", vimeo: "vimeo" };
var types = { audio: "audio", video: "video" };
function getProviderByUrl(e) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? providers.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? providers.vimeo : null;
}
var noop = function() {
};
var Console = function() {
  function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    _classCallCheck(this, e), this.enabled = window.console && t, this.enabled && this.log("Debugging enabled");
  }
  return _createClass(e, [{ key: "log", get: function() {
    return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
  } }, { key: "warn", get: function() {
    return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
  } }, { key: "error", get: function() {
    return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
  } }]), e;
}();
var Fullscreen = function() {
  function e(t) {
    var i = this;
    _classCallCheck(this, e), this.player = t, this.prefix = e.prefix, this.property = e.property, this.scrollPosition = { x: 0, y: 0 }, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && closest(this.player.elements.container, t.config.fullscreen.container), on.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), function() {
      i.onChange();
    }), on.call(this.player, this.player.elements.container, "dblclick", function(e2) {
      is$1.element(i.player.elements.controls) && i.player.elements.controls.contains(e2.target) || i.player.listeners.proxy(e2, i.toggle, "fullscreen");
    }), on.call(this, this.player.elements.container, "keydown", function(e2) {
      return i.trapFocus(e2);
    }), this.update();
  }
  return _createClass(e, [{ key: "onChange", value: function() {
    if (this.enabled) {
      var e2 = this.player.elements.buttons.fullscreen;
      is$1.element(e2) && (e2.pressed = this.active);
      var t = this.target === this.player.media ? this.target : this.player.elements.container;
      triggerEvent.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", true);
    }
  } }, { key: "toggleFallback", value: function() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    if (e2 ? this.scrollPosition = { x: window.scrollX || 0, y: window.scrollY || 0 } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e2 ? "hidden" : "", toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, e2), browser.isIos) {
      var t = document.head.querySelector('meta[name="viewport"]'), i = "viewport-fit=cover";
      t || (t = document.createElement("meta")).setAttribute("name", "viewport");
      var n = is$1.string(t.content) && t.content.includes(i);
      e2 ? (this.cleanupViewport = !n, n || (t.content += ",".concat(i))) : this.cleanupViewport && (t.content = t.content.split(",").filter(function(e3) {
        return e3.trim() !== i;
      }).join(","));
    }
    this.onChange();
  } }, { key: "trapFocus", value: function(e2) {
    if (!browser.isIos && this.active && "Tab" === e2.key && 9 === e2.keyCode) {
      var t = document.activeElement, i = getElements.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"), n = _slicedToArray(i, 1)[0], s = i[i.length - 1];
      t !== s || e2.shiftKey ? t === n && e2.shiftKey && (s.focus(), e2.preventDefault()) : (n.focus(), e2.preventDefault());
    }
  } }, { key: "update", value: function() {
    var t;
    this.enabled ? (t = this.forceFallback ? "Fallback (forced)" : e.native ? "Native" : "Fallback", this.player.debug.log("".concat(t, " fullscreen enabled"))) : this.player.debug.log("Fullscreen not supported and fallback disabled");
    toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
  } }, { key: "enter", value: function() {
    this.enabled && (browser.isIos && this.player.config.fullscreen.iosNative ? this.target.webkitEnterFullscreen() : !e.native || this.forceFallback ? this.toggleFallback(true) : this.prefix ? is$1.empty(this.prefix) || this.target["".concat(this.prefix, "Request").concat(this.property)]() : this.target.requestFullscreen({ navigationUI: "hide" }));
  } }, { key: "exit", value: function() {
    if (this.enabled)
      if (browser.isIos && this.player.config.fullscreen.iosNative)
        this.target.webkitExitFullscreen(), silencePromise(this.player.play());
      else if (!e.native || this.forceFallback)
        this.toggleFallback(false);
      else if (this.prefix) {
        if (!is$1.empty(this.prefix)) {
          var t = "moz" === this.prefix ? "Cancel" : "Exit";
          document["".concat(this.prefix).concat(t).concat(this.property)]();
        }
      } else
        (document.cancelFullScreen || document.exitFullscreen).call(document);
  } }, { key: "toggle", value: function() {
    this.active ? this.exit() : this.enter();
  } }, { key: "usingNative", get: function() {
    return e.native && !this.forceFallback;
  } }, { key: "enabled", get: function() {
    return (e.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
  } }, { key: "active", get: function() {
    if (!this.enabled)
      return false;
    if (!e.native || this.forceFallback)
      return hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
    var t = this.prefix ? document["".concat(this.prefix).concat(this.property, "Element")] : document.fullscreenElement;
    return t && t.shadowRoot ? t === this.target.getRootNode().host : t === this.target;
  } }, { key: "target", get: function() {
    return browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
  } }], [{ key: "native", get: function() {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
  } }, { key: "prefix", get: function() {
    if (is$1.function(document.exitFullscreen))
      return "";
    var e2 = "";
    return ["webkit", "moz", "ms"].some(function(t) {
      return !(!is$1.function(document["".concat(t, "ExitFullscreen")]) && !is$1.function(document["".concat(t, "CancelFullScreen")])) && (e2 = t, true);
    }), e2;
  } }, { key: "property", get: function() {
    return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
  } }]), e;
}();
function loadImage(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
  return new Promise(function(i, n) {
    var s = new Image(), a = function() {
      delete s.onload, delete s.onerror, (s.naturalWidth >= t ? i : n)(s);
    };
    Object.assign(s, { onload: a, onerror: a, src: e });
  });
}
var ui = { addStyleHook: function() {
  toggleClass(this.elements.container, this.config.selectors.container.replace(".", ""), true), toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
}, toggleNativeControls: function() {
  var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
  e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
}, build: function() {
  var e = this;
  if (this.listeners.media(), !this.supported.ui)
    return this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type)), void ui.toggleNativeControls.call(this, true);
  is$1.element(this.elements.controls) || (controls.inject.call(this), this.listeners.controls()), ui.toggleNativeControls.call(this), this.isHTML5 && captions.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, controls.updateVolume.call(this), controls.timeUpdate.call(this), ui.checkPlaying.call(this), toggleClass(this.elements.container, this.config.classNames.pip.supported, support.pip && this.isHTML5 && this.isVideo), toggleClass(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5), toggleClass(this.elements.container, this.config.classNames.isIos, browser.isIos), toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = true, setTimeout(function() {
    triggerEvent.call(e, e.media, "ready");
  }, 0), ui.setTitle.call(this), this.poster && ui.setPoster.call(this, this.poster, false).catch(function() {
  }), this.config.duration && controls.durationUpdate.call(this);
}, setTitle: function() {
  var e = i18n.get("play", this.config);
  if (is$1.string(this.config.title) && !is$1.empty(this.config.title) && (e += ", ".concat(this.config.title)), Array.from(this.elements.buttons.play || []).forEach(function(t2) {
    t2.setAttribute("aria-label", e);
  }), this.isEmbed) {
    var t = getElement.call(this, "iframe");
    if (!is$1.element(t))
      return;
    var i = is$1.empty(this.config.title) ? "video" : this.config.title, n = i18n.get("frameTitle", this.config);
    t.setAttribute("title", n.replace("{title}", i));
  }
}, togglePoster: function(e) {
  toggleClass(this.elements.container, this.config.classNames.posterEnabled, e);
}, setPoster: function(e) {
  var t = this, i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
  return i && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), ready.call(this).then(function() {
    return loadImage(e);
  }).catch(function(i2) {
    throw e === t.poster && ui.togglePoster.call(t, false), i2;
  }).then(function() {
    if (e !== t.poster)
      throw new Error("setPoster cancelled by later call to setPoster");
  }).then(function() {
    return Object.assign(t.elements.poster.style, { backgroundImage: "url('".concat(e, "')"), backgroundSize: "" }), ui.togglePoster.call(t, true), e;
  }));
}, checkPlaying: function(e) {
  var t = this;
  toggleClass(this.elements.container, this.config.classNames.playing, this.playing), toggleClass(this.elements.container, this.config.classNames.paused, this.paused), toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(function(e2) {
    Object.assign(e2, { pressed: t.playing }), e2.setAttribute("aria-label", i18n.get(t.playing ? "pause" : "play", t.config));
  }), is$1.event(e) && "timeupdate" === e.type || ui.toggleControls.call(this);
}, checkLoading: function(e) {
  var t = this;
  this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function() {
    toggleClass(t.elements.container, t.config.classNames.loading, t.loading), ui.toggleControls.call(t);
  }, this.loading ? 250 : 0);
}, toggleControls: function(e) {
  var t = this.elements.controls;
  if (t && this.config.hideControls) {
    var i = this.touch && this.lastSeekTime + 2e3 > Date.now();
    this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || i));
  }
}, migrateStyles: function() {
  var e = this;
  Object.values(_objectSpread2({}, this.media.style)).filter(function(e2) {
    return !is$1.empty(e2) && is$1.string(e2) && e2.startsWith("--plyr");
  }).forEach(function(t) {
    e.elements.container.style.setProperty(t, e.media.style.getPropertyValue(t)), e.media.style.removeProperty(t);
  }), is$1.empty(this.media.style) && this.media.removeAttribute("style");
} };
var Listeners = function() {
  function e(t) {
    _classCallCheck(this, e), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
  }
  return _createClass(e, [{ key: "handleKey", value: function(e2) {
    var t = this.player, i = t.elements, n = e2.keyCode ? e2.keyCode : e2.which, s = "keydown" === e2.type, a = s && n === this.lastKey;
    if (!(e2.altKey || e2.ctrlKey || e2.metaKey || e2.shiftKey) && is$1.number(n)) {
      if (s) {
        var r = document.activeElement;
        if (is$1.element(r)) {
          var o = t.config.selectors.editable;
          if (r !== i.inputs.seek && matches$1(r, o))
            return;
          if (32 === e2.which && matches$1(r, 'button, [role^="menuitem"]'))
            return;
        }
        switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(n) && (e2.preventDefault(), e2.stopPropagation()), n) {
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            a || (t.currentTime = t.duration / 10 * (n - 48));
            break;
          case 32:
          case 75:
            a || silencePromise(t.togglePlay());
            break;
          case 38:
            t.increaseVolume(0.1);
            break;
          case 40:
            t.decreaseVolume(0.1);
            break;
          case 77:
            a || (t.muted = !t.muted);
            break;
          case 39:
            t.forward();
            break;
          case 37:
            t.rewind();
            break;
          case 70:
            t.fullscreen.toggle();
            break;
          case 67:
            a || t.toggleCaptions();
            break;
          case 76:
            t.loop = !t.loop;
        }
        27 === n && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = n;
      } else
        this.lastKey = null;
    }
  } }, { key: "toggleMenu", value: function(e2) {
    controls.toggleMenu.call(this.player, e2);
  } }, { key: "firstTouch", value: function() {
    var e2 = this.player, t = e2.elements;
    e2.touch = true, toggleClass(t.container, e2.config.classNames.isTouch, true);
  } }, { key: "setTabFocus", value: function(e2) {
    var t = this.player, i = t.elements;
    if (clearTimeout(this.focusTimer), "keydown" !== e2.type || 9 === e2.which) {
      "keydown" === e2.type && (this.lastKeyDown = e2.timeStamp);
      var n, s = e2.timeStamp - this.lastKeyDown <= 20;
      if ("focus" !== e2.type || s)
        n = t.config.classNames.tabFocus, toggleClass(getElements.call(t, ".".concat(n)), n, false), "focusout" !== e2.type && (this.focusTimer = setTimeout(function() {
          var e3 = document.activeElement;
          i.container.contains(e3) && toggleClass(document.activeElement, t.config.classNames.tabFocus, true);
        }, 10));
    }
  } }, { key: "global", value: function() {
    var e2 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t = this.player;
    t.config.keyboard.global && toggleListener.call(t, window, "keydown keyup", this.handleKey, e2, false), toggleListener.call(t, document.body, "click", this.toggleMenu, e2), once.call(t, document.body, "touchstart", this.firstTouch), toggleListener.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e2, false, true);
  } }, { key: "container", value: function() {
    var e2 = this.player, t = e2.config, i = e2.elements, n = e2.timers;
    !t.keyboard.global && t.keyboard.focused && on.call(e2, i.container, "keydown keyup", this.handleKey, false), on.call(e2, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", function(t2) {
      var s2 = i.controls;
      s2 && "enterfullscreen" === t2.type && (s2.pressed = false, s2.hover = false);
      var a2 = 0;
      ["touchstart", "touchmove", "mousemove"].includes(t2.type) && (ui.toggleControls.call(e2, true), a2 = e2.touch ? 3e3 : 2e3), clearTimeout(n.controls), n.controls = setTimeout(function() {
        return ui.toggleControls.call(e2, false);
      }, a2);
    });
    var s = function(t2) {
      if (!t2)
        return setAspectRatio.call(e2);
      var n2 = i.container.getBoundingClientRect(), s2 = n2.width, a2 = n2.height;
      return setAspectRatio.call(e2, "".concat(s2, ":").concat(a2));
    }, a = function() {
      clearTimeout(n.resized), n.resized = setTimeout(s, 50);
    };
    on.call(e2, i.container, "enterfullscreen exitfullscreen", function(t2) {
      var n2 = e2.fullscreen, r = n2.target, o = n2.usingNative;
      if (r === i.container && (e2.isEmbed || !is$1.empty(e2.config.ratio))) {
        var l = "enterfullscreen" === t2.type, c = s(l);
        c.padding;
        !function(t3, i2, n3) {
          if (e2.isVimeo && !e2.config.vimeo.premium) {
            var s2 = e2.elements.wrapper.firstChild, a2 = _slicedToArray(t3, 2)[1], r2 = _slicedToArray(getAspectRatio.call(e2), 2), o2 = r2[0], l2 = r2[1];
            s2.style.maxWidth = n3 ? "".concat(a2 / l2 * o2, "px") : null, s2.style.margin = n3 ? "0 auto" : null;
          }
        }(c.ratio, 0, l), l && setTimeout(function() {
          return repaint(i.container);
        }, 100), o || (l ? on.call(e2, window, "resize", a) : off.call(e2, window, "resize", a));
      }
    });
  } }, { key: "media", value: function() {
    var e2 = this, t = this.player, i = t.elements;
    if (on.call(t, t.media, "timeupdate seeking seeked", function(e3) {
      return controls.timeUpdate.call(t, e3);
    }), on.call(t, t.media, "durationchange loadeddata loadedmetadata", function(e3) {
      return controls.durationUpdate.call(t, e3);
    }), on.call(t, t.media, "ended", function() {
      t.isHTML5 && t.isVideo && t.config.resetOnEnd && (t.restart(), t.pause());
    }), on.call(t, t.media, "progress playing seeking seeked", function(e3) {
      return controls.updateProgress.call(t, e3);
    }), on.call(t, t.media, "volumechange", function(e3) {
      return controls.updateVolume.call(t, e3);
    }), on.call(t, t.media, "playing play pause ended emptied timeupdate", function(e3) {
      return ui.checkPlaying.call(t, e3);
    }), on.call(t, t.media, "waiting canplay seeked playing", function(e3) {
      return ui.checkLoading.call(t, e3);
    }), t.supported.ui && t.config.clickToPlay && !t.isAudio) {
      var n = getElement.call(t, ".".concat(t.config.classNames.video));
      if (!is$1.element(n))
        return;
      on.call(t, i.container, "click", function(s2) {
        ([i.container, n].includes(s2.target) || n.contains(s2.target)) && (t.touch && t.config.hideControls || (t.ended ? (e2.proxy(s2, t.restart, "restart"), e2.proxy(s2, function() {
          silencePromise(t.play());
        }, "play")) : e2.proxy(s2, function() {
          silencePromise(t.togglePlay());
        }, "play")));
      });
    }
    t.supported.ui && t.config.disableContextMenu && on.call(t, i.wrapper, "contextmenu", function(e3) {
      e3.preventDefault();
    }, false), on.call(t, t.media, "volumechange", function() {
      t.storage.set({ volume: t.volume, muted: t.muted });
    }), on.call(t, t.media, "ratechange", function() {
      controls.updateSetting.call(t, "speed"), t.storage.set({ speed: t.speed });
    }), on.call(t, t.media, "qualitychange", function(e3) {
      controls.updateSetting.call(t, "quality", null, e3.detail.quality);
    }), on.call(t, t.media, "ready qualitychange", function() {
      controls.setDownloadUrl.call(t);
    });
    var s = t.config.events.concat(["keyup", "keydown"]).join(" ");
    on.call(t, t.media, s, function(e3) {
      var n2 = e3.detail, s2 = void 0 === n2 ? {} : n2;
      "error" === e3.type && (s2 = t.media.error), triggerEvent.call(t, i.container, e3.type, true, s2);
    });
  } }, { key: "proxy", value: function(e2, t, i) {
    var n = this.player, s = n.config.listeners[i], a = true;
    is$1.function(s) && (a = s.call(n, e2)), false !== a && is$1.function(t) && t.call(n, e2);
  } }, { key: "bind", value: function(e2, t, i, n) {
    var s = this, a = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], r = this.player, o = r.config.listeners[n], l = is$1.function(o);
    on.call(r, e2, t, function(e3) {
      return s.proxy(e3, i, n);
    }, a && !l);
  } }, { key: "controls", value: function() {
    var e2 = this, t = this.player, i = t.elements, n = browser.isIE ? "change" : "input";
    if (i.buttons.play && Array.from(i.buttons.play).forEach(function(i2) {
      e2.bind(i2, "click", function() {
        silencePromise(t.togglePlay());
      }, "play");
    }), this.bind(i.buttons.restart, "click", t.restart, "restart"), this.bind(i.buttons.rewind, "click", function() {
      t.lastSeekTime = Date.now(), t.rewind();
    }, "rewind"), this.bind(i.buttons.fastForward, "click", function() {
      t.lastSeekTime = Date.now(), t.forward();
    }, "fastForward"), this.bind(i.buttons.mute, "click", function() {
      t.muted = !t.muted;
    }, "mute"), this.bind(i.buttons.captions, "click", function() {
      return t.toggleCaptions();
    }), this.bind(i.buttons.download, "click", function() {
      triggerEvent.call(t, t.media, "download");
    }, "download"), this.bind(i.buttons.fullscreen, "click", function() {
      t.fullscreen.toggle();
    }, "fullscreen"), this.bind(i.buttons.pip, "click", function() {
      t.pip = "toggle";
    }, "pip"), this.bind(i.buttons.airplay, "click", t.airplay, "airplay"), this.bind(i.buttons.settings, "click", function(e3) {
      e3.stopPropagation(), e3.preventDefault(), controls.toggleMenu.call(t, e3);
    }, null, false), this.bind(i.buttons.settings, "keyup", function(e3) {
      var i2 = e3.which;
      [13, 32].includes(i2) && (13 !== i2 ? (e3.preventDefault(), e3.stopPropagation(), controls.toggleMenu.call(t, e3)) : controls.focusFirstMenuItem.call(t, null, true));
    }, null, false), this.bind(i.settings.menu, "keydown", function(e3) {
      27 === e3.which && controls.toggleMenu.call(t, e3);
    }), this.bind(i.inputs.seek, "mousedown mousemove", function(e3) {
      var t2 = i.progress.getBoundingClientRect(), n2 = 100 / t2.width * (e3.pageX - t2.left);
      e3.currentTarget.setAttribute("seek-value", n2);
    }), this.bind(i.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", function(e3) {
      var i2 = e3.currentTarget, n2 = e3.keyCode ? e3.keyCode : e3.which, s2 = "play-on-seeked";
      if (!is$1.keyboardEvent(e3) || 39 === n2 || 37 === n2) {
        t.lastSeekTime = Date.now();
        var a = i2.hasAttribute(s2), r = ["mouseup", "touchend", "keyup"].includes(e3.type);
        a && r ? (i2.removeAttribute(s2), silencePromise(t.play())) : !r && t.playing && (i2.setAttribute(s2, ""), t.pause());
      }
    }), browser.isIos) {
      var s = getElements.call(t, 'input[type="range"]');
      Array.from(s).forEach(function(t2) {
        return e2.bind(t2, n, function(e3) {
          return repaint(e3.target);
        });
      });
    }
    this.bind(i.inputs.seek, n, function(e3) {
      var i2 = e3.currentTarget, n2 = i2.getAttribute("seek-value");
      is$1.empty(n2) && (n2 = i2.value), i2.removeAttribute("seek-value"), t.currentTime = n2 / i2.max * t.duration;
    }, "seek"), this.bind(i.progress, "mouseenter mouseleave mousemove", function(e3) {
      return controls.updateSeekTooltip.call(t, e3);
    }), this.bind(i.progress, "mousemove touchmove", function(e3) {
      var i2 = t.previewThumbnails;
      i2 && i2.loaded && i2.startMove(e3);
    }), this.bind(i.progress, "mouseleave touchend click", function() {
      var e3 = t.previewThumbnails;
      e3 && e3.loaded && e3.endMove(false, true);
    }), this.bind(i.progress, "mousedown touchstart", function(e3) {
      var i2 = t.previewThumbnails;
      i2 && i2.loaded && i2.startScrubbing(e3);
    }), this.bind(i.progress, "mouseup touchend", function(e3) {
      var i2 = t.previewThumbnails;
      i2 && i2.loaded && i2.endScrubbing(e3);
    }), browser.isWebkit && Array.from(getElements.call(t, 'input[type="range"]')).forEach(function(i2) {
      e2.bind(i2, "input", function(e3) {
        return controls.updateRangeFill.call(t, e3.target);
      });
    }), t.config.toggleInvert && !is$1.element(i.display.duration) && this.bind(i.display.currentTime, "click", function() {
      0 !== t.currentTime && (t.config.invertTime = !t.config.invertTime, controls.timeUpdate.call(t));
    }), this.bind(i.inputs.volume, n, function(e3) {
      t.volume = e3.target.value;
    }, "volume"), this.bind(i.controls, "mouseenter mouseleave", function(e3) {
      i.controls.hover = !t.touch && "mouseenter" === e3.type;
    }), i.fullscreen && Array.from(i.fullscreen.children).filter(function(e3) {
      return !e3.contains(i.container);
    }).forEach(function(n2) {
      e2.bind(n2, "mouseenter mouseleave", function(e3) {
        i.controls.hover = !t.touch && "mouseenter" === e3.type;
      });
    }), this.bind(i.controls, "mousedown mouseup touchstart touchend touchcancel", function(e3) {
      i.controls.pressed = ["mousedown", "touchstart"].includes(e3.type);
    }), this.bind(i.controls, "focusin", function() {
      var n2 = t.config, s2 = t.timers;
      toggleClass(i.controls, n2.classNames.noTransition, true), ui.toggleControls.call(t, true), setTimeout(function() {
        toggleClass(i.controls, n2.classNames.noTransition, false);
      }, 0);
      var a = e2.touch ? 3e3 : 4e3;
      clearTimeout(s2.controls), s2.controls = setTimeout(function() {
        return ui.toggleControls.call(t, false);
      }, a);
    }), this.bind(i.inputs.volume, "wheel", function(e3) {
      var i2 = e3.webkitDirectionInvertedFromDevice, n2 = _slicedToArray([e3.deltaX, -e3.deltaY].map(function(e4) {
        return i2 ? -e4 : e4;
      }), 2), s2 = n2[0], a = n2[1], r = Math.sign(Math.abs(s2) > Math.abs(a) ? s2 : a);
      t.increaseVolume(r / 50);
      var o = t.media.volume;
      (1 === r && o < 1 || -1 === r && o > 0) && e3.preventDefault();
    }, "volume", false);
  } }]), e;
}();
function createCommonjsModule(e, t) {
  return e(t = { exports: {} }, t.exports), t.exports;
}
var loadjs_umd = createCommonjsModule(function(e, t) {
  e.exports = function() {
    var e2 = function() {
    }, t2 = {}, i = {}, n = {};
    function s(e3, t3) {
      e3 = e3.push ? e3 : [e3];
      var s2, a2, r2, o2 = [], l2 = e3.length, c2 = l2;
      for (s2 = function(e4, i2) {
        i2.length && o2.push(e4), --c2 || t3(o2);
      }; l2--; )
        a2 = e3[l2], (r2 = i[a2]) ? s2(a2, r2) : (n[a2] = n[a2] || []).push(s2);
    }
    function a(e3, t3) {
      if (e3) {
        var s2 = n[e3];
        if (i[e3] = t3, s2)
          for (; s2.length; )
            s2[0](e3, t3), s2.splice(0, 1);
      }
    }
    function r(t3, i2) {
      t3.call && (t3 = { success: t3 }), i2.length ? (t3.error || e2)(i2) : (t3.success || e2)(t3);
    }
    function o(t3, i2, n2, s2) {
      var a2, r2, l2 = document, c2 = n2.async, u = (n2.numRetries || 0) + 1, d = n2.before || e2, h = t3.replace(/[\?|#].*$/, ""), m = t3.replace(/^(css|img)!/, "");
      s2 = s2 || 0, /(^css!|\.css$)/.test(h) ? ((r2 = l2.createElement("link")).rel = "stylesheet", r2.href = m, (a2 = "hideFocus" in r2) && r2.relList && (a2 = 0, r2.rel = "preload", r2.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(h) ? (r2 = l2.createElement("img")).src = m : ((r2 = l2.createElement("script")).src = t3, r2.async = void 0 === c2 || c2), r2.onload = r2.onerror = r2.onbeforeload = function(e3) {
        var l3 = e3.type[0];
        if (a2)
          try {
            r2.sheet.cssText.length || (l3 = "e");
          } catch (e4) {
            18 != e4.code && (l3 = "e");
          }
        if ("e" == l3) {
          if ((s2 += 1) < u)
            return o(t3, i2, n2, s2);
        } else if ("preload" == r2.rel && "style" == r2.as)
          return r2.rel = "stylesheet";
        i2(t3, l3, e3.defaultPrevented);
      }, false !== d(t3, r2) && l2.head.appendChild(r2);
    }
    function l(e3, t3, i2) {
      var n2, s2, a2 = (e3 = e3.push ? e3 : [e3]).length, r2 = a2, l2 = [];
      for (n2 = function(e4, i3, n3) {
        if ("e" == i3 && l2.push(e4), "b" == i3) {
          if (!n3)
            return;
          l2.push(e4);
        }
        --a2 || t3(l2);
      }, s2 = 0; s2 < r2; s2++)
        o(e3[s2], n2, i2);
    }
    function c(e3, i2, n2) {
      var s2, o2;
      if (i2 && i2.trim && (s2 = i2), o2 = (s2 ? n2 : i2) || {}, s2) {
        if (s2 in t2)
          throw "LoadJS";
        t2[s2] = true;
      }
      function c2(t3, i3) {
        l(e3, function(e4) {
          r(o2, e4), t3 && r({ success: t3, error: i3 }, e4), a(s2, e4);
        }, o2);
      }
      if (o2.returnPromise)
        return new Promise(c2);
      c2();
    }
    return c.ready = function(e3, t3) {
      return s(e3, function(e4) {
        r(t3, e4);
      }), c;
    }, c.done = function(e3) {
      a(e3, []);
    }, c.reset = function() {
      t2 = {}, i = {}, n = {};
    }, c.isDefined = function(e3) {
      return e3 in t2;
    }, c;
  }();
});
function loadScript(e) {
  return new Promise(function(t, i) {
    loadjs_umd(e, { success: t, error: i });
  });
}
function parseId(e) {
  if (is$1.empty(e))
    return null;
  if (is$1.number(Number(e)))
    return e;
  return e.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : e;
}
function assurePlaybackState(e) {
  e && !this.embed.hasPlayed && (this.embed.hasPlayed = true), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
}
var vimeo = { setup: function() {
  var e = this;
  toggleClass(e.elements.wrapper, e.config.classNames.embed, true), e.options.speed = e.config.speed.options, setAspectRatio.call(e), is$1.object(window.Vimeo) ? vimeo.ready.call(e) : loadScript(e.config.urls.vimeo.sdk).then(function() {
    vimeo.ready.call(e);
  }).catch(function(t) {
    e.debug.warn("Vimeo SDK (player.js) failed to load", t);
  });
}, ready: function() {
  var e = this, t = this, i = t.config.vimeo, n = i.premium, s = i.referrerPolicy, a = _objectWithoutProperties(i, ["premium", "referrerPolicy"]);
  n && Object.assign(a, { controls: false, sidedock: false });
  var r = buildUrlParams(_objectSpread2({ loop: t.config.loop.active, autoplay: t.autoplay, muted: t.muted, gesture: "media", playsinline: !this.config.fullscreen.iosNative }, a)), o = t.media.getAttribute("src");
  is$1.empty(o) && (o = t.media.getAttribute(t.config.attributes.embed.id));
  var l = parseId(o), c = createElement("iframe"), u = format(t.config.urls.vimeo.iframe, l, r);
  if (c.setAttribute("src", u), c.setAttribute("allowfullscreen", ""), c.setAttribute("allow", "autoplay,fullscreen,picture-in-picture"), is$1.empty(s) || c.setAttribute("referrerPolicy", s), n || !i.customControls)
    c.setAttribute("data-poster", t.poster), t.media = replaceElement(c, t.media);
  else {
    var d = createElement("div", { class: t.config.classNames.embedContainer, "data-poster": t.poster });
    d.appendChild(c), t.media = replaceElement(d, t.media);
  }
  i.customControls || fetch(format(t.config.urls.vimeo.api, u)).then(function(e2) {
    !is$1.empty(e2) && e2.thumbnail_url && ui.setPoster.call(t, e2.thumbnail_url).catch(function() {
    });
  }), t.embed = new window.Vimeo.Player(c, { autopause: t.config.autopause, muted: t.muted }), t.media.paused = true, t.media.currentTime = 0, t.supported.ui && t.embed.disableTextTrack(), t.media.play = function() {
    return assurePlaybackState.call(t, true), t.embed.play();
  }, t.media.pause = function() {
    return assurePlaybackState.call(t, false), t.embed.pause();
  }, t.media.stop = function() {
    t.pause(), t.currentTime = 0;
  };
  var h = t.media.currentTime;
  Object.defineProperty(t.media, "currentTime", { get: function() {
    return h;
  }, set: function(e2) {
    var i2 = t.embed, n2 = t.media, s2 = t.paused, a2 = t.volume, r2 = s2 && !i2.hasPlayed;
    n2.seeking = true, triggerEvent.call(t, n2, "seeking"), Promise.resolve(r2 && i2.setVolume(0)).then(function() {
      return i2.setCurrentTime(e2);
    }).then(function() {
      return r2 && i2.pause();
    }).then(function() {
      return r2 && i2.setVolume(a2);
    }).catch(function() {
    });
  } });
  var m = t.config.speed.selected;
  Object.defineProperty(t.media, "playbackRate", { get: function() {
    return m;
  }, set: function(e2) {
    t.embed.setPlaybackRate(e2).then(function() {
      m = e2, triggerEvent.call(t, t.media, "ratechange");
    }).catch(function() {
      t.options.speed = [1];
    });
  } });
  var p = t.config.volume;
  Object.defineProperty(t.media, "volume", { get: function() {
    return p;
  }, set: function(e2) {
    t.embed.setVolume(e2).then(function() {
      p = e2, triggerEvent.call(t, t.media, "volumechange");
    });
  } });
  var g = t.config.muted;
  Object.defineProperty(t.media, "muted", { get: function() {
    return g;
  }, set: function(e2) {
    var i2 = !!is$1.boolean(e2) && e2;
    t.embed.setVolume(i2 ? 0 : t.config.volume).then(function() {
      g = i2, triggerEvent.call(t, t.media, "volumechange");
    });
  } });
  var f, y = t.config.loop;
  Object.defineProperty(t.media, "loop", { get: function() {
    return y;
  }, set: function(e2) {
    var i2 = is$1.boolean(e2) ? e2 : t.config.loop.active;
    t.embed.setLoop(i2).then(function() {
      y = i2;
    });
  } }), t.embed.getVideoUrl().then(function(e2) {
    f = e2, controls.setDownloadUrl.call(t);
  }).catch(function(t2) {
    e.debug.warn(t2);
  }), Object.defineProperty(t.media, "currentSrc", { get: function() {
    return f;
  } }), Object.defineProperty(t.media, "ended", { get: function() {
    return t.currentTime === t.duration;
  } }), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then(function(i2) {
    var n2 = _slicedToArray(i2, 2), s2 = n2[0], a2 = n2[1];
    t.embed.ratio = [s2, a2], setAspectRatio.call(e);
  }), t.embed.setAutopause(t.config.autopause).then(function(e2) {
    t.config.autopause = e2;
  }), t.embed.getVideoTitle().then(function(i2) {
    t.config.title = i2, ui.setTitle.call(e);
  }), t.embed.getCurrentTime().then(function(e2) {
    h = e2, triggerEvent.call(t, t.media, "timeupdate");
  }), t.embed.getDuration().then(function(e2) {
    t.media.duration = e2, triggerEvent.call(t, t.media, "durationchange");
  }), t.embed.getTextTracks().then(function(e2) {
    t.media.textTracks = e2, captions.setup.call(t);
  }), t.embed.on("cuechange", function(e2) {
    var i2 = e2.cues, n2 = (void 0 === i2 ? [] : i2).map(function(e3) {
      return stripHTML(e3.text);
    });
    captions.updateCues.call(t, n2);
  }), t.embed.on("loaded", function() {
    (t.embed.getPaused().then(function(e2) {
      assurePlaybackState.call(t, !e2), e2 || triggerEvent.call(t, t.media, "playing");
    }), is$1.element(t.embed.element) && t.supported.ui) && t.embed.element.setAttribute("tabindex", -1);
  }), t.embed.on("bufferstart", function() {
    triggerEvent.call(t, t.media, "waiting");
  }), t.embed.on("bufferend", function() {
    triggerEvent.call(t, t.media, "playing");
  }), t.embed.on("play", function() {
    assurePlaybackState.call(t, true), triggerEvent.call(t, t.media, "playing");
  }), t.embed.on("pause", function() {
    assurePlaybackState.call(t, false);
  }), t.embed.on("timeupdate", function(e2) {
    t.media.seeking = false, h = e2.seconds, triggerEvent.call(t, t.media, "timeupdate");
  }), t.embed.on("progress", function(e2) {
    t.media.buffered = e2.percent, triggerEvent.call(t, t.media, "progress"), 1 === parseInt(e2.percent, 10) && triggerEvent.call(t, t.media, "canplaythrough"), t.embed.getDuration().then(function(e3) {
      e3 !== t.media.duration && (t.media.duration = e3, triggerEvent.call(t, t.media, "durationchange"));
    });
  }), t.embed.on("seeked", function() {
    t.media.seeking = false, triggerEvent.call(t, t.media, "seeked");
  }), t.embed.on("ended", function() {
    t.media.paused = true, triggerEvent.call(t, t.media, "ended");
  }), t.embed.on("error", function(e2) {
    t.media.error = e2, triggerEvent.call(t, t.media, "error");
  }), i.customControls && setTimeout(function() {
    return ui.build.call(t);
  }, 0);
} };
function parseId$1(e) {
  if (is$1.empty(e))
    return null;
  return e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : e;
}
function assurePlaybackState$1(e) {
  e && !this.embed.hasPlayed && (this.embed.hasPlayed = true), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
}
function getHost(e) {
  return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
}
var youtube = { setup: function() {
  var e = this;
  if (toggleClass(this.elements.wrapper, this.config.classNames.embed, true), is$1.object(window.YT) && is$1.function(window.YT.Player))
    youtube.ready.call(this);
  else {
    var t = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function() {
      is$1.function(t) && t(), youtube.ready.call(e);
    }, loadScript(this.config.urls.youtube.sdk).catch(function(t2) {
      e.debug.warn("YouTube API failed to load", t2);
    });
  }
}, getTitle: function(e) {
  var t = this;
  fetch(format(this.config.urls.youtube.api, e)).then(function(e2) {
    if (is$1.object(e2)) {
      var i = e2.title, n = e2.height, s = e2.width;
      t.config.title = i, ui.setTitle.call(t), t.embed.ratio = [s, n];
    }
    setAspectRatio.call(t);
  }).catch(function() {
    setAspectRatio.call(t);
  });
}, ready: function() {
  var e = this, t = e.config.youtube, i = e.media && e.media.getAttribute("id");
  if (is$1.empty(i) || !i.startsWith("youtube-")) {
    var n = e.media.getAttribute("src");
    is$1.empty(n) && (n = e.media.getAttribute(this.config.attributes.embed.id));
    var s = parseId$1(n), a = createElement("div", { id: generateId(e.provider), "data-poster": t.customControls ? e.poster : void 0 });
    if (e.media = replaceElement(a, e.media), t.customControls) {
      var r = function(e2) {
        return "https://i.ytimg.com/vi/".concat(s, "/").concat(e2, "default.jpg");
      };
      loadImage(r("maxres"), 121).catch(function() {
        return loadImage(r("sd"), 121);
      }).catch(function() {
        return loadImage(r("hq"));
      }).then(function(t2) {
        return ui.setPoster.call(e, t2.src);
      }).then(function(t2) {
        t2.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
      }).catch(function() {
      });
    }
    e.embed = new window.YT.Player(e.media, { videoId: s, host: getHost(t), playerVars: extend({}, { autoplay: e.config.autoplay ? 1 : 0, hl: e.config.hl, controls: e.supported.ui && t.customControls ? 0 : 1, disablekb: 1, playsinline: e.config.fullscreen.iosNative ? 0 : 1, cc_load_policy: e.captions.active ? 1 : 0, cc_lang_pref: e.config.captions.language, widget_referrer: window ? window.location.href : null }, t), events: { onError: function(t2) {
      if (!e.media.error) {
        var i2 = t2.data, n2 = { 2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.", 5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.", 100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.", 101: "The owner of the requested video does not allow it to be played in embedded players.", 150: "The owner of the requested video does not allow it to be played in embedded players." }[i2] || "An unknown error occured";
        e.media.error = { code: i2, message: n2 }, triggerEvent.call(e, e.media, "error");
      }
    }, onPlaybackRateChange: function(t2) {
      var i2 = t2.target;
      e.media.playbackRate = i2.getPlaybackRate(), triggerEvent.call(e, e.media, "ratechange");
    }, onReady: function(i2) {
      if (!is$1.function(e.media.play)) {
        var n2 = i2.target;
        youtube.getTitle.call(e, s), e.media.play = function() {
          assurePlaybackState$1.call(e, true), n2.playVideo();
        }, e.media.pause = function() {
          assurePlaybackState$1.call(e, false), n2.pauseVideo();
        }, e.media.stop = function() {
          n2.stopVideo();
        }, e.media.duration = n2.getDuration(), e.media.paused = true, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", { get: function() {
          return Number(n2.getCurrentTime());
        }, set: function(t2) {
          e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = true, triggerEvent.call(e, e.media, "seeking"), n2.seekTo(t2);
        } }), Object.defineProperty(e.media, "playbackRate", { get: function() {
          return n2.getPlaybackRate();
        }, set: function(e2) {
          n2.setPlaybackRate(e2);
        } });
        var a2 = e.config.volume;
        Object.defineProperty(e.media, "volume", { get: function() {
          return a2;
        }, set: function(t2) {
          a2 = t2, n2.setVolume(100 * a2), triggerEvent.call(e, e.media, "volumechange");
        } });
        var r2 = e.config.muted;
        Object.defineProperty(e.media, "muted", { get: function() {
          return r2;
        }, set: function(t2) {
          var i3 = is$1.boolean(t2) ? t2 : r2;
          r2 = i3, n2[i3 ? "mute" : "unMute"](), n2.setVolume(100 * a2), triggerEvent.call(e, e.media, "volumechange");
        } }), Object.defineProperty(e.media, "currentSrc", { get: function() {
          return n2.getVideoUrl();
        } }), Object.defineProperty(e.media, "ended", { get: function() {
          return e.currentTime === e.duration;
        } });
        var o = n2.getAvailablePlaybackRates();
        e.options.speed = o.filter(function(t2) {
          return e.config.speed.options.includes(t2);
        }), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), triggerEvent.call(e, e.media, "timeupdate"), triggerEvent.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function() {
          e.media.buffered = n2.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && triggerEvent.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), triggerEvent.call(e, e.media, "canplaythrough"));
        }, 200), t.customControls && setTimeout(function() {
          return ui.build.call(e);
        }, 50);
      }
    }, onStateChange: function(i2) {
      var n2 = i2.target;
      switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(i2.data) && (e.media.seeking = false, triggerEvent.call(e, e.media, "seeked")), i2.data) {
        case -1:
          triggerEvent.call(e, e.media, "timeupdate"), e.media.buffered = n2.getVideoLoadedFraction(), triggerEvent.call(e, e.media, "progress");
          break;
        case 0:
          assurePlaybackState$1.call(e, false), e.media.loop ? (n2.stopVideo(), n2.playVideo()) : triggerEvent.call(e, e.media, "ended");
          break;
        case 1:
          t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (assurePlaybackState$1.call(e, true), triggerEvent.call(e, e.media, "playing"), e.timers.playing = setInterval(function() {
            triggerEvent.call(e, e.media, "timeupdate");
          }, 50), e.media.duration !== n2.getDuration() && (e.media.duration = n2.getDuration(), triggerEvent.call(e, e.media, "durationchange")));
          break;
        case 2:
          e.muted || e.embed.unMute(), assurePlaybackState$1.call(e, false);
          break;
        case 3:
          triggerEvent.call(e, e.media, "waiting");
      }
      triggerEvent.call(e, e.elements.container, "statechange", false, { code: i2.data });
    } } });
  }
} };
var media = { setup: function() {
  this.media ? (toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", this.type), true), toggleClass(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), true), this.isEmbed && toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", "video"), true), this.isVideo && (this.elements.wrapper = createElement("div", { class: this.config.classNames.video }), wrap(this.media, this.elements.wrapper), this.elements.poster = createElement("div", { class: this.config.classNames.poster, hidden: "" }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? html5.setup.call(this) : this.isYouTube ? youtube.setup.call(this) : this.isVimeo && vimeo.setup.call(this)) : this.debug.warn("No media element found!");
} };
var destroy = function(e) {
  e.manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove();
};
var Ads = function() {
  function e(t) {
    var i = this;
    _classCallCheck(this, e), this.player = t, this.config = t.config.ads, this.playing = false, this.initialized = false, this.elements = { container: null, displayContainer: null }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function(e2, t2) {
      i.on("loaded", e2), i.on("error", t2);
    }), this.load();
  }
  return _createClass(e, [{ key: "load", value: function() {
    var e2 = this;
    this.enabled && (is$1.object(window.google) && is$1.object(window.google.ima) ? this.ready() : loadScript(this.player.config.urls.googleIMA.sdk).then(function() {
      e2.ready();
    }).catch(function() {
      e2.trigger("error", new Error("Google IMA SDK failed to load"));
    }));
  } }, { key: "ready", value: function() {
    var e2 = this;
    this.enabled || destroy(this), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(function() {
      e2.clearSafetyTimer("onAdsManagerLoaded()");
    }), this.listeners(), this.setupIMA();
  } }, { key: "setupIMA", value: function() {
    var e2 = this;
    this.elements.container = createElement("div", { class: this.player.config.classNames.ads }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(t) {
      return e2.onAdsManagerLoaded(t);
    }, false), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(t) {
      return e2.onAdError(t);
    }, false), this.requestAds();
  } }, { key: "requestAds", value: function() {
    var e2 = this.player.elements.container;
    try {
      var t = new google.ima.AdsRequest();
      t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e2.offsetWidth, t.linearAdSlotHeight = e2.offsetHeight, t.nonLinearAdSlotWidth = e2.offsetWidth, t.nonLinearAdSlotHeight = e2.offsetHeight, t.forceNonLinearFullSlot = false, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t);
    } catch (e3) {
      this.onAdError(e3);
    }
  } }, { key: "pollCountdown", value: function() {
    var e2 = this, t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    if (!t)
      return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
    var i = function() {
      var t2 = formatTime(Math.max(e2.manager.getRemainingTime(), 0)), i2 = "".concat(i18n.get("advertisement", e2.player.config), " - ").concat(t2);
      e2.elements.container.setAttribute("data-badge-text", i2);
    };
    this.countdownTimer = setInterval(i, 100);
  } }, { key: "onAdsManagerLoaded", value: function(e2) {
    var t = this;
    if (this.enabled) {
      var i = new google.ima.AdsRenderingSettings();
      i.restoreCustomPlaybackStateOnAdBreakComplete = true, i.enablePreloading = true, this.manager = e2.getAdsManager(this.player, i), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(e3) {
        return t.onAdError(e3);
      }), Object.keys(google.ima.AdEvent.Type).forEach(function(e3) {
        t.manager.addEventListener(google.ima.AdEvent.Type[e3], function(e4) {
          return t.onAdEvent(e4);
        });
      }), this.trigger("loaded");
    }
  } }, { key: "addCuePoints", value: function() {
    var e2 = this;
    is$1.empty(this.cuePoints) || this.cuePoints.forEach(function(t) {
      if (0 !== t && -1 !== t && t < e2.player.duration) {
        var i = e2.player.elements.progress;
        if (is$1.element(i)) {
          var n = 100 / e2.player.duration * t, s = createElement("span", { class: e2.player.config.classNames.cues });
          s.style.left = "".concat(n.toString(), "%"), i.appendChild(s);
        }
      }
    });
  } }, { key: "onAdEvent", value: function(e2) {
    var t, i = this, n = this.player.elements.container, s = e2.getAd(), a = e2.getAdData();
    switch (t = e2.type, triggerEvent.call(i.player, i.player.media, "ads".concat(t.replace(/_/g, "").toLowerCase())), e2.type) {
      case google.ima.AdEvent.Type.LOADED:
        this.trigger("loaded"), this.pollCountdown(true), s.isLinear() || (s.width = n.offsetWidth, s.height = n.offsetHeight);
        break;
      case google.ima.AdEvent.Type.STARTED:
        this.manager.setVolume(this.player.volume);
        break;
      case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
        this.player.ended ? this.loadAds() : this.loader.contentComplete();
        break;
      case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
        this.pauseContent();
        break;
      case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
        this.pollCountdown(), this.resumeContent();
        break;
      case google.ima.AdEvent.Type.LOG:
        a.adError && this.player.debug.warn("Non-fatal ad error: ".concat(a.adError.getMessage()));
    }
  } }, { key: "onAdError", value: function(e2) {
    this.cancel(), this.player.debug.warn("Ads error", e2);
  } }, { key: "listeners", value: function() {
    var e2, t = this, i = this.player.elements.container;
    this.player.on("canplay", function() {
      t.addCuePoints();
    }), this.player.on("ended", function() {
      t.loader.contentComplete();
    }), this.player.on("timeupdate", function() {
      e2 = t.player.currentTime;
    }), this.player.on("seeked", function() {
      var i2 = t.player.currentTime;
      is$1.empty(t.cuePoints) || t.cuePoints.forEach(function(n, s) {
        e2 < n && n < i2 && (t.manager.discardAdBreak(), t.cuePoints.splice(s, 1));
      });
    }), window.addEventListener("resize", function() {
      t.manager && t.manager.resize(i.offsetWidth, i.offsetHeight, google.ima.ViewMode.NORMAL);
    });
  } }, { key: "play", value: function() {
    var e2 = this, t = this.player.elements.container;
    this.managerPromise || this.resumeContent(), this.managerPromise.then(function() {
      e2.manager.setVolume(e2.player.volume), e2.elements.displayContainer.initialize();
      try {
        e2.initialized || (e2.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e2.manager.start()), e2.initialized = true;
      } catch (t2) {
        e2.onAdError(t2);
      }
    }).catch(function() {
    });
  } }, { key: "resumeContent", value: function() {
    this.elements.container.style.zIndex = "", this.playing = false, silencePromise(this.player.media.play());
  } }, { key: "pauseContent", value: function() {
    this.elements.container.style.zIndex = 3, this.playing = true, this.player.media.pause();
  } }, { key: "cancel", value: function() {
    this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds();
  } }, { key: "loadAds", value: function() {
    var e2 = this;
    this.managerPromise.then(function() {
      e2.manager && e2.manager.destroy(), e2.managerPromise = new Promise(function(t) {
        e2.on("loaded", t), e2.player.debug.log(e2.manager);
      }), e2.initialized = false, e2.requestAds();
    }).catch(function() {
    });
  } }, { key: "trigger", value: function(e2) {
    for (var t = this, i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++)
      n[s - 1] = arguments[s];
    var a = this.events[e2];
    is$1.array(a) && a.forEach(function(e3) {
      is$1.function(e3) && e3.apply(t, n);
    });
  } }, { key: "on", value: function(e2, t) {
    return is$1.array(this.events[e2]) || (this.events[e2] = []), this.events[e2].push(t), this;
  } }, { key: "startSafetyTimer", value: function(e2, t) {
    var i = this;
    this.player.debug.log("Safety timer invoked from: ".concat(t)), this.safetyTimer = setTimeout(function() {
      i.cancel(), i.clearSafetyTimer("startSafetyTimer()");
    }, e2);
  } }, { key: "clearSafetyTimer", value: function(e2) {
    is$1.nullOrUndefined(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: ".concat(e2)), clearTimeout(this.safetyTimer), this.safetyTimer = null);
  } }, { key: "enabled", get: function() {
    var e2 = this.config;
    return this.player.isHTML5 && this.player.isVideo && e2.enabled && (!is$1.empty(e2.publisherId) || is$1.url(e2.tagUrl));
  } }, { key: "tagUrl", get: function() {
    var e2 = this.config;
    if (is$1.url(e2.tagUrl))
      return e2.tagUrl;
    var t = { AV_PUBLISHERID: "58c25bb0073ef448b1087ad6", AV_CHANNELID: "5a0458dc28a06145e4519d21", AV_URL: window.location.hostname, cb: Date.now(), AV_WIDTH: 640, AV_HEIGHT: 480, AV_CDIM2: e2.publisherId };
    return "".concat("https://go.aniview.com/api/adserver6/vast/", "?").concat(buildUrlParams(t));
  } }]), e;
}();
var parseVtt = function(e) {
  var t = [];
  return e.split(/\r\n\r\n|\n\n|\r\r/).forEach(function(e2) {
    var i = {};
    e2.split(/\r\n|\n|\r/).forEach(function(e3) {
      if (is$1.number(i.startTime)) {
        if (!is$1.empty(e3.trim()) && is$1.empty(i.text)) {
          var t2 = e3.trim().split("#xywh="), n = _slicedToArray(t2, 1);
          if (i.text = n[0], t2[1]) {
            var s = _slicedToArray(t2[1].split(","), 4);
            i.x = s[0], i.y = s[1], i.w = s[2], i.h = s[3];
          }
        }
      } else {
        var a = e3.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
        a && (i.startTime = 60 * Number(a[1] || 0) * 60 + 60 * Number(a[2]) + Number(a[3]) + Number("0.".concat(a[4])), i.endTime = 60 * Number(a[6] || 0) * 60 + 60 * Number(a[7]) + Number(a[8]) + Number("0.".concat(a[9])));
      }
    }), i.text && t.push(i);
  }), t;
};
var fitRatio = function(e, t) {
  var i = {};
  return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i;
};
var PreviewThumbnails = function() {
  function e(t) {
    _classCallCheck(this, e), this.player = t, this.thumbnails = [], this.loaded = false, this.lastMouseMoveTime = Date.now(), this.mouseDown = false, this.loadedImages = [], this.elements = { thumb: {}, scrubbing: {} }, this.load();
  }
  return _createClass(e, [{ key: "load", value: function() {
    var e2 = this;
    this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(function() {
      e2.enabled && (e2.render(), e2.determineContainerAutoSizing(), e2.loaded = true);
    });
  } }, { key: "getThumbnails", value: function() {
    var e2 = this;
    return new Promise(function(t) {
      var i = e2.player.config.previewThumbnails.src;
      if (is$1.empty(i))
        throw new Error("Missing previewThumbnails.src config attribute");
      var n = function() {
        e2.thumbnails.sort(function(e3, t2) {
          return e3.height - t2.height;
        }), e2.player.debug.log("Preview thumbnails", e2.thumbnails), t();
      };
      if (is$1.function(i))
        i(function(t2) {
          e2.thumbnails = t2, n();
        });
      else {
        var s = (is$1.string(i) ? [i] : i).map(function(t2) {
          return e2.getThumbnail(t2);
        });
        Promise.all(s).then(n);
      }
    });
  } }, { key: "getThumbnail", value: function(e2) {
    var t = this;
    return new Promise(function(i) {
      fetch(e2).then(function(n) {
        var s = { frames: parseVtt(n), height: null, urlPrefix: "" };
        s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e2.substring(0, e2.lastIndexOf("/") + 1));
        var a = new Image();
        a.onload = function() {
          s.height = a.naturalHeight, s.width = a.naturalWidth, t.thumbnails.push(s), i();
        }, a.src = s.urlPrefix + s.frames[0].text;
      });
    });
  } }, { key: "startMove", value: function(e2) {
    if (this.loaded && is$1.event(e2) && ["touchmove", "mousemove"].includes(e2.type) && this.player.media.duration) {
      if ("touchmove" === e2.type)
        this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
      else {
        var t = this.player.elements.progress.getBoundingClientRect(), i = 100 / t.width * (e2.pageX - t.left);
        this.seekTime = this.player.media.duration * (i / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e2.pageX, this.elements.thumb.time.innerText = formatTime(this.seekTime);
      }
      this.showImageAtCurrentTime();
    }
  } }, { key: "endMove", value: function() {
    this.toggleThumbContainer(false, true);
  } }, { key: "startScrubbing", value: function(e2) {
    (is$1.nullOrUndefined(e2.button) || false === e2.button || 0 === e2.button) && (this.mouseDown = true, this.player.media.duration && (this.toggleScrubbingContainer(true), this.toggleThumbContainer(false, true), this.showImageAtCurrentTime()));
  } }, { key: "endScrubbing", value: function() {
    var e2 = this;
    this.mouseDown = false, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(false) : once.call(this.player, this.player.media, "timeupdate", function() {
      e2.mouseDown || e2.toggleScrubbingContainer(false);
    });
  } }, { key: "listeners", value: function() {
    var e2 = this;
    this.player.on("play", function() {
      e2.toggleThumbContainer(false, true);
    }), this.player.on("seeked", function() {
      e2.toggleThumbContainer(false);
    }), this.player.on("timeupdate", function() {
      e2.lastTime = e2.player.media.currentTime;
    });
  } }, { key: "render", value: function() {
    this.elements.thumb.container = createElement("div", { class: this.player.config.classNames.previewThumbnails.thumbContainer }), this.elements.thumb.imageContainer = createElement("div", { class: this.player.config.classNames.previewThumbnails.imageContainer }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
    var e2 = createElement("div", { class: this.player.config.classNames.previewThumbnails.timeContainer });
    this.elements.thumb.time = createElement("span", {}, "00:00"), e2.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e2), is$1.element(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = createElement("div", { class: this.player.config.classNames.previewThumbnails.scrubbingContainer }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
  } }, { key: "destroy", value: function() {
    this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove();
  } }, { key: "showImageAtCurrentTime", value: function() {
    var e2 = this;
    this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
    var t = this.thumbnails[0].frames.findIndex(function(t2) {
      return e2.seekTime >= t2.startTime && e2.seekTime <= t2.endTime;
    }), i = t >= 0, n = 0;
    this.mouseDown || this.toggleThumbContainer(i), i && (this.thumbnails.forEach(function(i2, s) {
      e2.loadedImages.includes(i2.frames[t].text) && (n = s);
    }), t !== this.showingThumb && (this.showingThumb = t, this.loadImage(n)));
  } }, { key: "loadImage", value: function() {
    var e2 = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i = this.showingThumb, n = this.thumbnails[t], s = n.urlPrefix, a = n.frames[i], r = n.frames[i].text, o = s + r;
    if (this.currentImageElement && this.currentImageElement.dataset.filename === r)
      this.showImage(this.currentImageElement, a, t, i, r, false), this.currentImageElement.dataset.index = i, this.removeOldImages(this.currentImageElement);
    else {
      this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
      var l = new Image();
      l.src = o, l.dataset.index = i, l.dataset.filename = r, this.showingThumbFilename = r, this.player.debug.log("Loading image: ".concat(o)), l.onload = function() {
        return e2.showImage(l, a, t, i, r, true);
      }, this.loadingImage = l, this.removeOldImages(l);
    }
  } }, { key: "showImage", value: function(e2, t, i, n, s) {
    var a = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5];
    this.player.debug.log("Showing thumb: ".concat(s, ". num: ").concat(n, ". qual: ").concat(i, ". newimg: ").concat(a)), this.setImageSizeAndOffset(e2, t), a && (this.currentImageContainer.appendChild(e2), this.currentImageElement = e2, this.loadedImages.includes(s) || this.loadedImages.push(s)), this.preloadNearby(n, true).then(this.preloadNearby(n, false)).then(this.getHigherQuality(i, e2, t, s));
  } }, { key: "removeOldImages", value: function(e2) {
    var t = this;
    Array.from(this.currentImageContainer.children).forEach(function(i) {
      if ("img" === i.tagName.toLowerCase()) {
        var n = t.usingSprites ? 500 : 1e3;
        if (i.dataset.index !== e2.dataset.index && !i.dataset.deleting) {
          i.dataset.deleting = true;
          var s = t.currentImageContainer;
          setTimeout(function() {
            s.removeChild(i), t.player.debug.log("Removing thumb: ".concat(i.dataset.filename));
          }, n);
        }
      }
    });
  } }, { key: "preloadNearby", value: function(e2) {
    var t = this, i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return new Promise(function(n) {
      setTimeout(function() {
        var s = t.thumbnails[0].frames[e2].text;
        if (t.showingThumbFilename === s) {
          var a;
          a = i ? t.thumbnails[0].frames.slice(e2) : t.thumbnails[0].frames.slice(0, e2).reverse();
          var r = false;
          a.forEach(function(e3) {
            var i2 = e3.text;
            if (i2 !== s && !t.loadedImages.includes(i2)) {
              r = true, t.player.debug.log("Preloading thumb filename: ".concat(i2));
              var a2 = t.thumbnails[0].urlPrefix + i2, o = new Image();
              o.src = a2, o.onload = function() {
                t.player.debug.log("Preloaded thumb filename: ".concat(i2)), t.loadedImages.includes(i2) || t.loadedImages.push(i2), n();
              };
            }
          }), r || n();
        }
      }, 300);
    });
  } }, { key: "getHigherQuality", value: function(e2, t, i, n) {
    var s = this;
    if (e2 < this.thumbnails.length - 1) {
      var a = t.naturalHeight;
      this.usingSprites && (a = i.h), a < this.thumbContainerHeight && setTimeout(function() {
        s.showingThumbFilename === n && (s.player.debug.log("Showing higher quality thumb for: ".concat(n)), s.loadImage(e2 + 1));
      }, 300);
    }
  } }, { key: "toggleThumbContainer", value: function() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
    this.elements.thumb.container.classList.toggle(i, e2), !e2 && t && (this.showingThumb = null, this.showingThumbFilename = null);
  } }, { key: "toggleScrubbingContainer", value: function() {
    var e2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
    this.elements.scrubbing.container.classList.toggle(t, e2), e2 || (this.showingThumb = null, this.showingThumbFilename = null);
  } }, { key: "determineContainerAutoSizing", value: function() {
    (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = true);
  } }, { key: "setThumbContainerSizeAndPos", value: function() {
    if (this.sizeSpecifiedInCSS) {
      if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) {
        var e2 = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio);
        this.elements.thumb.imageContainer.style.width = "".concat(e2, "px");
      } else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) {
        var t = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio);
        this.elements.thumb.imageContainer.style.height = "".concat(t, "px");
      }
    } else {
      var i = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
      this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px"), this.elements.thumb.imageContainer.style.width = "".concat(i, "px");
    }
    this.setThumbContainerPos();
  } }, { key: "setThumbContainerPos", value: function() {
    var e2 = this.player.elements.progress.getBoundingClientRect(), t = this.player.elements.container.getBoundingClientRect(), i = this.elements.thumb.container, n = t.left - e2.left + 10, s = t.right - e2.left - i.clientWidth - 10, a = this.mousePosX - e2.left - i.clientWidth / 2;
    a < n && (a = n), a > s && (a = s), i.style.left = "".concat(a, "px");
  } }, { key: "setScrubbingContainerSize", value: function() {
    var e2 = fitRatio(this.thumbAspectRatio, { width: this.player.media.clientWidth, height: this.player.media.clientHeight }), t = e2.width, i = e2.height;
    this.elements.scrubbing.container.style.width = "".concat(t, "px"), this.elements.scrubbing.container.style.height = "".concat(i, "px");
  } }, { key: "setImageSizeAndOffset", value: function(e2, t) {
    if (this.usingSprites) {
      var i = this.thumbContainerHeight / t.h;
      e2.style.height = "".concat(e2.naturalHeight * i, "px"), e2.style.width = "".concat(e2.naturalWidth * i, "px"), e2.style.left = "-".concat(t.x * i, "px"), e2.style.top = "-".concat(t.y * i, "px");
    }
  } }, { key: "enabled", get: function() {
    return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
  } }, { key: "currentImageContainer", get: function() {
    return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
  } }, { key: "usingSprites", get: function() {
    return Object.keys(this.thumbnails[0].frames[0]).includes("w");
  } }, { key: "thumbAspectRatio", get: function() {
    return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
  } }, { key: "thumbContainerHeight", get: function() {
    return this.mouseDown ? fitRatio(this.thumbAspectRatio, { width: this.player.media.clientWidth, height: this.player.media.clientHeight }).height : this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
  } }, { key: "currentImageElement", get: function() {
    return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
  }, set: function(e2) {
    this.mouseDown ? this.currentScrubbingImageElement = e2 : this.currentThumbnailImageElement = e2;
  } }]), e;
}();
var source = { insertElements: function(e, t) {
  var i = this;
  is$1.string(t) ? insertElement(e, this.media, { src: t }) : is$1.array(t) && t.forEach(function(t2) {
    insertElement(e, i.media, t2);
  });
}, change: function(e) {
  var t = this;
  getDeep(e, "sources.length") ? (html5.cancelRequests.call(this), this.destroy.call(this, function() {
    t.options.quality = [], removeElement(t.media), t.media = null, is$1.element(t.elements.container) && t.elements.container.removeAttribute("class");
    var i = e.sources, n = e.type, s = _slicedToArray(i, 1)[0], a = s.provider, r = void 0 === a ? providers.html5 : a, o = s.src, l = "html5" === r ? n : "div", c = "html5" === r ? {} : { src: o };
    Object.assign(t, { provider: r, type: n, supported: support.check(n, r, t.config.playsinline), media: createElement(l, c) }), t.elements.container.appendChild(t.media), is$1.boolean(e.autoplay) && (t.config.autoplay = e.autoplay), t.isHTML5 && (t.config.crossorigin && t.media.setAttribute("crossorigin", ""), t.config.autoplay && t.media.setAttribute("autoplay", ""), is$1.empty(e.poster) || (t.poster = e.poster), t.config.loop.active && t.media.setAttribute("loop", ""), t.config.muted && t.media.setAttribute("muted", ""), t.config.playsinline && t.media.setAttribute("playsinline", "")), ui.addStyleHook.call(t), t.isHTML5 && source.insertElements.call(t, "source", i), t.config.title = e.title, media.setup.call(t), t.isHTML5 && Object.keys(e).includes("tracks") && source.insertElements.call(t, "track", e.tracks), (t.isHTML5 || t.isEmbed && !t.supported.ui) && ui.build.call(t), t.isHTML5 && t.media.load(), is$1.empty(e.previewThumbnails) || (Object.assign(t.config.previewThumbnails, e.previewThumbnails), t.previewThumbnails && t.previewThumbnails.loaded && (t.previewThumbnails.destroy(), t.previewThumbnails = null), t.config.previewThumbnails.enabled && (t.previewThumbnails = new PreviewThumbnails(t))), t.fullscreen.update();
  }, true)) : this.debug.warn("Invalid source format");
} };
function clamp() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 255;
  return Math.min(Math.max(e, t), i);
}
var Plyr = function() {
  function e(t, i) {
    var n = this;
    if (_classCallCheck(this, e), this.timers = {}, this.ready = false, this.loading = false, this.failed = false, this.touch = support.touch, this.media = t, is$1.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || is$1.nodeList(this.media) || is$1.array(this.media)) && (this.media = this.media[0]), this.config = extend({}, defaults$1, e.defaults, i || {}, function() {
      try {
        return JSON.parse(n.media.getAttribute("data-plyr-config"));
      } catch (e2) {
        return {};
      }
    }()), this.elements = { container: null, fullscreen: null, captions: null, buttons: {}, display: {}, progress: {}, inputs: {}, settings: { popup: null, menu: null, panels: {}, buttons: {} } }, this.captions = { active: null, currentTrack: -1, meta: /* @__PURE__ */ new WeakMap() }, this.fullscreen = { active: false }, this.options = { speed: [], quality: [] }, this.debug = new Console(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", support), !is$1.nullOrUndefined(this.media) && is$1.element(this.media))
      if (this.media.plyr)
        this.debug.warn("Target already setup");
      else if (this.config.enabled)
        if (support.check().api) {
          var s = this.media.cloneNode(true);
          s.autoplay = false, this.elements.original = s;
          var a = this.media.tagName.toLowerCase(), r = null, o = null;
          switch (a) {
            case "div":
              if (r = this.media.querySelector("iframe"), is$1.element(r)) {
                if (o = parseUrl(r.getAttribute("src")), this.provider = getProviderByUrl(o.toString()), this.elements.container = this.media, this.media = r, this.elements.container.className = "", o.search.length) {
                  var l = ["1", "true"];
                  l.includes(o.searchParams.get("autoplay")) && (this.config.autoplay = true), l.includes(o.searchParams.get("loop")) && (this.config.loop.active = true), this.isYouTube ? (this.config.playsinline = l.includes(o.searchParams.get("playsinline")), this.config.youtube.hl = o.searchParams.get("hl")) : this.config.playsinline = true;
                }
              } else
                this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
              if (is$1.empty(this.provider) || !Object.keys(providers).includes(this.provider))
                return void this.debug.error("Setup failed: Invalid provider");
              this.type = types.video;
              break;
            case "video":
            case "audio":
              this.type = a, this.provider = providers.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = true), this.media.hasAttribute("autoplay") && (this.config.autoplay = true), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = true), this.media.hasAttribute("muted") && (this.config.muted = true), this.media.hasAttribute("loop") && (this.config.loop.active = true);
              break;
            default:
              return void this.debug.error("Setup failed: unsupported type");
          }
          this.supported = support.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new Listeners(this), this.storage = new Storage(this), this.media.plyr = this, is$1.element(this.elements.container) || (this.elements.container = createElement("div", { tabindex: 0 }), wrap(this.media, this.elements.container)), ui.migrateStyles.call(this), ui.addStyleHook.call(this), media.setup.call(this), this.config.debug && on.call(this, this.elements.container, this.config.events.join(" "), function(e2) {
            n.debug.log("event: ".concat(e2.type));
          }), this.fullscreen = new Fullscreen(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && ui.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new Ads(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", function() {
            return silencePromise(n.play());
          }), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new PreviewThumbnails(this))) : this.debug.error("Setup failed: no support");
        } else
          this.debug.error("Setup failed: no support");
      else
        this.debug.error("Setup failed: disabled by config");
    else
      this.debug.error("Setup failed: no suitable element passed");
  }
  return _createClass(e, [{ key: "play", value: function() {
    var e2 = this;
    return is$1.function(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(function() {
      return e2.ads.play();
    }).catch(function() {
      return silencePromise(e2.media.play());
    }), this.media.play()) : null;
  } }, { key: "pause", value: function() {
    return this.playing && is$1.function(this.media.pause) ? this.media.pause() : null;
  } }, { key: "togglePlay", value: function(e2) {
    return (is$1.boolean(e2) ? e2 : !this.playing) ? this.play() : this.pause();
  } }, { key: "stop", value: function() {
    this.isHTML5 ? (this.pause(), this.restart()) : is$1.function(this.media.stop) && this.media.stop();
  } }, { key: "restart", value: function() {
    this.currentTime = 0;
  } }, { key: "rewind", value: function(e2) {
    this.currentTime -= is$1.number(e2) ? e2 : this.config.seekTime;
  } }, { key: "forward", value: function(e2) {
    this.currentTime += is$1.number(e2) ? e2 : this.config.seekTime;
  } }, { key: "increaseVolume", value: function(e2) {
    var t = this.media.muted ? 0 : this.volume;
    this.volume = t + (is$1.number(e2) ? e2 : 0);
  } }, { key: "decreaseVolume", value: function(e2) {
    this.increaseVolume(-e2);
  } }, { key: "toggleCaptions", value: function(e2) {
    captions.toggle.call(this, e2, false);
  } }, { key: "airplay", value: function() {
    support.airplay && this.media.webkitShowPlaybackTargetPicker();
  } }, { key: "toggleControls", value: function(e2) {
    if (this.supported.ui && !this.isAudio) {
      var t = hasClass(this.elements.container, this.config.classNames.hideControls), i = void 0 === e2 ? void 0 : !e2, n = toggleClass(this.elements.container, this.config.classNames.hideControls, i);
      if (n && is$1.array(this.config.controls) && this.config.controls.includes("settings") && !is$1.empty(this.config.settings) && controls.toggleMenu.call(this, false), n !== t) {
        var s = n ? "controlshidden" : "controlsshown";
        triggerEvent.call(this, this.media, s);
      }
      return !n;
    }
    return false;
  } }, { key: "on", value: function(e2, t) {
    on.call(this, this.elements.container, e2, t);
  } }, { key: "once", value: function(e2, t) {
    once.call(this, this.elements.container, e2, t);
  } }, { key: "off", value: function(e2, t) {
    off(this.elements.container, e2, t);
  } }, { key: "destroy", value: function(e2) {
    var t = this, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (this.ready) {
      var n = function() {
        document.body.style.overflow = "", t.embed = null, i ? (Object.keys(t.elements).length && (removeElement(t.elements.buttons.play), removeElement(t.elements.captions), removeElement(t.elements.controls), removeElement(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), is$1.function(e2) && e2()) : (unbindListeners.call(t), html5.cancelRequests.call(t), replaceElement(t.elements.original, t.elements.container), triggerEvent.call(t, t.elements.original, "destroyed", true), is$1.function(e2) && e2.call(t.elements.original), t.ready = false, setTimeout(function() {
          t.elements = null, t.media = null;
        }, 200));
      };
      this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (ui.toggleNativeControls.call(this, true), n()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && is$1.function(this.embed.destroy) && this.embed.destroy(), n()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(n), setTimeout(n, 200));
    }
  } }, { key: "supports", value: function(e2) {
    return support.mime.call(this, e2);
  } }, { key: "isHTML5", get: function() {
    return this.provider === providers.html5;
  } }, { key: "isEmbed", get: function() {
    return this.isYouTube || this.isVimeo;
  } }, { key: "isYouTube", get: function() {
    return this.provider === providers.youtube;
  } }, { key: "isVimeo", get: function() {
    return this.provider === providers.vimeo;
  } }, { key: "isVideo", get: function() {
    return this.type === types.video;
  } }, { key: "isAudio", get: function() {
    return this.type === types.audio;
  } }, { key: "playing", get: function() {
    return Boolean(this.ready && !this.paused && !this.ended);
  } }, { key: "paused", get: function() {
    return Boolean(this.media.paused);
  } }, { key: "stopped", get: function() {
    return Boolean(this.paused && 0 === this.currentTime);
  } }, { key: "ended", get: function() {
    return Boolean(this.media.ended);
  } }, { key: "currentTime", set: function(e2) {
    if (this.duration) {
      var t = is$1.number(e2) && e2 > 0;
      this.media.currentTime = t ? Math.min(e2, this.duration) : 0, this.debug.log("Seeking to ".concat(this.currentTime, " seconds"));
    }
  }, get: function() {
    return Number(this.media.currentTime);
  } }, { key: "buffered", get: function() {
    var e2 = this.media.buffered;
    return is$1.number(e2) ? e2 : e2 && e2.length && this.duration > 0 ? e2.end(0) / this.duration : 0;
  } }, { key: "seeking", get: function() {
    return Boolean(this.media.seeking);
  } }, { key: "duration", get: function() {
    var e2 = parseFloat(this.config.duration), t = (this.media || {}).duration, i = is$1.number(t) && t !== 1 / 0 ? t : 0;
    return e2 || i;
  } }, { key: "volume", set: function(e2) {
    var t = e2;
    is$1.string(t) && (t = Number(t)), is$1.number(t) || (t = this.storage.get("volume")), is$1.number(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !is$1.empty(e2) && this.muted && t > 0 && (this.muted = false);
  }, get: function() {
    return Number(this.media.volume);
  } }, { key: "muted", set: function(e2) {
    var t = e2;
    is$1.boolean(t) || (t = this.storage.get("muted")), is$1.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
  }, get: function() {
    return Boolean(this.media.muted);
  } }, { key: "hasAudio", get: function() {
    return !this.isHTML5 || (!!this.isAudio || (Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)));
  } }, { key: "speed", set: function(e2) {
    var t = this, i = null;
    is$1.number(e2) && (i = e2), is$1.number(i) || (i = this.storage.get("speed")), is$1.number(i) || (i = this.config.speed.selected);
    var n = this.minimumSpeed, s = this.maximumSpeed;
    i = clamp(i, n, s), this.config.speed.selected = i, setTimeout(function() {
      t.media.playbackRate = i;
    }, 0);
  }, get: function() {
    return Number(this.media.playbackRate);
  } }, { key: "minimumSpeed", get: function() {
    return this.isYouTube ? Math.min.apply(Math, _toConsumableArray(this.options.speed)) : this.isVimeo ? 0.5 : 0.0625;
  } }, { key: "maximumSpeed", get: function() {
    return this.isYouTube ? Math.max.apply(Math, _toConsumableArray(this.options.speed)) : this.isVimeo ? 2 : 16;
  } }, { key: "quality", set: function(e2) {
    var t = this.config.quality, i = this.options.quality;
    if (i.length) {
      var n = [!is$1.empty(e2) && Number(e2), this.storage.get("quality"), t.selected, t.default].find(is$1.number), s = true;
      if (!i.includes(n)) {
        var a = closest$1(i, n);
        this.debug.warn("Unsupported quality option: ".concat(n, ", using ").concat(a, " instead")), n = a, s = false;
      }
      t.selected = n, this.media.quality = n, s && this.storage.set({ quality: n });
    }
  }, get: function() {
    return this.media.quality;
  } }, { key: "loop", set: function(e2) {
    var t = is$1.boolean(e2) ? e2 : this.config.loop.active;
    this.config.loop.active = t, this.media.loop = t;
  }, get: function() {
    return Boolean(this.media.loop);
  } }, { key: "source", set: function(e2) {
    source.change.call(this, e2);
  }, get: function() {
    return this.media.currentSrc;
  } }, { key: "download", get: function() {
    var e2 = this.config.urls.download;
    return is$1.url(e2) ? e2 : this.source;
  }, set: function(e2) {
    is$1.url(e2) && (this.config.urls.download = e2, controls.setDownloadUrl.call(this));
  } }, { key: "poster", set: function(e2) {
    this.isVideo ? ui.setPoster.call(this, e2, false).catch(function() {
    }) : this.debug.warn("Poster can only be set for video");
  }, get: function() {
    return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null;
  } }, { key: "ratio", get: function() {
    if (!this.isVideo)
      return null;
    var e2 = reduceAspectRatio(getAspectRatio.call(this));
    return is$1.array(e2) ? e2.join(":") : e2;
  }, set: function(e2) {
    this.isVideo ? is$1.string(e2) && validateRatio(e2) ? (this.config.ratio = e2, setAspectRatio.call(this)) : this.debug.error("Invalid aspect ratio specified (".concat(e2, ")")) : this.debug.warn("Aspect ratio can only be set for video");
  } }, { key: "autoplay", set: function(e2) {
    var t = is$1.boolean(e2) ? e2 : this.config.autoplay;
    this.config.autoplay = t;
  }, get: function() {
    return Boolean(this.config.autoplay);
  } }, { key: "currentTrack", set: function(e2) {
    captions.set.call(this, e2, false);
  }, get: function() {
    var e2 = this.captions, t = e2.toggled, i = e2.currentTrack;
    return t ? i : -1;
  } }, { key: "language", set: function(e2) {
    captions.setLanguage.call(this, e2, false);
  }, get: function() {
    return (captions.getCurrentTrack.call(this) || {}).language;
  } }, { key: "pip", set: function(e2) {
    if (support.pip) {
      var t = is$1.boolean(e2) ? e2 : !this.pip;
      is$1.function(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? pip.active : pip.inactive), is$1.function(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
    }
  }, get: function() {
    return support.pip ? is$1.empty(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === pip.active : null;
  } }], [{ key: "supported", value: function(e2, t, i) {
    return support.check(e2, t, i);
  } }, { key: "loadSprite", value: function(e2, t) {
    return loadSprite(e2, t);
  } }, { key: "setup", value: function(t) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = null;
    return is$1.string(t) ? n = Array.from(document.querySelectorAll(t)) : is$1.nodeList(t) ? n = Array.from(t) : is$1.array(t) && (n = t.filter(is$1.element)), is$1.empty(n) ? null : n.map(function(t2) {
      return new e(t2, i);
    });
  } }]), e;
}();
Plyr.defaults = cloneDeep(defaults$1);
var plyr_min_default = Plyr;
export {
  plyr_min_default as default
};
//# sourceMappingURL=plyr.js.map
