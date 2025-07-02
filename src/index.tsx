import CustomCheckoutViewManager from './views/CustomCheckoutViewManager';
import DirectPayManager from './views/DirectPayManager';
import type {
  ApplePayRequest,
  RequestObject,
  RequestObjectDirectPay,
} from './types/requestObject';
import { getSDKDeviceId } from './services/getDeviceId';
import StandardCheckoutViewManager from './views/StandardCheckoutViewManager';
import type {
  customCheckoutViewProps,
  standardCheckoutViewProps,
} from './types/viewProps';
import ApplePayModule from './nativeModules/ApplePayModule';
import { Platform } from 'react-native';

export const CustomCheckoutView = (props: customCheckoutViewProps) => {
  return CustomCheckoutViewManager(props);
};

export const StandardCheckout = (props: standardCheckoutViewProps) => {
  return StandardCheckoutViewManager(props);
};

export const DirectPayButton = (props: customCheckoutViewProps) => {
  return DirectPayManager(props);
};

export const getDeviceId = getSDKDeviceId;

export type FortRequestObject = RequestObject;

export type FortRequestObjectDirectPay = RequestObjectDirectPay;


export const ApplePay = {
  isAvailable: async () => {
    if (Platform.OS !== 'ios') {
      console.log('Apple Pay is not available on this platform.');
      return false;
    }
    try {
      const isAvailable = await ApplePayModule.isApplePayAvailable();
      console.log('Apple Pay supported:', isAvailable);
      return isAvailable;
    } catch (error) {
      console.log('Error checking Apple Pay support:', error);
      return false;
    }
  },
  startPayment: async (paymentDetails: ApplePayRequest) => {
    try {
      const result = await ApplePayModule.startPayment(paymentDetails);
      return result;
    } catch (error) {
      throw error; 
    }
  },
};
