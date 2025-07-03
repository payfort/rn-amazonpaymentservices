"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const nativeResponseSelector = response => {
  let result;
  try {
    if (_reactNative.Platform.OS === 'ios') {
      var _response$nativeEvent;
      result = response === null || response === void 0 || (_response$nativeEvent = response.nativeEvent) === null || _response$nativeEvent === void 0 ? void 0 : _response$nativeEvent.response;
    } else {
      result = JSON.parse(response);
    }
  } catch (e) {
    result = null;
  }
  return result;
};
var _default = exports.default = nativeResponseSelector;
//# sourceMappingURL=nativeResponseSelector.js.map