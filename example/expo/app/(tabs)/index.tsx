import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  getDeviceId,
  type FortRequestObject,
  CustomCheckoutView,
  StandardCheckout,
  DirectPayButton,
  type FortRequestObjectDirectPay,
} from 'rn-amazon-payment-services';
import getSDKToken from '../../services/getSDKToken';

interface RequestBody {
  language: string;
  device_id: string;
}

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

  const setupDeviceId = async () => {
    const id: string = await getDeviceId();
    setDeviceId(id);
  };

  useEffect(() => {
    setupDeviceId();
  }, []);

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

  const payOptions: any = {
    standard: callFortRequests,
    custom: callCustomFortRequest,
    direct: callDirectPayFortRequest,
  };

  const buttonAction = async (option: string) => {
    try {
      setLoading(true);
      const requestBody: RequestBody = {
        language: 'en',
        device_id: deviceId,
      };

      console.log(requestBody, 'request body');

      const response: any = await getSDKToken(requestBody);

      console.log(response.data, 'sdk token from backend');
      setSdkToken(response.data?.sdk_token);

      setLoading(false);

      const checkout: any = payOptions[option];
      await checkout(response?.data?.sdk_token);
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
      <View>
        <Text>Insert Amount</Text>
        <TextInput
          style={{ borderWidth: 1 }}
          value={amount}
          onChangeText={setAmount}
        />
        {button(
          'Direct Checkout',
          () => buttonAction('direct'),
          !amount,
          loading
        )}
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
    margin: 40,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
