"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _reactNative = require("react-native");
var _RnAmazonPaymentServiceSdk = _interopRequireDefault(require("../nativeModules/RnAmazonPaymentServiceSdk"));
var _nativeResponseSelector = _interopRequireDefault(require("../utils/nativeResponseSelector"));
var _payButtonSelector = _interopRequireDefault(require("../utils/payButtonSelector"));
var _styleDefaults = require("../constants/styleDefaults");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ViewManager = (0, _reactNative.requireNativeComponent)('DirectPay');
const DirectPayManager = props => {
  const {
    onFailure = () => {},
    onSuccess = () => {},
    requestObject,
    environment = 'TEST'
  } = props;
  const DEFAULT_STYLE = {
    width: _styleDefaults.DIRECT_PAY_VIEW_WIDTH,
    height: _styleDefaults.DIRECT_PAY_VIEW_HEIGHT
  };
  const defaultStyle = props.style ? props.style : DEFAULT_STYLE;
  const propsDone = requestObject;
  const isIOS = _reactNative.Platform.OS === 'ios';
  const createFragment = viewId => _reactNative.UIManager.dispatchViewManagerCommand(viewId,
  // we are calling the 'create' command
  // @ts-ignore
  _reactNative.UIManager.DirectPay.Commands.create.toString(), [viewId]);
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
  const ref = (0, _react.useRef)(null);
  const payButtonProps = (0, _payButtonSelector.default)(props.payButtonProps);
  const setUpScreen = () => {
    const viewId = (0, _reactNative.findNodeHandle)(ref.current);
    createFragment(viewId);
    _RnAmazonPaymentServiceSdk.default.callDirectPayFortRequest(requestObject, payButtonProps, environment, returnSuccessParsed, returnFailureParsed);
  };
  const styleAndroid = {
    style: {
      // @ts-ignore
      height: _reactNative.PixelRatio.getPixelSizeForLayoutSize(defaultStyle === null || defaultStyle === void 0 ? void 0 : defaultStyle.height),
      // @ts-ignore
      width: _reactNative.PixelRatio.getPixelSizeForLayoutSize(defaultStyle === null || defaultStyle === void 0 ? void 0 : defaultStyle.width)
    }
  };
  const propsAdjustedAndroid = {
    ...props,
    ...styleAndroid
  };
  const propsAdjustedIOS = {
    ...props,
    payButtonProps,
    onSuccess: returnSuccessParsed,
    onFailure: returnFailureParsed
  };
  (0, _react.useEffect)(() => {
    !isIOS && propsDone && setTimeout(() => setUpScreen(), 200);
  }, [propsDone]);
  return (
    /*#__PURE__*/
    // @ts-ignore
    React.createElement(_reactNative.ScrollView, {
      style: defaultStyle,
      scrollEnabled: false,
      showsVerticalScrollIndicator: false
    }, propsDone ? /*#__PURE__*/React.createElement(ViewManager, _extends({}, isIOS ? propsAdjustedIOS : propsAdjustedAndroid, {
      ref: ref
    })) :
    /*#__PURE__*/
    // @ts-ignore
    React.createElement(_reactNative.Text, null, "Request object missing"))
  );
};
var _default = exports.default = DirectPayManager;
//# sourceMappingURL=DirectPayManager.js.map