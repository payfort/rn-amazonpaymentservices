"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const checkColorOrDefault = (defaultColor, hexColor) => {
  const reg = /^#[0-9A-F]{6}$/i;
  return hexColor && reg.test(hexColor) ? hexColor : defaultColor;
};
var _default = exports.default = checkColorOrDefault;
//# sourceMappingURL=checkColorOrDefault.js.map