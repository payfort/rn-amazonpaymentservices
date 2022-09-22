# rn-amazon-payment-service

Amazon Payment Service Sdk react native package

## Installation

```sh
npm install rn-amazon-payment-service
```

#### Android

You need to add the repository to your build file. Add it in your root build.gradle (/android/build.gradle) at the end of repositories

```java
allprojects {
  repositories {
    ...
      maven { url "https://android-sdk.payfort.com" }
  }
}
```

You need to also make sure that following two permission are set in the AndroidManifest.xml (android/app/src/main/AndroidManifest.xml):
```xml
    < uses-permission android:name="android.permission.INTERNET" />
    < uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```


#### iOS

1- Add the following code to your Podfile (inside the target section):

```
pod 'PayFortSDK'
```

2- Add the following to the bottom of your Podfile:

```
   post_install do |installer|
        installer.pods_project.targets.each do |target|
          if ['PayFortSDK'].include? target.name
            target.build_configurations.each do |config|
                config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
            end
          end
        end
      end

```
<br>


## Usage

```js
import {
  getDeviceId,
  FortRequestObject,
  StandardCheckout,
} from 'rn-amazon-payment-service';

// ...

export default function App() {

  const [deviceId, setDeviceId] = useState<string>('');
  const [showStandardCheckout, setShowStandardCheckout] = useState<boolean>(false);

  const setupDeviceId = async () => {
    const id: string = await getDeviceId();
    setDeviceId(id);
  };

  const onSuccess = (response: any) => {
    console.log('success', response);
    setShowCustomScreen(false);
  };

  const onFailure = (response: any) => {
    console.log('failure', response);
    setShowCustomScreen(false);
  };

  const onCancel = (response: any) => {
    console.log('cancel', response);
    setShowStandardCheckout(false);
  };

  // request object example for standard and custom ui checkout
  const requestObject: FortRequestObject = {
    command: 'PURCHASE',
    merchant_reference: 'ORD-0000007682',
    amount: '100',
    currency: 'AED',
    language: 'en',
    customer_email: 'sam@gmail.com',
    sdk_token: sdkToken,
    payment_option: 'VISA',
  };

  //...

  // Standard Checkout component
  return(
      <StandardCheckout
        showStandardCheckoutPage={showStandardCheckout}
        environment={'TEST'}
        requestCode={123455}
        showLoading={true}
        showResponsePage={true}
        requestObject={requestObject}
        onSuccess={onSuccess}
        onFailure={onFailure}
        onCancel={onCancel}
      />
  )
}

// ...

```
<br>

### Standard Checkout Props

| Name                                     | Value                        | Description                                                                                                              |   Mandatory   |
| ---------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------|---------------|
| showStandardCheckoutPage                 | `boolean`                    | Navigates to Amazon Payment Service Standard Checkout screen                                                             |      Yes      |
| environment                              | `'TEST'`, `'PRODUCTION'`     | Parameter used to determine whether the request is going to be submitted to the test or production environment.          |      Yes      |
| requestCode                              | `number`                     | Unique ID for this request.                                                                                              |      Yes      |
| showLoading                              | `boolean`                    | Flag to show or hide the loading dialog.                                                                                 |      Yes      |
| showResponsePage                         | `boolean`                    | Flag to show or hide response page after payment is done.                                                                |      Yes      |
| requestObject                            | `object`                     | Parameters you need to send when you send a request (the full list of parameters is in the last section of the document) |      Yes      |
| onSuccess                                | `function`                   | Callback to handle when the transaction is processed successfully.                                                       |      Yes      |
| onFailure                                | `function`                   | Callback to handle when the transaction is failed.                                                                       |      Yes      |
| onCancel                                 | `function`                   | Callback to handle when the user cancels the payment by clicking the back button.                                        |      No       |

<br>


### Custom UI Checkout

```js
import {
  CustomCheckoutView,
} from 'rn-amazon-payment-service';


// ...


// Custom Checkout UI component
  return(
    <CustomCheckoutView
      requestObject={requestObject}
      environment={'TEST'}
      style={{ width: 300, height: 400 }}
      payButtonProps={{
        marginLeft: 20,
        marginTop: 20,
        backgroundColor: '#026cff',
        text: 'Pay',
        textSize: 20,
        textColor: '#ffffff',
        buttonWidth: 40,
        buttonHeight: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#383333',
      }}
      onFailure={onFailure}
      onSuccess={onSuccess}
    />
  )

```
<br>

### Direct Pay Checkout


```js
import {
  DirectPayButton,
  FortRequestObjectDirectPay,
} from 'rn-amazon-payment-service';

//...

  const requestObjectDirectPay: FortRequestObjectDirectPay = {
    command: 'AUTHORIZATION',
    merchant_reference: 'ORD-0000007682',
    amount: '100',
    currency: 'AED',
    language: 'en',
    customer_email: 'sam@gmail.com',
    sdk_token: sdkToken,
    payment_option: 'VISA',
    token_name: tokenName,
    card_security_code: '123',
  };


  return(
      <DirectPayButton
        requestObject={requestObjectDirectPay}
        environment={'TEST'}
        style={{ width: 200, height: 100 }}
        payButtonProps={{
          marginLeft: 20,
          marginTop: 20,
          backgroundColor: '#026cff',
          text: 'Pay',
          textSize: 20,
          textColor: '#ffffff',
          buttonWidth: 40,
          buttonHeight: 40,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#383333',
        }}
        onFailure={onFailure}
        onSuccess={onSuccess}
      />
    )

```

