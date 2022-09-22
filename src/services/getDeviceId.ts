import RnAmazonPaymentServiceSdk from '../nativeModules/RnAmazonPaymentServiceSdk';

const DEVICE_ID_ERROR = `Something went wrong while getting device id`;

export async function getSDKDeviceId(): Promise<string> {
  try {
    return RnAmazonPaymentServiceSdk.getDeviceID();
  } catch (e) {
    throw new Error(DEVICE_ID_ERROR);
  }
}
