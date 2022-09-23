import CustomCheckoutViewManager from './views/CustomCheckoutViewManager';
import DirectPayManager from './views/DirectPayManager';
import { getSDKDeviceId } from './services/getDeviceId';
import StandardCheckoutViewManager from './views/StandardCheckoutViewManager';
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
//# sourceMappingURL=index.js.map