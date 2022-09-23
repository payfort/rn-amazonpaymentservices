"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _callFortRequest = require("../services/callFortRequest");

var _nativeResponseSelector = _interopRequireDefault(require("../utils/nativeResponseSelector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

  (0, React.useEffect)(() => {
    if (showStandardCheckoutPage && !isIOS && requestObject) {
      try {
        (0, _callFortRequest.callFortRequest)(onSuccess, onFailure, onCancel, requestObject, environment, requestCode, showLoading, showResponsePage);
      } catch (e) {
        throw new Error('Error while calling fort request');
      }
    } // eslint-disable-next-line

  }, [showStandardCheckoutPage]);
  const propsAdjustedIOS = { ...props,
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

var _default = StandardCheckoutViewManager;
exports.default = _default;
//# sourceMappingURL=StandardCheckoutViewManager.js.map