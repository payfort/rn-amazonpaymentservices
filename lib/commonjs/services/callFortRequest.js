"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callFortRequest = callFortRequest;
var _nativeResponseSelector = _interopRequireDefault(require("../utils/nativeResponseSelector"));
var _RnAmazonPaymentServiceSdk = _interopRequireDefault(require("../nativeModules/RnAmazonPaymentServiceSdk"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function callFortRequest(onSuccess, onFailure, onCancel, requestObject, environment, requestCode, showLoading, showResponsePage) {
  const returnSuccessParsed = response => {
    const responseObject = (0, _nativeResponseSelector.default)(response);
    console.log(responseObject, 'on Success response object');
    onSuccess(responseObject);
  };
  const returnFailureOrCancel = response => {
    const responseObject = (0, _nativeResponseSelector.default)(response);
    if ((responseObject === null || responseObject === void 0 ? void 0 : responseObject.response_code) === '00072') {
      onCancel(responseObject);
    } else {
      onFailure(responseObject);
    }
  };
  console.log(requestObject, 'request object from package');
  _RnAmazonPaymentServiceSdk.default.callFortRequest(requestObject, environment, Number(requestCode), showLoading, showResponsePage, returnSuccessParsed, returnFailureOrCancel);
  try {} catch (e) {
    console.log(e, 'error from package');
    // @ts-ignore
    throw new Error(e);
  }
}
//# sourceMappingURL=callFortRequest.js.map