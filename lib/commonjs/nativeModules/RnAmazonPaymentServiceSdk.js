"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LINKING_ERROR = void 0;

var _reactNative = require("react-native");

const LINKING_ERROR = `The package 'rn-amazon-payment-services' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
exports.LINKING_ERROR = LINKING_ERROR;
const RnAmazonPaymentServiceSdk = _reactNative.NativeModules.RnAmazonPaymentServiceSdk ? _reactNative.NativeModules.RnAmazonPaymentServiceSdk : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
var _default = RnAmazonPaymentServiceSdk;
exports.default = _default;
//# sourceMappingURL=RnAmazonPaymentServiceSdk.js.map