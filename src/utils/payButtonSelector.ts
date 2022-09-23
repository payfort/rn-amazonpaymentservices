import adjustedDefaultOrValue from './adjustedDefaultOrValue';
import {
  BUTTON_BORDER_COLOR,
  BUTTON_BORDER_RADIUS,
  BUTTON_BORDER_WIDTH,
  BUTTON_COLOR,
  BUTTON_HEIGHT,
  BUTTON_MARGIN_LEFT,
  BUTTON_MARGIN_TOP,
  BUTTON_TEXT,
  BUTTON_TEXT_COLOR,
  BUTTON_TEXT_FONT,
  BUTTON_TEXT_SIZE,
  BUTTON_WIDTH,
} from '../constants/buttonConstants';
import defaultOrValue from './defaultOrValue';
import checkColorOrDefault from './checkColorOrDefault';
import type { payButtonPropTypes } from '../types/viewProps';
import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

const payButtonSelector = (payButtonProps: payButtonPropTypes) => {
  const iosButtonProps = {
    marginLeft: defaultOrValue(
      BUTTON_MARGIN_LEFT,
      payButtonProps?.marginLeft
    ),
    marginTop: defaultOrValue(
      BUTTON_MARGIN_TOP,
      payButtonProps?.marginTop
    ),
    backgroundColor: checkColorOrDefault(
      BUTTON_COLOR,
      payButtonProps?.backgroundColor
    ),
    text: defaultOrValue(BUTTON_TEXT, payButtonProps?.text),
    textSize: defaultOrValue(BUTTON_TEXT_SIZE, payButtonProps?.textSize),
    textColor: checkColorOrDefault(
      BUTTON_TEXT_COLOR,
      payButtonProps?.textColor
    ),
    buttonWidth: defaultOrValue(BUTTON_WIDTH, payButtonProps?.buttonWidth),
    buttonHeight: defaultOrValue(BUTTON_HEIGHT, payButtonProps?.buttonHeight),
    borderRadius: defaultOrValue(
      BUTTON_BORDER_RADIUS,
      payButtonProps?.borderRadius
    ),
    borderWidth: defaultOrValue(
      BUTTON_BORDER_WIDTH,
      payButtonProps?.borderWidth
    ),
    borderColor: checkColorOrDefault(
      BUTTON_BORDER_COLOR,
      payButtonProps?.borderColor
    ),
  };

  const androidPayButton = {
    ...payButtonProps,
    marginLeft: adjustedDefaultOrValue(
      BUTTON_MARGIN_LEFT,
      Number(payButtonProps?.marginLeft)
    ),
    marginTop: adjustedDefaultOrValue(
      BUTTON_MARGIN_TOP,
      Number(payButtonProps?.marginTop)
    ),
    buttonWidth: adjustedDefaultOrValue(
      BUTTON_WIDTH,
      Number(payButtonProps?.buttonWidth),
      true
    ),
    buttonHeight: adjustedDefaultOrValue(
      BUTTON_HEIGHT,
      Number(payButtonProps?.buttonHeight),
      true
    ),
    text: defaultOrValue(BUTTON_TEXT, payButtonProps?.text),
    textSize: defaultOrValue(
      BUTTON_TEXT_SIZE,
      Number(payButtonProps?.textSize)
    ),
    backgroundColor: checkColorOrDefault(
      BUTTON_COLOR,
      payButtonProps?.backgroundColor
    ),
    textColor: checkColorOrDefault(
      BUTTON_TEXT_COLOR,
      payButtonProps?.textColor
    ),
    borderWidth: adjustedDefaultOrValue(
      BUTTON_BORDER_WIDTH,
      Number(payButtonProps?.borderWidth),
      false
    ),
    borderRadius: adjustedDefaultOrValue(
      BUTTON_BORDER_RADIUS,
      Number(payButtonProps?.borderRadius),
      false
    ),
    borderColor: checkColorOrDefault(
      BUTTON_BORDER_COLOR,
      payButtonProps?.borderColor
    ),
    textFontFamily: defaultOrValue(
      BUTTON_TEXT_FONT,
      payButtonProps?.textFontFamily
    ),
  };

  return isIOS ? iosButtonProps : androidPayButton;
};

export default payButtonSelector;
