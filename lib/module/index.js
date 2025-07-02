import CustomCheckoutViewManager from './views/CustomCheckoutViewManager';
import DirectPayManager from './views/DirectPayManager';
import { getSDKDeviceId } from './services/getDeviceId';
import StandardCheckoutViewManager from './views/StandardCheckoutViewManager';
import ApplePayModule from './nativeModules/ApplePayModule';
import { Platform } from 'react-native';
export const CustomCheckoutView = props => {
  return CustomCheckoutViewManager(props);
};
export const StandardCheckout = props => {
  return StandardCheckoutViewManager(props);
};
export const DirectPayButton = props => {
  return DirectPayManager(props);
};
export const getDeviceId = getSDKDeviceId;
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
  startPayment: async paymentDetails => {
    try {
      const result = await ApplePayModule.startPayment(paymentDetails);
      return result;
    } catch (error) {
      throw error;
    }
  }
};
//# sourceMappingURL=index.js.map