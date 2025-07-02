"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSDKDeviceId = getSDKDeviceId;
var _RnAmazonPaymentServiceSdk = _interopRequireDefault(require("../nativeModules/RnAmazonPaymentServiceSdk"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const DEVICE_ID_ERROR = `Something went wrong while getting device id`;
async function getSDKDeviceId() {
  try {
    return _RnAmazonPaymentServiceSdk.default.getDeviceID();
  } catch (e) {
    throw new Error(DEVICE_ID_ERROR);
  }
}
//# sourceMappingURL=getDeviceId.js.map