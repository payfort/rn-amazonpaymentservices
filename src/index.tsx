import CustomCheckoutViewManager from './views/CustomCheckoutViewManager';
import DirectPayManager from './views/DirectPayManager';
import type {
  RequestObject,
  RequestObjectDirectPay,
} from './types/requestObject';
import { getSDKDeviceId } from './services/getDeviceId';
import StandardCheckoutViewManager from './views/StandardCheckoutViewManager';
import type {
  customCheckoutViewProps,
  standardCheckoutViewProps,
} from './types/viewProps';

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
