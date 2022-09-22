import nativeResponseSelector from '../utils/nativeResponseSelector';
import RnAmazonPaymentServiceSdk from '../nativeModules/RnAmazonPaymentServiceSdk';
import type { RequestObject } from '../types/requestObject';

export function callFortRequest(
  onSuccess: any,
  onFailure: any,
  onCancel: any,
  requestObject: RequestObject,
  environment: 'TEST' | 'PRODUCTION',
  requestCode: any,
  showLoading: boolean,
  showResponsePage: boolean
): void {
  const returnSuccessParsed = (response: any) => {
    const responseObject = nativeResponseSelector(response);
    console.log(responseObject, 'on Success response object');
    onSuccess(responseObject);
  };

  const returnFailureOrCancel = (response: any) => {
    const responseObject = nativeResponseSelector(response);
    if (responseObject?.response_code === '00072') {
      onCancel(responseObject);
    } else {
      onFailure(responseObject);
    }
  };

  console.log(requestObject, 'request object from package');
  RnAmazonPaymentServiceSdk.callFortRequest(
    requestObject,
    environment,
    Number(requestCode),
    showLoading,
    showResponsePage,
    returnSuccessParsed,
    returnFailureOrCancel
  );
  try {
  } catch (e) {
    console.log(e, 'error from package');
    // @ts-ignore
    throw new Error(e);
  }
}
