import * as React from 'react';
import { Platform, requireNativeComponent, Text } from 'react-native';
import { useEffect } from 'react';
import { callFortRequest } from '../services/callFortRequest';
import nativeResponseSelector from '../utils/nativeResponseSelector';
const ViewManager = requireNativeComponent('StandardCheckout');
const StandardCheckoutViewManager = props => {
  const isIOS = Platform.OS === 'ios';
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
  useEffect(() => {
    if (showStandardCheckoutPage && !isIOS && requestObject) {
      try {
        callFortRequest(onSuccess, onFailure, onCancel, requestObject, environment, requestCode, showLoading, showResponsePage);
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
  React.createElement(Text, null, "Request object missing");
};
export default StandardCheckoutViewManager;
//# sourceMappingURL=StandardCheckoutViewManager.js.map