### Custom UI and Direct Checkout Props

| Name                                     | Value                        | Description                                                                                        |   Mandatory   |
| ---------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------|---------------|
| environment                              | `'TEST'`, `'PRODUCTION'`     | Parameter used to determine whether the request is going to be submitted to the test or production environment. |      Yes      |
| style                                    | `object`                     | Set the height and width of the view                                                               |      Yes      |
| payButtonProps                           | `object`                     | Customization of the pay button                                                                    |      Yes      |
| requestObject                            | `object`                     | Parameters you need to send when you send a request (the full list of parameters is in the last section of the document)                                   |      Yes      |
| onSuccess                                | `function`                   | Callback to handle when the transaction is processed successfully.                                 |      Yes      |
| onFailure                                | `function`                   | Callback to handle when the transaction is failed.                                                 |      Yes      |


<br>
<hr/>


### Request Parameters (FortRequestObject)

| Attribute            | Type         | Description                                                                                                                                                                                                                                                                        | Mandatory | Maximum | Example                                                               |
|----------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------|-----------------------------------------------------------------------|
| command              | Alpha        | Command.<br>Possible/ expected values: AUTHORIZATION, PURCHASE                                                                                                                                                                                                                     | Yes       | 20      | PURCHASE                                                              |
| merchant_reference   | Alphanumeric | The Merchant’s unique order number.                                                                                                                                                                                                                                                | Yes       | 40      | XYZ9239-yu898                                                         |
| amount               | Numeric      | The transaction’s amount. *Each currency has predefined allowed decimal points that should be taken into consideration when sending the amount                                                                                                                                     | Yes       | 10      | 10000                                                                 |
| currency             | Alpha        | The currency of the transaction’s amount in ISO code 3.                                                                                                                                                                                                                            | Yes       | 3       | AED                                                                   |
| language             | Alpha        | The checkout page and messages language.<br>Possible/ expected values: en/ ar                                                                                                                                                                                                      | Yes       | 2       | en                                                                    |
| customer_email       | Alphanumeric | The customer’s email.<br>Special characters: _ - . @ +                                                                                                                                                                                                                             | Yes       | 254     | customer@domain.com                                                   |
| sdk_token            | Alphanumeric | An SDK Token to enable using the Amazon Payment Services Mobile SDK.                                                                                                                                                                                                               | Yes       | 100     | Dwp78q3                                                               |
| token_name           | Alphanumeric | The Token received from the Tokenization process.<br>Special characters: . @ - _                                                                                                                                                                                                   | No        | 100     | Op9Vmp                                                                |
| payment_option       | Alpha        | Payment option.<br>Possible/ expected values:<br>- MASTERCARD<br>- VISA<br>- AMEX<br>- MADA (for Purchase operations and eci Ecommerce only) Click here to download [MADA Branding Document](https://paymentservices-reference.payfort.com/pdf/mada%20branding%20-%20ecommerce%20merchant%20-%20payment%20providers.pdf)  <br>- MEEZA (for Purchase operations and ECOMMERCE eci only) | No        | 10      | VISA                                                                  |
| eci                  | Alpha        | Ecommerce indicator.<br>Possible/ expected values: ECOMMERCE                                                                                                                                                                                                                       | No        | 150     | ECOMMERCE                                                             |
| order_description    | Alphanumeric | A description of the order.<br>Special characters:'/ . _ - # : $ Space                                                                                                                                                                                                             | No        | 150     | iPhone 6-S                                                            |
| customer_ip          | Alphanumeric | It holds the customer’s IP address. *It’s Mandatory, if the fraud service is active. *We support IPv4 and IPv6 as shown in the example below.                                                                                                                                      | No        | 45      | IPv4 → 192.178.1.10<br>IPv6 → 2001:0db8:3042:0002:5a55:caff:fef6:bdbf |
| customer_name        | Alpha        | The customer’s name.<br>Special characters: _ \ / - .'                                                                                                                                                                                                                             | No        | 40      | John Smith                                                            |
| phone_number         | Alphanumeric | The customer’s phone number.<br>Special characters: + - ( ) Space                                                                                                                                                                                                                  | No        | 19      | 00962797219966                                                        |
| settlement_reference | Alphanumeric | The Merchant submits unique value to Amazon Payment Services. The value is then passed to the Acquiring bank and displayed to the merchant in the Acquirer settlement file.                                                                                                        | No        | 34      | XYZ9239-yu898                                                         |
| merchant_extra1      | Alphanumeric | Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report.                                                                                                                                                                      | No        | 250     | JohnSmith                                                             |
| merchant_extra2      | Alphanumeric | Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report.                                                                                                                                                                      | No        | 250     | JohnSmith                                                             |
| merchant_extra3      | Alphanumeric | Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report.                                                                                                                                                                      | No        | 250     | JohnSmith                                                             |
| merchant_extra4      | Alphanumeric | Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report.                                                                                                                                                                      | No        | 250     | JohnSmith                                                             |
| merchant_extra5      | Alphanumeric | Extra data sent by merchant. Will be received and sent back as received. Will not be displayed in any report.                                                                                                                                                                      | No        | 250     | JohnSmith                                                             |



## License

MIT
