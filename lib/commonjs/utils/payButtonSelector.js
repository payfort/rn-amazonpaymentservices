"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _adjustedDefaultOrValue = _interopRequireDefault(require("./adjustedDefaultOrValue"));

var _buttonConstants = require("../constants/buttonConstants");

var _defaultOrValue = _interopRequireDefault(require("./defaultOrValue"));

var _checkColorOrDefault = _interopRequireDefault(require("./checkColorOrDefault"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isIOS = _reactNative.Platform.OS === 'ios';

const payButtonSelector = payButtonProps => {
  const iosButtonProps = {
    marginLeft: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_MARGIN_LEFT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.marginLeft),
    marginTop: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_MARGIN_TOP, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.marginTop),
    backgroundColor: (0, _checkColorOrDefault.default)(_buttonConstants.BUTTON_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.backgroundColor),
    text: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_TEXT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.text),
    textSize: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_TEXT_SIZE, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textSize),
    textColor: (0, _checkColorOrDefault.default)(_buttonConstants.BUTTON_TEXT_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textColor),
    buttonWidth: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_WIDTH, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.buttonWidth),
    buttonHeight: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_HEIGHT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.buttonHeight),
    borderRadius: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_BORDER_RADIUS, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderRadius),
    borderWidth: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_BORDER_WIDTH, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderWidth),
    borderColor: (0, _checkColorOrDefault.default)(_buttonConstants.BUTTON_BORDER_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderColor)
  };
  const androidPayButton = { ...payButtonProps,
    marginLeft: (0, _adjustedDefaultOrValue.default)(_buttonConstants.BUTTON_MARGIN_LEFT, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.marginLeft)),
    marginTop: (0, _adjustedDefaultOrValue.default)(_buttonConstants.BUTTON_MARGIN_TOP, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.marginTop)),
    buttonWidth: (0, _adjustedDefaultOrValue.default)(_buttonConstants.BUTTON_WIDTH, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.buttonWidth), true),
    buttonHeight: (0, _adjustedDefaultOrValue.default)(_buttonConstants.BUTTON_HEIGHT, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.buttonHeight), true),
    text: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_TEXT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.text),
    textSize: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_TEXT_SIZE, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textSize)),
    backgroundColor: (0, _checkColorOrDefault.default)(_buttonConstants.BUTTON_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.backgroundColor),
    textColor: (0, _checkColorOrDefault.default)(_buttonConstants.BUTTON_TEXT_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textColor),
    borderWidth: (0, _adjustedDefaultOrValue.default)(_buttonConstants.BUTTON_BORDER_WIDTH, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderWidth), false),
    borderRadius: (0, _adjustedDefaultOrValue.default)(_buttonConstants.BUTTON_BORDER_RADIUS, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderRadius), false),
    borderColor: (0, _checkColorOrDefault.default)(_buttonConstants.BUTTON_BORDER_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderColor),
    textFontFamily: (0, _defaultOrValue.default)(_buttonConstants.BUTTON_TEXT_FONT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textFontFamily)
  };
  return isIOS ? iosButtonProps : androidPayButton;
};

var _default = payButtonSelector;
exports.default = _default;
//# sourceMappingURL=payButtonSelector.js.map