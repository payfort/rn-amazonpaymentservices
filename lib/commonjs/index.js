"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeviceId = exports.StandardCheckout = exports.DirectPayButton = exports.CustomCheckoutView = void 0;

var _CustomCheckoutViewManager = _interopRequireDefault(require("./views/CustomCheckoutViewManager"));

var _DirectPayManager = _interopRequireDefault(require("./views/DirectPayManager"));

var _getDeviceId = require("./services/getDeviceId");

var _StandardCheckoutViewManager = _interopRequireDefault(require("./views/StandardCheckoutViewManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const getDeviceId = _getDeviceId.getSDKDeviceId;
exports.getDeviceId = getDeviceId;
//# sourceMappingURL=index.js.map