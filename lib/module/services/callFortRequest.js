import nativeResponseSelector from '../utils/nativeResponseSelector';
import RnAmazonPaymentServiceSdk from '../nativeModules/RnAmazonPaymentServiceSdk';
export function callFortRequest(onSuccess, onFailure, onCancel, requestObject, environment, requestCode, showLoading, showResponsePage) {
  const returnSuccessParsed = response => {
    const responseObject = nativeResponseSelector(response);
    console.log(responseObject, 'on Success response object');
    onSuccess(responseObject);
  };
  const returnFailureOrCancel = response => {
    const responseObject = nativeResponseSelector(response);
    if ((responseObject === null || responseObject === void 0 ? void 0 : responseObject.response_code) === '00072') {
      onCancel(responseObject);
    } else {
      onFailure(responseObject);
    }
  };
  console.log(requestObject, 'request object from package');
  RnAmazonPaymentServiceSdk.callFortRequest(requestObject, environment, Number(requestCode), showLoading, showResponsePage, returnSuccessParsed, returnFailureOrCancel);
  try {} catch (e) {
    console.log(e, 'error from package');
    // @ts-ignore
    throw new Error(e);
  }
}
//# sourceMappingURL=callFortRequest.js.map