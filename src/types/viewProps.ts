import type { RequestObject } from './requestObject';
import type { ViewStyle } from 'react-native';

export interface payButtonPropTypes {
  marginLeft: number;
  marginTop: number;
  text: string;
  backgroundColor?: string;
  textColor?: string;
  textSize?: number;
  buttonWidth: number;
  buttonHeight: number;
  borderWidth?: number;
  borderRadius?: number;
  borderColor?: string;
  textFontFamily?: string;
}

export interface customCheckoutViewProps {
  requestObject: RequestObject;
  environment: 'TEST' | 'PRODUCTION';
  onSuccess?: (response: any) => void;
  onFailure?: (response: any) => void;
  style: ViewStyle;
  payButtonProps: payButtonPropTypes;
}

export interface standardCheckoutViewProps {
  showStandardCheckoutPage: boolean;
  environment: 'TEST' | 'PRODUCTION';
  requestCode: any;
  showLoading: boolean;
  showResponsePage: boolean;
  requestObject: RequestObject;
  onSuccess: (response: string) => void;
  onFailure: (response: string) => void;
  onCancel?: (response: string) => void;
}
