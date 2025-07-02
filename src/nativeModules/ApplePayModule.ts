import { NativeModules, Platform } from 'react-native';

export const LINKING_ERROR =
  `The package 'rn-amazon-payment-services' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ApplePayModule = NativeModules.ApplePayModule
  ? NativeModules.ApplePayModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default ApplePayModule;
