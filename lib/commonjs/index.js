"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeviceId = exports.StandardCheckout = exports.DirectPayButton = exports.CustomCheckoutView = exports.ApplePay = void 0;
var _CustomCheckoutViewManager = _interopRequireDefault(require("./views/CustomCheckoutViewManager"));
var _DirectPayManager = _interopRequireDefault(require("./views/DirectPayManager"));
var _getDeviceId = require("./services/getDeviceId");
var _StandardCheckoutViewManager = _interopRequireDefault(require("./views/StandardCheckoutViewManager"));
var _ApplePayModule = _interopRequireDefault(require("./nativeModules/ApplePayModule"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CustomCheckoutView = props => {
  return (0, _CustomCheckoutViewManager.default)(props);
};
exports.CustomCheckoutView = CustomCheckoutView;
const StandardCheckout = props => {
  return (0, _StandardCheckoutViewManager.default)(props);
};
exports.StandardCheckout = StandardCheckout;
const DirectPayButton = props => {
  return (0, _DirectPayManager.default)(props);
};
exports.DirectPayButton = DirectPayButton;
const getDeviceId = exports.getDeviceId = _getDeviceId.getSDKDeviceId;
const ApplePay = exports.ApplePay = {
  isAvailable: async () => {
    if (_reactNative.Platform.OS !== 'ios') {
      console.log('Apple Pay is not available on this platform.');
      return false;
    }
    try {
      const isAvailable = await _ApplePayModule.default.isApplePayAvailable();
      console.log('Apple Pay supported:', isAvailable);
      return isAvailable;
    } catch (error) {
      console.log('Error checking Apple Pay support:', error);
      return false;
    }
  },
  startPayment: async paymentDetails => {
    try {
      const result = await _ApplePayModule.default.startPayment(paymentDetails);
      return result;
    } catch (error) {
      throw error;
    }
  }
};
//# sourceMappingURL=index.js.map