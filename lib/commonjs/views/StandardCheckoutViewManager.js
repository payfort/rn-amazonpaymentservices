"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _reactNative = require("react-native");
var _callFortRequest = require("../services/callFortRequest");
var _nativeResponseSelector = _interopRequireDefault(require("../utils/nativeResponseSelector"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ViewManager = (0, _reactNative.requireNativeComponent)('StandardCheckout');
const StandardCheckoutViewManager = props => {
  const isIOS = _reactNative.Platform.OS === 'ios';
  const {
    showStandardCheckoutPage,
    onSuccess = () => {},
    onFailure = () => {},
    onCancel = () => {},
    requestObject,
    environment = 'TEST',
    requestCode = 0,
    showLoading = true,
    showResponsePage = true
  } = props;
  const propsDone = requestObject && environment;
  const returnSuccessParsed = response => {
    const responseObject = (0, _nativeResponseSelector.default)(response);
    if (onSuccess) {
      onSuccess(responseObject);
    }
  };
  const returnFailureParsed = response => {
    const responseObject = (0, _nativeResponseSelector.default)(response);
    if (onFailure) {
      onFailure(responseObject);
    }
  };
  (0, _react.useEffect)(() => {
    if (showStandardCheckoutPage && !isIOS && requestObject) {
      try {
        (0, _callFortRequest.callFortRequest)(onSuccess, onFailure, onCancel, requestObject, environment, requestCode, showLoading, showResponsePage);
      } catch (e) {
        throw new Error('Error while calling fort request');
      }
    }
    // eslint-disable-next-line
  }, [showStandardCheckoutPage]);
  const propsAdjustedIOS = {
    ...props,
    showLoading: showLoading ? 1 : 0,
    showResponsePage: showResponsePage ? 1 : 0,
    onSuccess: returnSuccessParsed,
    onFailure: returnFailureParsed
  };
  return propsDone ? showStandardCheckoutPage && isIOS ? /*#__PURE__*/React.createElement(ViewManager, propsAdjustedIOS) : null :
  /*#__PURE__*/
  // @ts-ignore
  React.createElement(_reactNative.Text, null, "Request object missing");
};
var _default = exports.default = StandardCheckoutViewManager;
//# sourceMappingURL=StandardCheckoutViewManager.js.map