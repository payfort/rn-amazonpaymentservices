function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { findNodeHandle, PixelRatio, Platform, requireNativeComponent, ScrollView, UIManager, Text } from 'react-native';
import { useEffect, useRef } from 'react';
import RnAmazonPaymentServiceSdk from '../nativeModules/RnAmazonPaymentServiceSdk';
import nativeResponseSelector from '../utils/nativeResponseSelector';
import payButtonSelector from '../utils/payButtonSelector';
import { DIRECT_PAY_VIEW_HEIGHT, DIRECT_PAY_VIEW_WIDTH } from '../constants/styleDefaults';
const ViewManager = requireNativeComponent('DirectPay');

const DirectPayManager = props => {
  const {
    onFailure = () => {},
    onSuccess = () => {},
    requestObject,
    environment = 'TEST'
  } = props;
  const DEFAULT_STYLE = {
    width: DIRECT_PAY_VIEW_WIDTH,
    height: DIRECT_PAY_VIEW_HEIGHT
  };
  const defaultStyle = props.style ? props.style : DEFAULT_STYLE;
  const propsDone = requestObject;
  const isIOS = Platform.OS === 'ios';

  const createFragment = viewId => UIManager.dispatchViewManagerCommand(viewId, // we are calling the 'create' command
  // @ts-ignore
  UIManager.DirectPay.Commands.create.toString(), [viewId]);

  const returnSuccessParsed = response => {
    const responseObject = nativeResponseSelector(response);

    if (onSuccess) {
      onSuccess(responseObject);
    }
  };

  const returnFailureParsed = response => {
    const responseObject = nativeResponseSelector(response);

    if (onFailure) {
      onFailure(responseObject);
    }
  };

  const ref = useRef(null);
  const payButtonProps = payButtonSelector(props.payButtonProps);

  const setUpScreen = () => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
    RnAmazonPaymentServiceSdk.callDirectPayFortRequest(requestObject, payButtonProps, environment, returnSuccessParsed, returnFailureParsed);
  };

  const styleAndroid = {
    style: {
      // @ts-ignore
      height: PixelRatio.getPixelSizeForLayoutSize(defaultStyle === null || defaultStyle === void 0 ? void 0 : defaultStyle.height),
      // @ts-ignore
      width: PixelRatio.getPixelSizeForLayoutSize(defaultStyle === null || defaultStyle === void 0 ? void 0 : defaultStyle.width)
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
  useEffect(() => {
    !isIOS && propsDone && setTimeout(() => setUpScreen(), 200);
  }, [propsDone]);
  return (
    /*#__PURE__*/
    // @ts-ignore
    React.createElement(ScrollView, {
      style: defaultStyle,
      scrollEnabled: false,
      showsVerticalScrollIndicator: false
    }, propsDone ? /*#__PURE__*/React.createElement(ViewManager, _extends({}, isIOS ? propsAdjustedIOS : propsAdjustedAndroid, {
      ref: ref
    })) :
    /*#__PURE__*/
    // @ts-ignore
    React.createElement(Text, null, "Request object missing"))
  );
};

export default DirectPayManager;
//# sourceMappingURL=DirectPayManager.js.map