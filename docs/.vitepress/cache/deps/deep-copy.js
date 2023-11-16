import {
  __commonJS
} from "./chunk-ROME4SDB.js";

// node_modules/deep-copy/index.js
var require_deep_copy = __commonJS({
  "node_modules/deep-copy/index.js"(exports, module) {
    (function(name, root, factory) {
      if (typeof exports === "object") {
        module.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define(factory);
      } else {
        root[name] = factory();
      }
    })("dcopy", exports, function() {
      return function(target) {
        if (/number|string|boolean/.test(typeof target)) {
          return target;
        }
        if (target instanceof Date) {
          return new Date(target.getTime());
        }
        var copy = target instanceof Array ? [] : {};
        walk(target, copy);
        return copy;
        function walk(target2, copy2) {
          for (var key in target2) {
            var obj = target2[key];
            if (obj instanceof Date) {
              var value = new Date(obj.getTime());
              add(copy2, key, value);
            } else if (obj instanceof Function) {
              var value = obj;
              add(copy2, key, value);
            } else if (obj instanceof Array) {
              var value = [];
              var last = add(copy2, key, value);
              walk(obj, last);
            } else if (obj instanceof Object) {
              var value = {};
              var last = add(copy2, key, value);
              walk(obj, last);
            } else {
              var value = obj;
              add(copy2, key, value);
            }
          }
        }
      };
      function add(copy, key, value) {
        if (copy instanceof Array) {
          copy.push(value);
          return copy[copy.length - 1];
        } else if (copy instanceof Object) {
          copy[key] = value;
          return copy[key];
        }
      }
    });
  }
});
export default require_deep_copy();
//# sourceMappingURL=deep-copy.js.map
