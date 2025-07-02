import adjustedDefaultOrValue from './adjustedDefaultOrValue';
import { BUTTON_BORDER_COLOR, BUTTON_BORDER_RADIUS, BUTTON_BORDER_WIDTH, BUTTON_COLOR, BUTTON_HEIGHT, BUTTON_MARGIN_LEFT, BUTTON_MARGIN_TOP, BUTTON_TEXT, BUTTON_TEXT_COLOR, BUTTON_TEXT_FONT, BUTTON_TEXT_SIZE, BUTTON_WIDTH } from '../constants/buttonConstants';
import defaultOrValue from './defaultOrValue';
import checkColorOrDefault from './checkColorOrDefault';
import { Platform } from 'react-native';
const isIOS = Platform.OS === 'ios';
const payButtonSelector = payButtonProps => {
  const iosButtonProps = {
    marginLeft: defaultOrValue(BUTTON_MARGIN_LEFT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.marginLeft),
    marginTop: defaultOrValue(BUTTON_MARGIN_TOP, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.marginTop),
    backgroundColor: checkColorOrDefault(BUTTON_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.backgroundColor),
    text: defaultOrValue(BUTTON_TEXT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.text),
    textSize: defaultOrValue(BUTTON_TEXT_SIZE, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textSize),
    textColor: checkColorOrDefault(BUTTON_TEXT_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textColor),
    buttonWidth: defaultOrValue(BUTTON_WIDTH, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.buttonWidth),
    buttonHeight: defaultOrValue(BUTTON_HEIGHT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.buttonHeight),
    borderRadius: defaultOrValue(BUTTON_BORDER_RADIUS, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderRadius),
    borderWidth: defaultOrValue(BUTTON_BORDER_WIDTH, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderWidth),
    borderColor: checkColorOrDefault(BUTTON_BORDER_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderColor)
  };
  const androidPayButton = {
    ...payButtonProps,
    marginLeft: adjustedDefaultOrValue(BUTTON_MARGIN_LEFT, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.marginLeft)),
    marginTop: adjustedDefaultOrValue(BUTTON_MARGIN_TOP, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.marginTop)),
    buttonWidth: adjustedDefaultOrValue(BUTTON_WIDTH, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.buttonWidth), true),
    buttonHeight: adjustedDefaultOrValue(BUTTON_HEIGHT, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.buttonHeight), true),
    text: defaultOrValue(BUTTON_TEXT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.text),
    textSize: defaultOrValue(BUTTON_TEXT_SIZE, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textSize)),
    backgroundColor: checkColorOrDefault(BUTTON_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.backgroundColor),
    textColor: checkColorOrDefault(BUTTON_TEXT_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textColor),
    borderWidth: adjustedDefaultOrValue(BUTTON_BORDER_WIDTH, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderWidth), false),
    borderRadius: adjustedDefaultOrValue(BUTTON_BORDER_RADIUS, Number(payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderRadius), false),
    borderColor: checkColorOrDefault(BUTTON_BORDER_COLOR, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.borderColor),
    textFontFamily: defaultOrValue(BUTTON_TEXT_FONT, payButtonProps === null || payButtonProps === void 0 ? void 0 : payButtonProps.textFontFamily)
  };
  return isIOS ? iosButtonProps : androidPayButton;
};
export default payButtonSelector;
//# sourceMappingURL=payButtonSelector.js.map