export interface RequestObject {
  command: 'AUTHORIZATION' | 'PURCHASE';
  merchant_reference: string;
  amount: string;
  currency: string;
  language: string;
  customer_email: string;
  sdk_token: string;
  token_name?: string;
  payment_option?: string;
  eci?: string;
  order_description?: string;
  customer_ip?: string;
  customer_name?: string;
  phone_number?: string;
  settlement_reference?: string;
  merchant_extra?: string;
  merchant_extra1?: string;
  merchant_extra2?: string;
  merchant_extra3?: string;
  merchant_extra4?: string;
  merchant_extra5?: string;
}

export interface RequestObjectDirectPay {
  command: 'AUTHORIZATION' | 'PURCHASE';
  merchant_reference: string;
  amount: string;
  currency: string;
  language: string;
  customer_email: string;
  sdk_token: string;
  token_name: string;
  card_security_code: string;
  payment_option?: string;
  eci?: string;
  order_description?: string;
  customer_ip?: string;
  customer_name?: string;
  phone_number?: string;
  settlement_reference?: string;
  merchant_extra?: string;
  merchant_extra1?: string;
  merchant_extra2?: string;
  merchant_extra3?: string;
  merchant_extra4?: string;
  merchant_extra5?: string;
}

export interface RequestObjectApplePay {
  command: 'AUTHORIZATION' | 'PURCHASE';
  digital_wallet: 'APPLE_PAY';
  merchant_reference: string;
  amount: string;
  currency: string;
  language: string;
  customer_email: string;
  sdk_token: string;
  customer_ip?: string;
  customer_name?: string;
  phone_number?: string;
  settlement_reference?: string;
  merchant_extra?: string;
  merchant_extra1?: string;
  merchant_extra2?: string;
  merchant_extra3?: string;
  merchant_extra4?: string;
  merchant_extra5?: string;
}

export interface ApplePayRequest {
  displayAmount: string; 
  environment: 'TEST' | 'PRODUCTION',
  merchantIdentifier: string; 
  countryCode: string; 
  currencyCode: string;
  supportedNetworks: string[];
  transactionDetails: RequestObjectApplePay;
}