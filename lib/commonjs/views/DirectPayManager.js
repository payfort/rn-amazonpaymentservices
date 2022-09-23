"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _RnAmazonPaymentServiceSdk = _interopRequireDefault(require("../nativeModules/RnAmazonPaymentServiceSdk"));

var _nativeResponseSelector = _interopRequireDefault(require("../utils/nativeResponseSelector"));

var _payButtonSelector = _interopRequireDefault(require("../utils/payButtonSelector"));

var _styleDefaults = require("../constants/styleDefaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

  const createFragment = viewId => _reactNative.UIManager.dispatchViewManagerCommand(viewId, // we are calling the 'create' command
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

  const ref = (0, React.useRef)(null);
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
  const propsAdjustedAndroid = { ...props,
    ...styleAndroid
  };
  const propsAdjustedIOS = { ...props,
    payButtonProps,
    onSuccess: returnSuccessParsed,
    onFailure: returnFailureParsed
  };
  (0, React.useEffect)(() => {
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

var _default = DirectPayManager;
exports.default = _default;
//# sourceMappingURL=DirectPayManager.js.map