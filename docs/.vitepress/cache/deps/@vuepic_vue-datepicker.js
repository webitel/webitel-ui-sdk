import {
  Fragment,
  Teleport,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentScope,
  guardReactiveProps,
  isRef,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeUpdate,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  reactive,
  ref,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  toDisplayString,
  toRef,
  unref,
  useSlots,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-2YWP3TL2.js";
import "./chunk-ROME4SDB.js";

// node_modules/date-fns/esm/_lib/toInteger/index.js
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

// node_modules/date-fns/esm/_lib/requiredArgs/index.js
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}

// node_modules/date-fns/esm/toDate/index.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}

// node_modules/date-fns/esm/addDays/index.js
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}

// node_modules/date-fns/esm/addMonths/index.js
function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  var dayOfMonth = date.getDate();
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

// node_modules/date-fns/esm/add/index.js
function _typeof2(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof2 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof2(obj);
}
function add(dirtyDate, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof2(duration) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var date = toDate(dirtyDate);
  var dateWithMonths = months || years ? addMonths(date, months + years * 12) : date;
  var dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  var minutesToAdd = minutes + hours * 60;
  var secondsToAdd = seconds + minutesToAdd * 60;
  var msToAdd = secondsToAdd * 1e3;
  var finalDate = new Date(dateWithDays.getTime() + msToAdd);
  return finalDate;
}

// node_modules/date-fns/esm/addMilliseconds/index.js
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}

// node_modules/date-fns/esm/_lib/defaultOptions/index.js
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/date-fns/esm/startOfWeek/index.js
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/startOfISOWeek/index.js
function startOfISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  return startOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}

// node_modules/date-fns/esm/getISOWeekYear/index.js
function getISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/esm/startOfISOWeekYear/index.js
function startOfISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  return date;
}

// node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

// node_modules/date-fns/esm/startOfDay/index.js
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/differenceInCalendarDays/index.js
var MILLISECONDS_IN_DAY = 864e5;
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

// node_modules/date-fns/esm/addYears/index.js
function addYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}

// node_modules/date-fns/esm/constants/index.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
var minTime = -maxTime;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

// node_modules/date-fns/esm/isDate/index.js
function _typeof3(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof3 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof3 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof3(obj);
}
function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof3(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/date-fns/esm/isValid/index.js
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}

// node_modules/date-fns/esm/eachDayOfInterval/index.js
function eachDayOfInterval(dirtyInterval, options) {
  var _options$step;
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  var step = Number((_options$step = options === null || options === void 0 ? void 0 : options.step) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step))
    throw new RangeError("`options.step` must be a number greater than 1");
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }
  return dates;
}

// node_modules/date-fns/esm/endOfWeek/index.js
function endOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/date-fns/esm/subMilliseconds/index.js
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}

// node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js
var MILLISECONDS_IN_DAY2 = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY2) + 1;
}

// node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}

// node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

// node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}

// node_modules/date-fns/esm/_lib/getUTCWeek/index.js
var MILLISECONDS_IN_WEEK2 = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK2) + 1;
}

// node_modules/date-fns/esm/_lib/addLeadingZeros/index.js
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}

// node_modules/date-fns/esm/_lib/format/lightFormatters/index.js
var formatters = {
  // Year
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function h(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds2 = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds2 * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
var lightFormatters_default = formatters;

// node_modules/date-fns/esm/_lib/format/formatters/index.js
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters2 = {
  // Era
  G: function G(date, token, localize2) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  // Year
  y: function y2(date, token, localize2) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return lightFormatters_default.y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function M2(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters_default.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize2, options) {
    var week = getUTCWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize2) {
    var isoWeek = getUTCISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function d2(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return lightFormatters_default.d(date, token);
  },
  // Day of year
  D: function D(date, token, localize2) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function a2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function h2(date, token, localize2) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return lightFormatters_default.h(date, token);
  },
  // Hour [0-23]
  H: function H2(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return lightFormatters_default.H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize2) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize2) {
    var hours = date.getUTCHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function m2(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return lightFormatters_default.m(date, token);
  },
  // Second
  s: function s2(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return lightFormatters_default.s(date, token);
  },
  // Fraction of second
  S: function S2(date, token) {
    return lightFormatters_default.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || "";
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
var formatters_default = formatters2;

// node_modules/date-fns/esm/_lib/format/longFormatters/index.js
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var longFormatters_default = longFormatters;

// node_modules/date-fns/esm/_lib/protectedTokens/index.js
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}

// node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
var formatDistance_default = formatDistance;

// node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
var formatLong_default = formatLong;

// node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = function formatRelative2(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var formatRelative_default = formatRelative;

// node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}

// node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
var localize_default = localize;

// node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}

// node_modules/date-fns/esm/locale/en-US/_lib/match/index.js
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var match_default = match;

// node_modules/date-fns/esm/locale/en-US/index.js
var locale = {
  code: "en-US",
  formatDistance: formatDistance_default,
  formatLong: formatLong_default,
  formatRelative: formatRelative_default,
  localize: localize_default,
  match: match_default,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var en_US_default = locale;

// node_modules/date-fns/esm/_lib/defaultLocale/index.js
var defaultLocale_default = en_US_default;

// node_modules/date-fns/esm/format/index.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters_default[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = formatters_default[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString(input) {
  var matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/date-fns/esm/_lib/assign/index.js
function assign(target, object) {
  if (target == null) {
    throw new TypeError("assign requires that input parameter not be null or undefined");
  }
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      ;
      target[property] = object[property];
    }
  }
  return target;
}

// node_modules/date-fns/esm/formatDistanceStrict/index.js
var MILLISECONDS_IN_MINUTE = 1e3 * 60;
var MINUTES_IN_DAY = 60 * 24;
var MINUTES_IN_MONTH = MINUTES_IN_DAY * 30;
var MINUTES_IN_YEAR = MINUTES_IN_DAY * 365;

// node_modules/date-fns/esm/getDay/index.js
function getDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var day = date.getDay();
  return day;
}

// node_modules/date-fns/esm/getDaysInMonth/index.js
function getDaysInMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth2 = /* @__PURE__ */ new Date(0);
  lastDayOfMonth2.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth2.setHours(0, 0, 0, 0);
  return lastDayOfMonth2.getDate();
}

// node_modules/date-fns/esm/getHours/index.js
function getHours(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var hours = date.getHours();
  return hours;
}

// node_modules/date-fns/esm/getISOWeek/index.js
var MILLISECONDS_IN_WEEK3 = 6048e5;
function getISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK3) + 1;
}

// node_modules/date-fns/esm/getMinutes/index.js
function getMinutes(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var minutes = date.getMinutes();
  return minutes;
}

// node_modules/date-fns/esm/getMonth/index.js
function getMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  return month;
}

// node_modules/date-fns/esm/getOverlappingDaysInIntervals/index.js
var MILLISECONDS_IN_DAY3 = 24 * 60 * 60 * 1e3;

// node_modules/date-fns/esm/getSeconds/index.js
function getSeconds(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var seconds = date.getSeconds();
  return seconds;
}

// node_modules/date-fns/esm/getWeekYear/index.js
function getWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/esm/startOfWeekYear/index.js
function startOfWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  var date = startOfWeek(firstWeek, options);
  return date;
}

// node_modules/date-fns/esm/getWeek/index.js
var MILLISECONDS_IN_WEEK4 = 6048e5;
function getWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfWeek(date, options).getTime() - startOfWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK4) + 1;
}

// node_modules/date-fns/esm/getYear/index.js
function getYear(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getFullYear();
}

// node_modules/date-fns/esm/isAfter/index.js
function isAfter(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}

// node_modules/date-fns/esm/isBefore/index.js
function isBefore(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}

// node_modules/date-fns/esm/isEqual/index.js
function isEqual(dirtyLeftDate, dirtyRightDate) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyLeftDate);
  var dateRight = toDate(dirtyRightDate);
  return dateLeft.getTime() === dateRight.getTime();
}

