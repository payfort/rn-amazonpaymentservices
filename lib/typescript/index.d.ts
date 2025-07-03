/// <reference types="react" />
import type { ApplePayRequest, RequestObject, RequestObjectDirectPay } from './types/requestObject';
import { getSDKDeviceId } from './services/getDeviceId';
import type { customCheckoutViewProps, standardCheckoutViewProps } from './types/viewProps';
export declare const CustomCheckoutView: (props: customCheckoutViewProps) => import("react").ReactElement<any, any> | null;
export declare const StandardCheckout: (props: standardCheckoutViewProps) => import("react").ReactElement<any, any> | null;
export declare const DirectPayButton: (props: customCheckoutViewProps) => import("react").ReactElement<any, any> | null;
export declare const getDeviceId: typeof getSDKDeviceId;
export type FortRequestObject = RequestObject;
export type FortRequestObjectDirectPay = RequestObjectDirectPay;
export declare const ApplePay: {
    isAvailable: () => Promise<any>;
    startPayment: (paymentDetails: ApplePayRequest) => Promise<any>;
};
