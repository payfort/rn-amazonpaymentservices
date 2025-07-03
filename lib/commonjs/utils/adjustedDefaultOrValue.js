"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const adjustedDefaultOrValue = (defaultValue, value, withMultiplier) => {
  const adjustment = withMultiplier ? 1.7 : 1;
  return value ? _reactNative.PixelRatio.getPixelSizeForLayoutSize(value) * adjustment : _reactNative.PixelRatio.getPixelSizeForLayoutSize(defaultValue) * adjustment;
};
var _default = exports.default = adjustedDefaultOrValue;
//# sourceMappingURL=adjustedDefaultOrValue.js.map