// node_modules/date-fns/esm/parse/_lib/Setter.js
function _typeof4(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof4 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof4 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof4(obj);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof4(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
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
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = function() {
  function Setter2() {
    _classCallCheck(this, Setter2);
    _defineProperty(this, "subPriority", 0);
  }
  _createClass(Setter2, [{
    key: "validate",
    value: function validate(_utcDate, _options) {
      return true;
    }
  }]);
  return Setter2;
}();
var ValueSetter = function(_Setter) {
  _inherits(ValueSetter2, _Setter);
  var _super = _createSuper(ValueSetter2);
  function ValueSetter2(value, validateValue, setValue, priority, subPriority) {
    var _this;
    _classCallCheck(this, ValueSetter2);
    _this = _super.call(this);
    _this.value = value;
    _this.validateValue = validateValue;
    _this.setValue = setValue;
    _this.priority = priority;
    if (subPriority) {
      _this.subPriority = subPriority;
    }
    return _this;
  }
  _createClass(ValueSetter2, [{
    key: "validate",
    value: function validate(utcDate, options) {
      return this.validateValue(utcDate, this.value, options);
    }
  }, {
    key: "set",
    value: function set2(utcDate, flags, options) {
      return this.setValue(utcDate, flags, this.value, options);
    }
  }]);
  return ValueSetter2;
}(Setter);
var DateToSystemTimezoneSetter = function(_Setter2) {
  _inherits(DateToSystemTimezoneSetter2, _Setter2);
  var _super2 = _createSuper(DateToSystemTimezoneSetter2);
  function DateToSystemTimezoneSetter2() {
    var _this2;
    _classCallCheck(this, DateToSystemTimezoneSetter2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this2), "priority", TIMEZONE_UNIT_PRIORITY);
    _defineProperty(_assertThisInitialized(_this2), "subPriority", -1);
    return _this2;
  }
  _createClass(DateToSystemTimezoneSetter2, [{
    key: "set",
    value: function set2(date, flags) {
      if (flags.timestampIsSet) {
        return date;
      }
      var convertedDate = /* @__PURE__ */ new Date(0);
      convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
      convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
      return convertedDate;
    }
  }]);
  return DateToSystemTimezoneSetter2;
}(Setter);

// node_modules/date-fns/esm/parse/_lib/Parser.js
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties2(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties2(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties2(Constructor, staticProps);
  return Constructor;
}
var Parser = function() {
  function Parser2() {
    _classCallCheck2(this, Parser2);
  }
  _createClass2(Parser2, [{
    key: "run",
    value: function run(dateString, token, match2, options) {
      var result = this.parse(dateString, token, match2, options);
      if (!result) {
        return null;
      }
      return {
        setter: new ValueSetter(result.value, this.validate, this.set, this.priority, this.subPriority),
        rest: result.rest
      };
    }
  }, {
    key: "validate",
    value: function validate(_utcDate, _value, _options) {
      return true;
    }
  }]);
  return Parser2;
}();

// node_modules/date-fns/esm/parse/_lib/parsers/EraParser.js
function _typeof5(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof5 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof5 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof5(obj);
}
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties3(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties3(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties3(Constructor, staticProps);
  return Constructor;
}
function _inherits2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf2(subClass, superClass);
}
function _setPrototypeOf2(o, p) {
  _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf2(o, p);
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn2(this, result);
  };
}
function _possibleConstructorReturn2(self, call) {
  if (call && (_typeof5(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized2(self);
}
function _assertThisInitialized2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf2(o) {
  _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf2(o);
}
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var EraParser = function(_Parser) {
  _inherits2(EraParser2, _Parser);
  var _super = _createSuper2(EraParser2);
  function EraParser2() {
    var _this;
    _classCallCheck3(this, EraParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty2(_assertThisInitialized2(_this), "priority", 140);
    _defineProperty2(_assertThisInitialized2(_this), "incompatibleTokens", ["R", "u", "t", "T"]);
    return _this;
  }
  _createClass3(EraParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "G":
        case "GG":
        case "GGG":
          return match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
        case "GGGGG":
          return match2.era(dateString, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return match2.era(dateString, {
            width: "wide"
          }) || match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      flags.era = value;
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return EraParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/constants.js
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};

// node_modules/date-fns/esm/parse/_lib/utils.js
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  var sign = matchResult[1] === "+" ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0;
  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

// node_modules/date-fns/esm/parse/_lib/parsers/YearParser.js
function _typeof6(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof6 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof6 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof6(obj);
}
function _classCallCheck4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties4(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass4(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties4(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties4(Constructor, staticProps);
  return Constructor;
}
function _inherits3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf3(subClass, superClass);
}
function _setPrototypeOf3(o, p) {
  _setPrototypeOf3 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf3(o, p);
}
function _createSuper3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct3();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf3(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf3(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn3(this, result);
  };
}
function _possibleConstructorReturn3(self, call) {
  if (call && (_typeof6(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized3(self);
}
function _assertThisInitialized3(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct3() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf3(o) {
  _getPrototypeOf3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf3(o);
}
function _defineProperty3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var YearParser = function(_Parser) {
  _inherits3(YearParser2, _Parser);
  var _super = _createSuper3(YearParser2);
  function YearParser2() {
    var _this;
    _classCallCheck4(this, YearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty3(_assertThisInitialized3(_this), "priority", 130);
    _defineProperty3(_assertThisInitialized3(_this), "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass4(YearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(year) {
        return {
          year,
          isTwoDigitYear: token === "yy"
        };
      };
      switch (token) {
        case "y":
          return mapValue(parseNDigits(4, dateString), valueCallback3);
        case "yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback3);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      var currentYear = date.getUTCFullYear();
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return YearParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/LocalWeekYearParser.js
function _typeof7(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof7 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof7 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof7(obj);
}
function _classCallCheck5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties5(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass5(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties5(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties5(Constructor, staticProps);
  return Constructor;
}
function _inherits4(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf4(subClass, superClass);
}
function _setPrototypeOf4(o, p) {
  _setPrototypeOf4 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf4(o, p);
}
function _createSuper4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct4();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf4(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf4(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn4(this, result);
  };
}
function _possibleConstructorReturn4(self, call) {
  if (call && (_typeof7(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized4(self);
}
function _assertThisInitialized4(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct4() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf4(o) {
  _getPrototypeOf4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf4(o);
}
function _defineProperty4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var LocalWeekYearParser = function(_Parser) {
  _inherits4(LocalWeekYearParser2, _Parser);
  var _super = _createSuper4(LocalWeekYearParser2);
  function LocalWeekYearParser2() {
    var _this;
    _classCallCheck5(this, LocalWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty4(_assertThisInitialized4(_this), "priority", 130);
    _defineProperty4(_assertThisInitialized4(_this), "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass5(LocalWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(year) {
        return {
          year,
          isTwoDigitYear: token === "YY"
        };
      };
      switch (token) {
        case "Y":
          return mapValue(parseNDigits(4, dateString), valueCallback3);
        case "Yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback3);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set2(date, flags, value, options) {
      var currentYear = getUTCWeekYear(date, options);
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date, options);
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
      date.setUTCHours(0, 0, 0, 0);
      return startOfUTCWeek(date, options);
    }
  }]);
  return LocalWeekYearParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/ISOWeekYearParser.js
function _typeof8(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof8 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof8 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof8(obj);
}
function _classCallCheck6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties6(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass6(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties6(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties6(Constructor, staticProps);
  return Constructor;
}
function _inherits5(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf5(subClass, superClass);
}
function _setPrototypeOf5(o, p) {
  _setPrototypeOf5 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf5(o, p);
}
function _createSuper5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct5();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf5(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf5(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn5(this, result);
  };
}
function _possibleConstructorReturn5(self, call) {
  if (call && (_typeof8(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized5(self);
}
function _assertThisInitialized5(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct5() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf5(o) {
  _getPrototypeOf5 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf5(o);
}
function _defineProperty5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISOWeekYearParser = function(_Parser) {
  _inherits5(ISOWeekYearParser2, _Parser);
  var _super = _createSuper5(ISOWeekYearParser2);
  function ISOWeekYearParser2() {
    var _this;
    _classCallCheck6(this, ISOWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty5(_assertThisInitialized5(_this), "priority", 130);
    _defineProperty5(_assertThisInitialized5(_this), "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass6(ISOWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "R") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      var firstWeekOfYear = /* @__PURE__ */ new Date(0);
      firstWeekOfYear.setUTCFullYear(value, 0, 4);
      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
      return startOfUTCISOWeek(firstWeekOfYear);
    }
  }]);
  return ISOWeekYearParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/ExtendedYearParser.js
function _typeof9(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof9 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof9 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof9(obj);
}
function _classCallCheck7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties7(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass7(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties7(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties7(Constructor, staticProps);
  return Constructor;
}
function _inherits6(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf6(subClass, superClass);
}
function _setPrototypeOf6(o, p) {
  _setPrototypeOf6 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf6(o, p);
}
function _createSuper6(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct6();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf6(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf6(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn6(this, result);
  };
}
function _possibleConstructorReturn6(self, call) {
  if (call && (_typeof9(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized6(self);
}
function _assertThisInitialized6(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct6() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf6(o) {
  _getPrototypeOf6 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf6(o);
}
function _defineProperty6(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ExtendedYearParser = function(_Parser) {
  _inherits6(ExtendedYearParser2, _Parser);
  var _super = _createSuper6(ExtendedYearParser2);
  function ExtendedYearParser2() {
    var _this;
    _classCallCheck7(this, ExtendedYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty6(_assertThisInitialized6(_this), "priority", 130);
    _defineProperty6(_assertThisInitialized6(_this), "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass7(ExtendedYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "u") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ExtendedYearParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/QuarterParser.js
function _typeof10(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof10 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof10 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof10(obj);
}
function _classCallCheck8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties8(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass8(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties8(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties8(Constructor, staticProps);
  return Constructor;
}
function _inherits7(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf7(subClass, superClass);
}
function _setPrototypeOf7(o, p) {
  _setPrototypeOf7 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf7(o, p);
}
function _createSuper7(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct7();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf7(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf7(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn7(this, result);
  };
}
function _possibleConstructorReturn7(self, call) {
  if (call && (_typeof10(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized7(self);
}
function _assertThisInitialized7(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct7() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf7(o) {
  _getPrototypeOf7 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf7(o);
}
function _defineProperty7(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var QuarterParser = function(_Parser) {
  _inherits7(QuarterParser2, _Parser);
  var _super = _createSuper7(QuarterParser2);
  function QuarterParser2() {
    var _this;
    _classCallCheck8(this, QuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty7(_assertThisInitialized7(_this), "priority", 120);
    _defineProperty7(_assertThisInitialized7(_this), "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass8(QuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "Q":
        case "QQ":
          return parseNDigits(token.length, dateString);
        case "Qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
        case "QQQ":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQQ":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return QuarterParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/StandAloneQuarterParser.js
function _typeof11(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof11 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof11 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof11(obj);
}
function _classCallCheck9(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties9(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass9(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties9(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties9(Constructor, staticProps);
  return Constructor;
}
function _inherits8(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf8(subClass, superClass);
}
function _setPrototypeOf8(o, p) {
  _setPrototypeOf8 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf8(o, p);
}
function _createSuper8(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct8();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf8(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf8(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn8(this, result);
  };
}
function _possibleConstructorReturn8(self, call) {
  if (call && (_typeof11(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized8(self);
}
function _assertThisInitialized8(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct8() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf8(o) {
  _getPrototypeOf8 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf8(o);
}
function _defineProperty8(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var StandAloneQuarterParser = function(_Parser) {
  _inherits8(StandAloneQuarterParser2, _Parser);
  var _super = _createSuper8(StandAloneQuarterParser2);
  function StandAloneQuarterParser2() {
    var _this;
    _classCallCheck9(this, StandAloneQuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty8(_assertThisInitialized8(_this), "priority", 120);
    _defineProperty8(_assertThisInitialized8(_this), "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass9(StandAloneQuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "q":
        case "qq":
          return parseNDigits(token.length, dateString);
        case "qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
        case "qqq":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqqq":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneQuarterParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/MonthParser.js
function _typeof12(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof12 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof12 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof12(obj);
}
function _classCallCheck10(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties10(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass10(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties10(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties10(Constructor, staticProps);
  return Constructor;
}
function _inherits9(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf9(subClass, superClass);
}
function _setPrototypeOf9(o, p) {
  _setPrototypeOf9 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf9(o, p);
}
function _createSuper9(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct9();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf9(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf9(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn9(this, result);
  };
}
function _possibleConstructorReturn9(self, call) {
  if (call && (_typeof12(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized9(self);
}
function _assertThisInitialized9(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct9() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf9(o) {
  _getPrototypeOf9 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf9(o);
}
function _defineProperty9(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var MonthParser = function(_Parser) {
  _inherits9(MonthParser2, _Parser);
  var _super = _createSuper9(MonthParser2);
  function MonthParser2() {
    var _this;
    _classCallCheck10(this, MonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty9(_assertThisInitialized9(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]);
    _defineProperty9(_assertThisInitialized9(_this), "priority", 110);
    return _this;
  }
  _createClass10(MonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        return value - 1;
      };
      switch (token) {
        case "M":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback3);
        case "MM":
          return mapValue(parseNDigits(2, dateString), valueCallback3);
        case "Mo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback3);
        case "MMM":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMMM":
          return match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return MonthParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/StandAloneMonthParser.js
function _typeof13(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof13 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof13 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof13(obj);
}
function _classCallCheck11(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties11(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass11(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties11(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties11(Constructor, staticProps);
  return Constructor;
}
function _inherits10(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf10(subClass, superClass);
}
function _setPrototypeOf10(o, p) {
  _setPrototypeOf10 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf10(o, p);
}
function _createSuper10(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct10();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf10(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf10(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn10(this, result);
  };
}
function _possibleConstructorReturn10(self, call) {
  if (call && (_typeof13(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized10(self);
}
function _assertThisInitialized10(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct10() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf10(o) {
  _getPrototypeOf10 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf10(o);
}
function _defineProperty10(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var StandAloneMonthParser = function(_Parser) {
  _inherits10(StandAloneMonthParser2, _Parser);
  var _super = _createSuper10(StandAloneMonthParser2);
  function StandAloneMonthParser2() {
    var _this;
    _classCallCheck11(this, StandAloneMonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty10(_assertThisInitialized10(_this), "priority", 110);
    _defineProperty10(_assertThisInitialized10(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass11(StandAloneMonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        return value - 1;
      };
      switch (token) {
        case "L":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback3);
        case "LL":
          return mapValue(parseNDigits(2, dateString), valueCallback3);
        case "Lo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback3);
        case "LLL":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLLL":
          return match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneMonthParser2;
}(Parser);

// node_modules/date-fns/esm/_lib/setUTCWeek/index.js
function setUTCWeek(dirtyDate, dirtyWeek, options) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var week = toInteger(dirtyWeek);
  var diff = getUTCWeek(date, options) - week;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

// node_modules/date-fns/esm/parse/_lib/parsers/LocalWeekParser.js
function _typeof14(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof14 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof14 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof14(obj);
}
function _classCallCheck12(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties12(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass12(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties12(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties12(Constructor, staticProps);
  return Constructor;
}
function _inherits11(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf11(subClass, superClass);
}
function _setPrototypeOf11(o, p) {
  _setPrototypeOf11 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf11(o, p);
}
function _createSuper11(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct11();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf11(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf11(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn11(this, result);
  };
}
function _possibleConstructorReturn11(self, call) {
  if (call && (_typeof14(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized11(self);
}
function _assertThisInitialized11(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct11() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf11(o) {
  _getPrototypeOf11 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf11(o);
}
function _defineProperty11(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var LocalWeekParser = function(_Parser) {
  _inherits11(LocalWeekParser2, _Parser);
  var _super = _createSuper11(LocalWeekParser2);
  function LocalWeekParser2() {
    var _this;
    _classCallCheck12(this, LocalWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty11(_assertThisInitialized11(_this), "priority", 100);
    _defineProperty11(_assertThisInitialized11(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass12(LocalWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "w":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "wo":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      return startOfUTCWeek(setUTCWeek(date, value, options), options);
    }
  }]);
  return LocalWeekParser2;
}(Parser);

// node_modules/date-fns/esm/_lib/setUTCISOWeek/index.js
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var isoWeek = toInteger(dirtyISOWeek);
  var diff = getUTCISOWeek(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

// node_modules/date-fns/esm/parse/_lib/parsers/ISOWeekParser.js
function _typeof15(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof15 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof15 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof15(obj);
}
function _classCallCheck13(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties13(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass13(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties13(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties13(Constructor, staticProps);
  return Constructor;
}
function _inherits12(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf12(subClass, superClass);
}
function _setPrototypeOf12(o, p) {
  _setPrototypeOf12 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf12(o, p);
}
function _createSuper12(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct12();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf12(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf12(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn12(this, result);
  };
}
function _possibleConstructorReturn12(self, call) {
  if (call && (_typeof15(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized12(self);
}
function _assertThisInitialized12(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct12() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf12(o) {
  _getPrototypeOf12 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf12(o);
}
function _defineProperty12(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISOWeekParser = function(_Parser) {
  _inherits12(ISOWeekParser2, _Parser);
  var _super = _createSuper12(ISOWeekParser2);
  function ISOWeekParser2() {
    var _this;
    _classCallCheck13(this, ISOWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty12(_assertThisInitialized12(_this), "priority", 100);
    _defineProperty12(_assertThisInitialized12(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass13(ISOWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "I":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "Io":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      return startOfUTCISOWeek(setUTCISOWeek(date, value));
    }
  }]);
  return ISOWeekParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/DateParser.js
function _typeof16(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof16 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof16 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof16(obj);
}
function _classCallCheck14(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties14(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass14(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties14(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties14(Constructor, staticProps);
  return Constructor;
}
function _inherits13(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf13(subClass, superClass);
}
function _setPrototypeOf13(o, p) {
  _setPrototypeOf13 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf13(o, p);
}
function _createSuper13(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct13();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf13(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf13(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn13(this, result);
  };
}
function _possibleConstructorReturn13(self, call) {
  if (call && (_typeof16(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized13(self);
}
function _assertThisInitialized13(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct13() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf13(o) {
  _getPrototypeOf13 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf13(o);
}
function _defineProperty13(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DateParser = function(_Parser) {
  _inherits13(DateParser2, _Parser);
  var _super = _createSuper13(DateParser2);
  function DateParser2() {
    var _this;
    _classCallCheck14(this, DateParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty13(_assertThisInitialized13(_this), "priority", 90);
    _defineProperty13(_assertThisInitialized13(_this), "subPriority", 1);
    _defineProperty13(_assertThisInitialized13(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass14(DateParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "d":
          return parseNumericPattern(numericPatterns.date, dateString);
        case "do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear2 = isLeapYearIndex(year);
      var month = date.getUTCMonth();
      if (isLeapYear2) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCDate(value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DateParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/DayOfYearParser.js
function _typeof17(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof17 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof17 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof17(obj);
}
function _classCallCheck15(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties15(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass15(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties15(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties15(Constructor, staticProps);
  return Constructor;
}
function _inherits14(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf14(subClass, superClass);
}
function _setPrototypeOf14(o, p) {
  _setPrototypeOf14 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf14(o, p);
}
function _createSuper14(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct14();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf14(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf14(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn14(this, result);
  };
}
function _possibleConstructorReturn14(self, call) {
  if (call && (_typeof17(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized14(self);
}
function _assertThisInitialized14(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct14() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf14(o) {
  _getPrototypeOf14 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf14(o);
}
function _defineProperty14(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DayOfYearParser = function(_Parser) {
  _inherits14(DayOfYearParser2, _Parser);
  var _super = _createSuper14(DayOfYearParser2);
  function DayOfYearParser2() {
    var _this;
    _classCallCheck15(this, DayOfYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty14(_assertThisInitialized14(_this), "priority", 90);
    _defineProperty14(_assertThisInitialized14(_this), "subpriority", 1);
    _defineProperty14(_assertThisInitialized14(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass15(DayOfYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "D":
        case "DD":
          return parseNumericPattern(numericPatterns.dayOfYear, dateString);
        case "Do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear2 = isLeapYearIndex(year);
      if (isLeapYear2) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(0, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayOfYearParser2;
}(Parser);

// node_modules/date-fns/esm/_lib/setUTCDay/index.js
function setUTCDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// node_modules/date-fns/esm/parse/_lib/parsers/DayParser.js
function _typeof18(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof18 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof18 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof18(obj);
}
function _classCallCheck16(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties16(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass16(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties16(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties16(Constructor, staticProps);
  return Constructor;
}
function _inherits15(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf15(subClass, superClass);
}
function _setPrototypeOf15(o, p) {
  _setPrototypeOf15 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf15(o, p);
}
function _createSuper15(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct15();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf15(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf15(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn15(this, result);
  };
}
function _possibleConstructorReturn15(self, call) {
  if (call && (_typeof18(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized15(self);
}
function _assertThisInitialized15(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct15() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf15(o) {
  _getPrototypeOf15 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf15(o);
}
function _defineProperty15(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DayParser = function(_Parser) {
  _inherits15(DayParser2, _Parser);
  var _super = _createSuper15(DayParser2);
  function DayParser2() {
    var _this;
    _classCallCheck16(this, DayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty15(_assertThisInitialized15(_this), "priority", 90);
    _defineProperty15(_assertThisInitialized15(_this), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass16(DayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "E":
        case "EE":
        case "EEE":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEE":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEE":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/LocalDayParser.js
function _typeof19(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof19 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof19 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof19(obj);
}
function _classCallCheck17(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties17(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass17(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties17(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties17(Constructor, staticProps);
  return Constructor;
}
function _inherits16(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf16(subClass, superClass);
}
function _setPrototypeOf16(o, p) {
  _setPrototypeOf16 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf16(o, p);
}
function _createSuper16(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct16();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf16(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf16(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn16(this, result);
  };
}
function _possibleConstructorReturn16(self, call) {
  if (call && (_typeof19(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized16(self);
}
function _assertThisInitialized16(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct16() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf16(o) {
  _getPrototypeOf16 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf16(o);
}
function _defineProperty16(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var LocalDayParser = function(_Parser) {
  _inherits16(LocalDayParser2, _Parser);
  var _super = _createSuper16(LocalDayParser2);
  function LocalDayParser2() {
    var _this;
    _classCallCheck17(this, LocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty16(_assertThisInitialized16(_this), "priority", 90);
    _defineProperty16(_assertThisInitialized16(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]);
    return _this;
  }
  _createClass17(LocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback3 = function valueCallback4(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "e":
        case "ee":
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
        case "eo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback3);
        case "eee":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeee":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "eeee":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return LocalDayParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/StandAloneLocalDayParser.js
function _typeof20(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof20 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof20 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof20(obj);
}
function _classCallCheck18(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties18(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass18(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties18(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties18(Constructor, staticProps);
  return Constructor;
}
function _inherits17(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf17(subClass, superClass);
}
function _setPrototypeOf17(o, p) {
  _setPrototypeOf17 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf17(o, p);
}
function _createSuper17(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct17();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf17(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf17(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn17(this, result);
  };
}
function _possibleConstructorReturn17(self, call) {
  if (call && (_typeof20(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized17(self);
}
function _assertThisInitialized17(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct17() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf17(o) {
  _getPrototypeOf17 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf17(o);
}
function _defineProperty17(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var StandAloneLocalDayParser = function(_Parser) {
  _inherits17(StandAloneLocalDayParser2, _Parser);
  var _super = _createSuper17(StandAloneLocalDayParser2);
  function StandAloneLocalDayParser2() {
    var _this;
    _classCallCheck18(this, StandAloneLocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty17(_assertThisInitialized17(_this), "priority", 90);
    _defineProperty17(_assertThisInitialized17(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]);
    return _this;
  }
  _createClass18(StandAloneLocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback3 = function valueCallback4(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        case "c":
        case "cc":
          return mapValue(parseNDigits(token.length, dateString), valueCallback3);
        case "co":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback3);
        case "ccc":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "ccccc":
          return match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        case "cccc":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneLocalDayParser2;
}(Parser);

// node_modules/date-fns/esm/_lib/setUTCISODay/index.js
function setUTCISODay(dirtyDate, dirtyDay) {
  requiredArgs(2, arguments);
  var day = toInteger(dirtyDay);
  if (day % 7 === 0) {
    day = day - 7;
  }
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// node_modules/date-fns/esm/parse/_lib/parsers/ISODayParser.js
function _typeof21(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof21 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof21 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof21(obj);
}
function _classCallCheck19(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties19(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass19(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties19(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties19(Constructor, staticProps);
  return Constructor;
}
function _inherits18(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf18(subClass, superClass);
}
function _setPrototypeOf18(o, p) {
  _setPrototypeOf18 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf18(o, p);
}
function _createSuper18(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct18();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf18(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf18(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn18(this, result);
  };
}
function _possibleConstructorReturn18(self, call) {
  if (call && (_typeof21(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized18(self);
}
function _assertThisInitialized18(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct18() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf18(o) {
  _getPrototypeOf18 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf18(o);
}
function _defineProperty18(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISODayParser = function(_Parser) {
  _inherits18(ISODayParser2, _Parser);
  var _super = _createSuper18(ISODayParser2);
  function ISODayParser2() {
    var _this;
    _classCallCheck19(this, ISODayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty18(_assertThisInitialized18(_this), "priority", 90);
    _defineProperty18(_assertThisInitialized18(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass19(ISODayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback3 = function valueCallback4(value) {
        if (value === 0) {
          return 7;
        }
        return value;
      };
      switch (token) {
        case "i":
        case "ii":
          return parseNDigits(token.length, dateString);
        case "io":
          return match2.ordinalNumber(dateString, {
            unit: "day"
          });
        case "iii":
          return mapValue(match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiiii":
          return mapValue(match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiiiii":
          return mapValue(match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
        case "iiii":
        default:
          return mapValue(match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback3);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 7;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date = setUTCISODay(date, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ISODayParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/AMPMParser.js
function _typeof22(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof22 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof22 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof22(obj);
}
function _classCallCheck20(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties20(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass20(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties20(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties20(Constructor, staticProps);
  return Constructor;
}
function _inherits19(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf19(subClass, superClass);
}
function _setPrototypeOf19(o, p) {
  _setPrototypeOf19 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf19(o, p);
}
function _createSuper19(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct19();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf19(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf19(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn19(this, result);
  };
}
function _possibleConstructorReturn19(self, call) {
  if (call && (_typeof22(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized19(self);
}
function _assertThisInitialized19(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct19() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf19(o) {
  _getPrototypeOf19 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf19(o);
}
function _defineProperty19(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var AMPMParser = function(_Parser) {
  _inherits19(AMPMParser2, _Parser);
  var _super = _createSuper19(AMPMParser2);
  function AMPMParser2() {
    var _this;
    _classCallCheck20(this, AMPMParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty19(_assertThisInitialized19(_this), "priority", 80);
    _defineProperty19(_assertThisInitialized19(_this), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass20(AMPMParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "a":
        case "aa":
        case "aaa":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/AMPMMidnightParser.js
function _typeof23(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof23 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof23 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof23(obj);
}
function _classCallCheck21(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties21(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass21(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties21(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties21(Constructor, staticProps);
  return Constructor;
}
function _inherits20(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf20(subClass, superClass);
}
function _setPrototypeOf20(o, p) {
  _setPrototypeOf20 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf20(o, p);
}
function _createSuper20(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct20();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf20(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf20(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn20(this, result);
  };
}
function _possibleConstructorReturn20(self, call) {
  if (call && (_typeof23(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized20(self);
}
function _assertThisInitialized20(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct20() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf20(o) {
  _getPrototypeOf20 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf20(o);
}
function _defineProperty20(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var AMPMMidnightParser = function(_Parser) {
  _inherits20(AMPMMidnightParser2, _Parser);
  var _super = _createSuper20(AMPMMidnightParser2);
  function AMPMMidnightParser2() {
    var _this;
    _classCallCheck21(this, AMPMMidnightParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty20(_assertThisInitialized20(_this), "priority", 80);
    _defineProperty20(_assertThisInitialized20(_this), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass21(AMPMMidnightParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "b":
        case "bb":
        case "bbb":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMMidnightParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/DayPeriodParser.js
function _typeof24(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof24 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof24 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof24(obj);
}
function _classCallCheck22(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties22(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass22(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties22(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties22(Constructor, staticProps);
  return Constructor;
}
function _inherits21(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf21(subClass, superClass);
}
function _setPrototypeOf21(o, p) {
  _setPrototypeOf21 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf21(o, p);
}
function _createSuper21(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct21();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf21(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf21(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn21(this, result);
  };
}
function _possibleConstructorReturn21(self, call) {
  if (call && (_typeof24(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized21(self);
}
function _assertThisInitialized21(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct21() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf21(o) {
  _getPrototypeOf21 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf21(o);
}
function _defineProperty21(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DayPeriodParser = function(_Parser) {
  _inherits21(DayPeriodParser2, _Parser);
  var _super = _createSuper21(DayPeriodParser2);
  function DayPeriodParser2() {
    var _this;
    _classCallCheck22(this, DayPeriodParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty21(_assertThisInitialized21(_this), "priority", 80);
    _defineProperty21(_assertThisInitialized21(_this), "incompatibleTokens", ["a", "b", "t", "T"]);
    return _this;
  }
  _createClass22(DayPeriodParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return DayPeriodParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/Hour1to12Parser.js
function _typeof25(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof25 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof25 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof25(obj);
}
function _classCallCheck23(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties23(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass23(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties23(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties23(Constructor, staticProps);
  return Constructor;
}
function _inherits22(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf22(subClass, superClass);
}
function _setPrototypeOf22(o, p) {
  _setPrototypeOf22 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf22(o, p);
}
function _createSuper22(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct22();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf22(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf22(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn22(this, result);
  };
}
function _possibleConstructorReturn22(self, call) {
  if (call && (_typeof25(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized22(self);
}
function _assertThisInitialized22(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct22() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf22(o) {
  _getPrototypeOf22 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf22(o);
}
function _defineProperty22(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Hour1to12Parser = function(_Parser) {
  _inherits22(Hour1to12Parser2, _Parser);
  var _super = _createSuper22(Hour1to12Parser2);
  function Hour1to12Parser2() {
    var _this;
    _classCallCheck23(this, Hour1to12Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty22(_assertThisInitialized22(_this), "priority", 70);
    _defineProperty22(_assertThisInitialized22(_this), "incompatibleTokens", ["H", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass23(Hour1to12Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "h":
          return parseNumericPattern(numericPatterns.hour12h, dateString);
        case "ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 12;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setUTCHours(0, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour1to12Parser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/Hour0to23Parser.js
function _typeof26(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof26 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof26 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof26(obj);
}
function _classCallCheck24(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties24(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass24(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties24(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties24(Constructor, staticProps);
  return Constructor;
}
function _inherits23(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf23(subClass, superClass);
}
function _setPrototypeOf23(o, p) {
  _setPrototypeOf23 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf23(o, p);
}
function _createSuper23(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct23();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf23(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf23(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn23(this, result);
  };
}
function _possibleConstructorReturn23(self, call) {
  if (call && (_typeof26(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized23(self);
}
function _assertThisInitialized23(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct23() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf23(o) {
  _getPrototypeOf23 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf23(o);
}
function _defineProperty23(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Hour0to23Parser = function(_Parser) {
  _inherits23(Hour0to23Parser2, _Parser);
  var _super = _createSuper23(Hour0to23Parser2);
  function Hour0to23Parser2() {
    var _this;
    _classCallCheck24(this, Hour0to23Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty23(_assertThisInitialized23(_this), "priority", 70);
    _defineProperty23(_assertThisInitialized23(_this), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass24(Hour0to23Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "H":
          return parseNumericPattern(numericPatterns.hour23h, dateString);
        case "Ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 23;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(value, 0, 0, 0);
      return date;
    }
  }]);
  return Hour0to23Parser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/Hour0To11Parser.js
function _typeof27(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof27 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof27 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof27(obj);
}
function _classCallCheck25(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties25(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass25(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties25(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties25(Constructor, staticProps);
  return Constructor;
}
function _inherits24(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf24(subClass, superClass);
}
function _setPrototypeOf24(o, p) {
  _setPrototypeOf24 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf24(o, p);
}
function _createSuper24(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct24();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf24(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf24(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn24(this, result);
  };
}
function _possibleConstructorReturn24(self, call) {
  if (call && (_typeof27(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized24(self);
}
function _assertThisInitialized24(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct24() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf24(o) {
  _getPrototypeOf24 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf24(o);
}
function _defineProperty24(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Hour0To11Parser = function(_Parser) {
  _inherits24(Hour0To11Parser2, _Parser);
  var _super = _createSuper24(Hour0To11Parser2);
  function Hour0To11Parser2() {
    var _this;
    _classCallCheck25(this, Hour0To11Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty24(_assertThisInitialized24(_this), "priority", 70);
    _defineProperty24(_assertThisInitialized24(_this), "incompatibleTokens", ["h", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass25(Hour0To11Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "K":
          return parseNumericPattern(numericPatterns.hour11h, dateString);
        case "Ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour0To11Parser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/Hour1To24Parser.js
function _typeof28(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof28 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof28 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof28(obj);
}
function _classCallCheck26(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties26(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass26(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties26(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties26(Constructor, staticProps);
  return Constructor;
}
function _inherits25(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf25(subClass, superClass);
}
function _setPrototypeOf25(o, p) {
  _setPrototypeOf25 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf25(o, p);
}
function _createSuper25(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct25();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf25(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf25(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn25(this, result);
  };
}
function _possibleConstructorReturn25(self, call) {
  if (call && (_typeof28(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized25(self);
}
function _assertThisInitialized25(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct25() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf25(o) {
  _getPrototypeOf25 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf25(o);
}
function _defineProperty25(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Hour1To24Parser = function(_Parser) {
  _inherits25(Hour1To24Parser2, _Parser);
  var _super = _createSuper25(Hour1To24Parser2);
  function Hour1To24Parser2() {
    var _this;
    _classCallCheck26(this, Hour1To24Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty25(_assertThisInitialized25(_this), "priority", 70);
    _defineProperty25(_assertThisInitialized25(_this), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
    return _this;
  }
  _createClass26(Hour1To24Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "k":
          return parseNumericPattern(numericPatterns.hour24h, dateString);
        case "ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 24;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var hours = value <= 24 ? value % 24 : value;
      date.setUTCHours(hours, 0, 0, 0);
      return date;
    }
  }]);
  return Hour1To24Parser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/MinuteParser.js
function _typeof29(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof29 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof29 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof29(obj);
}
function _classCallCheck27(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties27(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass27(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties27(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties27(Constructor, staticProps);
  return Constructor;
}
function _inherits26(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf26(subClass, superClass);
}
function _setPrototypeOf26(o, p) {
  _setPrototypeOf26 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf26(o, p);
}
function _createSuper26(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct26();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf26(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf26(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn26(this, result);
  };
}
function _possibleConstructorReturn26(self, call) {
  if (call && (_typeof29(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized26(self);
}
function _assertThisInitialized26(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct26() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf26(o) {
  _getPrototypeOf26 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf26(o);
}
function _defineProperty26(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var MinuteParser = function(_Parser) {
  _inherits26(MinuteParser2, _Parser);
  var _super = _createSuper26(MinuteParser2);
  function MinuteParser2() {
    var _this;
    _classCallCheck27(this, MinuteParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty26(_assertThisInitialized26(_this), "priority", 60);
    _defineProperty26(_assertThisInitialized26(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass27(MinuteParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "m":
          return parseNumericPattern(numericPatterns.minute, dateString);
        case "mo":
          return match2.ordinalNumber(dateString, {
            unit: "minute"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMinutes(value, 0, 0);
      return date;
    }
  }]);
  return MinuteParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/SecondParser.js
function _typeof30(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof30 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof30 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof30(obj);
}
function _classCallCheck28(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties28(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass28(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties28(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties28(Constructor, staticProps);
  return Constructor;
}
function _inherits27(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf27(subClass, superClass);
}
function _setPrototypeOf27(o, p) {
  _setPrototypeOf27 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf27(o, p);
}
function _createSuper27(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct27();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf27(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf27(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn27(this, result);
  };
}
function _possibleConstructorReturn27(self, call) {
  if (call && (_typeof30(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized27(self);
}
function _assertThisInitialized27(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct27() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf27(o) {
  _getPrototypeOf27 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf27(o);
}
function _defineProperty27(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var SecondParser = function(_Parser) {
  _inherits27(SecondParser2, _Parser);
  var _super = _createSuper27(SecondParser2);
  function SecondParser2() {
    var _this;
    _classCallCheck28(this, SecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty27(_assertThisInitialized27(_this), "priority", 50);
    _defineProperty27(_assertThisInitialized27(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass28(SecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "s":
          return parseNumericPattern(numericPatterns.second, dateString);
        case "so":
          return match2.ordinalNumber(dateString, {
            unit: "second"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCSeconds(value, 0);
      return date;
    }
  }]);
  return SecondParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/FractionOfSecondParser.js
function _typeof31(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof31 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof31 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof31(obj);
}
function _classCallCheck29(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties29(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass29(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties29(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties29(Constructor, staticProps);
  return Constructor;
}
function _inherits28(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf28(subClass, superClass);
}
function _setPrototypeOf28(o, p) {
  _setPrototypeOf28 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf28(o, p);
}
function _createSuper28(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct28();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf28(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf28(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn28(this, result);
  };
}
function _possibleConstructorReturn28(self, call) {
  if (call && (_typeof31(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized28(self);
}
function _assertThisInitialized28(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct28() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf28(o) {
  _getPrototypeOf28 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf28(o);
}
function _defineProperty28(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var FractionOfSecondParser = function(_Parser) {
  _inherits28(FractionOfSecondParser2, _Parser);
  var _super = _createSuper28(FractionOfSecondParser2);
  function FractionOfSecondParser2() {
    var _this;
    _classCallCheck29(this, FractionOfSecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty28(_assertThisInitialized28(_this), "priority", 30);
    _defineProperty28(_assertThisInitialized28(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass29(FractionOfSecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      var valueCallback3 = function valueCallback4(value) {
        return Math.floor(value * Math.pow(10, -token.length + 3));
      };
      return mapValue(parseNDigits(token.length, dateString), valueCallback3);
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMilliseconds(value);
      return date;
    }
  }]);
  return FractionOfSecondParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/ISOTimezoneWithZParser.js
function _typeof32(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof32 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof32 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof32(obj);
}
function _classCallCheck30(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties30(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass30(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties30(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties30(Constructor, staticProps);
  return Constructor;
}
function _inherits29(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf29(subClass, superClass);
}
function _setPrototypeOf29(o, p) {
  _setPrototypeOf29 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf29(o, p);
}
function _createSuper29(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct29();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf29(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf29(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn29(this, result);
  };
}
function _possibleConstructorReturn29(self, call) {
  if (call && (_typeof32(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized29(self);
}
function _assertThisInitialized29(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct29() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf29(o) {
  _getPrototypeOf29 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf29(o);
}
function _defineProperty29(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISOTimezoneWithZParser = function(_Parser) {
  _inherits29(ISOTimezoneWithZParser2, _Parser);
  var _super = _createSuper29(ISOTimezoneWithZParser2);
  function ISOTimezoneWithZParser2() {
    var _this;
    _classCallCheck30(this, ISOTimezoneWithZParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty29(_assertThisInitialized29(_this), "priority", 10);
    _defineProperty29(_assertThisInitialized29(_this), "incompatibleTokens", ["t", "T", "x"]);
    return _this;
  }
  _createClass30(ISOTimezoneWithZParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "X":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "XX":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "XXXX":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "XXXXX":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "XXX":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneWithZParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/ISOTimezoneParser.js
function _typeof33(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof33 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof33 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof33(obj);
}
function _classCallCheck31(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties31(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass31(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties31(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties31(Constructor, staticProps);
  return Constructor;
}
function _inherits30(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf30(subClass, superClass);
}
function _setPrototypeOf30(o, p) {
  _setPrototypeOf30 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf30(o, p);
}
function _createSuper30(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct30();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf30(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf30(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn30(this, result);
  };
}
function _possibleConstructorReturn30(self, call) {
  if (call && (_typeof33(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized30(self);
}
function _assertThisInitialized30(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct30() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf30(o) {
  _getPrototypeOf30 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf30(o);
}
function _defineProperty30(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ISOTimezoneParser = function(_Parser) {
  _inherits30(ISOTimezoneParser2, _Parser);
  var _super = _createSuper30(ISOTimezoneParser2);
  function ISOTimezoneParser2() {
    var _this;
    _classCallCheck31(this, ISOTimezoneParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty30(_assertThisInitialized30(_this), "priority", 10);
    _defineProperty30(_assertThisInitialized30(_this), "incompatibleTokens", ["t", "T", "X"]);
    return _this;
  }
  _createClass31(ISOTimezoneParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "x":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "xx":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "xxxx":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "xxxxx":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "xxx":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/TimestampSecondsParser.js
function _typeof34(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof34 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof34 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof34(obj);
}
function _classCallCheck32(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties32(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass32(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties32(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties32(Constructor, staticProps);
  return Constructor;
}
function _inherits31(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf31(subClass, superClass);
}
function _setPrototypeOf31(o, p) {
  _setPrototypeOf31 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf31(o, p);
}
function _createSuper31(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct31();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf31(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf31(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn31(this, result);
  };
}
function _possibleConstructorReturn31(self, call) {
  if (call && (_typeof34(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized31(self);
}
function _assertThisInitialized31(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct31() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf31(o) {
  _getPrototypeOf31 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf31(o);
}
function _defineProperty31(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TimestampSecondsParser = function(_Parser) {
  _inherits31(TimestampSecondsParser2, _Parser);
  var _super = _createSuper31(TimestampSecondsParser2);
  function TimestampSecondsParser2() {
    var _this;
    _classCallCheck32(this, TimestampSecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty31(_assertThisInitialized31(_this), "priority", 40);
    _defineProperty31(_assertThisInitialized31(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass32(TimestampSecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      return [new Date(value * 1e3), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampSecondsParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/TimestampMillisecondsParser.js
function _typeof35(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof35 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof35 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof35(obj);
}
function _classCallCheck33(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties33(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass33(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties33(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties33(Constructor, staticProps);
  return Constructor;
}
function _inherits32(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf32(subClass, superClass);
}
function _setPrototypeOf32(o, p) {
  _setPrototypeOf32 = Object.setPrototypeOf || function _setPrototypeOf33(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf32(o, p);
}
function _createSuper32(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct32();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf32(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf32(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn32(this, result);
  };
}
function _possibleConstructorReturn32(self, call) {
  if (call && (_typeof35(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized32(self);
}
function _assertThisInitialized32(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct32() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _getPrototypeOf32(o) {
  _getPrototypeOf32 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf33(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf32(o);
}
function _defineProperty32(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var TimestampMillisecondsParser = function(_Parser) {
  _inherits32(TimestampMillisecondsParser2, _Parser);
  var _super = _createSuper32(TimestampMillisecondsParser2);
  function TimestampMillisecondsParser2() {
    var _this;
    _classCallCheck33(this, TimestampMillisecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty32(_assertThisInitialized32(_this), "priority", 20);
    _defineProperty32(_assertThisInitialized32(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass33(TimestampMillisecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      return [new Date(value), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampMillisecondsParser2;
}(Parser);

// node_modules/date-fns/esm/parse/_lib/parsers/index.js
var parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};

// node_modules/date-fns/esm/parse/index.js
function _typeof36(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof36 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof36 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof36(obj);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it2;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it2 = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it2)
        o = it2;
      var i2 = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i2 >= o.length)
          return { done: true };
        return { done: false, value: o[i2++] };
      }, e: function e2(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s3() {
    it2 = o[Symbol.iterator]();
  }, n: function n() {
    var step = it2.next();
    normalCompletion = step.done;
    return step;
  }, e: function e2(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it2.return != null)
        it2.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
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
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp2 = /^'([^]*?)'?$/;
var doubleQuoteRegExp2 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(3, arguments);
  var dateString = String(dirtyDateString);
  var formatString = String(dirtyFormatString);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  if (!locale2.match) {
    throw new RangeError("locale must contain match property");
  }
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (formatString === "") {
    if (dateString === "") {
      return toDate(dirtyReferenceDate);
    } else {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  var subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2
  };
  var setters = [new DateToSystemTimezoneSetter()];
  var tokens = formatString.match(longFormattingTokensRegExp2).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter in longFormatters_default) {
      var longFormatter = longFormatters_default[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp2);
  var usedTokens = [];
  var _iterator = _createForOfIteratorHelper(tokens), _step;
  try {
    var _loop = function _loop2() {
      var token = _step.value;
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      var firstCharacter = token[0];
      var parser = parsers[firstCharacter];
      if (parser) {
        var incompatibleTokens = parser.incompatibleTokens;
        if (Array.isArray(incompatibleTokens)) {
          var incompatibleToken = usedTokens.find(function(usedToken) {
            return incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter;
          });
          if (incompatibleToken) {
            throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
          }
        } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
          throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
        }
        usedTokens.push({
          token: firstCharacter,
          fullToken: token
        });
        var parseResult = parser.run(dateString, token, locale2.match, subFnOptions);
        if (!parseResult) {
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        }
        setters.push(parseResult.setter);
        dateString = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp2)) {
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
        }
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString2(token);
        }
        if (dateString.indexOf(token) === 0) {
          dateString = dateString.slice(token.length);
        } else {
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        }
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _ret = _loop();
      if (_typeof36(_ret) === "object")
        return _ret.v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var uniquePrioritySetters = setters.map(function(setter2) {
    return setter2.priority;
  }).sort(function(a3, b3) {
    return b3 - a3;
  }).filter(function(priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function(priority) {
    return setters.filter(function(setter2) {
      return setter2.priority === priority;
    }).sort(function(a3, b3) {
      return b3.subPriority - a3.subPriority;
    });
  }).map(function(setterArray) {
    return setterArray[0];
  });
  var date = toDate(dirtyReferenceDate);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
  var flags = {};
  var _iterator2 = _createForOfIteratorHelper(uniquePrioritySetters), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var setter = _step2.value;
      if (!setter.validate(utcDate, subFnOptions)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      var result = setter.set(utcDate, flags, subFnOptions);
      if (Array.isArray(result)) {
        utcDate = result[0];
        assign(flags, result[1]);
      } else {
        utcDate = result;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return utcDate;
}
function cleanEscapedString2(input) {
  return input.match(escapedStringRegExp2)[1].replace(doubleQuoteRegExp2, "'");
}

// node_modules/date-fns/esm/subDays/index.js
function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

// node_modules/date-fns/esm/parseISO/index.js
function parseISO(argument, options) {
  var _options$additionalDi;
  requiredArgs(1, arguments);
  var additionalDigits = toInteger((_options$additionalDi = options === null || options === void 0 ? void 0 : options.additionalDigits) !== null && _options$additionalDi !== void 0 ? _options$additionalDi : 2);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  }
  if (!(typeof argument === "string" || Object.prototype.toString.call(argument) === "[object String]")) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var dateStrings = splitDateString(argument);
  var date;
  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }
  if (!date || isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var timestamp = date.getTime();
  var time = 0;
  var offset;
  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) {
      return /* @__PURE__ */ new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time);
    var result = /* @__PURE__ */ new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }
  return new Date(timestamp + time + offset);
}
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString;
  if (array.length > 2) {
    return dateStrings;
  }
  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }
  if (timeString) {
    var token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  var regex = new RegExp("^(?:(\\d{4}|[+-]\\d{" + (4 + additionalDigits) + "})|(\\d{2}|[+-]\\d{" + (2 + additionalDigits) + "})$)");
  var captures = dateString.match(regex);
  if (!captures)
    return {
      year: NaN,
      restDateString: ""
    };
  var year = captures[1] ? parseInt(captures[1]) : null;
  var century = captures[2] ? parseInt(captures[2]) : null;
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}
function parseDate(dateString, year) {
  if (year === null)
    return /* @__PURE__ */ new Date(NaN);
  var captures = dateString.match(dateRegex);
  if (!captures)
    return /* @__PURE__ */ new Date(NaN);
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;
  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = /* @__PURE__ */ new Date(0);
    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}
function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}
function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures)
    return NaN;
  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);
  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }
  return hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1e3;
}
function parseTimeUnit(value) {
  return value && parseFloat(value.replace(",", ".")) || 0;
}
function parseTimezone(timezoneString) {
  if (timezoneString === "Z")
    return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures)
    return 0;
  var sign = captures[1] === "+" ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;
  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }
  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = /* @__PURE__ */ new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex2(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex2(year) ? 29 : 28));
}
function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex2(year) ? 366 : 365);
}
function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}
function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }
  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}
function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

// node_modules/date-fns/esm/setMonth/index.js
function setMonth(dirtyDate, dirtyMonth) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var month = toInteger(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = /* @__PURE__ */ new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}

// node_modules/date-fns/esm/set/index.js
function _typeof37(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof37 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof37 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof37(obj);
}
function set(dirtyDate, values) {
  requiredArgs(2, arguments);
  if (_typeof37(values) !== "object" || values === null) {
    throw new RangeError("values parameter must be an object");
  }
  var date = toDate(dirtyDate);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (values.year != null) {
    date.setFullYear(values.year);
  }
  if (values.month != null) {
    date = setMonth(date, values.month);
  }
  if (values.date != null) {
    date.setDate(toInteger(values.date));
  }
  if (values.hours != null) {
    date.setHours(toInteger(values.hours));
  }
  if (values.minutes != null) {
    date.setMinutes(toInteger(values.minutes));
  }
  if (values.seconds != null) {
    date.setSeconds(toInteger(values.seconds));
  }
  if (values.milliseconds != null) {
    date.setMilliseconds(toInteger(values.milliseconds));
  }
  return date;
}

// node_modules/date-fns/esm/setHours/index.js
function setHours(dirtyDate, dirtyHours) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var hours = toInteger(dirtyHours);
  date.setHours(hours);
  return date;
}

// node_modules/date-fns/esm/setMilliseconds/index.js
function setMilliseconds(dirtyDate, dirtyMilliseconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var milliseconds2 = toInteger(dirtyMilliseconds);
  date.setMilliseconds(milliseconds2);
  return date;
}

// node_modules/date-fns/esm/setMinutes/index.js
function setMinutes(dirtyDate, dirtyMinutes) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var minutes = toInteger(dirtyMinutes);
  date.setMinutes(minutes);
  return date;
}

// node_modules/date-fns/esm/setSeconds/index.js
function setSeconds(dirtyDate, dirtySeconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var seconds = toInteger(dirtySeconds);
  date.setSeconds(seconds);
  return date;
}

// node_modules/date-fns/esm/setYear/index.js
function setYear(dirtyDate, dirtyYear) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var year = toInteger(dirtyYear);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  date.setFullYear(year);
  return date;
}

// node_modules/date-fns/esm/subMonths/index.js
function subMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}

// node_modules/date-fns/esm/sub/index.js
function _typeof38(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof38 = function _typeof39(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof38 = function _typeof39(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof38(obj);
}
function sub(date, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof38(duration) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var dateWithoutMonths = subMonths(date, months + years * 12);
  var dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7);
  var minutestoSub = minutes + hours * 60;
  var secondstoSub = seconds + minutestoSub * 60;
  var mstoSub = secondstoSub * 1e3;
  var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}

// node_modules/date-fns/esm/subYears/index.js
function subYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}

// node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Et() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z"
      })
    ]
  );
}
function da() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      createBaseVNode("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
function hn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function pn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
function Ln() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
function Un() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function Hn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
var kn = (e2, n, a3, t2) => {
  const s3 = parse(e2, n.slice(0, e2.length), /* @__PURE__ */ new Date());
  return isValid(s3) && isDate(s3) ? t2 ? s3 : set(s3, {
    hours: +a3.hours,
    minutes: +(a3 == null ? void 0 : a3.minutes),
    seconds: +(a3 == null ? void 0 : a3.seconds),
    milliseconds: 0
  }) : null;
};
var ca = (e2, n, a3, t2) => {
  const s3 = Array.isArray(a3) ? a3[0] : a3;
  if (typeof n == "string")
    return kn(e2, n, s3, t2);
  if (Array.isArray(n)) {
    let f = null;
    for (const h3 of n)
      if (f = kn(e2, h3, s3, t2), f)
        break;
    return f;
  }
  return typeof n == "function" ? n(e2) : null;
};
var b2 = (e2) => e2 ? new Date(e2) : /* @__PURE__ */ new Date();
var fa = (e2, n) => {
  if (n) {
    const t2 = (e2.getMonth() + 1).toString().padStart(2, "0"), s3 = e2.getDate().toString().padStart(2, "0"), f = e2.getHours().toString().padStart(2, "0"), h3 = e2.getMinutes().toString().padStart(2, "0");
    return `${e2.getFullYear()}-${t2}-${s3}T${f}:${h3}:00.000Z`;
  }
  const a3 = Date.UTC(
    e2.getUTCFullYear(),
    e2.getUTCMonth(),
    e2.getUTCDate(),
    e2.getUTCHours(),
    e2.getUTCMinutes(),
    e2.getUTCSeconds()
  );
  return new Date(a3).toISOString();
};
var Le = (e2) => {
  let n = b2(JSON.parse(JSON.stringify(e2)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
};
var Ee = (e2, n, a3, t2) => {
  let s3 = e2 ? b2(e2) : b2();
  return (n || n === 0) && (s3 = setHours(s3, +n)), (a3 || a3 === 0) && (s3 = setMinutes(s3, +a3)), (t2 || t2 === 0) && (s3 = setSeconds(s3, +t2)), setMilliseconds(s3, 0);
};
var Ce = (e2, n) => !e2 || !n ? false : isBefore(Le(e2), Le(n));
var me = (e2, n) => !e2 || !n ? false : isEqual(Le(e2), Le(n));
var Oe = (e2, n) => !e2 || !n ? false : isAfter(Le(e2), Le(n));
var Wn = (e2, n, a3) => e2 && e2[0] && e2[1] ? Oe(a3, e2[0]) && Ce(a3, e2[1]) : e2 && e2[0] && n ? Oe(a3, e2[0]) && Ce(a3, n) || Ce(a3, e2[0]) && Oe(a3, n) : false;
var pt = (e2) => {
  const n = set(new Date(e2), { date: 1 });
  return Le(n);
};
var kt = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var zn = () => {
  const e2 = (t2) => {
    kt.menuFocused = t2;
  }, n = (t2) => {
    kt.shiftKeyInMenu !== t2 && (kt.shiftKeyInMenu = t2);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: kt.shiftKeyInMenu, menuFocused: kt.menuFocused })),
    setMenuFocused: e2,
    setShiftKey: n
  };
};
function cn(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
var Ot = {};
var ma = {
  get exports() {
    return Ot;
  },
  set exports(e2) {
    Ot = e2;
  }
};
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2) {
    if (t2 === null || t2 === true || t2 === false)
      return NaN;
    var s3 = Number(t2);
    return isNaN(s3) ? s3 : s3 < 0 ? Math.ceil(s3) : Math.floor(s3);
  }
  e2.exports = n.default;
})(ma, Ot);
var va = cn(Ot);
var It = {};
var ya = {
  get exports() {
    return It;
  },
  set exports(e2) {
    It = e2;
  }
};
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2) {
    var s3 = new Date(Date.UTC(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getHours(), t2.getMinutes(), t2.getSeconds(), t2.getMilliseconds()));
    return s3.setUTCFullYear(t2.getFullYear()), t2.getTime() - s3.getTime();
  }
  e2.exports = n.default;
})(ya, It);
var wn = cn(It);
function ga(e2, n) {
  var a3 = wa(n);
  return a3.formatToParts ? pa(a3, e2) : ka(a3, e2);
}
var ha = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function pa(e2, n) {
  try {
    for (var a3 = e2.formatToParts(n), t2 = [], s3 = 0; s3 < a3.length; s3++) {
      var f = ha[a3[s3].type];
      f >= 0 && (t2[f] = parseInt(a3[s3].value, 10));
    }
    return t2;
  } catch (h3) {
    if (h3 instanceof RangeError)
      return [NaN];
    throw h3;
  }
}
function ka(e2, n) {
  var a3 = e2.format(n).replace(/\u200E/g, ""), t2 = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a3);
  return [t2[3], t2[1], t2[2], t2[4], t2[5], t2[6]];
}
var jt = {};
function wa(e2) {
  if (!jt[e2]) {
    var n = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), a3 = n === "06/25/2014, 00:00:00" || n === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    jt[e2] = a3 ? new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: e2,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e2,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return jt[e2];
}
function fn(e2, n, a3, t2, s3, f, h3) {
  var R2 = /* @__PURE__ */ new Date(0);
  return R2.setUTCFullYear(e2, n, a3), R2.setUTCHours(t2, s3, f, h3), R2;
}
var bn = 36e5;
var ba = 6e4;
var Gt = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function mn(e2, n, a3) {
  var t2, s3;
  if (!e2 || (t2 = Gt.timezoneZ.exec(e2), t2))
    return 0;
  var f;
  if (t2 = Gt.timezoneHH.exec(e2), t2)
    return f = parseInt(t2[1], 10), Dn(f) ? -(f * bn) : NaN;
  if (t2 = Gt.timezoneHHMM.exec(e2), t2) {
    f = parseInt(t2[1], 10);
    var h3 = parseInt(t2[2], 10);
    return Dn(f, h3) ? (s3 = Math.abs(f) * bn + h3 * ba, f > 0 ? -s3 : s3) : NaN;
  }
  if (Ma(e2)) {
    n = new Date(n || Date.now());
    var R2 = a3 ? n : Da(n), B2 = rn(R2, e2), T2 = a3 ? B2 : $a(n, B2, e2);
    return -T2;
  }
  return NaN;
}
function Da(e2) {
  return fn(
    e2.getFullYear(),
    e2.getMonth(),
    e2.getDate(),
    e2.getHours(),
    e2.getMinutes(),
    e2.getSeconds(),
    e2.getMilliseconds()
  );
}
function rn(e2, n) {
  var a3 = ga(e2, n), t2 = fn(
    a3[0],
    a3[1] - 1,
    a3[2],
    a3[3] % 24,
    a3[4],
    a3[5],
    0
  ).getTime(), s3 = e2.getTime(), f = s3 % 1e3;
  return s3 -= f >= 0 ? f : 1e3 + f, t2 - s3;
}
function $a(e2, n, a3) {
  var t2 = e2.getTime(), s3 = t2 - n, f = rn(new Date(s3), a3);
  if (n === f)
    return n;
  s3 -= f - n;
  var h3 = rn(new Date(s3), a3);
  return f === h3 ? f : Math.max(f, h3);
}
function Dn(e2, n) {
  return -23 <= e2 && e2 <= 23 && (n == null || 0 <= n && n <= 59);
}
var $n = {};
function Ma(e2) {
  if ($n[e2])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e2 }), $n[e2] = true, true;
  } catch {
    return false;
  }
}
var Ta = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
var xn = Ta;
var Zt = 36e5;
var Mn = 6e4;
var Aa = 2;
var Re = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  plainTime: /:/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: xn
};
function ln(e2, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e2 === null)
    return /* @__PURE__ */ new Date(NaN);
  var a3 = n || {}, t2 = a3.additionalDigits == null ? Aa : va(a3.additionalDigits);
  if (t2 !== 2 && t2 !== 1 && t2 !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e2 instanceof Date || typeof e2 == "object" && Object.prototype.toString.call(e2) === "[object Date]")
    return new Date(e2.getTime());
  if (typeof e2 == "number" || Object.prototype.toString.call(e2) === "[object Number]")
    return new Date(e2);
  if (!(typeof e2 == "string" || Object.prototype.toString.call(e2) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var s3 = Sa(e2), f = Ca(s3.date, t2), h3 = f.year, R2 = f.restDateString, B2 = Pa(R2, h3);
  if (isNaN(B2))
    return /* @__PURE__ */ new Date(NaN);
  if (B2) {
    var T2 = B2.getTime(), U = 0, M3;
    if (s3.time && (U = _a(s3.time), isNaN(U)))
      return /* @__PURE__ */ new Date(NaN);
    if (s3.timeZone || a3.timeZone) {
      if (M3 = mn(s3.timeZone || a3.timeZone, new Date(T2 + U)), isNaN(M3))
        return /* @__PURE__ */ new Date(NaN);
    } else
      M3 = wn(new Date(T2 + U)), M3 = wn(new Date(T2 + U + M3));
    return new Date(T2 + U + M3);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Sa(e2) {
  var n = {}, a3 = Re.dateTimePattern.exec(e2), t2;
  if (a3 ? (n.date = a3[1], t2 = a3[3]) : (a3 = Re.datePattern.exec(e2), a3 ? (n.date = a3[1], t2 = a3[2]) : (n.date = null, t2 = e2)), t2) {
    var s3 = Re.timeZone.exec(t2);
    s3 ? (n.time = t2.replace(s3[1], ""), n.timeZone = s3[1].trim()) : n.time = t2;
  }
  return n;
}
function Ca(e2, n) {
  var a3 = Re.YYY[n], t2 = Re.YYYYY[n], s3;
  if (s3 = Re.YYYY.exec(e2) || t2.exec(e2), s3) {
    var f = s3[1];
    return {
      year: parseInt(f, 10),
      restDateString: e2.slice(f.length)
    };
  }
  if (s3 = Re.YY.exec(e2) || a3.exec(e2), s3) {
    var h3 = s3[1];
    return {
      year: parseInt(h3, 10) * 100,
      restDateString: e2.slice(h3.length)
    };
  }
  return {
    year: null
  };
}
function Pa(e2, n) {
  if (n === null)
    return null;
  var a3, t2, s3, f;
  if (e2.length === 0)
    return t2 = /* @__PURE__ */ new Date(0), t2.setUTCFullYear(n), t2;
  if (a3 = Re.MM.exec(e2), a3)
    return t2 = /* @__PURE__ */ new Date(0), s3 = parseInt(a3[1], 10) - 1, An(n, s3) ? (t2.setUTCFullYear(n, s3), t2) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Re.DDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0);
    var h3 = parseInt(a3[1], 10);
    return Oa(n, h3) ? (t2.setUTCFullYear(n, 0, h3), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Re.MMDD.exec(e2), a3) {
    t2 = /* @__PURE__ */ new Date(0), s3 = parseInt(a3[1], 10) - 1;
    var R2 = parseInt(a3[2], 10);
    return An(n, s3, R2) ? (t2.setUTCFullYear(n, s3, R2), t2) : /* @__PURE__ */ new Date(NaN);
  }
  if (a3 = Re.Www.exec(e2), a3)
    return f = parseInt(a3[1], 10) - 1, Sn(n, f) ? Tn(n, f) : /* @__PURE__ */ new Date(NaN);
  if (a3 = Re.WwwD.exec(e2), a3) {
    f = parseInt(a3[1], 10) - 1;
    var B2 = parseInt(a3[2], 10) - 1;
    return Sn(n, f, B2) ? Tn(n, f, B2) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function _a(e2) {
  var n, a3, t2;
  if (n = Re.HH.exec(e2), n)
    return a3 = parseFloat(n[1].replace(",", ".")), Xt(a3) ? a3 % 24 * Zt : NaN;
  if (n = Re.HHMM.exec(e2), n)
    return a3 = parseInt(n[1], 10), t2 = parseFloat(n[2].replace(",", ".")), Xt(a3, t2) ? a3 % 24 * Zt + t2 * Mn : NaN;
  if (n = Re.HHMMSS.exec(e2), n) {
    a3 = parseInt(n[1], 10), t2 = parseInt(n[2], 10);
    var s3 = parseFloat(n[3].replace(",", "."));
    return Xt(a3, t2, s3) ? a3 % 24 * Zt + t2 * Mn + s3 * 1e3 : NaN;
  }
  return null;
}
function Tn(e2, n, a3) {
  n = n || 0, a3 = a3 || 0;
  var t2 = /* @__PURE__ */ new Date(0);
  t2.setUTCFullYear(e2, 0, 4);
  var s3 = t2.getUTCDay() || 7, f = n * 7 + a3 + 1 - s3;
  return t2.setUTCDate(t2.getUTCDate() + f), t2;
}
var Na = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var Ra = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Kn(e2) {
  return e2 % 400 === 0 || e2 % 4 === 0 && e2 % 100 !== 0;
}
function An(e2, n, a3) {
  if (n < 0 || n > 11)
    return false;
  if (a3 != null) {
    if (a3 < 1)
      return false;
    var t2 = Kn(e2);
    if (t2 && a3 > Ra[n] || !t2 && a3 > Na[n])
      return false;
  }
  return true;
}
function Oa(e2, n) {
  if (n < 1)
    return false;
  var a3 = Kn(e2);
  return !(a3 && n > 366 || !a3 && n > 365);
}
function Sn(e2, n, a3) {
  return !(n < 0 || n > 52 || a3 != null && (a3 < 0 || a3 > 6));
}
function Xt(e2, n, a3) {
  return !(e2 != null && (e2 < 0 || e2 >= 25) || n != null && (n < 0 || n >= 60) || a3 != null && (a3 < 0 || a3 >= 60));
}
var Bt = {};
var Ia = {
  get exports() {
    return Bt;
  },
  set exports(e2) {
    Bt = e2;
  }
};
var Yt = {};
var Ba = {
  get exports() {
    return Yt;
  },
  set exports(e2) {
    Yt = e2;
  }
};
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a3;
  function a3(t2, s3) {
    if (t2 == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var f in s3)
      Object.prototype.hasOwnProperty.call(s3, f) && (t2[f] = s3[f]);
    return t2;
  }
  e2.exports = n.default;
})(Ba, Yt);
(function(e2, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = s3;
  var a3 = t2(Yt);
  function t2(f) {
    return f && f.__esModule ? f : { default: f };
  }
  function s3(f) {
    return (0, a3.default)({}, f);
  }
  e2.exports = n.default;
})(Ia, Bt);
var Ya = cn(Bt);
function Va(e2, n, a3) {
  var t2 = ln(e2, a3), s3 = mn(n, t2, true), f = new Date(t2.getTime() - s3), h3 = /* @__PURE__ */ new Date(0);
  return h3.setFullYear(f.getUTCFullYear(), f.getUTCMonth(), f.getUTCDate()), h3.setHours(f.getUTCHours(), f.getUTCMinutes(), f.getUTCSeconds(), f.getUTCMilliseconds()), h3;
}
function Ea(e2, n, a3) {
  if (typeof e2 == "string" && !e2.match(xn)) {
    var t2 = Ya(a3);
    return t2.timeZone = n, ln(e2, t2);
  }
  var s3 = ln(e2, a3), f = fn(
    s3.getFullYear(),
    s3.getMonth(),
    s3.getDate(),
    s3.getHours(),
    s3.getMinutes(),
    s3.getSeconds(),
    s3.getMilliseconds()
  ).getTime(), h3 = mn(n, new Date(f));
  return new Date(f + h3);
}
var Fa = (e2, n = 3) => {
  const a3 = [];
  for (let t2 = 0; t2 < e2.length; t2 += n)
    a3.push([e2[t2], e2[t2 + 1], e2[t2 + 2]]);
  return a3;
};
var La = (e2, n) => {
  const a3 = [1, 2, 3, 4, 5, 6, 7].map((f) => new Intl.DateTimeFormat(e2, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${f}T00:00:00+00:00`)).slice(0, 2)), t2 = a3.slice(0, n), s3 = a3.slice(n + 1, a3.length);
  return [a3[n]].concat(...s3).concat(...t2);
};
var Ua = (e2, n) => {
  const a3 = [];
  for (let t2 = +e2[0]; t2 <= +e2[1]; t2++)
    a3.push({ value: +t2, text: `${t2}` });
  return n ? a3.reverse() : a3;
};
var Ha = (e2, n) => {
  const a3 = new Intl.DateTimeFormat(e2, { month: n, timeZone: "UTC" });
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s3) => {
    const f = s3 < 10 ? `0${s3}` : s3;
    return /* @__PURE__ */ new Date(`2017-${f}-01T00:00:00+00:00`);
  }).map((s3, f) => ({
    text: a3.format(s3),
    value: f
  }));
};
var Wa = (e2) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e2];
var $e = (e2) => {
  const n = unref(e2);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
};
var za = (e2) => Object.assign({ type: "dot" }, e2);
var jn = (e2) => Array.isArray(e2) ? !!e2[0] && !!e2[1] : false;
var Vt = {
  prop: (e2) => `"${e2}" prop must be enabled!`,
  dateArr: (e2) => `You need to use array as "model-value" binding in order to support "${e2}"`
};
var be = (e2) => e2;
var Cn = (e2) => e2 === 0 ? e2 : !e2 || isNaN(+e2) ? null : +e2;
var Pn = (e2) => Object.assign(
  {
    menuAppear: "dp-menu-appear",
    open: "dp-slide-down",
    close: "dp-slide-up",
    next: "calendar-next",
    previous: "calendar-prev",
    vNext: "dp-slide-up",
    vPrevious: "dp-slide-down"
  },
  e2
);
var xa = (e2) => Object.assign(
  {
    toggleOverlay: "Toggle overlay",
    menu: "Datepicker menu",
    input: "Datepicker input",
    calendarWrap: "Calendar wrapper",
    calendarDays: "Calendar days",
    openTimePicker: "Open time picker",
    closeTimePicker: "Close time Picker",
    incrementValue: (n) => `Increment ${n}`,
    decrementValue: (n) => `Decrement ${n}`,
    openTpOverlay: (n) => `Open ${n} overlay`,
    amPmButton: "Switch AM/PM mode",
    openYearsOverlay: "Open years overlay",
    openMonthsOverlay: "Open months overlay",
    nextMonth: "Next month",
    prevMonth: "Previous month",
    day: () => ""
  },
  e2
);
var Ka = (e2) => e2 === null ? 0 : typeof e2 == "boolean" ? e2 ? 2 : 0 : +e2 >= 2 ? +e2 : 2;
var ja = (e2, n, a3) => e2 || (typeof a3 == "string" ? a3 : n);
var Ga = (e2) => typeof e2 == "boolean" ? e2 ? Pn({}) : false : Pn(e2);
var Za = () => ({
  enterSubmit: true,
  tabSubmit: true,
  openMenu: true,
  rangeSeparator: " - "
});
var Xa = (e2) => Object.assign({ months: [], years: [], times: { hours: [], minutes: [], seconds: [] } }, e2);
var Ve = (e2) => {
  const n = () => {
    if (e2.partialRange)
      return null;
    throw new Error(Vt.prop("partial-range"));
  }, a3 = computed(() => ({
    ariaLabels: xa(e2.ariaLabels),
    textInputOptions: Object.assign(Za(), e2.textInputOptions),
    multiCalendars: Ka(e2.multiCalendars),
    previewFormat: ja(e2.previewFormat, e2.format, f()),
    filters: Xa(e2.filters),
    transitions: Ga(e2.transitions),
    startTime: v()
  })), t2 = (i2) => {
    if (e2.range)
      return i2();
    throw new Error(Vt.prop("range"));
  }, s3 = () => {
    const i2 = e2.enableSeconds ? ":ss" : "";
    return e2.is24 ? `HH:mm${i2}` : `hh:mm${i2} aa`;
  }, f = () => e2.format ? e2.format : e2.monthPicker ? "MM/yyyy" : e2.timePicker ? s3() : e2.weekPicker ? "MM/dd/yyyy" : e2.yearPicker ? "yyyy" : e2.enableTimePicker ? `MM/dd/yyyy, ${s3()}` : "MM/dd/yyyy", h3 = (i2, r) => {
    if (typeof e2.format == "function")
      return e2.format(i2);
    const c2 = r || f(), D2 = e2.formatLocale ? { locale: e2.formatLocale } : void 0;
    return Array.isArray(i2) ? `${format(i2[0], c2, D2)} ${e2.modelAuto && !i2[1] ? "" : a3.value.textInputOptions.rangeSeparator || "-"} ${i2[1] ? format(i2[1], c2, D2) : ""}` : format(i2, c2, D2);
  }, R2 = (i2) => e2.timezone ? Va(i2, e2.timezone) : i2, B2 = (i2) => e2.timezone ? Ea(i2, e2.timezone) : i2, T2 = computed(() => (i2) => {
    var r;
    return (r = e2.hideNavigation) == null ? void 0 : r.includes(i2);
  }), U = (i2) => {
    const r = e2.maxDate ? Oe(R2(i2), R2(b2(e2.maxDate))) : false, c2 = e2.minDate ? Ce(R2(i2), R2(b2(e2.minDate))) : false, D2 = C(i2, e2.disabledDates), O2 = a3.value.filters.months.map((ie) => +ie).includes(getMonth(i2)), g = e2.disabledWeekDays.length ? e2.disabledWeekDays.some((ie) => +ie === getDay(i2)) : false, w2 = e2.allowedDates.length ? !e2.allowedDates.some((ie) => me(R2(b2(ie)), R2(i2))) : false, y3 = getYear(i2), F = y3 < +e2.yearRange[0] || y3 > +e2.yearRange[1];
    return !(r || c2 || D2 || O2 || F || g || w2);
  }, M3 = (i2) => {
    const r = {
      hours: getHours(b2()),
      minutes: getMinutes(b2()),
      seconds: e2.enableSeconds ? getSeconds(b2()) : 0
    };
    return Object.assign(r, i2);
  }, v = () => e2.range ? e2.startTime && Array.isArray(e2.startTime) ? [M3(e2.startTime[0]), M3(e2.startTime[1])] : null : e2.startTime && !Array.isArray(e2.startTime) ? M3(e2.startTime) : null, A = (i2) => !U(i2), J = (i2) => Array.isArray(i2) ? isValid(i2[0]) && (i2[1] ? isValid(i2[1]) : true) : i2 ? isValid(i2) : false, Z = (i2) => i2 instanceof Date ? i2 : parseISO(i2), H3 = (i2) => {
    const r = startOfWeek(R2(i2), { weekStartsOn: +e2.weekStart }), c2 = endOfWeek(R2(i2), { weekStartsOn: +e2.weekStart });
    return [r, c2];
  }, C = (i2, r) => Array.isArray(r) ? r.some((c2) => me(R2(b2(c2)), R2(i2))) : r(i2), V = (i2, r, c2) => {
    let D2 = i2 ? b2(i2) : b2();
    return (r || r === 0) && (D2 = setMonth(D2, r)), c2 && (D2 = setYear(D2, c2)), D2;
  }, Y2 = (i2) => set(b2(), { hours: getHours(i2), minutes: getMinutes(i2), seconds: getSeconds(i2) }), q2 = (i2) => set(b2(), {
    hours: +i2.hours || 0,
    minutes: +i2.minutes || 0,
    seconds: +i2.seconds || 0
  }), z2 = (i2, r, c2, D2) => {
    if (!i2)
      return true;
    if (D2) {
      const L2 = c2 === "max" ? isBefore(i2, r) : isAfter(i2, r), O2 = { seconds: 0, milliseconds: 0 };
      return L2 || isEqual(set(i2, O2), set(r, O2));
    }
    return c2 === "max" ? i2.getTime() <= r.getTime() : i2.getTime() >= r.getTime();
  }, ee = () => !e2.enableTimePicker || e2.monthPicker || e2.yearPicker || e2.ignoreTimeValidation, le = (i2) => Array.isArray(i2) ? [i2[0] ? Y2(i2[0]) : null, i2[1] ? Y2(i2[1]) : null] : Y2(i2), S3 = (i2) => {
    const r = e2.maxTime ? q2(e2.maxTime) : b2(e2.maxDate);
    return Array.isArray(i2) ? z2(i2[0], r, "max", !!e2.maxDate) && z2(i2[1], r, "max", !!e2.maxDate) : z2(i2, r, "max", !!e2.maxDate);
  }, P = (i2, r) => {
    const c2 = e2.minTime ? q2(e2.minTime) : b2(e2.minDate);
    return Array.isArray(i2) ? z2(i2[0], c2, "min", !!e2.minDate) && z2(i2[1], c2, "min", !!e2.minDate) && r : z2(i2, c2, "min", !!e2.minDate) && r;
  }, X2 = (i2) => {
    let r = true;
    if (!i2 || ee())
      return true;
    const c2 = !e2.minDate && !e2.maxDate ? le(i2) : i2;
    return (e2.maxTime || e2.maxDate) && (r = S3(be(c2))), (e2.minTime || e2.minDate) && (r = P(be(c2), r)), r;
  }, m3 = (i2, r) => {
    const c2 = b2(JSON.parse(JSON.stringify(i2))), D2 = [];
    for (let L2 = 0; L2 < 7; L2++) {
      const O2 = addDays(c2, L2), g = getMonth(O2) !== r;
      D2.push({
        text: e2.hideOffsetDates && g ? "" : O2.getDate(),
        value: O2,
        current: !g,
        classData: {}
      });
    }
    return D2;
  }, N = (i2, r) => {
    const c2 = [], D2 = b2(R2(new Date(r, i2))), L2 = b2(R2(new Date(r, i2 + 1, 0))), O2 = startOfWeek(D2, { weekStartsOn: e2.weekStart }), g = (w2) => {
      const y3 = m3(w2, i2);
      if (c2.push({ days: y3 }), !c2[c2.length - 1].days.some(
        (F) => me(Le(F.value), Le(L2))
      )) {
        const F = addDays(w2, 7);
        g(F);
      }
    };
    if (g(O2), e2.sixWeeks && c2.length < 6) {
      const w2 = 6 - c2.length;
      for (let y3 = 1; y3 <= w2; y3++) {
        const F = c2[c2.length - 1], ie = F.days[F.days.length - 1], Pe = m3(addDays(ie.value, 1), getMonth(D2));
        c2.push({ days: Pe });
      }
    }
    return c2;
  }, x2 = (i2, r, c2) => [set(b2(i2), { date: 1 }), set(b2(), { month: r, year: c2, date: 1 })], oe = (i2, r) => Ce(...x2(e2.minDate, i2, r)) || me(...x2(e2.minDate, i2, r)), Q2 = (i2, r) => Oe(...x2(e2.maxDate, i2, r)) || me(...x2(e2.maxDate, i2, r)), I2 = (i2, r, c2) => {
    let D2 = false;
    return e2.maxDate && c2 && Q2(i2, r) && (D2 = true), e2.minDate && !c2 && oe(i2, r) && (D2 = true), D2;
  };
  return {
    checkPartialRangeValue: n,
    checkRangeEnabled: t2,
    getZonedDate: R2,
    getZonedToUtc: B2,
    formatDate: h3,
    getDefaultPattern: f,
    validateDate: U,
    getDefaultStartTime: v,
    isDisabled: A,
    isValidDate: J,
    sanitizeDate: Z,
    getWeekFromDate: H3,
    matchDate: C,
    setDateMonthOrYear: V,
    isValidTime: X2,
    getCalendarDays: N,
    validateMonthYearInRange: (i2, r, c2, D2) => {
      let L2 = false;
      return D2 ? e2.minDate && e2.maxDate ? L2 = I2(i2, r, c2) : (e2.minDate && oe(i2, r) || e2.maxDate && Q2(i2, r)) && (L2 = true) : L2 = true, L2;
    },
    validateMaxDate: Q2,
    validateMinDate: oe,
    assignDefaultTime: M3,
    defaults: a3,
    hideNavigationButtons: T2
  };
};
var he = reactive({
  monthYear: [],
  calendar: [],
  time: [],
  actionRow: [],
  selectionGrid: [],
  timePicker: {
    0: [],
    1: []
  },
  monthPicker: []
});
var qt = ref(null);
var St = ref(false);
var Jt = ref(false);
var Qt = ref(false);
var en = ref(false);
var Ne = ref(0);
var Me = ref(0);
var tt = () => {
  const e2 = computed(() => St.value ? [...he.selectionGrid, he.actionRow].filter((C) => C.length) : Jt.value ? [
    ...he.timePicker[0],
    ...he.timePicker[1],
    en.value ? [] : [qt.value],
    he.actionRow
  ].filter((C) => C.length) : Qt.value ? [...he.monthPicker, he.actionRow] : [he.monthYear, ...he.calendar, he.time, he.actionRow].filter((C) => C.length)), n = (C) => {
    Ne.value = C ? Ne.value + 1 : Ne.value - 1;
    let V = null;
    e2.value[Me.value] && (V = e2.value[Me.value][Ne.value]), V || (Ne.value = C ? Ne.value - 1 : Ne.value + 1);
  }, a3 = (C) => {
    if (Me.value === 0 && !C || Me.value === e2.value.length && C)
      return;
    Me.value = C ? Me.value + 1 : Me.value - 1, e2.value[Me.value] ? e2.value[Me.value] && !e2.value[Me.value][Ne.value] && Ne.value !== 0 && (Ne.value = e2.value[Me.value].length - 1) : Me.value = C ? Me.value - 1 : Me.value + 1;
  }, t2 = (C) => {
    let V = null;
    e2.value[Me.value] && (V = e2.value[Me.value][Ne.value]), V ? V.focus({ preventScroll: !St.value }) : Ne.value = C ? Ne.value - 1 : Ne.value + 1;
  }, s3 = () => {
    n(true), t2(true);
  }, f = () => {
    n(false), t2(false);
  }, h3 = () => {
    a3(false), t2(true);
  }, R2 = () => {
    a3(true), t2(true);
  }, B2 = (C, V) => {
    he[V] = C;
  }, T2 = (C, V) => {
    he[V] = C;
  }, U = () => {
    Ne.value = 0, Me.value = 0;
  };
  return {
    buildMatrix: B2,
    buildMultiLevelMatrix: T2,
    setTimePickerBackRef: (C) => {
      qt.value = C;
    },
    setSelectionGrid: (C) => {
      St.value = C, U(), C || (he.selectionGrid = []);
    },
    setTimePicker: (C, V = false) => {
      Jt.value = C, en.value = V, U(), C || (he.timePicker[0] = [], he.timePicker[1] = []);
    },
    setTimePickerElements: (C, V = 0) => {
      he.timePicker[V] = C;
    },
    arrowRight: s3,
    arrowLeft: f,
    arrowUp: h3,
    arrowDown: R2,
    clearArrowNav: () => {
      he.monthYear = [], he.calendar = [], he.time = [], he.actionRow = [], he.selectionGrid = [], he.timePicker[0] = [], he.timePicker[1] = [], St.value = false, Jt.value = false, en.value = false, Qt.value = false, U(), qt.value = null;
    },
    setMonthPicker: (C) => {
      Qt.value = C, U();
    },
    refSets: he
    // exposed for testing
  };
};
var _n = (e2) => Array.isArray(e2);
var rt = (e2) => Array.isArray(e2);
var Nn = (e2) => Array.isArray(e2) && e2.length === 2;
var qa = (e2, n, a3, t2, s3) => {
  const {
    getDefaultStartTime: f,
    isDisabled: h3,
    sanitizeDate: R2,
    getWeekFromDate: B2,
    setDateMonthOrYear: T2,
    validateMonthYearInRange: U,
    defaults: M3
  } = Ve(e2), v = computed({
    get: () => e2.internalModelValue,
    set: (u2) => {
      !e2.readonly && !e2.disabled && n("update:internal-model-value", u2);
    }
  }), A = ref([]);
  watch(v, () => {
    ee();
  });
  const J = toRef(e2, "multiCalendars");
  watch(J, () => {
    qe(0);
  });
  const Z = ref([{ month: getMonth(b2()), year: getYear(b2()) }]), H3 = reactive({
    hours: e2.range ? [getHours(b2()), getHours(b2())] : getHours(b2()),
    minutes: e2.range ? [getMinutes(b2()), getMinutes(b2())] : getMinutes(b2()),
    seconds: e2.range ? [0, 0] : 0
  }), C = computed(
    () => (u2) => Z.value[u2] ? Z.value[u2].month : 0
  ), V = computed(
    () => (u2) => Z.value[u2] ? Z.value[u2].year : 0
  ), Y2 = computed(() => e2.flow && e2.flow.length && !e2.partialFlow ? s3.value === e2.flow.length : true), q2 = (u2, o, k2) => {
    var j, de;
    Z.value[u2] || (Z.value[u2] = { month: 0, year: 0 }), Z.value[u2].month = o === null ? (j = Z.value[u2]) == null ? void 0 : j.month : o, Z.value[u2].year = k2 === null ? (de = Z.value[u2]) == null ? void 0 : de.year : k2;
  }, z2 = (u2, o) => {
    H3[u2] = o;
  };
  onMounted(() => {
    v.value || (e2.startDate && (q2(0, getMonth(b2(e2.startDate)), getYear(b2(e2.startDate))), M3.value.multiCalendars && qe(0)), M3.value.startTime && I2()), ee(true);
  });
  const ee = (u2 = false) => {
    if (v.value)
      return Array.isArray(v.value) ? (A.value = v.value, m3(u2)) : S3(v.value);
    if (e2.timePicker)
      return N();
    if (e2.monthPicker && !e2.range)
      return x2();
    if (e2.yearPicker && !e2.range)
      return oe();
    if (M3.value.multiCalendars && u2 && !e2.startDate)
      return le(b2(), u2);
  }, le = (u2, o = false) => {
    if ((!M3.value.multiCalendars || !e2.multiStatic || o) && q2(0, getMonth(u2), getYear(u2)), M3.value.multiCalendars)
      for (let k2 = 1; k2 < M3.value.multiCalendars; k2++) {
        const j = set(b2(), { month: C.value(k2 - 1), year: V.value(k2 - 1) }), de = add(j, { months: 1 });
        Z.value[k2] = { month: getMonth(de), year: getYear(de) };
      }
  }, S3 = (u2) => {
    le(u2), z2("hours", getHours(u2)), z2("minutes", getMinutes(u2)), z2("seconds", getSeconds(u2));
  }, P = (u2, o) => {
    le(u2[0], o);
    const k2 = (j, de) => [
      j(u2[0]),
      u2[1] ? j(u2[1]) : H3[de][1]
    ];
    z2("hours", k2(getHours, "hours")), z2("minutes", k2(getMinutes, "minutes")), z2("seconds", k2(getSeconds, "seconds"));
  }, X2 = (u2, o) => {
    if ((e2.range || e2.weekPicker) && !e2.multiDates)
      return P(u2, o);
    if (e2.multiDates) {
      const k2 = u2[u2.length - 1];
      return S3(k2);
    }
  }, m3 = (u2) => {
    const o = v.value;
    X2(o, u2), M3.value.multiCalendars && e2.multiCalendarsSolo && i2();
  }, N = () => {
    if (I2(), !e2.range)
      v.value = Ee(b2(), H3.hours, H3.minutes, Q2());
    else {
      const u2 = H3.hours, o = H3.minutes;
      v.value = [
        Ee(b2(), u2[0], o[0], Q2()),
        Ee(b2(), u2[1], o[1], Q2(false))
      ];
    }
  }, x2 = () => {
    e2.multiDates ? v.value = [T2(b2(), C.value(0), V.value(0))] : v.value = T2(b2(), C.value(0), V.value(0));
  }, oe = () => {
    v.value = b2();
  }, Q2 = (u2 = true) => e2.enableSeconds ? Array.isArray(H3.seconds) ? u2 ? H3.seconds[0] : H3.seconds[1] : H3.seconds : 0, I2 = () => {
    const u2 = f();
    if (u2) {
      const o = Array.isArray(u2), k2 = o ? [+u2[0].hours, +u2[1].hours] : +u2.hours, j = o ? [+u2[0].minutes, +u2[1].minutes] : +u2.minutes, de = o ? [+u2[0].seconds, +u2[1].seconds] : +u2.seconds;
      z2("hours", k2), z2("minutes", j), e2.enableSeconds && z2("seconds", de);
    }
  }, l = () => Array.isArray(v.value) && v.value.length ? v.value[v.value.length - 1] : null, i2 = () => {
    if (Array.isArray(v.value) && v.value.length === 2) {
      const u2 = b2(
        b2(v.value[1] ? v.value[1] : addMonths(v.value[0], 1))
      ), [o, k2] = [getMonth(v.value[0]), getYear(v.value[0])], [j, de] = [getMonth(v.value[1]), getYear(v.value[1])];
      (o !== j || o === j && k2 !== de) && e2.multiCalendarsSolo && q2(1, getMonth(u2), getYear(u2));
    }
  }, r = (u2) => {
    const o = addMonths(u2, 1);
    return { month: getMonth(o), year: getYear(o) };
  }, c2 = (u2) => {
    const o = getMonth(b2(u2)), k2 = getYear(b2(u2));
    if (q2(0, o, k2), M3.value.multiCalendars > 0)
      for (let j = 1; j < M3.value.multiCalendars; j++) {
        const de = r(
          set(b2(u2), { year: C.value(j - 1), month: V.value(j - 1) })
        );
        q2(j, de.month, de.year);
      }
  }, D2 = (u2) => {
    if (v.value && Array.isArray(v.value))
      if (v.value.some((o) => me(u2, o))) {
        const o = v.value.filter((k2) => !me(k2, u2));
        v.value = o.length ? o : null;
      } else
        (e2.multiDatesLimit && +e2.multiDatesLimit > v.value.length || !e2.multiDatesLimit) && v.value.push(u2);
    else
      v.value = [u2];
  }, L2 = (u2, o) => {
    const k2 = Oe(u2, o) ? o : u2, j = Oe(o, u2) ? o : u2;
    return eachDayOfInterval({ start: k2, end: j });
  }, O2 = (u2, o = 0) => {
    if (Array.isArray(v.value) && v.value[o]) {
      const k2 = differenceInCalendarDays(u2, v.value[o]), j = L2(v.value[o], u2), de = j.length === 1 ? 0 : j.filter((G2) => h3(G2)).length, Ye = Math.abs(k2) - de;
      if (e2.minRange && e2.maxRange)
        return Ye >= +e2.minRange && Ye <= +e2.maxRange;
      if (e2.minRange)
        return Ye >= +e2.minRange;
      if (e2.maxRange)
        return Ye <= +e2.maxRange;
    }
    return true;
  }, g = (u2) => Array.isArray(v.value) && v.value.length === 2 ? e2.fixedStart && (Oe(u2, v.value[0]) || me(u2, v.value[0])) ? [v.value[0], u2] : e2.fixedEnd && (Ce(u2, v.value[1]) || me(u2, v.value[1])) ? [u2, v.value[1]] : (n("invalid-fixed-range", u2), v.value) : [], w2 = () => {
    e2.autoApply && Y2.value && n("auto-apply", e2.partialFlow);
  }, y3 = () => {
    e2.autoApply && n("select-date");
  }, F = (u2) => !eachDayOfInterval({ start: u2[0], end: u2[1] }).some((k2) => h3(k2)), ie = (u2) => (v.value = B2(b2(u2.value)), w2()), Pe = (u2) => {
    const o = Ee(b2(u2.value), H3.hours, H3.minutes, Q2());
    e2.multiDates ? D2(o) : v.value = o, a3(), w2();
  }, Ze = () => {
    A.value = v.value ? v.value.slice() : [], A.value.length === 2 && !(e2.fixedStart || e2.fixedEnd) && (A.value = []);
  }, re = (u2, o) => {
    const k2 = [b2(u2.value), addDays(b2(u2.value), +e2.autoRange)];
    F(k2) && (o && c2(u2.value), A.value = k2);
  }, Xe = (u2) => {
    ze(u2.value) || !O2(u2.value, e2.fixedStart ? 0 : 1) || (A.value = g(b2(u2.value)));
  }, ze = (u2) => e2.noDisabledRange ? L2(A.value[0], u2).some((k2) => h3(k2)) : false, _e = (u2, o) => {
    if (Ze(), e2.autoRange)
      return re(u2, o);
    if (e2.fixedStart || e2.fixedEnd)
      return Xe(u2);
    A.value[0] ? O2(b2(u2.value)) && !ze(u2.value) && (Ce(b2(u2.value), b2(A.value[0])) ? A.value.unshift(b2(u2.value)) : A.value[1] = b2(u2.value)) : A.value[0] = b2(u2.value);
  }, at = (u2) => {
    A.value[u2] = Ee(
      A.value[u2],
      H3.hours[u2],
      H3.minutes[u2],
      Q2(u2 !== 1)
    );
  }, te = () => {
    A.value.length && (A.value[0] && !A.value[1] ? at(0) : (at(0), at(1), a3()), v.value = A.value.slice(), A.value[0] && A.value[1] && e2.autoApply && n("auto-apply"), A.value[0] && !A.value[1] && e2.modelAuto && e2.autoApply && n("auto-apply"));
  }, ge = (u2, o = false) => {
    if (!(h3(u2.value) || !u2.current && e2.hideOffsetDates)) {
      if (e2.weekPicker)
        return ie(u2);
      if (!e2.range)
        return Pe(u2);
      rt(H3.hours) && rt(H3.minutes) && !e2.multiDates && (_e(u2, o), te());
    }
  }, ye = (u2) => {
    const o = u2[0];
    return e2.weekNumbers === "local" ? getWeek(o.value, { weekStartsOn: +e2.weekStart }) : e2.weekNumbers === "iso" ? getISOWeek(o.value) : typeof e2.weekNumbers == "function" ? e2.weekNumbers(o.value) : "";
  }, qe = (u2) => {
    for (let o = u2 - 1; o >= 0; o--) {
      const k2 = subMonths(set(b2(), { month: C.value(o + 1), year: V.value(o + 1) }), 1);
      q2(o, getMonth(k2), getYear(k2));
    }
    for (let o = u2 + 1; o <= M3.value.multiCalendars - 1; o++) {
      const k2 = addMonths(set(b2(), { month: C.value(o - 1), year: V.value(o - 1) }), 1);
      q2(o, getMonth(k2), getYear(k2));
    }
  }, Be = (u2) => T2(b2(), C.value(u2), V.value(u2)), Tt = (u2) => Ee(u2, H3.hours, H3.minutes, Q2()), Lt = (u2) => {
    D2(Be(u2));
  }, Ut = (u2, o) => {
    const k2 = e2.monthPicker ? C.value(u2) !== o.month || !o.fromNav : V.value(u2) !== o.year || !o.fromNav;
    if (q2(u2, o.month, o.year), M3.value.multiCalendars && !e2.multiCalendarsSolo && qe(u2), e2.monthPicker || e2.yearPicker)
      if (e2.multiDates)
        k2 && Lt(u2);
      else if (e2.range) {
        if (k2 && O2(Be(u2))) {
          let j = v.value ? v.value.slice() : [];
          j.length === 2 && j[1] !== null && (j = []), j.length ? Ce(Be(u2), j[0]) ? j.unshift(Be(u2)) : j[1] = Be(u2) : j = [Be(u2)], v.value = j;
        }
      } else
        v.value = Be(u2);
    n("update-month-year", { instance: u2, month: o.month, year: o.year }), t2(e2.multiCalendarsSolo ? u2 : void 0);
  }, Ht = async (u2 = false) => {
    if (e2.autoApply && (e2.monthPicker || e2.yearPicker)) {
      await nextTick();
      const o = e2.monthPicker ? u2 : false;
      e2.range ? n("auto-apply", o || !v.value || v.value.length === 1) : n("auto-apply", o);
    }
    a3();
  }, At = (u2, o) => {
    const k2 = set(b2(), { month: C.value(o), year: V.value(o) }), j = u2 < 0 ? addMonths(k2, 1) : subMonths(k2, 1);
    U(getMonth(j), getYear(j), u2 < 0, e2.preventMinMaxNavigation) && (q2(o, getMonth(j), getYear(j)), M3.value.multiCalendars && !e2.multiCalendarsSolo && qe(o), n("update-month-year", { instance: o, month: getMonth(j), year: getYear(j) }), t2());
  }, yt = (u2) => {
    _n(u2) && _n(v.value) && rt(H3.hours) && rt(H3.minutes) ? (u2[0] && v.value[0] && (v.value[0] = Ee(u2[0], H3.hours[0], H3.minutes[0], Q2())), u2[1] && v.value[1] && (v.value[1] = Ee(u2[1], H3.hours[1], H3.minutes[1], Q2(false)))) : e2.multiDates && Array.isArray(v.value) ? v.value[v.value.length - 1] = Tt(u2) : !e2.range && !Nn(u2) && (v.value = Tt(u2)), n("time-update");
  }, Wt = (u2, o = true, k2 = false) => {
    const j = o ? u2 : H3.hours, de = !o && !k2 ? u2 : H3.minutes, Ye = k2 ? u2 : H3.seconds;
    if (e2.range && Nn(v.value) && rt(j) && rt(de) && rt(Ye) && !e2.disableTimeRangeValidation) {
      const G2 = (ae) => Ee(v.value[ae], j[ae], de[ae], Ye[ae]), xe = (ae) => setMilliseconds(v.value[ae], 0);
      if (me(v.value[0], v.value[1]) && (isAfter(G2(0), xe(1)) || isBefore(G2(1), xe(0))))
        return;
    }
    if (z2("hours", j), z2("minutes", de), z2("seconds", Ye), v.value)
      if (e2.multiDates) {
        const G2 = l();
        G2 && yt(G2);
      } else
        yt(v.value);
    else
      e2.timePicker && yt(e2.range ? [b2(), b2()] : b2());
    a3();
  }, zt = (u2, o) => {
    e2.monthChangeOnScroll && At(e2.monthChangeOnScroll !== "inverse" ? -u2.deltaY : u2.deltaY, o);
  }, gt = (u2, o, k2 = false) => {
    e2.monthChangeOnArrows && e2.vertical === k2 && Je(u2, o);
  }, Je = (u2, o) => {
    At(u2 === "right" ? -1 : 1, o);
  };
  return {
    time: H3,
    month: C,
    year: V,
    modelValue: v,
    calendars: Z,
    monthYearSelect: Ht,
    isDisabled: h3,
    updateTime: Wt,
    getWeekNum: ye,
    selectDate: ge,
    updateMonthYear: Ut,
    handleScroll: zt,
    getMarker: (u2) => e2.markers.find((o) => me(R2(u2.value), R2(o.date))),
    handleArrow: gt,
    handleSwipe: Je,
    selectCurrentDate: () => {
      e2.range ? v.value && Array.isArray(v.value) && v.value[0] ? v.value = Ce(b2(), v.value[0]) ? [b2(), v.value[0]] : [v.value[0], b2()] : v.value = [b2()] : v.value = b2(), y3();
    },
    presetDateRange: (u2, o) => {
      o || u2.length && u2.length <= 2 && e2.range && (v.value = u2.map((k2) => b2(k2)), y3(), e2.multiCalendars && nextTick().then(() => ee(true)));
    }
  };
};
var Ja = (e2, n, a3) => {
  const t2 = ref(), {
    getZonedToUtc: s3,
    getZonedDate: f,
    formatDate: h3,
    getDefaultPattern: R2,
    checkRangeEnabled: B2,
    checkPartialRangeValue: T2,
    isValidDate: U,
    setDateMonthOrYear: M3,
    defaults: v
  } = Ve(n), A = ref(""), J = toRef(n, "format");
  watch(t2, () => {
    e2("internal-model-change", t2.value);
  }), watch(J, () => {
    i2();
  });
  const Z = (y3) => {
    const F = y3 || b2();
    return n.modelType ? c2(F) : {
      hours: getHours(F),
      minutes: getMinutes(F),
      seconds: n.enableSeconds ? getSeconds(F) : 0
    };
  }, H3 = (y3) => n.modelType ? c2(y3) : { month: getMonth(y3), year: getYear(y3) }, C = (y3) => Array.isArray(y3) ? B2(() => [
    setYear(b2(), y3[0]),
    y3[1] ? setYear(b2(), y3[1]) : T2()
  ]) : setYear(b2(), +y3), V = (y3, F) => (typeof y3 == "string" || typeof y3 == "number") && n.modelType ? r(y3) : F, Y2 = (y3) => Array.isArray(y3) ? [
    V(
      y3[0],
      Ee(null, +y3[0].hours, +y3[0].minutes, y3[0].seconds)
    ),
    V(
      y3[1],
      Ee(null, +y3[1].hours, +y3[1].minutes, y3[1].seconds)
    )
  ] : V(y3, Ee(null, y3.hours, y3.minutes, y3.seconds)), q2 = (y3) => Array.isArray(y3) ? n.multiDates ? y3.map((F) => V(F, M3(null, +F.month, +F.year))) : B2(() => [
    V(y3[0], M3(null, +y3[0].month, +y3[0].year)),
    V(
      y3[1],
      y3[1] ? M3(null, +y3[1].month, +y3[1].year) : T2()
    )
  ]) : V(y3, M3(null, +y3.month, +y3.year)), z2 = (y3) => {
    if (Array.isArray(y3))
      return y3.map((F) => r(F));
    throw new Error(Vt.dateArr("multi-dates"));
  }, ee = (y3) => {
    if (Array.isArray(y3))
      return [b2(y3[0]), b2(y3[1])];
    throw new Error(Vt.dateArr("week-picker"));
  }, le = (y3) => n.modelAuto ? Array.isArray(y3) ? [r(y3[0]), r(y3[1])] : n.autoApply ? [r(y3)] : [r(y3), null] : Array.isArray(y3) ? B2(() => [
    r(y3[0]),
    y3[1] ? r(y3[1]) : T2()
  ]) : r(y3), S3 = () => {
    Array.isArray(t2.value) && n.range && t2.value.length === 1 && t2.value.push(T2());
  }, P = () => {
    const y3 = t2.value;
    return [
      c2(y3[0]),
      y3[1] ? c2(y3[1]) : T2()
    ];
  }, X2 = () => t2.value[1] ? P() : c2(be(t2.value[0])), m3 = () => (t2.value || []).map((y3) => c2(y3)), N = () => (S3(), n.modelAuto ? X2() : n.multiDates ? m3() : Array.isArray(t2.value) ? B2(() => P()) : c2(be(t2.value))), x2 = (y3) => y3 ? n.timePicker ? Y2(be(y3)) : n.monthPicker ? q2(be(y3)) : n.yearPicker ? C(be(y3)) : n.multiDates ? z2(be(y3)) : n.weekPicker ? ee(be(y3)) : le(be(y3)) : null, oe = (y3) => {
    const F = x2(y3);
    U(be(F)) ? (t2.value = be(F), i2()) : (t2.value = null, A.value = "");
  }, Q2 = () => {
    var F;
    const y3 = (ie) => {
      var Pe;
      return format(ie, (Pe = v.value.textInputOptions) == null ? void 0 : Pe.format);
    };
    return `${y3(t2.value[0])} ${(F = v.value.textInputOptions) == null ? void 0 : F.rangeSeparator} ${t2.value[1] ? y3(t2.value[1]) : ""}`;
  }, I2 = () => {
    var y3;
    return a3.value && t2.value ? Array.isArray(t2.value) ? Q2() : format(t2.value, (y3 = v.value.textInputOptions) == null ? void 0 : y3.format) : h3(t2.value);
  }, l = () => {
    var y3;
    return t2.value ? n.multiDates ? t2.value.map((F) => h3(F)).join("; ") : n.textInput && typeof ((y3 = v.value.textInputOptions) == null ? void 0 : y3.format) == "string" ? I2() : h3(t2.value) : "";
  }, i2 = () => {
    !n.format || typeof n.format == "string" ? A.value = l() : A.value = n.format(t2.value);
  }, r = (y3) => {
    if (n.utc) {
      const F = new Date(y3);
      return n.utc === "preserve" ? new Date(F.getTime() + F.getTimezoneOffset() * 6e4) : F;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? f(new Date(y3)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse(y3, R2(), /* @__PURE__ */ new Date()) : f(parse(y3, n.modelType, /* @__PURE__ */ new Date())) : f(new Date(y3));
  }, c2 = (y3) => y3 ? n.utc ? fa(y3, n.utc === "preserve") : n.modelType ? n.modelType === "timestamp" ? +s3(y3) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? h3(s3(y3)) : h3(s3(y3), n.modelType) : s3(y3) : "", D2 = (y3) => {
    e2("update:model-value", y3);
  }, L2 = (y3) => Array.isArray(t2.value) ? n.multiDates ? t2.value.map((F) => y3(F)) : [
    y3(t2.value[0]),
    t2.value[1] ? y3(t2.value[1]) : T2()
  ] : y3(be(t2.value)), O2 = (y3) => D2(be(L2(y3)));
  return {
    inputValue: A,
    internalModelValue: t2,
    checkBeforeEmit: () => t2.value ? n.range ? n.partialRange ? t2.value.length >= 1 : t2.value.length === 2 : !!t2.value : false,
    parseExternalModelValue: oe,
    formatInputValue: i2,
    emitModelValue: () => (i2(), n.monthPicker ? O2(H3) : n.timePicker ? O2(Z) : n.yearPicker ? O2(getYear) : n.weekPicker ? D2(t2.value) : D2(N()))
  };
};
var Qa = (e2, n) => {
  const { validateMonthYearInRange: a3, validateMaxDate: t2, validateMinDate: s3, defaults: f } = Ve(e2), h3 = (M3, v) => {
    let A = M3;
    return f.value.filters.months.includes(getMonth(A)) ? (A = v ? addMonths(M3, 1) : subMonths(M3, 1), h3(A, v)) : A;
  }, R2 = (M3, v) => {
    let A = M3;
    return f.value.filters.years.includes(getYear(A)) ? (A = v ? addYears(M3, 1) : subYears(M3, 1), R2(A, v)) : A;
  }, B2 = (M3) => {
    const v = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year });
    let A = M3 ? addMonths(v, 1) : subMonths(v, 1), J = getMonth(A), Z = getYear(A);
    f.value.filters.months.includes(J) && (A = h3(A, M3), J = getMonth(A), Z = getYear(A)), f.value.filters.years.includes(Z) && (A = R2(A, M3), Z = getYear(A)), a3(J, Z, M3, e2.preventMinMaxNavigation) && T2(J, Z);
  }, T2 = (M3, v) => {
    n("update-month-year", { month: M3, year: v });
  }, U = computed(() => (M3) => {
    if (!e2.preventMinMaxNavigation || M3 && !e2.maxDate || !M3 && !e2.minDate)
      return false;
    const v = set(/* @__PURE__ */ new Date(), { month: e2.month, year: e2.year }), A = M3 ? addMonths(v, 1) : subMonths(v, 1), J = [getMonth(A), getYear(A)];
    return M3 ? !t2(...J) : !s3(...J);
  });
  return { handleMonthYearChange: B2, isDisabled: U, updateMonthYear: T2 };
};
var Rt = ((e2) => (e2.center = "center", e2.left = "left", e2.right = "right", e2))(Rt || {});
var er = (e2, n, a3, t2) => {
  const s3 = ref({
    top: "0",
    left: "0",
    transform: "none"
  }), f = ref(false), h3 = toRef(t2, "teleportCenter");
  watch(h3, () => {
    Z();
  });
  const R2 = (S3) => {
    if (t2.teleport) {
      const P = S3.getBoundingClientRect();
      return {
        left: P.left + window.scrollX,
        top: P.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, B2 = (S3, P) => {
    s3.value.left = `${S3 + P}px`, s3.value.transform = "translateX(-100%)";
  }, T2 = (S3) => {
    s3.value.left = `${S3}px`, s3.value.transform = "translateX(0)";
  }, U = (S3, P, X2 = false) => {
    t2.position === Rt.left && T2(S3), t2.position === Rt.right && B2(S3, P), t2.position === Rt.center && (s3.value.left = `${S3 + P / 2}px`, s3.value.transform = X2 ? "translate(-50%, -50%)" : "translateX(-50%)");
  }, M3 = (S3) => {
    const { width: P, height: X2 } = S3.getBoundingClientRect(), { top: m3, left: N } = t2.altPosition ? t2.altPosition(S3) : R2(S3);
    return { top: +m3, left: +N, width: P, height: X2 };
  }, v = () => {
    const S3 = $e(n);
    if (S3) {
      const { top: P, left: X2, width: m3, height: N } = M3(S3);
      s3.value.top = `${P + N / 2}px`, s3.value.transform = "translateY(-50%)", U(X2, m3, true);
    }
  }, A = () => {
    s3.value.left = "50%", s3.value.top = "50%", s3.value.transform = "translate(-50%, -50%)", s3.value.position = "fixed";
  }, J = () => {
    const S3 = $e(n), { top: P, left: X2, transform: m3 } = t2.altPosition(S3);
    s3.value = { top: `${P}px`, left: `${X2}px`, transform: m3 || "" };
  }, Z = (S3 = true) => {
    if (!t2.inline)
      return h3.value ? A() : t2.altPosition !== null ? J() : (S3 && a3("recalculate-position"), z2());
  }, H3 = ({
    inputEl: S3,
    menuEl: P,
    left: X2,
    width: m3
  }) => {
    window.screen.width > 768 && U(X2, m3), Y2(S3, P);
  }, C = (S3, P) => {
    const { top: X2, left: m3, height: N, width: x2 } = M3(S3);
    s3.value.top = `${N + X2 + +t2.offset}px`, H3({ inputEl: S3, menuEl: P, left: m3, width: x2 }), f.value = false;
  }, V = (S3, P) => {
    const { top: X2, left: m3, width: N } = M3(S3), { height: x2 } = P.getBoundingClientRect();
    s3.value.top = `${X2 - x2 - +t2.offset}px`, H3({ inputEl: S3, menuEl: P, left: m3, width: N }), f.value = true;
  }, Y2 = (S3, P) => {
    if (t2.autoPosition) {
      const { left: X2, width: m3 } = M3(S3), { left: N, right: x2 } = P.getBoundingClientRect();
      return N <= 0 || N <= X2 ? T2(X2) : x2 >= document.documentElement.clientWidth ? B2(X2, m3) : U(X2, m3);
    }
  }, q2 = (S3, P) => {
    const { height: X2 } = P.getBoundingClientRect(), { top: m3, height: N } = S3.getBoundingClientRect(), oe = window.innerHeight - m3 - N, Q2 = m3;
    return X2 <= oe ? C(S3, P) : X2 > oe && X2 <= Q2 ? V(S3, P) : oe >= Q2 ? C(S3, P) : V(S3, P);
  }, z2 = () => {
    const S3 = $e(n), P = $e(e2);
    if (S3 && P)
      return t2.autoPosition ? q2(S3, P) : C(S3, P);
  }, ee = function(S3) {
    if (S3) {
      const P = S3.scrollHeight > S3.clientHeight, m3 = window.getComputedStyle(S3).overflowY.indexOf("hidden") !== -1;
      return P && !m3;
    }
    return true;
  }, le = function(S3) {
    return !S3 || S3 === document.body || S3.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : ee(S3) ? S3 : le(S3.parentNode);
  };
  return { openOnTop: f, menuPosition: s3, setMenuPosition: Z, setInitialPosition: v, getScrollableParent: le };
};
var ct = [
  { name: "clock-icon", use: ["time", "calendar"] },
  { name: "arrow-left", use: ["month-year", "calendar"] },
  { name: "arrow-right", use: ["month-year", "calendar"] },
  { name: "arrow-up", use: ["time", "calendar"] },
  { name: "arrow-down", use: ["time", "calendar"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar"] },
  { name: "day", use: ["calendar"] },
  { name: "month-overlay-value", use: ["calendar", "month-year"] },
  { name: "year-overlay-value", use: ["calendar", "month-year"] },
  { name: "year-overlay", use: ["month-year"] },
  { name: "month-overlay", use: ["month-year"] },
  { name: "month-overlay-header", use: ["month-year"] },
  { name: "year-overlay-header", use: ["month-year"] },
  { name: "hours-overlay-value", use: ["calendar", "time"] },
  { name: "minutes-overlay-value", use: ["calendar", "time"] },
  { name: "seconds-overlay-value", use: ["calendar", "time"] },
  { name: "hours", use: ["calendar", "time"] },
  { name: "minutes", use: ["calendar", "time"] },
  { name: "month", use: ["calendar", "month-year"] },
  { name: "year", use: ["calendar", "month-year"] },
  { name: "action-select", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar"] },
  { name: "marker-tooltip", use: ["calendar"] },
  { name: "now-button", use: [] },
  { name: "time-picker-overlay", use: ["calendar", "time"] },
  { name: "am-pm-button", use: ["calendar", "time"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year"] },
  { name: "time-picker", use: ["menu"] },
  { name: "action-row", use: ["action"] }
];
var tr = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var nr = {
  all: () => ct,
  monthYear: () => ct.filter((e2) => e2.use.includes("month-year")),
  input: () => tr,
  timePicker: () => ct.filter((e2) => e2.use.includes("time")),
  action: () => ct.filter((e2) => e2.use.includes("action")),
  calendar: () => ct.filter((e2) => e2.use.includes("calendar")),
  menu: () => ct.filter((e2) => e2.use.includes("menu"))
};
var it = (e2, n, a3) => {
  const t2 = [];
  return nr[n]().forEach((s3) => {
    e2[s3.name] && t2.push(s3.name);
  }), a3 && a3.length && a3.forEach((s3) => {
    s3.slot && t2.push(s3.slot);
  }), t2;
};
var Ft = (e2) => ({ transitionName: computed(() => (a3) => e2 && typeof e2 != "boolean" ? a3 ? e2.open : e2.close : ""), showTransition: !!e2 });
var nt = {
  multiCalendars: { type: [Boolean, Number, String], default: null },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  closeOnScroll: { type: Boolean, default: false },
  autoPosition: { type: Boolean, default: true },
  closeOnAutoApply: { type: Boolean, default: true },
  altPosition: { type: Function, default: null },
  transitions: { type: [Boolean, Object], default: true },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: false },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: String, default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  menuClassName: { type: String, default: null },
  dayClass: { type: Function, default: null },
  yearRange: { type: Array, default: () => [1900, 2100] },
  multiCalendarsSolo: { type: Boolean, default: false },
  calendarCellClassName: { type: String, default: null },
  enableTimePicker: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: false },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: false },
  autoRange: { type: [Number, String], default: null },
  noToday: { type: Boolean, default: false },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: () => [] },
  showNowButton: { type: Boolean, default: false },
  nowButtonLabel: { type: String, default: "Now" },
  markers: { type: Array, default: () => [] },
  modeHeight: { type: [Number, String], default: 255 },
  escClose: { type: Boolean, default: true },
  spaceConfirm: { type: Boolean, default: true },
  monthChangeOnArrows: { type: Boolean, default: true },
  presetRanges: { type: Array, default: () => [] },
  flow: { type: Array, default: () => [] },
  partialFlow: { type: Boolean, default: false },
  preventMinMaxNavigation: { type: Boolean, default: false },
  minRange: { type: [Number, String], default: null },
  maxRange: { type: [Number, String], default: null },
  multiDatesLimit: { type: [Number, String], default: null },
  reverseYears: { type: Boolean, default: false },
  keepActionRow: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  multiStatic: { type: Boolean, default: true },
  disableTimeRangeValidation: { type: Boolean, default: false },
  highlight: {
    type: [Array, Function],
    default: null
  },
  highlightWeekDays: {
    type: Array,
    default: null
  },
  highlightDisabledDays: { type: Boolean, default: false },
  teleport: { type: [String, Boolean], default: null },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function],
    default: null
  },
  calendarClassName: { type: String, default: null },
  noSwipe: { type: Boolean, default: false },
  monthChangeOnScroll: { type: [Boolean, String], default: true },
  dayNames: {
    type: [Function, Array],
    default: null
  },
  monthPicker: { type: Boolean, default: false },
  customProps: { type: Object, default: null },
  yearPicker: { type: Boolean, default: false },
  modelAuto: { type: Boolean, default: false },
  selectText: { type: String, default: "Select" },
  cancelText: { type: String, default: "Cancel" },
  previewFormat: {
    type: [String, Function],
    default: () => ""
  },
  multiDates: { type: Boolean, default: false },
  partialRange: { type: Boolean, default: true },
  ignoreTimeValidation: { type: Boolean, default: false },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  minTime: { type: Object, default: null },
  maxTime: { type: Object, default: null },
  name: { type: String, default: null },
  placeholder: { type: String, default: "" },
  hideInputIcon: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  state: { type: Boolean, default: null },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: "off" },
  inputClassName: { type: String, default: null },
  inlineWithInput: { type: Boolean, default: false },
  textInputOptions: { type: Object, default: () => null },
  fixedStart: { type: Boolean, default: false },
  fixedEnd: { type: Boolean, default: false },
  timePicker: { type: Boolean, default: false },
  enableSeconds: { type: Boolean, default: false },
  is24: { type: Boolean, default: true },
  noHoursOverlay: { type: Boolean, default: false },
  noMinutesOverlay: { type: Boolean, default: false },
  noSecondsOverlay: { type: Boolean, default: false },
  hoursGridIncrement: { type: [String, Number], default: 1 },
  minutesGridIncrement: { type: [String, Number], default: 5 },
  secondsGridIncrement: { type: [String, Number], default: 5 },
  hoursIncrement: { type: [Number, String], default: 1 },
  minutesIncrement: { type: [Number, String], default: 1 },
  secondsIncrement: { type: [Number, String], default: 1 },
  range: { type: Boolean, default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  textInput: { type: Boolean, default: false },
  onClickOutside: { type: Function, default: null },
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: Boolean, default: false }
};
var ar = ["aria-label", "aria-disabled", "aria-readonly"];
var rr = {
  key: 1,
  class: "dp__input_wrap"
};
var lr = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "onKeydown"];
var or = {
  key: 2,
  class: "dp__input_icon"
};
var sr = {
  key: 4,
  class: "dp__clear_icon"
};
var ir = defineComponent({
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...nt
  },
  emits: [
    "clear",
    "open",
    "update:input-value",
    "set-input-date",
    "close",
    "select-date",
    "set-empty-date",
    "toggle",
    "focus-prev",
    "focus",
    "blur"
  ],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { getDefaultPattern: s3, isValidDate: f, defaults: h3, getDefaultStartTime: R2, assignDefaultTime: B2 } = Ve(t2), T2 = ref(), U = ref(null), M3 = ref(false), v = computed(
      () => ({
        dp__pointer: !t2.disabled && !t2.readonly && !t2.textInput,
        dp__disabled: t2.disabled,
        dp__input_readonly: !t2.textInput,
        dp__input: true,
        dp__input_icon_pad: !t2.hideInputIcon,
        dp__input_valid: t2.state,
        dp__input_invalid: t2.state === false,
        dp__input_focus: M3.value || t2.isMenuOpen,
        dp__input_reg: !t2.textInput,
        [t2.inputClassName]: !!t2.inputClassName
      })
    ), A = () => {
      a3("set-input-date", null), t2.autoApply && (a3("set-empty-date"), T2.value = null);
    }, J = (m3) => {
      var x2;
      const N = R2();
      return ca(
        m3,
        ((x2 = h3.value.textInputOptions) == null ? void 0 : x2.format) || s3(),
        N || B2({}),
        t2.inputValue
      );
    }, Z = (m3) => {
      const { rangeSeparator: N } = h3.value.textInputOptions, [x2, oe] = m3.split(`${N}`);
      if (x2) {
        const Q2 = J(x2.trim()), I2 = oe ? J(oe.trim()) : null, l = Q2 && I2 ? [Q2, I2] : [Q2];
        T2.value = Q2 ? l : null;
      }
    }, H3 = (m3) => {
      if (t2.range)
        Z(m3);
      else if (t2.multiDates) {
        const N = m3.split(";");
        T2.value = N.map((x2) => J(x2.trim())).filter((x2) => x2);
      } else
        T2.value = J(m3);
    }, C = (m3) => {
      var x2;
      const { value: N } = m3.target;
      N !== "" ? ((x2 = h3.value.textInputOptions) != null && x2.openMenu && !t2.isMenuOpen && a3("open"), H3(N), a3("set-input-date", T2.value)) : A(), a3("update:input-value", N);
    }, V = () => {
      var m3, N;
      (m3 = h3.value.textInputOptions) != null && m3.enterSubmit && f(T2.value) && t2.inputValue !== "" ? (a3("set-input-date", T2.value, true), T2.value = null) : (N = h3.value.textInputOptions) != null && N.enterSubmit && t2.inputValue === "" && (T2.value = null, a3("clear"));
    }, Y2 = () => {
      var m3, N;
      (m3 = h3.value.textInputOptions) != null && m3.tabSubmit && f(T2.value) && t2.inputValue !== "" ? (a3("set-input-date", T2.value, true), T2.value = null) : (N = h3.value.textInputOptions) != null && N.tabSubmit && t2.inputValue === "" && (T2.value = null, a3("clear"));
    }, q2 = () => {
      M3.value = true, a3("focus");
    }, z2 = (m3) => {
      var N;
      m3.preventDefault(), m3.stopImmediatePropagation(), m3.stopPropagation(), t2.textInput && ((N = h3.value.textInputOptions) != null && N.openMenu) && !t2.inlineWithInput ? t2.isMenuOpen ? h3.value.textInputOptions.enterSubmit && a3("select-date") : a3("open") : t2.textInput || a3("toggle");
    }, ee = () => {
      M3.value = false, t2.isMenuOpen || a3("blur"), t2.autoApply && t2.textInput && T2.value && (a3("set-input-date", T2.value), a3("select-date"), T2.value = null);
    }, le = () => {
      a3("clear");
    }, S3 = (m3) => {
      if (!t2.textInput) {
        if (m3.code === "Tab")
          return;
        m3.preventDefault();
      }
    };
    return n({
      focusInput: () => {
        U.value && U.value.focus({ preventScroll: true });
      },
      setParsedDate: (m3) => {
        T2.value = m3;
      }
    }), (m3, N) => {
      var x2;
      return openBlock(), createElementBlock("div", {
        onClick: z2,
        "aria-label": (x2 = unref(h3).ariaLabels) == null ? void 0 : x2.input,
        role: "textbox",
        "aria-multiline": "false",
        "aria-disabled": m3.disabled,
        "aria-readonly": m3.readonly
      }, [
        m3.$slots.trigger && !m3.$slots["dp-input"] && !m3.inline ? renderSlot(m3.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !m3.$slots.trigger && (!m3.inline || m3.inlineWithInput) ? (openBlock(), createElementBlock("div", rr, [
          m3.$slots["dp-input"] && !m3.$slots.trigger && !m3.inline ? renderSlot(m3.$slots, "dp-input", {
            key: 0,
            value: e2.inputValue,
            onInput: C,
            onEnter: V,
            onTab: Y2,
            onClear: le,
            onBlur: ee
          }) : createCommentVNode("", true),
          m3.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: U,
            id: m3.uid ? `dp-input-${m3.uid}` : void 0,
            name: m3.name,
            class: normalizeClass(unref(v)),
            inputmode: m3.textInput ? "text" : "none",
            placeholder: m3.placeholder,
            disabled: m3.disabled,
            readonly: m3.readonly,
            required: m3.required,
            value: e2.inputValue,
            autocomplete: m3.autocomplete,
            onInput: C,
            onKeydown: [
              withKeys(z2, ["enter"]),
              withKeys(Y2, ["tab"]),
              S3
            ],
            onBlur: ee,
            onFocus: q2,
            onKeypress: S3
          }, null, 42, lr)),
          m3.$slots["input-icon"] && !m3.hideInputIcon ? (openBlock(), createElementBlock("span", or, [
            renderSlot(m3.$slots, "input-icon")
          ])) : createCommentVNode("", true),
          !m3.$slots["input-icon"] && !m3.hideInputIcon && !m3.$slots["dp-input"] ? (openBlock(), createBlock(unref(Et), {
            key: 3,
            class: "dp__input_icon dp__input_icons"
          })) : createCommentVNode("", true),
          m3.$slots["clear-icon"] && e2.inputValue && m3.clearable && !m3.disabled && !m3.readonly ? (openBlock(), createElementBlock("span", sr, [
            renderSlot(m3.$slots, "clear-icon", { clear: le })
          ])) : createCommentVNode("", true),
          m3.clearable && !m3.$slots["clear-icon"] && e2.inputValue && !m3.disabled && !m3.readonly ? (openBlock(), createBlock(unref(da), {
            key: 5,
            class: "dp__clear_icon dp__input_icons",
            "data-test": "clear-icon",
            onClick: withModifiers(le, ["stop", "prevent"])
          }, null, 8, ["onClick"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 8, ar);
    };
  }
});
var ur = { class: "dp__action_row" };
var dr = { class: "dp__selection_preview" };
var cr = { class: "dp__action_buttons" };
var fr = ["onKeydown"];
var mr = defineComponent({
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    ...nt
  },
  emits: ["close-picker", "select-date", "invalid-select"],
  setup(e2, { emit: n }) {
    const a3 = e2, { formatDate: t2, isValidTime: s3, defaults: f } = Ve(a3), { buildMatrix: h3 } = tt(), R2 = ref(null), B2 = ref(null);
    onMounted(() => {
      a3.arrowNavigation && h3([$e(R2), $e(B2)], "actionRow");
    });
    const T2 = computed(() => a3.range && !a3.partialRange && a3.internalModelValue ? a3.internalModelValue.length === 2 : true), U = computed(() => !v.value || !A.value || !T2.value), M3 = computed(() => ({
      dp__action: true,
      dp__select: true,
      dp__action_disabled: U.value
    })), v = computed(() => !a3.enableTimePicker || a3.ignoreTimeValidation ? true : s3(a3.internalModelValue)), A = computed(() => a3.monthPicker ? a3.range && Array.isArray(a3.internalModelValue) ? !a3.internalModelValue.filter((q2) => !C(q2)).length : C(a3.internalModelValue) : true), J = () => {
      const Y2 = f.value.previewFormat;
      return a3.timePicker || a3.monthPicker, Y2(be(a3.internalModelValue));
    }, Z = () => {
      const Y2 = a3.internalModelValue;
      return f.value.multiCalendars > 0 ? `${t2(Y2[0])} - ${t2(Y2[1])}` : [t2(Y2[0]), t2(Y2[1])];
    }, H3 = computed(() => !a3.internalModelValue || !a3.menuMount ? "" : typeof f.value.previewFormat == "string" ? Array.isArray(a3.internalModelValue) ? a3.internalModelValue.length === 2 && a3.internalModelValue[1] ? Z() : a3.multiDates ? a3.internalModelValue.map((Y2) => `${t2(Y2)}`) : a3.modelAuto ? `${t2(a3.internalModelValue[0])}` : `${t2(a3.internalModelValue[0])} -` : t2(a3.internalModelValue) : J()), C = (Y2) => {
      if (!a3.monthPicker)
        return true;
      let q2 = true;
      const z2 = b2(pt(Y2));
      if (a3.minDate && a3.maxDate) {
        const ee = b2(pt(a3.minDate)), le = b2(pt(a3.maxDate));
        return Oe(z2, ee) && Ce(z2, le) || me(z2, ee) || me(z2, le);
      }
      if (a3.minDate) {
        const ee = b2(pt(a3.minDate));
        q2 = Oe(z2, ee) || me(z2, ee);
      }
      if (a3.maxDate) {
        const ee = b2(pt(a3.maxDate));
        q2 = Ce(z2, ee) || me(z2, ee);
      }
      return q2;
    }, V = () => {
      v.value && A.value && T2.value ? n("select-date") : n("invalid-select");
    };
    return (Y2, q2) => (openBlock(), createElementBlock("div", ur, [
      Y2.$slots["action-row"] ? renderSlot(Y2.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: e2.internalModelValue,
        disabled: unref(U),
        selectDate: () => Y2.$emit("select-date"),
        closePicker: () => Y2.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createBaseVNode("div", dr, [
          Y2.$slots["action-preview"] ? renderSlot(Y2.$slots, "action-preview", {
            key: 0,
            value: e2.internalModelValue
          }) : createCommentVNode("", true),
          Y2.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            Array.isArray(unref(H3)) ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(unref(H3)), 1)
            ], 64)),
            Array.isArray(unref(H3)) ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(H3), (z2, ee) => (openBlock(), createElementBlock("div", { key: ee }, toDisplayString(z2), 1))), 128)) : createCommentVNode("", true)
          ], 64))
        ]),
        createBaseVNode("div", cr, [
          Y2.$slots["action-select"] ? renderSlot(Y2.$slots, "action-select", {
            key: 0,
            value: e2.internalModelValue
          }) : createCommentVNode("", true),
          Y2.$slots["action-select"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            Y2.inline ? createCommentVNode("", true) : (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__action dp__cancel",
              ref_key: "cancelButtonRef",
              ref: R2,
              tabindex: "0",
              onClick: q2[0] || (q2[0] = (z2) => Y2.$emit("close-picker")),
              onKeydown: [
                q2[1] || (q2[1] = withKeys((z2) => Y2.$emit("close-picker"), ["enter"])),
                q2[2] || (q2[2] = withKeys((z2) => Y2.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(Y2.cancelText), 545)),
            createBaseVNode("span", {
              class: normalizeClass(unref(M3)),
              tabindex: "0",
              onKeydown: [
                withKeys(V, ["enter"]),
                withKeys(V, ["space"])
              ],
              onClick: V,
              "data-test": "select-button",
              ref_key: "selectButtonRef",
              ref: B2
            }, toDisplayString(Y2.selectText), 43, fr)
          ], 64))
        ])
      ], 64))
    ]));
  }
});
var vr = ["aria-label"];
var yr = {
  class: "dp__calendar_header",
  role: "row"
};
var gr = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var hr = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var pr = ["aria-label"];
var kr = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var wr = { class: "dp__cell_inner" };
var br = ["aria-selected", "aria-disabled", "aria-label", "data-test", "onClick", "onKeydown", "onMouseenter", "onMouseleave"];
var Dr = defineComponent({
  __name: "Calendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    getWeekNum: {
      type: Function,
      default: () => ""
    },
    specificMode: { type: Boolean, default: false },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...nt
  },
  emits: [
    "select-date",
    "set-hover-date",
    "handle-scroll",
    "mount",
    "handle-swipe",
    "handle-space",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { buildMultiLevelMatrix: s3 } = tt(), { setDateMonthOrYear: f, defaults: h3 } = Ve(t2), R2 = ref(null), B2 = ref({
      bottom: "",
      left: "",
      transform: ""
    }), T2 = ref([]), U = ref(null), M3 = ref(true), v = ref(""), A = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), J = ref([]), Z = ref({ left: "50%" }), H3 = computed(() => t2.dayNames ? Array.isArray(t2.dayNames) ? t2.dayNames : t2.dayNames(t2.locale, +t2.weekStart) : La(t2.locale, +t2.weekStart));
    onMounted(() => {
      a3("mount", { cmp: "calendar", refs: T2 }), t2.noSwipe || U.value && (U.value.addEventListener("touchstart", m3, { passive: false }), U.value.addEventListener("touchend", N, { passive: false }), U.value.addEventListener("touchmove", x2, { passive: false })), t2.monthChangeOnScroll && U.value && U.value.addEventListener("wheel", I2, { passive: false });
    });
    const C = (l) => l ? t2.vertical ? "vNext" : "next" : t2.vertical ? "vPrevious" : "previous", V = (l, i2) => {
      if (t2.transitions) {
        const r = Le(f(b2(), t2.month, t2.year));
        v.value = Oe(Le(f(b2(), l, i2)), r) ? h3.value.transitions[C(true)] : h3.value.transitions[C(false)], M3.value = false, nextTick(() => {
          M3.value = true;
        });
      }
    }, Y2 = computed(
      () => ({
        dp__calendar_wrap: true,
        [t2.calendarClassName]: !!t2.calendarClassName
      })
    ), q2 = computed(() => (l) => {
      const i2 = za(l);
      return {
        dp__marker_dot: i2.type === "dot",
        dp__marker_line: i2.type === "line"
      };
    }), z2 = computed(() => (l) => me(l, R2.value)), ee = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: h3.value.multiCalendars > 0 && t2.instance !== 0
    })), le = computed(() => (l) => t2.hideOffsetDates ? l.current : true), S3 = computed(() => t2.specificMode ? { height: `${t2.modeHeight}px` } : void 0), P = async (l, i2, r) => {
      var c2, D2;
      if (a3("set-hover-date", l), (D2 = (c2 = l.marker) == null ? void 0 : c2.tooltip) != null && D2.length) {
        const L2 = $e(T2.value[i2][r]);
        if (L2) {
          const { width: O2, height: g } = L2.getBoundingClientRect();
          R2.value = l.value;
          let w2 = { left: `${O2 / 2}px` }, y3 = -50;
          if (await nextTick(), J.value[0]) {
            const { left: F, width: ie } = J.value[0].getBoundingClientRect();
            F < 0 && (w2 = { left: "0" }, y3 = 0, Z.value.left = `${O2 / 2}px`), window.innerWidth < F + ie && (w2 = { right: "0" }, y3 = 0, Z.value.left = `${ie - O2 / 2}px`);
          }
          B2.value = {
            bottom: `${g}px`,
            ...w2,
            transform: `translateX(${y3}%)`
          }, a3("tooltip-open", l.marker);
        }
      }
    }, X2 = (l) => {
      R2.value && (R2.value = null, B2.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a3("tooltip-close", l.marker));
    }, m3 = (l) => {
      A.value.startX = l.changedTouches[0].screenX, A.value.startY = l.changedTouches[0].screenY;
    }, N = (l) => {
      A.value.endX = l.changedTouches[0].screenX, A.value.endY = l.changedTouches[0].screenY, oe();
    }, x2 = (l) => {
      t2.vertical && !t2.inline && l.preventDefault();
    }, oe = () => {
      const l = t2.vertical ? "Y" : "X";
      Math.abs(A.value[`start${l}`] - A.value[`end${l}`]) > 10 && a3("handle-swipe", A.value[`start${l}`] > A.value[`end${l}`] ? "right" : "left");
    }, Q2 = (l, i2, r) => {
      l && (Array.isArray(T2.value[i2]) ? T2.value[i2][r] = l : T2.value[i2] = [l]), t2.arrowNavigation && s3(T2.value, "calendar");
    }, I2 = (l) => {
      t2.monthChangeOnScroll && (l.preventDefault(), a3("handle-scroll", l));
    };
    return n({ triggerTransition: V }), (l, i2) => {
      var r;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(ee))
      }, [
        createBaseVNode("div", {
          style: normalizeStyle(unref(S3))
        }, [
          e2.specificMode ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "calendarWrapRef",
            ref: U,
            class: normalizeClass(unref(Y2)),
            role: "grid",
            "aria-label": (r = unref(h3).ariaLabels) == null ? void 0 : r.calendarWrap
          }, [
            createBaseVNode("div", yr, [
              l.weekNumbers ? (openBlock(), createElementBlock("div", gr, toDisplayString(l.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(H3), (c2, D2) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: D2,
                "data-test": "calendar-header"
              }, [
                l.$slots["calendar-header"] ? renderSlot(l.$slots, "calendar-header", {
                  key: 0,
                  day: c2,
                  index: D2
                }) : createCommentVNode("", true),
                l.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(c2), 1)
                ], 64))
              ]))), 128))
            ]),
            hr,
            createVNode(Transition, {
              name: v.value,
              css: !!l.transitions
            }, {
              default: withCtx(() => {
                var c2;
                return [
                  M3.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": (c2 = unref(h3).ariaLabels) == null ? void 0 : c2.calendarDays
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(e2.mappedDates, (D2, L2) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: L2
                    }, [
                      l.weekNumbers ? (openBlock(), createElementBlock("div", kr, [
                        createBaseVNode("div", wr, toDisplayString(e2.getWeekNum(D2.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(D2.days, (O2, g) => {
                        var w2, y3, F;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (ie) => Q2(ie, L2, g),
                          key: g + L2,
                          "aria-selected": O2.classData.dp__active_date || O2.classData.dp__range_start || O2.classData.dp__range_start,
                          "aria-disabled": O2.classData.dp__cell_disabled,
                          "aria-label": (y3 = (w2 = unref(h3).ariaLabels) == null ? void 0 : w2.day) == null ? void 0 : y3.call(w2, O2),
                          tabindex: "0",
                          "data-test": O2.value,
                          onClick: withModifiers((ie) => l.$emit("select-date", O2), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((ie) => l.$emit("select-date", O2), ["enter"]),
                            withKeys((ie) => l.$emit("handle-space", O2), ["space"])
                          ],
                          onMouseenter: (ie) => P(O2, L2, g),
                          onMouseleave: (ie) => X2(O2)
                        }, [
                          createBaseVNode("div", {
                            class: normalizeClass(["dp__cell_inner", O2.classData])
                          }, [
                            l.$slots.day && unref(le)(O2) ? renderSlot(l.$slots, "day", {
                              key: 0,
                              day: +O2.text,
                              date: O2.value
                            }) : createCommentVNode("", true),
                            l.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(O2.text), 1)
                            ], 64)),
                            O2.marker && unref(le)(O2) ? (openBlock(), createElementBlock("div", {
                              key: 2,
                              class: normalizeClass(unref(q2)(O2.marker)),
                              style: normalizeStyle(O2.marker.color ? { backgroundColor: O2.marker.color } : {})
                            }, null, 6)) : createCommentVNode("", true),
                            unref(z2)(O2.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: J,
                              style: normalizeStyle(B2.value)
                            }, [
                              (F = O2.marker) != null && F.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: i2[0] || (i2[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(O2.marker.tooltip, (ie, Pe) => (openBlock(), createElementBlock("div", {
                                  key: Pe,
                                  class: "dp__tooltip_text"
                                }, [
                                  l.$slots["marker-tooltip"] ? renderSlot(l.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: ie,
                                    day: O2.value
                                  }) : createCommentVNode("", true),
                                  l.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createBaseVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(ie.color ? { backgroundColor: ie.color } : {})
                                    }, null, 4),
                                    createBaseVNode("div", null, toDisplayString(ie.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createBaseVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(Z.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, br);
                      }), 128))
                    ]))), 128))
                  ], 8, pr)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 10, vr))
        ], 4)
      ], 2);
    };
  }
});
var $r = ["aria-label", "aria-disabled"];
var tn = defineComponent({
  __name: "ActionIcon",
  props: {
    ariaLabel: { type: String, default: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["activate", "set-ref"],
  setup(e2, { emit: n }) {
    const a3 = ref(null);
    return onMounted(() => n("set-ref", a3)), (t2, s3) => (openBlock(), createElementBlock("div", {
      class: "dp__month_year_col_nav",
      onClick: s3[0] || (s3[0] = (f) => t2.$emit("activate")),
      onKeydown: [
        s3[1] || (s3[1] = withKeys((f) => t2.$emit("activate"), ["enter"])),
        s3[2] || (s3[2] = withKeys((f) => t2.$emit("activate"), ["space"]))
      ],
      tabindex: "0",
      role: "button",
      "aria-label": e2.ariaLabel,
      "aria-disabled": e2.disabled,
      ref_key: "elRef",
      ref: a3
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: e2.disabled }])
      }, [
        renderSlot(t2.$slots, "default")
      ], 2)
    ], 40, $r));
  }
});
var Mr = ["onKeydown"];
var Tr = { class: "dp__selection_grid_header" };
var Ar = ["aria-selected", "aria-disabled", "data-test", "onClick", "onKeydown", "onMouseover"];
var Sr = ["aria-label", "onKeydown"];
var Dt = defineComponent({
  __name: "SelectionGrid",
  props: {
    items: { type: Array, default: () => [] },
    modelValue: { type: [String, Number], default: null },
    multiModelValue: { type: Array, default: () => [] },
    disabledValues: { type: Array, default: () => [] },
    minValue: { type: [Number, String], default: null },
    maxValue: { type: [Number, String], default: null },
    year: { type: Number, default: 0 },
    skipActive: { type: Boolean, default: false },
    headerRefs: { type: Array, default: () => [] },
    skipButtonRef: { type: Boolean, default: false },
    monthPicker: { type: Boolean, default: false },
    yearPicker: { type: Boolean, default: false },
    escClose: { type: Boolean, default: true },
    type: { type: String, default: null },
    arrowNavigation: { type: Boolean, default: false },
    autoApply: { type: Boolean, default: false },
    textInput: { type: Boolean, default: false },
    ariaLabels: { type: Object, default: () => ({}) },
    hideNavigation: { type: Array, default: () => [] }
  },
  emits: ["update:model-value", "selected", "toggle", "reset-flow"],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setSelectionGrid: s3, buildMultiLevelMatrix: f, setMonthPicker: h3 } = tt(), { hideNavigationButtons: R2 } = Ve(t2), B2 = ref(false), T2 = ref(null), U = ref(null), M3 = ref([]), v = ref(), A = ref(null), J = ref(0), Z = ref(null);
    onBeforeUpdate(() => {
      T2.value = null;
    }), onMounted(() => {
      nextTick().then(() => P()), C(), H3(true);
    }), onUnmounted(() => H3(false));
    const H3 = (I2) => {
      var l;
      t2.arrowNavigation && ((l = t2.headerRefs) != null && l.length ? h3(I2) : s3(I2));
    }, C = () => {
      const I2 = $e(U);
      I2 && (t2.textInput || I2.focus({ preventScroll: true }), B2.value = I2.clientHeight < I2.scrollHeight);
    }, V = computed(
      () => ({
        dp__overlay: true
      })
    ), Y2 = computed(() => ({
      dp__overlay_col: true
    })), q2 = (I2) => t2.skipActive ? false : I2.value === t2.modelValue, z2 = computed(() => t2.items.map((I2) => I2.filter((l) => l).map((l) => {
      var c2, D2, L2;
      const i2 = t2.disabledValues.some((O2) => O2 === l.value) || S3(l.value), r = (c2 = t2.multiModelValue) != null && c2.length ? (D2 = t2.multiModelValue) == null ? void 0 : D2.some(
        (O2) => me(
          O2,
          setYear(
            t2.monthPicker ? setMonth(/* @__PURE__ */ new Date(), l.value) : /* @__PURE__ */ new Date(),
            t2.monthPicker ? t2.year : l.value
          )
        )
      ) : q2(l);
      return {
        ...l,
        className: {
          dp__overlay_cell_active: r,
          dp__overlay_cell: !r,
          dp__overlay_cell_disabled: i2,
          dp__overlay_cell_active_disabled: i2 && r,
          dp__overlay_cell_pad: true,
          dp__cell_in_between: (L2 = t2.multiModelValue) != null && L2.length && t2.skipActive ? m3(l.value) : false
        }
      };
    }))), ee = computed(
      () => ({
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: B2.value,
        dp__button_bottom: t2.autoApply
      })
    ), le = computed(() => {
      var I2, l;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((I2 = t2.items) == null ? void 0 : I2.length) <= 6,
        dp__container_block: ((l = t2.items) == null ? void 0 : l.length) > 6
      };
    }), S3 = (I2) => {
      const l = t2.maxValue || t2.maxValue === 0, i2 = t2.minValue || t2.minValue === 0;
      return !l && !i2 ? false : l && i2 ? +I2 > +t2.maxValue || +I2 < +t2.minValue : l ? +I2 > +t2.maxValue : i2 ? +I2 < +t2.minValue : false;
    }, P = () => {
      const I2 = $e(T2), l = $e(U), i2 = $e(A), r = $e(Z), c2 = i2 ? i2.getBoundingClientRect().height : 0;
      l && (J.value = l.getBoundingClientRect().height - c2), I2 && r && (r.scrollTop = I2.offsetTop - r.offsetTop - (J.value / 2 - I2.getBoundingClientRect().height) - c2);
    }, X2 = (I2) => {
      !t2.disabledValues.some((l) => l === I2) && !S3(I2) && (a3("update:model-value", I2), a3("selected"));
    }, m3 = (I2) => {
      const l = t2.monthPicker ? t2.year : I2;
      return Wn(
        t2.multiModelValue,
        setYear(
          t2.monthPicker ? setMonth(/* @__PURE__ */ new Date(), v.value || 0) : /* @__PURE__ */ new Date(),
          t2.monthPicker ? l : v.value || l
        ),
        setYear(t2.monthPicker ? setMonth(/* @__PURE__ */ new Date(), I2) : /* @__PURE__ */ new Date(), l)
      );
    }, N = () => {
      a3("toggle"), a3("reset-flow");
    }, x2 = () => {
      t2.escClose && N();
    }, oe = (I2, l, i2, r) => {
      I2 && (l.value === +t2.modelValue && !t2.disabledValues.includes(l.value) && (T2.value = I2), t2.arrowNavigation && (Array.isArray(M3.value[i2]) ? M3.value[i2][r] = I2 : M3.value[i2] = [I2], Q2()));
    }, Q2 = () => {
      var l, i2;
      const I2 = (l = t2.headerRefs) != null && l.length ? [t2.headerRefs].concat(M3.value) : M3.value.concat([t2.skipButtonRef ? [] : [A.value]]);
      f(be(I2), (i2 = t2.headerRefs) != null && i2.length ? "monthPicker" : "selectionGrid");
    };
    return n({ focusGrid: C }), (I2, l) => {
      var i2;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: U,
        class: normalizeClass(unref(V)),
        role: "dialog",
        tabindex: "0",
        onKeydown: withKeys(x2, ["esc"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(unref(le)),
          ref_key: "containerRef",
          ref: Z,
          role: "grid",
          style: normalizeStyle({ height: `${J.value}px` })
        }, [
          createBaseVNode("div", Tr, [
            renderSlot(I2.$slots, "header")
          ]),
          I2.$slots.overlay ? renderSlot(I2.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(z2), (r, c2) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: unref(z2).length >= 3 }]),
            key: c2,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(r, (D2, L2) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(unref(Y2)),
              key: D2.value,
              "aria-selected": D2.value === e2.modelValue && !e2.disabledValues.includes(D2.value),
              "aria-disabled": D2.className.dp__overlay_cell_disabled,
              ref_for: true,
              ref: (O2) => oe(O2, D2, c2, L2),
              tabindex: "0",
              "data-test": D2.text,
              onClick: (O2) => X2(D2.value),
              onKeydown: [
                withKeys((O2) => X2(D2.value), ["enter"]),
                withKeys((O2) => X2(D2.value), ["space"])
              ],
              onMouseover: (O2) => v.value = D2.value
            }, [
              createBaseVNode("div", {
                class: normalizeClass(D2.className)
              }, [
                I2.$slots.item ? renderSlot(I2.$slots, "item", {
                  key: 0,
                  item: D2
                }) : createCommentVNode("", true),
                I2.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(D2.text), 1)
                ], 64))
              ], 2)
            ], 42, Ar))), 128))
          ], 2))), 128))
        ], 6),
        I2.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          role: "button",
          "aria-label": (i2 = e2.ariaLabels) == null ? void 0 : i2.toggleOverlay,
          class: normalizeClass(unref(ee)),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: A,
          onClick: N,
          onKeydown: withKeys(N, ["enter"])
        }, [
          renderSlot(I2.$slots, "button-icon")
        ], 42, Sr)), [
          [vShow, !unref(R2)(e2.type)]
        ]) : createCommentVNode("", true)
      ], 42, Mr);
    };
  }
});
var Cr = ["aria-label"];
var Rn = defineComponent({
  __name: "RegularPicker",
  props: {
    ariaLabel: { type: String, default: "" },
    showSelectionGrid: { type: Boolean, default: false },
    modelValue: { type: Number, default: null },
    items: { type: Array, default: () => [] },
    disabledValues: { type: Array, default: () => [] },
    minValue: { type: Number, default: null },
    maxValue: { type: Number, default: null },
    slotName: { type: String, default: "" },
    overlaySlot: { type: String, default: "" },
    headerRefs: { type: Array, default: () => [] },
    escClose: { type: Boolean, default: true },
    type: { type: String, default: null },
    transitions: { type: [Object, Boolean], default: false },
    arrowNavigation: { type: Boolean, default: false },
    autoApply: { type: Boolean, default: false },
    textInput: { type: Boolean, default: false },
    ariaLabels: { type: Object, default: () => ({}) },
    hideNavigation: { type: Array, default: () => [] }
  },
  emits: ["update:model-value", "toggle", "set-ref"],
  setup(e2, { emit: n }) {
    const a3 = e2, { transitionName: t2, showTransition: s3 } = Ft(a3.transitions), f = ref(null);
    return onMounted(() => n("set-ref", f)), (h3, R2) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", {
        class: "dp__month_year_select",
        onClick: R2[0] || (R2[0] = (B2) => h3.$emit("toggle")),
        onKeydown: [
          R2[1] || (R2[1] = withKeys((B2) => h3.$emit("toggle"), ["enter"])),
          R2[2] || (R2[2] = withKeys((B2) => h3.$emit("toggle"), ["space"]))
        ],
        role: "button",
        "aria-label": e2.ariaLabel,
        tabindex: "0",
        ref_key: "elRef",
        ref: f
      }, [
        renderSlot(h3.$slots, "default")
      ], 40, Cr),
      createVNode(Transition, {
        name: unref(t2)(e2.showSelectionGrid),
        css: unref(s3)
      }, {
        default: withCtx(() => [
          e2.showSelectionGrid ? (openBlock(), createBlock(Dt, mergeProps({ key: 0 }, {
            modelValue: e2.modelValue,
            items: e2.items,
            disabledValues: e2.disabledValues,
            minValue: e2.minValue,
            maxValue: e2.maxValue,
            escClose: e2.escClose,
            type: e2.type,
            arrowNavigation: e2.arrowNavigation,
            textInput: e2.textInput,
            autoApply: e2.autoApply,
            ariaLabels: e2.ariaLabels,
            hideNavigation: e2.hideNavigation
          }, {
            "header-refs": [],
            "onUpdate:modelValue": R2[3] || (R2[3] = (B2) => h3.$emit("update:model-value", B2)),
            onToggle: R2[4] || (R2[4] = (B2) => h3.$emit("toggle"))
          }), createSlots({
            "button-icon": withCtx(() => [
              h3.$slots["calendar-icon"] ? renderSlot(h3.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
              h3.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
            ]),
            _: 2
          }, [
            h3.$slots[e2.slotName] ? {
              name: "item",
              fn: withCtx(({ item: B2 }) => [
                renderSlot(h3.$slots, e2.slotName, { item: B2 })
              ]),
              key: "0"
            } : void 0,
            h3.$slots[e2.overlaySlot] ? {
              name: "overlay",
              fn: withCtx(() => [
                renderSlot(h3.$slots, e2.overlaySlot)
              ]),
              key: "1"
            } : void 0,
            h3.$slots[`${e2.overlaySlot}-header`] ? {
              name: "header",
              fn: withCtx(() => [
                renderSlot(h3.$slots, `${e2.overlaySlot}-header`)
              ]),
              key: "2"
            } : void 0
          ]), 1040)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 64));
  }
});
var Pr = { class: "dp__month_year_row" };
var _r = { class: "dp__month_year_wrap" };
var Nr = { class: "dp__month_picker_header" };
var Rr = ["aria-label"];
var Or = ["aria-label"];
var Ir = ["aria-label"];
var Br = defineComponent({
  __name: "MonthYearPicker",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    internalModelValue: { type: [Date, Array], default: null },
    ...nt
  },
  emits: ["update-month-year", "month-year-select", "mount", "reset-flow", "overlay-closed"],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { defaults: s3 } = Ve(t2), { transitionName: f, showTransition: h3 } = Ft(s3.value.transitions), { buildMatrix: R2 } = tt(), { handleMonthYearChange: B2, isDisabled: T2, updateMonthYear: U } = Qa(t2, a3), M3 = ref(false), v = ref(false), A = ref([null, null, null, null]), J = ref(null), Z = ref(null), H3 = ref(null);
    onMounted(() => {
      a3("mount");
    });
    const C = (g) => ({
      get: () => t2[g],
      set: (w2) => {
        const y3 = g === "month" ? "year" : "month";
        a3("update-month-year", { [g]: w2, [y3]: t2[y3] }), a3("month-year-select", g === "year"), g === "month" ? r(true) : c2(true);
      }
    }), V = computed(C("month")), Y2 = computed(C("year")), q2 = (g) => {
      const w2 = getYear(b2(g));
      return t2.year === w2;
    }, z2 = computed(() => t2.monthPicker ? Array.isArray(t2.disabledDates) ? t2.disabledDates.map((g) => b2(g)).filter((g) => q2(g)).map((g) => getMonth(g)) : [] : []), ee = computed(() => (g) => {
      const w2 = g === "month";
      return {
        showSelectionGrid: (w2 ? M3 : v).value,
        items: (w2 ? Q2 : I2).value,
        disabledValues: s3.value.filters[w2 ? "months" : "years"].concat(z2.value),
        minValue: (w2 ? X2 : S3).value,
        maxValue: (w2 ? m3 : P).value,
        headerRefs: w2 && t2.monthPicker ? [J.value, Z.value, H3.value] : [],
        escClose: t2.escClose,
        transitions: s3.value.transitions,
        ariaLabels: s3.value.ariaLabels,
        textInput: t2.textInput,
        autoApply: t2.autoApply,
        arrowNavigation: t2.arrowNavigation,
        hideNavigation: t2.hideNavigation
      };
    }), le = computed(() => (g) => ({
      month: t2.month,
      year: t2.year,
      items: g === "month" ? t2.months : t2.years,
      instance: t2.instance,
      updateMonthYear: U,
      toggle: g === "month" ? r : c2
    })), S3 = computed(() => t2.minDate ? getYear(b2(t2.minDate)) : null), P = computed(() => t2.maxDate ? getYear(b2(t2.maxDate)) : null), X2 = computed(() => {
      if (t2.minDate && S3.value) {
        if (S3.value > t2.year)
          return 12;
        if (S3.value === t2.year)
          return getMonth(b2(t2.minDate));
      }
      return null;
    }), m3 = computed(() => t2.maxDate && P.value ? P.value < t2.year ? -1 : P.value === t2.year ? getMonth(b2(t2.maxDate)) : null : null), N = computed(() => (t2.range || t2.multiDates) && t2.internalModelValue && (t2.monthPicker || t2.yearPicker) ? t2.internalModelValue : []), x2 = (g) => {
      const w2 = [], y3 = (F) => F;
      for (let F = 0; F < g.length; F += 3) {
        const ie = [g[F], g[F + 1], g[F + 2]];
        w2.push(y3(ie));
      }
      return w2;
    }, oe = computed(() => {
      const g = t2.months.find((w2) => w2.value === t2.month);
      return g || { text: "", value: 0 };
    }), Q2 = computed(() => x2(t2.months)), I2 = computed(() => x2(t2.years)), l = computed(() => s3.value.multiCalendars ? t2.multiCalendarsSolo ? true : t2.instance === 0 : true), i2 = computed(() => s3.value.multiCalendars ? t2.multiCalendarsSolo ? true : t2.instance === s3.value.multiCalendars - 1 : true), r = (g = false) => {
      D2(g), M3.value = !M3.value, M3.value || a3("overlay-closed");
    }, c2 = (g = false) => {
      D2(g), v.value = !v.value, v.value || a3("overlay-closed");
    }, D2 = (g) => {
      g || a3("reset-flow");
    }, L2 = (g = false) => {
      T2.value(g) || a3("update-month-year", {
        year: g ? t2.year + 1 : t2.year - 1,
        month: t2.month,
        fromNav: true
      });
    }, O2 = (g, w2) => {
      t2.arrowNavigation && (A.value[w2] = $e(g), R2(A.value, "monthYear"));
    };
    return n({
      toggleMonthPicker: r,
      toggleYearPicker: c2,
      handleMonthYearChange: B2
    }), (g, w2) => {
      var y3, F, ie, Pe, Ze;
      return openBlock(), createElementBlock("div", Pr, [
        g.$slots["month-year"] ? renderSlot(g.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e2.month, year: e2.year, months: e2.months, years: e2.years, updateMonthYear: unref(U), handleMonthYearChange: unref(B2), instance: e2.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          !g.monthPicker && !g.yearPicker ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            unref(l) && !g.vertical ? (openBlock(), createBlock(tn, {
              key: 0,
              "aria-label": (y3 = unref(s3).ariaLabels) == null ? void 0 : y3.prevMonth,
              disabled: unref(T2)(false),
              onActivate: w2[0] || (w2[0] = (re) => unref(B2)(false)),
              onSetRef: w2[1] || (w2[1] = (re) => O2(re, 0))
            }, {
              default: withCtx(() => [
                g.$slots["arrow-left"] ? renderSlot(g.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                g.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(hn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createBaseVNode("div", _r, [
              createVNode(Rn, mergeProps({
                type: "month",
                "slot-name": "month-overlay-val",
                "overlay-slot": "overlay-month",
                "aria-label": (F = unref(s3).ariaLabels) == null ? void 0 : F.openMonthsOverlay,
                modelValue: unref(V),
                "onUpdate:modelValue": w2[2] || (w2[2] = (re) => isRef(V) ? V.value = re : null)
              }, unref(ee)("month"), {
                onToggle: r,
                onSetRef: w2[3] || (w2[3] = (re) => O2(re, 1))
              }), createSlots({
                default: withCtx(() => [
                  g.$slots.month ? renderSlot(g.$slots, "month", normalizeProps(mergeProps({ key: 0 }, unref(oe)))) : createCommentVNode("", true),
                  g.$slots.month ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(unref(oe).text), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                g.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(g.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                g.$slots["month-overlay-value"] ? {
                  name: "month-overlay-val",
                  fn: withCtx(({ item: re }) => [
                    renderSlot(g.$slots, "month-overlay-value", {
                      text: re.text,
                      value: re.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                g.$slots["month-overlay"] ? {
                  name: "overlay-month",
                  fn: withCtx(() => [
                    renderSlot(g.$slots, "month-overlay", normalizeProps(guardReactiveProps(unref(le)("month"))))
                  ]),
                  key: "2"
                } : void 0,
                g.$slots["month-overlay-header"] ? {
                  name: "overlay-month-header",
                  fn: withCtx(() => [
                    renderSlot(g.$slots, "month-overlay-header", { toggle: r })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"]),
              createVNode(Rn, mergeProps({
                type: "year",
                "slot-name": "year-overlay-val",
                "overlay-slot": "overlay-year",
                "aria-label": (ie = unref(s3).ariaLabels) == null ? void 0 : ie.openYearsOverlay,
                modelValue: unref(Y2),
                "onUpdate:modelValue": w2[4] || (w2[4] = (re) => isRef(Y2) ? Y2.value = re : null)
              }, unref(ee)("year"), {
                onToggle: c2,
                onSetRef: w2[5] || (w2[5] = (re) => O2(re, 2))
              }), createSlots({
                default: withCtx(() => [
                  g.$slots.year ? renderSlot(g.$slots, "year", {
                    key: 0,
                    year: e2.year
                  }) : createCommentVNode("", true),
                  g.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(e2.year), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                g.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(g.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                g.$slots["year-overlay-value"] ? {
                  name: "year-overlay-val",
                  fn: withCtx(({ item: re }) => [
                    renderSlot(g.$slots, "year-overlay-value", {
                      text: re.text,
                      value: re.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                g.$slots["year-overlay"] ? {
                  name: "overlay-year",
                  fn: withCtx(() => [
                    renderSlot(g.$slots, "year-overlay", normalizeProps(guardReactiveProps(unref(le)("year"))))
                  ]),
                  key: "2"
                } : void 0,
                g.$slots["year-overlay-header"] ? {
                  name: "overlay-year-header",
                  fn: withCtx(() => [
                    renderSlot(g.$slots, "year-overlay-header", { toggle: c2 })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"])
            ]),
            unref(l) && g.vertical ? (openBlock(), createBlock(tn, {
              key: 1,
              "aria-label": (Pe = unref(s3).ariaLabels) == null ? void 0 : Pe.prevMonth,
              disabled: unref(T2)(false),
              onActivate: w2[6] || (w2[6] = (re) => unref(B2)(false))
            }, {
              default: withCtx(() => [
                g.$slots["arrow-up"] ? renderSlot(g.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                g.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Un), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            unref(i2) ? (openBlock(), createBlock(tn, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(T2)(true),
              "aria-label": (Ze = unref(s3).ariaLabels) == null ? void 0 : Ze.nextMonth,
              onActivate: w2[7] || (w2[7] = (re) => unref(B2)(true)),
              onSetRef: w2[8] || (w2[8] = (re) => O2(re, 3))
            }, {
              default: withCtx(() => [
                g.$slots[g.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(g.$slots, g.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                g.$slots[g.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(g.vertical ? unref(Hn) : unref(pn)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true),
          g.monthPicker ? (openBlock(), createBlock(Dt, mergeProps({ key: 1 }, unref(ee)("month"), {
            "skip-active": g.range,
            year: e2.year,
            "multi-model-value": unref(N),
            "month-picker": "",
            modelValue: unref(V),
            "onUpdate:modelValue": w2[17] || (w2[17] = (re) => isRef(V) ? V.value = re : null),
            onToggle: r,
            onSelected: w2[18] || (w2[18] = (re) => g.$emit("overlay-closed"))
          }), createSlots({
            header: withCtx(() => {
              var re, Xe, ze;
              return [
                createBaseVNode("div", Nr, [
                  createBaseVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpPrevIconRef",
                    ref: J,
                    onClick: w2[9] || (w2[9] = (_e) => L2(false)),
                    onKeydown: w2[10] || (w2[10] = withKeys((_e) => L2(false), ["enter"]))
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(T2)(false) }]),
                      role: "button",
                      "aria-label": (re = unref(s3).ariaLabels) == null ? void 0 : re.prevMonth
                    }, [
                      g.$slots["arrow-left"] ? renderSlot(g.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                      g.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(hn), { key: 1 }))
                    ], 10, Rr)
                  ], 544),
                  createBaseVNode("div", {
                    class: "dp__pointer",
                    role: "button",
                    ref_key: "mpYearButtonRef",
                    ref: Z,
                    "aria-label": (Xe = unref(s3).ariaLabels) == null ? void 0 : Xe.openYearsOverlay,
                    tabindex: "0",
                    onClick: w2[11] || (w2[11] = () => c2(false)),
                    onKeydown: w2[12] || (w2[12] = withKeys(() => c2(false), ["enter"]))
                  }, [
                    g.$slots.year ? renderSlot(g.$slots, "year", {
                      key: 0,
                      year: e2.year
                    }) : createCommentVNode("", true),
                    g.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(e2.year), 1)
                    ], 64))
                  ], 40, Or),
                  createBaseVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpNextIconRef",
                    ref: H3,
                    onClick: w2[13] || (w2[13] = (_e) => L2(true)),
                    onKeydown: w2[14] || (w2[14] = withKeys((_e) => L2(true), ["enter"]))
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(T2)(true) }]),
                      role: "button",
                      "aria-label": (ze = unref(s3).ariaLabels) == null ? void 0 : ze.nextMonth
                    }, [
                      g.$slots["arrow-right"] ? renderSlot(g.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                      g.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(pn), { key: 1 }))
                    ], 10, Ir)
                  ], 544)
                ]),
                createVNode(Transition, {
                  name: unref(f)(v.value),
                  css: unref(h3)
                }, {
                  default: withCtx(() => [
                    v.value ? (openBlock(), createBlock(Dt, mergeProps({ key: 0 }, unref(ee)("year"), {
                      modelValue: unref(Y2),
                      "onUpdate:modelValue": w2[15] || (w2[15] = (_e) => isRef(Y2) ? Y2.value = _e : null),
                      onToggle: c2,
                      onSelected: w2[16] || (w2[16] = (_e) => g.$emit("overlay-closed"))
                    }), createSlots({
                      "button-icon": withCtx(() => [
                        g.$slots["calendar-icon"] ? renderSlot(g.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        g.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      g.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: _e }) => [
                          renderSlot(g.$slots, "year-overlay-value", {
                            text: _e.text,
                            value: _e.value
                          })
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040, ["modelValue"])) : createCommentVNode("", true)
                  ]),
                  _: 3
                }, 8, ["name", "css"])
              ];
            }),
            _: 2
          }, [
            g.$slots["month-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: re }) => [
                renderSlot(g.$slots, "month-overlay-value", {
                  text: re.text,
                  value: re.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["skip-active", "year", "multi-model-value", "modelValue"])) : createCommentVNode("", true),
          g.yearPicker ? (openBlock(), createBlock(Dt, mergeProps({ key: 2 }, unref(ee)("year"), {
            modelValue: unref(Y2),
            "onUpdate:modelValue": w2[19] || (w2[19] = (re) => isRef(Y2) ? Y2.value = re : null),
            "multi-model-value": unref(N),
            "skip-active": g.range,
            "skip-button-ref": "",
            "year-picker": "",
            onToggle: c2,
            onSelected: w2[20] || (w2[20] = (re) => g.$emit("overlay-closed"))
          }), createSlots({ _: 2 }, [
            g.$slots["year-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: re }) => [
                renderSlot(g.$slots, "year-overlay-value", {
                  text: re.text,
                  value: re.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["modelValue", "multi-model-value", "skip-active"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});
var Yr = {
  key: 0,
  class: "dp__time_input"
};
var Vr = ["aria-label", "onKeydown", "onClick"];
var Er = ["aria-label", "data-test", "onKeydown", "onClick"];
var Fr = ["aria-label", "onKeydown", "onClick"];
var Lr = { key: 0 };
var Ur = ["aria-label", "onKeydown"];
var Hr = defineComponent({
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    ...nt
  },
  emits: [
    "set-hours",
    "set-minutes",
    "update:hours",
    "update:minutes",
    "update:seconds",
    "reset-flow",
    "mounted",
    "overlay-closed"
  ],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setTimePickerElements: s3, setTimePickerBackRef: f } = tt(), { defaults: h3 } = Ve(t2), { transitionName: R2, showTransition: B2 } = Ft(h3.value.transitions), T2 = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), U = ref("AM"), M3 = ref(null), v = ref([]);
    onMounted(() => {
      a3("mounted");
    });
    const A = computed(() => (l) => !!(t2.maxTime && t2.maxTime[l] && t2.maxTime[l] < t2[l] + +t2[`${l}Increment`])), J = computed(() => (l) => !!(t2.minTime && t2.minTime[l] && t2.minTime[l] > t2[l] - +t2[`${l}Increment`])), Z = (l, i2) => add(set(b2(), l), i2), H3 = (l, i2) => sub(set(b2(), l), i2), C = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_reg: !t2.enableSeconds && t2.is24,
        dp__time_col_reg_with_button: !t2.enableSeconds && !t2.is24,
        dp__time_col_sec: t2.enableSeconds && t2.is24,
        dp__time_col_sec_with_button: t2.enableSeconds && !t2.is24
      })
    ), V = computed(() => {
      const l = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t2.enableSeconds ? l.concat([{ type: "", separator: true }, { type: "seconds" }]) : l;
    }), Y2 = computed(() => V.value.filter((l) => !l.separator)), q2 = computed(() => (l) => {
      if (l === "hours") {
        const i2 = N(t2.hours);
        return { text: i2 < 10 ? `0${i2}` : `${i2}`, value: i2 };
      }
      return { text: t2[l] < 10 ? `0${t2[l]}` : `${t2[l]}`, value: t2[l] };
    }), z2 = (l) => {
      const i2 = t2.is24 ? 24 : 12, r = l === "hours" ? i2 : 60, c2 = +t2[`${l}GridIncrement`], D2 = l === "hours" && !t2.is24 ? c2 : 0, L2 = [];
      for (let O2 = D2; O2 < r; O2 += c2)
        L2.push({ value: O2, text: O2 < 10 ? `0${O2}` : `${O2}` });
      return l === "hours" && !t2.is24 && L2.push({ value: 0, text: "12" }), Fa(L2);
    }, ee = (l, i2) => {
      const r = t2.minTime && t2.minTime[i2], c2 = t2.maxTime && t2.maxTime[i2];
      return r && c2 ? l < r || l > c2 : r ? l < r : c2 ? l > c2 : false;
    }, le = computed(() => (l) => z2(l).flat().filter((r) => r).map((r) => r.value).filter((r) => ee(r, l))), S3 = (l) => t2[`no${l[0].toUpperCase() + l.slice(1)}Overlay`], P = (l) => {
      S3(l) || (T2[l] = !T2[l], T2[l] || a3("overlay-closed"));
    }, X2 = (l) => l === "hours" ? getHours : l === "minutes" ? getMinutes : getSeconds, m3 = (l, i2 = true) => {
      const r = i2 ? Z : H3;
      (i2 ? A.value(l) : J.value(l)) || a3(
        `update:${l}`,
        X2(l)(r({ [l]: +t2[l] }, { [l]: +t2[`${l}Increment`] }))
      );
    }, N = (l) => t2.is24 ? l : (l >= 12 ? U.value = "PM" : U.value = "AM", Wa(l)), x2 = () => {
      U.value === "PM" ? (U.value = "AM", a3("update:hours", t2.hours - 12)) : (U.value = "PM", a3("update:hours", t2.hours + 12));
    }, oe = (l) => {
      T2[l] = true;
    }, Q2 = (l, i2, r) => {
      if (l && t2.arrowNavigation) {
        Array.isArray(v.value[i2]) ? v.value[i2][r] = l : v.value[i2] = [l];
        const c2 = v.value.reduce(
          (D2, L2) => L2.map((O2, g) => [...D2[g] || [], L2[g]]),
          []
        );
        f(t2.closeTimePickerBtn), M3.value && (c2[1] = c2[1].concat(M3.value)), s3(c2, t2.order);
      }
    }, I2 = (l, i2) => l === "hours" && !t2.is24 ? a3(`update:${l}`, U.value === "PM" ? i2 + 12 : i2) : a3(`update:${l}`, i2);
    return n({ openChildCmp: oe }), (l, i2) => {
      var r;
      return l.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Yr, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(V), (c2, D2) => {
          var L2, O2, g;
          return openBlock(), createElementBlock("div", {
            key: D2,
            class: normalizeClass(unref(C))
          }, [
            c2.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", {
                class: normalizeClass({
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(A)(c2.type)
                }),
                role: "button",
                "data-test": "time-inc-btn",
                "aria-label": (L2 = unref(h3).ariaLabels) == null ? void 0 : L2.incrementValue(c2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((w2) => m3(c2.type), ["enter"]),
                  withKeys((w2) => m3(c2.type), ["space"])
                ],
                onClick: (w2) => m3(c2.type),
                ref_for: true,
                ref: (w2) => Q2(w2, D2, 0)
              }, [
                l.$slots["arrow-up"] ? renderSlot(l.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                l.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Un), { key: 1 }))
              ], 42, Vr),
              createBaseVNode("div", {
                role: "button",
                "aria-label": (O2 = unref(h3).ariaLabels) == null ? void 0 : O2.openTpOverlay(c2.type),
                class: normalizeClass(S3(c2.type) ? "" : "dp__time_display"),
                tabindex: "0",
                "data-test": `${c2.type}-toggle-overlay-btn`,
                onKeydown: [
                  withKeys((w2) => P(c2.type), ["enter"]),
                  withKeys((w2) => P(c2.type), ["space"])
                ],
                onClick: (w2) => P(c2.type),
                ref_for: true,
                ref: (w2) => Q2(w2, D2, 1)
              }, [
                l.$slots[c2.type] ? renderSlot(l.$slots, c2.type, {
                  key: 0,
                  text: unref(q2)(c2.type).text,
                  value: unref(q2)(c2.type).value
                }) : createCommentVNode("", true),
                l.$slots[c2.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(unref(q2)(c2.type).text), 1)
                ], 64))
              ], 42, Er),
              createBaseVNode("div", {
                class: normalizeClass({
                  dp__inc_dec_button: true,
                  dp__inc_dec_button_disabled: unref(J)(c2.type)
                }),
                role: "button",
                "data-test": "time-dec-btn",
                "aria-label": (g = unref(h3).ariaLabels) == null ? void 0 : g.decrementValue(c2.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((w2) => m3(c2.type, false), ["enter"]),
                  withKeys((w2) => m3(c2.type, false), ["space"])
                ],
                onClick: (w2) => m3(c2.type, false),
                ref_for: true,
                ref: (w2) => Q2(w2, D2, 2)
              }, [
                l.$slots["arrow-down"] ? renderSlot(l.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                l.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Hn), { key: 1 }))
              ], 42, Fr)
            ], 64))
          ], 2);
        }), 128)),
        l.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Lr, [
          l.$slots["am-pm-button"] ? renderSlot(l.$slots, "am-pm-button", {
            key: 0,
            toggle: x2,
            value: U.value
          }) : createCommentVNode("", true),
          l.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: M3,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (r = unref(h3).ariaLabels) == null ? void 0 : r.amPmButton,
            tabindex: "0",
            onClick: x2,
            onKeydown: [
              withKeys(withModifiers(x2, ["prevent"]), ["enter"]),
              withKeys(withModifiers(x2, ["prevent"]), ["space"])
            ]
          }, toDisplayString(U.value), 41, Ur))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(Y2), (c2, D2) => (openBlock(), createBlock(Transition, {
          key: D2,
          name: unref(R2)(T2[c2.type]),
          css: unref(B2)
        }, {
          default: withCtx(() => [
            T2[c2.type] ? (openBlock(), createBlock(Dt, {
              key: 0,
              items: z2(c2.type),
              "disabled-values": unref(h3).filters.times[c2.type].concat(unref(le)(c2.type)),
              "esc-close": l.escClose,
              "aria-labels": unref(h3).ariaLabels,
              "hide-navigation": l.hideNavigation,
              "onUpdate:modelValue": (L2) => I2(c2.type, L2),
              onSelected: (L2) => P(c2.type),
              onToggle: (L2) => P(c2.type),
              onResetFlow: i2[0] || (i2[0] = (L2) => l.$emit("reset-flow")),
              type: c2.type
            }, createSlots({
              "button-icon": withCtx(() => [
                l.$slots["clock-icon"] ? renderSlot(l.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                l.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ln), { key: 1 }))
              ]),
              _: 2
            }, [
              l.$slots[`${c2.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: L2 }) => [
                  renderSlot(l.$slots, `${c2.type}-overlay-value`, {
                    text: L2.text,
                    value: L2.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "disabled-values", "esc-close", "aria-labels", "hide-navigation", "onUpdate:modelValue", "onSelected", "onToggle", "type"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var Wr = ["aria-label"];
var zr = { class: "dp__overlay_container dp__container_flex dp__time_picker_overlay_container" };
var xr = {
  key: 1,
  class: "dp__overlay_row dp__flex_row"
};
var Kr = ["aria-label"];
var jr = defineComponent({
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    internalModelValue: { type: [Date, Array], default: null },
    ...nt
  },
  emits: [
    "update:hours",
    "update:minutes",
    "update:seconds",
    "mount",
    "reset-flow",
    "overlay-opened",
    "overlay-closed"
  ],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { buildMatrix: s3, setTimePicker: f } = tt(), h3 = useSlots(), { hideNavigationButtons: R2, defaults: B2 } = Ve(t2), { transitionName: T2, showTransition: U } = Ft(B2.value.transitions), M3 = ref(null), v = ref(null), A = ref([]), J = ref(null);
    onMounted(() => {
      a3("mount"), !t2.timePicker && t2.arrowNavigation ? s3([$e(M3.value)], "time") : f(true, t2.timePicker);
    });
    const Z = computed(() => t2.range && t2.modelAuto ? jn(t2.internalModelValue) : true), H3 = ref(false), C = (m3) => ({
      hours: Array.isArray(t2.hours) ? t2.hours[m3] : t2.hours,
      minutes: Array.isArray(t2.minutes) ? t2.minutes[m3] : t2.minutes,
      seconds: Array.isArray(t2.seconds) ? t2.seconds[m3] : t2.seconds
    }), V = computed(() => {
      const m3 = [];
      if (t2.range)
        for (let N = 0; N < 2; N++)
          m3.push(C(N));
      else
        m3.push(C(0));
      return m3;
    }), Y2 = (m3, N = false, x2 = "") => {
      N || a3("reset-flow"), H3.value = m3, m3 && a3("overlay-opened"), t2.arrowNavigation && (f(m3), m3 || a3("overlay-closed")), nextTick(() => {
        x2 !== "" && A.value[0] && A.value[0].openChildCmp(x2);
      });
    }, q2 = computed(() => ({
      dp__button: true,
      dp__button_bottom: t2.autoApply
    })), z2 = it(h3, "timePicker"), ee = (m3, N, x2) => t2.range ? N === 0 ? [m3, V.value[1][x2]] : [V.value[0][x2], m3] : m3, le = (m3) => {
      a3("update:hours", m3);
    }, S3 = (m3) => {
      a3("update:minutes", m3);
    }, P = (m3) => {
      a3("update:seconds", m3);
    }, X2 = () => {
      J.value && t2.arrowNavigation && J.value.focus({ preventScroll: true });
    };
    return n({ toggleTimePicker: Y2 }), (m3, N) => {
      var x2;
      return openBlock(), createElementBlock("div", null, [
        m3.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(q2)),
          role: "button",
          "aria-label": (x2 = unref(B2).ariaLabels) == null ? void 0 : x2.openTimePicker,
          tabindex: "0",
          "data-test": "open-time-picker-btn",
          ref_key: "openTimePickerBtn",
          ref: M3,
          onKeydown: [
            N[0] || (N[0] = withKeys((oe) => Y2(true), ["enter"])),
            N[1] || (N[1] = withKeys((oe) => Y2(true), ["space"]))
          ],
          onClick: N[2] || (N[2] = (oe) => Y2(true))
        }, [
          m3.$slots["clock-icon"] ? renderSlot(m3.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          m3.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ln), { key: 1 }))
        ], 42, Wr)), [
          [vShow, !unref(R2)("time")]
        ]),
        createVNode(Transition, {
          name: unref(T2)(H3.value),
          css: unref(U)
        }, {
          default: withCtx(() => {
            var oe;
            return [
              H3.value || m3.timePicker ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "dp__overlay",
                ref_key: "overlayRef",
                ref: J,
                tabindex: "0"
              }, [
                createBaseVNode("div", zr, [
                  m3.$slots["time-picker-overlay"] ? renderSlot(m3.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e2.hours,
                    minutes: e2.minutes,
                    seconds: e2.seconds,
                    setHours: le,
                    setMinutes: S3,
                    setSeconds: P
                  }) : createCommentVNode("", true),
                  m3.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", xr, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(V), (Q2, I2) => withDirectives((openBlock(), createBlock(Hr, mergeProps({ key: I2 }, {
                      ...m3.$props,
                      order: I2,
                      hours: Q2.hours,
                      minutes: Q2.minutes,
                      seconds: Q2.seconds,
                      closeTimePickerBtn: v.value,
                      disabled: I2 === 0 ? m3.fixedStart : m3.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: A,
                      "onUpdate:hours": (l) => le(ee(l, I2, "hours")),
                      "onUpdate:minutes": (l) => S3(ee(l, I2, "minutes")),
                      "onUpdate:seconds": (l) => P(ee(l, I2, "seconds")),
                      onMounted: X2,
                      onOverlayClosed: X2
                    }), createSlots({ _: 2 }, [
                      renderList(unref(z2), (l, i2) => ({
                        name: l,
                        fn: withCtx((r) => [
                          renderSlot(m3.$slots, l, normalizeProps(guardReactiveProps(r)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, I2 === 0 ? true : unref(Z)]
                    ])), 128))
                  ])),
                  m3.timePicker ? createCommentVNode("", true) : withDirectives((openBlock(), createElementBlock("div", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: v,
                    class: normalizeClass(unref(q2)),
                    role: "button",
                    "aria-label": (oe = unref(B2).ariaLabels) == null ? void 0 : oe.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      N[3] || (N[3] = withKeys((Q2) => Y2(false), ["enter"])),
                      N[4] || (N[4] = withKeys((Q2) => Y2(false), ["space"]))
                    ],
                    onClick: N[5] || (N[5] = (Q2) => Y2(false))
                  }, [
                    m3.$slots["calendar-icon"] ? renderSlot(m3.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    m3.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                  ], 42, Kr)), [
                    [vShow, !unref(R2)("time")]
                  ])
                ])
              ], 512)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Gr = (e2, n) => {
  const { isDisabled: a3, matchDate: t2, getWeekFromDate: s3 } = Ve(n), f = ref(null), h3 = ref(b2()), R2 = (r) => {
    !r.current && n.hideOffsetDates || (f.value = r.value);
  }, B2 = () => {
    f.value = null;
  }, T2 = (r) => Array.isArray(e2.value) && n.range && e2.value[0] && f.value ? r ? Oe(f.value, e2.value[0]) : Ce(f.value, e2.value[0]) : true, U = (r, c2) => {
    const D2 = () => e2.value ? c2 ? e2.value[0] || null : e2.value[1] : null, L2 = e2.value && Array.isArray(e2.value) ? D2() : null;
    return me(b2(r.value), L2);
  }, M3 = (r) => {
    const c2 = Array.isArray(e2.value) ? e2.value[0] : null;
    return r ? !Ce(f.value || null, c2) : true;
  }, v = (r, c2 = true) => (n.range || n.weekPicker) && Array.isArray(e2.value) ? n.hideOffsetDates && !r.current ? false : me(b2(r.value), e2.value[c2 ? 0 : 1]) : n.range ? U(r, c2) && M3(c2) || me(r.value, Array.isArray(e2.value) ? e2.value[0] : null) && T2(c2) : false, A = (r, c2, D2) => Array.isArray(e2.value) && e2.value[0] && e2.value.length === 1 ? r ? false : D2 ? Oe(e2.value[0], c2.value) : Ce(e2.value[0], c2.value) : false, J = (r) => !e2.value || n.hideOffsetDates && !r.current ? false : n.range ? n.modelAuto && Array.isArray(e2.value) ? me(r.value, e2.value[0] ? e2.value[0] : h3.value) : false : n.multiDates && Array.isArray(e2.value) ? e2.value.some((c2) => me(c2, r.value)) : me(r.value, e2.value ? e2.value : h3.value), Z = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (f.value) {
        if (n.hideOffsetDates && !r.current)
          return false;
        const c2 = addDays(f.value, +n.autoRange), D2 = s3(b2(f.value));
        return n.weekPicker ? me(D2[1], b2(r.value)) : me(c2, b2(r.value));
      }
      return false;
    }
    return false;
  }, H3 = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (f.value) {
        const c2 = addDays(f.value, +n.autoRange);
        if (n.hideOffsetDates && !r.current)
          return false;
        const D2 = s3(b2(f.value));
        return n.weekPicker ? Oe(r.value, D2[0]) && Ce(r.value, D2[1]) : Oe(r.value, f.value) && Ce(r.value, c2);
      }
      return false;
    }
    return false;
  }, C = (r) => {
    if (n.autoRange || n.weekPicker) {
      if (f.value) {
        if (n.hideOffsetDates && !r.current)
          return false;
        const c2 = s3(b2(f.value));
        return n.weekPicker ? me(c2[0], r.value) : me(f.value, r.value);
      }
      return false;
    }
    return false;
  }, V = (r) => Wn(e2.value, f.value, r.value), Y2 = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, q2 = () => n.modelAuto ? jn(n.internalModelValue) : true, z2 = (r) => {
    if (Array.isArray(e2.value) && e2.value.length || n.weekPicker)
      return false;
    const c2 = n.range ? !v(r) && !v(r, false) : true;
    return !a3(r.value) && !J(r) && !(!r.current && n.hideOffsetDates) && c2;
  }, ee = (r) => n.range ? n.modelAuto ? Y2() && J(r) : false : J(r), le = (r) => n.highlight ? t2(r.value, n.highlight) : false, S3 = (r) => a3(r.value) && n.highlightDisabledDays === false, P = (r) => n.highlightWeekDays && n.highlightWeekDays.includes(r.value.getDay()), X2 = (r) => (n.range || n.weekPicker) && (!(n.multiCalendars > 0) || r.current) && q2() && !(!r.current && n.hideOffsetDates) && !J(r) ? V(r) : false, m3 = (r) => {
    const { isRangeStart: c2, isRangeEnd: D2 } = oe(r), L2 = n.range ? c2 || D2 : false;
    return {
      dp__cell_offset: !r.current,
      dp__pointer: !n.disabled && !(!r.current && n.hideOffsetDates) && !a3(r.value),
      dp__cell_disabled: a3(r.value),
      dp__cell_highlight: !S3(r) && (le(r) || P(r)) && !ee(r) && !L2,
      dp__cell_highlight_active: !S3(r) && (le(r) || P(r)) && ee(r),
      dp__today: !n.noToday && me(r.value, h3.value) && r.current
    };
  }, N = (r) => ({
    dp__active_date: ee(r),
    dp__date_hover: z2(r)
  }), x2 = (r) => ({
    ...Q2(r),
    ...I2(r),
    dp__range_between_week: X2(r) && n.weekPicker
  }), oe = (r) => {
    const c2 = n.multiCalendars > 0 ? r.current && v(r) && q2() : v(r) && q2(), D2 = n.multiCalendars > 0 ? r.current && v(r, false) && q2() : v(r, false) && q2();
    return { isRangeStart: c2, isRangeEnd: D2 };
  }, Q2 = (r) => {
    const { isRangeStart: c2, isRangeEnd: D2 } = oe(r);
    return {
      dp__range_start: c2,
      dp__range_end: D2,
      dp__range_between: X2(r) && !n.weekPicker,
      dp__date_hover_start: A(z2(r), r, true),
      dp__date_hover_end: A(z2(r), r, false)
    };
  }, I2 = (r) => ({
    ...Q2(r),
    dp__cell_auto_range: H3(r),
    dp__cell_auto_range_start: C(r),
    dp__cell_auto_range_end: Z(r)
  }), l = (r) => n.range ? n.autoRange ? I2(r) : n.modelAuto ? { ...N(r), ...Q2(r) } : Q2(r) : n.weekPicker ? x2(r) : N(r);
  return {
    setHoverDate: R2,
    clearHoverDate: B2,
    getDayClassData: (r) => ({
      ...m3(r),
      ...l(r),
      [n.dayClass ? n.dayClass(r.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    })
  };
};
var Zr = ["id", "onKeydown"];
var Xr = {
  key: 0,
  class: "dp__sidebar_left"
};
var qr = {
  key: 1,
  class: "dp__preset_ranges"
};
var Jr = ["onClick"];
var Qr = {
  key: 2,
  class: "dp__sidebar_right"
};
var el = {
  key: 3,
  class: "dp__now_wrap"
};
var tl = defineComponent({
  __name: "DatepickerMenu",
  props: {
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    ...nt
  },
  emits: [
    "close-picker",
    "select-date",
    "auto-apply",
    "time-update",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "update:internal-model-value",
    "recalculate-position",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open"
  ],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, { setMenuFocused: s3, setShiftKey: f, control: h3 } = zn(), { getCalendarDays: R2, defaults: B2 } = Ve(t2), T2 = useSlots(), U = ref(null), M3 = reactive({
      timePicker: !!(!t2.enableTimePicker || t2.timePicker || t2.monthPicker),
      monthYearInput: !!t2.timePicker,
      calendar: false
    }), v = ref([]), A = ref([]), J = ref(null), Z = ref(null), H3 = ref(false), C = ref(0);
    onMounted(() => {
      H3.value = true;
      const o = $e(Z);
      if (o && !t2.textInput && !t2.inline && (s3(true), le()), o) {
        const k2 = (j) => {
          ["action-row", "time-picker", "month-year"].some(
            (de) => Object.keys(T2).includes(de)
          ) || j.preventDefault(), j.stopImmediatePropagation(), j.stopPropagation();
        };
        o.addEventListener("pointerdown", k2), o.addEventListener("mousedown", k2);
      }
    });
    const { arrowRight: V, arrowLeft: Y2, arrowDown: q2, arrowUp: z2 } = tt(), ee = (o) => {
      o || o === 0 ? A.value[o].triggerTransition(
        N.value(o),
        x2.value(o)
      ) : A.value.forEach(
        (k2, j) => k2.triggerTransition(N.value(j), x2.value(j))
      );
    }, le = () => {
      const o = $e(Z);
      o && o.focus({ preventScroll: true });
    }, S3 = () => {
      var o;
      (o = t2.flow) != null && o.length && C.value !== -1 && (C.value += 1, a3("flow-step", C.value), xt());
    }, P = () => {
      C.value = -1;
    }, {
      calendars: X2,
      modelValue: m3,
      month: N,
      year: x2,
      time: oe,
      updateTime: Q2,
      updateMonthYear: I2,
      selectDate: l,
      getWeekNum: i2,
      monthYearSelect: r,
      handleScroll: c2,
      handleArrow: D2,
      handleSwipe: L2,
      getMarker: O2,
      selectCurrentDate: g,
      presetDateRange: w2
    } = qa(t2, a3, S3, ee, C), { setHoverDate: y3, clearHoverDate: F, getDayClassData: ie } = Gr(m3, t2);
    watch(
      X2,
      () => {
        t2.openOnTop && setTimeout(() => {
          a3("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const Pe = it(T2, "calendar"), Ze = it(T2, "action"), re = it(T2, "timePicker"), Xe = it(T2, "monthYear"), ze = computed(() => t2.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), _e = computed(() => Ua(t2.yearRange, t2.reverseYears)), at = computed(() => Ha(t2.locale, t2.monthNameFormat)), te = computed(() => (o) => R2(N.value(o), x2.value(o))), ge = computed(
      () => B2.value.multiCalendars > 0 && t2.range ? [...Array(B2.value.multiCalendars).keys()] : [0]
    ), ye = computed(
      () => (o) => o === 1
    ), qe = computed(() => t2.monthPicker || t2.timePicker || t2.yearPicker), Be = computed(
      () => ({
        dp__flex_display: B2.value.multiCalendars > 0
      })
    ), Tt = computed(() => ({
      dp__instance_calendar: B2.value.multiCalendars > 0
    })), Lt = computed(() => ({
      dp__menu_disabled: t2.disabled,
      dp__menu_readonly: t2.readonly
    })), Ut = computed(
      () => (o) => At(te, o)
    ), Ht = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !t2.inline,
        dp__relative: t2.inline,
        [t2.menuClassName]: !!t2.menuClassName
      })
    ), At = (o, k2) => o.value(k2).map((j) => ({
      ...j,
      days: j.days.map((de) => (de.marker = O2(de), de.classData = ie(de), de))
    })), yt = (o) => {
      o.stopPropagation(), o.stopImmediatePropagation();
    }, Wt = () => {
      t2.escClose && a3("close-picker");
    }, zt = (o, k2 = false) => {
      l(o, k2), t2.spaceConfirm && a3("select-date");
    }, gt = (o) => {
      var k2;
      (k2 = t2.flow) != null && k2.length && (M3[o] = true, Object.keys(M3).filter((j) => !M3[j]).length || xt());
    }, Je = (o, k2, j, de, ...Ye) => {
      if (t2.flow[C.value] === o) {
        const G2 = de ? k2.value[0] : k2.value;
        G2 && G2[j](...Ye);
      }
    }, xt = () => {
      Je("month", v, "toggleMonthPicker", true, true), Je("year", v, "toggleYearPicker", true, true), Je("calendar", J, "toggleTimePicker", false, false, true), Je("time", J, "toggleTimePicker", false, true, true);
      const o = t2.flow[C.value];
      (o === "hours" || o === "minutes" || o === "seconds") && Je(o, J, "toggleTimePicker", false, true, true, o);
    }, ht = (o) => {
      if (t2.arrowNavigation) {
        if (o === "up")
          return z2();
        if (o === "down")
          return q2();
        if (o === "left")
          return Y2();
        if (o === "right")
          return V();
      } else
        o === "left" || o === "up" ? D2("left", 0, o === "up") : D2("right", 0, o === "down");
    }, vn = (o) => {
      f(o.shiftKey), !t2.disableMonthYearSelect && o.code === "Tab" && o.target.classList.contains("dp__menu") && h3.value.shiftKeyInMenu && (o.preventDefault(), o.stopImmediatePropagation(), a3("close-picker"));
    }, u2 = (o) => {
      v.value[0] && v.value[0].handleMonthYearChange(o);
    };
    return n({
      updateMonthYear: I2
    }), (o, k2) => {
      var j;
      return openBlock(), createBlock(Transition, {
        appear: "",
        name: (j = unref(B2).transitions) == null ? void 0 : j.menuAppear,
        mode: "out-in",
        css: !!o.transitions
      }, {
        default: withCtx(() => {
          var de, Ye;
          return [
            createBaseVNode("div", {
              id: o.uid ? `dp-menu-${o.uid}` : void 0,
              tabindex: "0",
              ref_key: "dpMenuRef",
              ref: Z,
              role: "dialog",
              class: normalizeClass(unref(Ht)),
              onMouseleave: k2[15] || (k2[15] = //@ts-ignore
              (...G2) => unref(F) && unref(F)(...G2)),
              onClick: yt,
              onKeydown: [
                withKeys(Wt, ["esc"]),
                k2[16] || (k2[16] = withKeys(withModifiers((G2) => ht("left"), ["prevent"]), ["left"])),
                k2[17] || (k2[17] = withKeys(withModifiers((G2) => ht("up"), ["prevent"]), ["up"])),
                k2[18] || (k2[18] = withKeys(withModifiers((G2) => ht("down"), ["prevent"]), ["down"])),
                k2[19] || (k2[19] = withKeys(withModifiers((G2) => ht("right"), ["prevent"]), ["right"])),
                vn
              ]
            }, [
              (o.disabled || o.readonly) && o.inline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(unref(Lt))
              }, null, 2)) : createCommentVNode("", true),
              !o.inline && !o.teleportCenter ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(unref(ze))
              }, null, 2)) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: normalizeClass({
                  dp__menu_content_wrapper: ((de = o.presetRanges) == null ? void 0 : de.length) || !!o.$slots["left-sidebar"] || !!o.$slots["right-sidebar"]
                })
              }, [
                o.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Xr, [
                  renderSlot(o.$slots, "left-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: u2 })))
                ])) : createCommentVNode("", true),
                (Ye = o.presetRanges) != null && Ye.length ? (openBlock(), createElementBlock("div", qr, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(o.presetRanges, (G2, xe) => (openBlock(), createElementBlock("div", {
                    key: xe,
                    style: normalizeStyle(G2.style || {}),
                    class: "dp__preset_range",
                    onClick: (ae) => unref(w2)(G2.range, !!G2.slot)
                  }, [
                    G2.slot ? renderSlot(o.$slots, G2.slot, {
                      key: 0,
                      presetDateRange: unref(w2),
                      label: G2.label,
                      range: G2.range
                    }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(G2.label), 1)
                    ], 64))
                  ], 12, Jr))), 128))
                ])) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: "dp__instance_calendar",
                  ref_key: "calendarWrapperRef",
                  ref: U,
                  role: "document"
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(unref(Be))
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(ge), (G2, xe) => (openBlock(), createElementBlock("div", {
                      key: G2,
                      class: normalizeClass(unref(Tt))
                    }, [
                      !o.disableMonthYearSelect && !o.timePicker ? (openBlock(), createBlock(Br, mergeProps({
                        key: 0,
                        ref_for: true,
                        ref: (ae) => {
                          ae && (v.value[xe] = ae);
                        },
                        months: unref(at),
                        years: unref(_e),
                        month: unref(N)(G2),
                        year: unref(x2)(G2),
                        instance: G2,
                        "internal-model-value": e2.internalModelValue
                      }, o.$props, {
                        onMount: k2[0] || (k2[0] = (ae) => gt("monthYearInput")),
                        onResetFlow: P,
                        onUpdateMonthYear: (ae) => unref(I2)(G2, ae),
                        onMonthYearSelect: unref(r),
                        onOverlayClosed: le
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Xe), (ae, Zn) => ({
                          name: ae,
                          fn: withCtx((Kt) => [
                            renderSlot(o.$slots, ae, normalizeProps(guardReactiveProps(Kt)))
                          ])
                        }))
                      ]), 1040, ["months", "years", "month", "year", "instance", "internal-model-value", "onUpdateMonthYear", "onMonthYearSelect"])) : createCommentVNode("", true),
                      createVNode(Dr, mergeProps({
                        ref_for: true,
                        ref: (ae) => {
                          ae && (A.value[xe] = ae);
                        },
                        "specific-mode": unref(qe),
                        "get-week-num": unref(i2),
                        instance: G2,
                        "mapped-dates": unref(Ut)(G2),
                        month: unref(N)(G2),
                        year: unref(x2)(G2)
                      }, o.$props, {
                        "flow-step": C.value,
                        "onUpdate:flowStep": k2[1] || (k2[1] = (ae) => C.value = ae),
                        onSelectDate: (ae) => unref(l)(ae, !unref(ye)(G2)),
                        onHandleSpace: (ae) => zt(ae, !unref(ye)(G2)),
                        onSetHoverDate: k2[2] || (k2[2] = (ae) => unref(y3)(ae)),
                        onHandleScroll: (ae) => unref(c2)(ae, G2),
                        onHandleSwipe: (ae) => unref(L2)(ae, G2),
                        onMount: k2[3] || (k2[3] = (ae) => gt("calendar")),
                        onResetFlow: P,
                        onTooltipOpen: k2[4] || (k2[4] = (ae) => o.$emit("tooltip-open", ae)),
                        onTooltipClose: k2[5] || (k2[5] = (ae) => o.$emit("tooltip-close", ae))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Pe), (ae, Zn) => ({
                          name: ae,
                          fn: withCtx((Kt) => [
                            renderSlot(o.$slots, ae, normalizeProps(guardReactiveProps({ ...Kt })))
                          ])
                        }))
                      ]), 1040, ["specific-mode", "get-week-num", "instance", "mapped-dates", "month", "year", "flow-step", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
                    ], 2))), 128))
                  ], 2),
                  createBaseVNode("div", null, [
                    o.$slots["time-picker"] ? renderSlot(o.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(oe), updateTime: unref(Q2) }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      o.enableTimePicker && !o.monthPicker && !o.weekPicker ? (openBlock(), createBlock(jr, mergeProps({
                        key: 0,
                        ref_key: "timePickerRef",
                        ref: J,
                        hours: unref(oe).hours,
                        minutes: unref(oe).minutes,
                        seconds: unref(oe).seconds,
                        "internal-model-value": e2.internalModelValue
                      }, o.$props, {
                        onMount: k2[6] || (k2[6] = (G2) => gt("timePicker")),
                        "onUpdate:hours": k2[7] || (k2[7] = (G2) => unref(Q2)(G2)),
                        "onUpdate:minutes": k2[8] || (k2[8] = (G2) => unref(Q2)(G2, false)),
                        "onUpdate:seconds": k2[9] || (k2[9] = (G2) => unref(Q2)(G2, false, true)),
                        onResetFlow: P,
                        onOverlayClosed: le,
                        onOverlayOpened: k2[10] || (k2[10] = (G2) => o.$emit("time-picker-open", G2))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(re), (G2, xe) => ({
                          name: G2,
                          fn: withCtx((ae) => [
                            renderSlot(o.$slots, G2, normalizeProps(guardReactiveProps(ae)))
                          ])
                        }))
                      ]), 1040, ["hours", "minutes", "seconds", "internal-model-value"])) : createCommentVNode("", true)
                    ], 64))
                  ])
                ], 512),
                o.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Qr, [
                  renderSlot(o.$slots, "right-sidebar", normalizeProps(guardReactiveProps({ handleMonthYearChange: u2 })))
                ])) : createCommentVNode("", true),
                o.showNowButton ? (openBlock(), createElementBlock("div", el, [
                  o.$slots["now-button"] ? renderSlot(o.$slots, "now-button", {
                    key: 0,
                    selectCurrentDate: unref(g)
                  }) : createCommentVNode("", true),
                  o.$slots["now-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
                    key: 1,
                    type: "button",
                    role: "button",
                    class: "dp__now_button",
                    onClick: k2[11] || (k2[11] = //@ts-ignore
                    (...G2) => unref(g) && unref(g)(...G2))
                  }, toDisplayString(o.nowButtonLabel), 1))
                ])) : createCommentVNode("", true)
              ], 2),
              !o.autoApply || o.keepActionRow ? (openBlock(), createBlock(mr, mergeProps({
                key: 2,
                "menu-mount": H3.value,
                "internal-model-value": e2.internalModelValue
              }, o.$props, {
                onClosePicker: k2[12] || (k2[12] = (G2) => o.$emit("close-picker")),
                onSelectDate: k2[13] || (k2[13] = (G2) => o.$emit("select-date")),
                onInvalidSelect: k2[14] || (k2[14] = (G2) => o.$emit("invalid-select"))
              }), createSlots({ _: 2 }, [
                renderList(unref(Ze), (G2, xe) => ({
                  name: G2,
                  fn: withCtx((ae) => [
                    renderSlot(o.$slots, G2, normalizeProps(guardReactiveProps({ ...ae })))
                  ])
                }))
              ]), 1040, ["menu-mount", "internal-model-value"])) : createCommentVNode("", true)
            ], 42, Zr)
          ];
        }),
        _: 3
      }, 8, ["name", "css"]);
    };
  }
});
var nl = typeof window < "u" ? window : void 0;
var nn = () => {
};
var al = (e2) => getCurrentScope() ? (onScopeDispose(e2), true) : false;
var rl = (e2, n, a3, t2) => {
  if (!e2)
    return nn;
  let s3 = nn;
  const f = watch(
    () => unref(e2),
    (R2) => {
      s3(), R2 && (R2.addEventListener(n, a3, t2), s3 = () => {
        R2.removeEventListener(n, a3, t2), s3 = nn;
      });
    },
    { immediate: true, flush: "post" }
  ), h3 = () => {
    f(), s3();
  };
  return al(h3), h3;
};
var ll = (e2, n, a3, t2 = {}) => {
  const { window: s3 = nl, event: f = "pointerdown" } = t2;
  return s3 ? rl(s3, f, (R2) => {
    const B2 = $e(e2), T2 = $e(n);
    !B2 || !T2 || B2 === R2.target || R2.composedPath().includes(B2) || R2.composedPath().includes(T2) || a3(R2);
  }, { passive: true }) : void 0;
};
var ol = defineComponent({
  __name: "VueDatePicker",
  props: {
    ...nt
  },
  emits: [
    "update:model-value",
    "text-submit",
    "closed",
    "cleared",
    "open",
    "focus",
    "blur",
    "internal-model-change",
    "recalculate-position",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open"
  ],
  setup(e2, { expose: n, emit: a3 }) {
    const t2 = e2, s3 = useSlots(), f = ref(false), h3 = toRef(t2, "modelValue"), R2 = toRef(t2, "timezone"), B2 = ref(null), T2 = ref(null), U = ref(false), M3 = ref(null), { setMenuFocused: v, setShiftKey: A } = zn(), { clearArrowNav: J } = tt(), { validateDate: Z, isValidTime: H3 } = Ve(t2);
    onMounted(() => {
      X2(t2.modelValue), t2.inline || (le(M3.value).addEventListener("scroll", l), window.addEventListener("resize", i2)), t2.inline && (f.value = true);
    }), onUnmounted(() => {
      if (!t2.inline) {
        const te = le(M3.value);
        te && te.removeEventListener("scroll", l), window.removeEventListener("resize", i2);
      }
    });
    const C = it(s3, "all", t2.presetRanges), V = it(s3, "input");
    watch(
      [h3, R2],
      () => {
        X2(h3.value);
      },
      { deep: true }
    );
    const { openOnTop: Y2, menuPosition: q2, setMenuPosition: z2, setInitialPosition: ee, getScrollableParent: le } = er(
      B2,
      T2,
      a3,
      t2
    ), {
      inputValue: S3,
      internalModelValue: P,
      parseExternalModelValue: X2,
      emitModelValue: m3,
      formatInputValue: N,
      checkBeforeEmit: x2
    } = Ja(a3, t2, U), oe = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t2.dark,
        dp__theme_light: !t2.dark,
        dp__flex_display: t2.inline,
        dp__flex_display_with_input: t2.inlineWithInput
      })
    ), Q2 = computed(() => t2.dark ? "dp__theme_dark" : "dp__theme_light"), I2 = computed(() => t2.teleport ? {
      to: typeof t2.teleport == "boolean" ? "body" : t2.teleport,
      disabled: t2.inline
    } : { class: "dp__outer_menu_wrap" }), l = () => {
      f.value && (t2.closeOnScroll ? F() : z2());
    }, i2 = () => {
      f.value && z2();
    }, r = () => {
      !t2.disabled && !t2.readonly && (ee(), f.value = true, nextTick().then(() => {
        z2(), f.value && a3("open");
      }), f.value || y3(), X2(t2.modelValue));
    }, c2 = () => {
      S3.value = "", y3(), a3("update:model-value", null), a3("cleared"), F();
    }, D2 = () => {
      const te = P.value;
      return !te || !Array.isArray(te) && Z(te) ? true : Array.isArray(te) ? te.length === 2 && Z(te[0]) && Z(te[1]) ? true : Z(te[0]) : false;
    }, L2 = () => {
      x2() && D2() ? (m3(), F()) : a3("invalid-select", P.value);
    }, O2 = (te) => {
      g(), m3(), t2.closeOnAutoApply && !te && F();
    }, g = () => {
      T2.value && t2.textInput && T2.value.setParsedDate(P.value);
    }, w2 = (te = false) => {
      t2.autoApply && H3(P.value) && D2() && (t2.range && Array.isArray(P.value) ? (t2.partialRange || P.value.length === 2) && O2(te) : O2(te));
    }, y3 = () => {
      t2.textInput || (P.value = null);
    }, F = () => {
      t2.inline || (f.value && (f.value = false, v(false), A(false), J(), a3("closed"), ee(), S3.value && X2(h3.value)), y3());
    }, ie = (te, ge) => {
      if (!te) {
        P.value = null;
        return;
      }
      P.value = te, ge && (L2(), a3("text-submit"));
    }, Pe = () => {
      t2.autoApply && H3(P.value) && m3(), g();
    }, Ze = () => f.value ? F() : r(), re = (te) => {
      P.value = te;
    }, Xe = () => {
      t2.textInput && (U.value = true, N()), a3("focus");
    }, ze = () => {
      t2.textInput && (U.value = false, X2(t2.modelValue)), a3("blur");
    }, _e = (te) => {
      B2.value && B2.value.updateMonthYear(0, {
        month: Cn(te.month),
        year: Cn(te.year)
      });
    }, at = (te) => {
      X2(te || t2.modelValue);
    };
    return ll(
      B2,
      T2,
      t2.onClickOutside ? () => t2.onClickOutside(D2) : F
    ), n({
      closeMenu: F,
      selectDate: L2,
      clearValue: c2,
      openMenu: r,
      onScroll: l,
      formatInputValue: N,
      // exposed for testing purposes
      updateInternalModelValue: re,
      // modify internal modelValue
      setMonthYear: _e,
      parseModel: at
    }), (te, ge) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(unref(oe)),
      ref_key: "pickerWrapperRef",
      ref: M3
    }, [
      createVNode(ir, mergeProps({
        ref_key: "inputRef",
        ref: T2,
        "is-menu-open": f.value,
        "input-value": unref(S3),
        "onUpdate:inputValue": ge[0] || (ge[0] = (ye) => isRef(S3) ? S3.value = ye : null)
      }, te.$props, {
        onClear: c2,
        onOpen: r,
        onSetInputDate: ie,
        onSetEmptyDate: unref(m3),
        onSelectDate: L2,
        onToggle: Ze,
        onClose: F,
        onFocus: Xe,
        onBlur: ze
      }), createSlots({ _: 2 }, [
        renderList(unref(V), (ye, qe) => ({
          name: ye,
          fn: withCtx((Be) => [
            renderSlot(te.$slots, ye, normalizeProps(guardReactiveProps(Be)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      f.value ? (openBlock(), createBlock(resolveDynamicComponent(te.teleport ? Teleport : "div"), normalizeProps(mergeProps({ key: 0 }, unref(I2))), {
        default: withCtx(() => [
          f.value ? (openBlock(), createBlock(tl, mergeProps({
            key: 0,
            ref_key: "dpMenuRef",
            ref: B2,
            class: unref(Q2),
            style: unref(q2),
            "open-on-top": unref(Y2)
          }, te.$props, {
            "internal-model-value": unref(P),
            "onUpdate:internalModelValue": ge[1] || (ge[1] = (ye) => isRef(P) ? P.value = ye : null),
            onClosePicker: F,
            onSelectDate: L2,
            onAutoApply: w2,
            onTimeUpdate: Pe,
            onFlowStep: ge[2] || (ge[2] = (ye) => te.$emit("flow-step", ye)),
            onUpdateMonthYear: ge[3] || (ge[3] = (ye) => te.$emit("update-month-year", ye)),
            onInvalidSelect: ge[4] || (ge[4] = (ye) => te.$emit("invalid-select", unref(P))),
            onInvalidFixedRange: ge[5] || (ge[5] = (ye) => te.$emit("invalid-fixed-range", ye)),
            onRecalculatePosition: unref(z2),
            onTooltipOpen: ge[6] || (ge[6] = (ye) => te.$emit("tooltip-open", ye)),
            onTooltipClose: ge[7] || (ge[7] = (ye) => te.$emit("tooltip-close", ye)),
            onTimePickerOpen: ge[8] || (ge[8] = (ye) => te.$emit("time-picker-open", ye))
          }), createSlots({ _: 2 }, [
            renderList(unref(C), (ye, qe) => ({
              name: ye,
              fn: withCtx((Be) => [
                renderSlot(te.$slots, ye, normalizeProps(guardReactiveProps({ ...Be })))
              ])
            }))
          ]), 1040, ["class", "style", "open-on-top", "internal-model-value", "onRecalculatePosition"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true)
    ], 2));
  }
});
var Gn = (() => {
  const e2 = ol;
  return e2.install = (n) => {
    n.component("Vue3DatePicker", e2);
  }, e2;
})();
var sl = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Gn
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(sl).forEach(([e2, n]) => {
  e2 !== "default" && (Gn[e2] = n);
});
export {
  Gn as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
