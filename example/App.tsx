/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator, Alert
} from 'react-native';


import {
  getDeviceId, 
  ApplePay,
  FortRequestObject,
  CustomCheckoutView,
  StandardCheckout,
  DirectPayButton,
  FortRequestObjectDirectPay,} from 'rn-amazon-payment-services/src';
import { ApplePayRequest, RequestObjectApplePay } from 'rn-amazon-payment-services/src/types/requestObject';

import getSDKToken from './src/services/getSDKToken';
import createSignature from './src/utils/createSignature';


export default function App() {
  const [amount, setAmount] = useState('1321');
  const [deviceId, setDeviceId] = useState<string>('');
  const [sdkToken, setSdkToken] = useState<string>('');
  const [tokenName, setTokenName] = useState<string>('');
  const [showStandardCheckout, setShowStandardCheckout] =
    useState<boolean>(false);
  const [showCustomScreen, setShowCustomScreen] = useState<boolean>(false);
  const [showDirectPayScreen, setShowDirectScreen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [applePayResult, setApplePayResult] = useState<any>({name:''});
  const [isApplePayAvailable, setApplePayAvailable] = useState<boolean>(false);

  const setupDeviceId = async () => {
    const id: string = await getDeviceId();
    setDeviceId(id);
  };

  useEffect(() => {
    setupDeviceId();
    checkApplePayAvailable();
  }, []);


  const checkApplePayAvailable = async () => {

    let isAvailable = await ApplePay.isAvailable();
    setApplePayAvailable(isAvailable);

  };

  const onSuccess = (response: any) => {
    console.log('success', response);
    if (response.token_name) {
      setTokenName(response.token_name);
    }
    setShowStandardCheckout(false);
    setShowCustomScreen(false);
  };

  const onFailure = (response: any) => {
    console.log('failure', response);
    setShowStandardCheckout(false);
    setShowCustomScreen(false);
  };

  const onCancel = (response: any) => {
    setShowStandardCheckout(false);
    console.log('cancel', response);
  };

  function randomString(length: number, chars: string) {
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  const requestObject: FortRequestObject = {
    command: 'PURCHASE',
    merchant_reference: randomString(
      11,
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    ),
    amount: amount,
    currency: 'AED',
    language: 'en',
    customer_email: 'test@payfort.com',
    sdk_token: sdkToken,
  };

  const requestObjectDirectPay: FortRequestObjectDirectPay = {
    command: 'PURCHASE',
    merchant_reference: randomString(
      10,
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    ),
    amount: amount,
    currency: 'AED',
    language: 'en',
    customer_email: 'test@payfort.com',
    sdk_token: sdkToken,
    token_name: tokenName,
    card_security_code: '123',
  };

  const callFortRequests = () => {
    setShowStandardCheckout(true);
  };

  const callCustomFortRequest = async () => {
    try {
      showCustomScreen ? setShowCustomScreen(false) : setShowCustomScreen(true);
    } catch (e) {
      console.log(e, 'error while calling request');
    }
  };

  const callDirectPayFortRequest = () => {
    setShowDirectScreen(true);
  };

  const callApplePay = async (token: any) => {
    try{

      const appleTransactionDetails: RequestObjectApplePay = {
        amount: '',
        command: 'PURCHASE',
        digital_wallet: 'APPLE_PAY',
        merchant_reference: '',
        currency: 'AED',
        language: 'en',
        customer_email: '',
        sdk_token: token,
        customer_ip: '',
        customer_name: '',
        phone_number: '',
        settlement_reference: '',
        merchant_extra: '',
        merchant_extra1: '',
        merchant_extra2: '',
        merchant_extra3: '',
        merchant_extra4: '',
        merchant_extra5: ''
      };

      const applePaymentDetails:ApplePayRequest = {
        displayAmount: '',
        environment: 'TEST',
        merchantIdentifier: 'merchant.com.test.',
        countryCode: 'AE',
        currencyCode: 'AED',
        supportedNetworks: ['visa', 'mastercard', 'mada', 'amex'],
        transactionDetails: appleTransactionDetails
      };

      applePaymentDetails.transactionDetails.sdk_token = token;

      let result = await ApplePay.startPayment(applePaymentDetails);
      Alert.alert(JSON.stringify(result, null, 2));

    } catch(error: any){
      Alert.alert(error.message);
    }
  }

  const payOptions: any = {
    standard: callFortRequests,
    custom: callCustomFortRequest,
    direct: callDirectPayFortRequest,
    applepay: callApplePay
  };

  const buttonAction = async (option: string) => {
    try {
      setLoading(true);

      const requestBody: any = {
        'service_command': "SDK_TOKEN",
        'access_code': "",
        'merchant_identifier': "",
        'language': 'en',
        'device_id': deviceId,
      };


      requestBody['signature'] = createSignature(requestBody, '');

      console.log(requestBody, 'request body');

      const response: any = await getSDKToken(requestBody);

      console.log(response.data, 'sdk token from backend');

      setSdkToken(response.data?.sdk_token);

      setLoading(false);

      if (response?.data?.sdk_token != '') {
        const checkout: any = payOptions[option];
        await checkout(response?.data?.sdk_token);
      }

    } catch (e) {
      setLoading(false);
      console.log(e, 'something went wrong native');
    }
  };

  const button = (
    title: string,
    action: any,
    disabled: boolean,
    loading: boolean
  ) => {

    // if (title == 'Apple Pay') {
    //   const isAvailable = 
    //   if (!isAvailable) return <></>
    // }

    return (
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          marginTop: 20,
          width: 250,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: '#1d45ff',
        }}
        disabled={disabled}
        onPress={action}
      >
        {loading ? (
          <ActivityIndicator color={'white'} size={'small'} />
        ) : (
          <Text style={{ color: 'white', fontSize: 15 }}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const directCheckoutPayButton = {
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: '#026cff',
    textFontFamily: 'montserrat',
    text: 'Pay',
    textSize: 20,
    textColor: '#ffffff',
    buttonWidth: 40,
    buttonHeight: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#383333',
  };

  const customCheckoutPayButton = {
    marginLeft: 20,
    marginTop: 30,
    backgroundColor: '#026cff',
    text: 'Pay',
    textSize: 20,
    textColor: '#ffffff',
    buttonWidth: 60,
    buttonHeight: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#383333',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text>Insert Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />

        {tokenName
          ? button(
              'Direct Checkout',
              () => buttonAction('direct'),
              !amount,
              loading
            )
          : null}
        {button(
          'Custom Checkout',
          () => buttonAction('custom'),
          !amount,
          loading
        )}
        {button(
          'Standard Checkout',
          () => buttonAction('standard'),
          !amount,
          loading
        )}
        { isApplePayAvailable && button(
          'Apple Pay',
          () => buttonAction('applepay'),
          !amount,
          loading
        )}
      </View>
      <StandardCheckout
        showStandardCheckoutPage={showStandardCheckout}
        environment={'TEST'}
        requestCode={Math.floor(Math.random() * 100000)}
        showLoading={true}
        showResponsePage={true}
        requestObject={requestObject}
        onSuccess={onSuccess}
        onFailure={onFailure}
        onCancel={onCancel}
      />
      {showDirectPayScreen && tokenName ? (
        <DirectPayButton
          requestObject={requestObjectDirectPay}
          environment={'TEST'}
          style={{ width: 300, height: 300 }}
          payButtonProps={directCheckoutPayButton}
          onFailure={onFailure}
          onSuccess={onSuccess}
        />
      ) : null}
      {showCustomScreen && sdkToken ? (
        <CustomCheckoutView
          requestObject={requestObject}
          environment={'TEST'}
          style={{ width: 300, height: 500, marginTop: 20 }}
          payButtonProps={customCheckoutPayButton}
          onFailure={onFailure}
          onSuccess={onSuccess}
        />
      ) : null}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  box: {
    marginVertical: 60,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

