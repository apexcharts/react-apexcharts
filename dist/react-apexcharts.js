"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Charts;
var _apexcharts = _interopRequireDefault(require("apexcharts"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _excluded = ["type", "width", "height", "series", "options"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function omit(obj, keysToRemove) {
  var newObj = _objectSpread({}, obj);
  keysToRemove.forEach(function (key) {
    delete newObj[key];
  });
  return newObj;
}
function Charts(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? "line" : _ref$type,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "100%" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "auto" : _ref$height,
    series = _ref.series,
    options = _ref.options,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var chartRef = (0, _react.useRef)(null);
  var chart = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var current = chartRef.current;
    chart.current = new _apexcharts["default"](current, getConfig());
    chart.current.render();
    return function () {
      if (chart.current && typeof chart.current.destroy === "function") {
        chart.current.destroy();
      }
    };
  }, []);
  (0, _react.useEffect)(function () {
    var prevOptions = JSON.stringify(chart.current.options);
    var prevSeries = JSON.stringify(chart.current.series);
    var currentOptions = JSON.stringify(options);
    var currentSeries = JSON.stringify(series);
    if (prevOptions !== currentOptions || prevSeries !== currentSeries || height !== chart.current.height || width !== chart.current.width) {
      if (prevSeries === currentSeries) {
        chart.current.updateOptions(getConfig());
      } else {
        chart.current.updateSeries(series);
      }
    }
  }, [options, series, height, width]);
  var getConfig = function getConfig() {
    var newOptions = {
      chart: {
        type: type,
        height: height,
        width: width
      },
      series: series
    };
    return _extend(options, newOptions);
  };
  var isObject = function isObject(item) {
    return item && _typeof(item) === "object" && !Array.isArray(item);
  };
  var _extend = function extend(target, source) {
    var output = _objectSpread({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(function (key) {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, _defineProperty({}, key, source[key]));
          } else {
            output[key] = _extend(target[key], source[key]);
          }
        } else {
          Object.assign(output, _defineProperty({}, key, source[key]));
        }
      });
    }
    return output;
  };
  var rest = omit(restProps, Object.keys(Charts.propTypes));
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: chartRef
  }, rest));
}
Charts.propTypes = {
  type: _propTypes["default"].string.isRequired,
  series: _propTypes["default"].array.isRequired,
  options: _propTypes["default"].object.isRequired,
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
};