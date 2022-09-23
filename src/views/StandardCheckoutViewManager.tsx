import * as React from 'react';
import { Platform, requireNativeComponent, Text } from 'react-native';
import { useEffect } from 'react';
import { callFortRequest } from '../services/callFortRequest';
import nativeResponseSelector from '../utils/nativeResponseSelector';
import type { standardCheckoutViewProps } from '../types/viewProps';

const ViewManager = requireNativeComponent('StandardCheckout');

const StandardCheckoutViewManager: React.FC<standardCheckoutViewProps> = (
  props
) => {
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
    showResponsePage = true,
  } = props;

  const propsDone = requestObject && environment;

  const returnSuccessParsed = (response: any) => {
    const responseObject = nativeResponseSelector(response);
    if (onSuccess) {
      onSuccess(responseObject);
    }
  };

  const returnFailureParsed = (response: any) => {
    const responseObject = nativeResponseSelector(response);
    if (onFailure) {
      onFailure(responseObject);
    }
  };

  useEffect(() => {
    if (showStandardCheckoutPage && !isIOS && requestObject) {
      try {
        callFortRequest(
          onSuccess,
          onFailure,
          onCancel,
          requestObject,
          environment,
          requestCode,
          showLoading,
          showResponsePage
        );
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
    onFailure: returnFailureParsed,
  };
  return propsDone ? (
    showStandardCheckoutPage && isIOS ? (
      <ViewManager {...propsAdjustedIOS} />
    ) : null
  ) : (
    // @ts-ignore
    <Text>Request object missing</Text>
  );
};

export default StandardCheckoutViewManager;
