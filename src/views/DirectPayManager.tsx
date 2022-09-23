import * as React from 'react';
import {
  findNodeHandle,
  PixelRatio,
  Platform,
  requireNativeComponent,
  ScrollView,
  UIManager,
  Text,
} from 'react-native';
import { useEffect, useRef } from 'react';
import RnAmazonPaymentServiceSdk from '../nativeModules/RnAmazonPaymentServiceSdk';
import nativeResponseSelector from '../utils/nativeResponseSelector';
import type { customCheckoutViewProps } from '../types/viewProps';
import payButtonSelector from '../utils/payButtonSelector';
import {
  DIRECT_PAY_VIEW_HEIGHT,
  DIRECT_PAY_VIEW_WIDTH,
} from '../constants/styleDefaults';

const ViewManager = requireNativeComponent('DirectPay');

const DirectPayManager: React.FC<customCheckoutViewProps> = (props) => {
  const {
    onFailure = () => {},
    onSuccess = () => {},
    requestObject,
    environment = 'TEST',
  } = props;

  const DEFAULT_STYLE = {
    width: DIRECT_PAY_VIEW_WIDTH,
    height: DIRECT_PAY_VIEW_HEIGHT,
  };
  const defaultStyle = props.style ? props.style : DEFAULT_STYLE;
  const propsDone = requestObject;
  const isIOS = Platform.OS === 'ios';

  const createFragment = (viewId: any) =>
    UIManager.dispatchViewManagerCommand(
      viewId,
      // we are calling the 'create' command
      // @ts-ignore
      UIManager.DirectPay.Commands.create.toString(),
      [viewId]
    );

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

  const ref = useRef(null);

  const payButtonProps = payButtonSelector(props.payButtonProps);

  const setUpScreen = () => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
    RnAmazonPaymentServiceSdk.callDirectPayFortRequest(
      requestObject,
      payButtonProps,
      environment,
      returnSuccessParsed,
      returnFailureParsed
    );
  };

  const styleAndroid = {
    style: {
      // @ts-ignore
      height: PixelRatio.getPixelSizeForLayoutSize(defaultStyle?.height),
      // @ts-ignore
      width: PixelRatio.getPixelSizeForLayoutSize(defaultStyle?.width),
    },
  };

  const propsAdjustedAndroid = {
    ...props,
    ...styleAndroid,
  };

  const propsAdjustedIOS = {
    ...props,
    payButtonProps,
    onSuccess: returnSuccessParsed,
    onFailure: returnFailureParsed,
  };

  useEffect(() => {
    !isIOS && propsDone && setTimeout(() => setUpScreen(), 200);
  }, [propsDone]);

  return (
    // @ts-ignore
    <ScrollView
      style={defaultStyle}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      {propsDone ? (
        <ViewManager
          {...(isIOS ? propsAdjustedIOS : propsAdjustedAndroid)}
          ref={ref}
        />
      ) : (
        // @ts-ignore
        <Text>Request object missing</Text>
      )}
    </ScrollView>
  );
};

export default DirectPayManager;
