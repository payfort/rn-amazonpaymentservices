package com.rnamazonpaymentservicesdk;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;


import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import com.payfort.fortpaymentsdk.FortSdk;
import com.payfort.fortpaymentsdk.callbacks.FortCallBackManager;
import com.payfort.fortpaymentsdk.callbacks.FortCallback;
import com.payfort.fortpaymentsdk.callbacks.FortInterfaces;
import com.payfort.fortpaymentsdk.domain.model.FortRequest;

import org.json.JSONObject;
import java.util.Map;


@ReactModule(name = RnAmazonPaymentServiceSdkModule.NAME)


public class RnAmazonPaymentServiceSdkModule extends ReactContextBaseJavaModule  implements ActivityEventListener {
    public static final String NAME = "RnAmazonPaymentServiceSdk";

    public RnAmazonPaymentServiceSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }


    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    public void multiply(int a, int b, Promise promise) {
        promise.resolve(a * b);
    }

    public static native int nativeMultiply(int a, int b);


  @ReactMethod
  public void getDeviceID(Promise promise) {
    try {
       String deviceId = FortSdk.getDeviceId(getReactApplicationContext());
        promise.resolve(deviceId);
    } catch (Exception e) {
      promise.reject("Create Event Error", e);
    }

  }

  private FortCallBackManager fortCallback = null;



  @ReactMethod
  public void callFortRequest(
          ReadableMap requestMap,
          String environment,
          Double requestCode,
          Boolean showLoading,
          Boolean showResponsePage,
          Callback onSuccess,
          Callback onFailure
          ) {
      // create Fort callback instance
      if (fortCallback == null) {
          fortCallback = FortCallback.Factory.create();
      }

      FortRequest fortrequest = new FortRequest();

      fortrequest.setRequestMap(requestMap.toHashMap());

      fortrequest.setShowResponsePage(showResponsePage); // to [display/use] the SDK response page

      callSdk(
        fortrequest,
        environment,
        requestCode,
        showLoading,
        onSuccess,
        onFailure
        );
  }




  private void callSdk(
          FortRequest fortrequest,
          String environment,
          Double requestCode,
          Boolean showLoading,
          Callback onSuccess,
          Callback onFailure
          ) {

    String env = "";

    if (environment.equals("TEST")) {
      env = FortSdk.ENVIRONMENT.TEST;
    } else if(environment.equals("PRODUCTION")){
      env = FortSdk.ENVIRONMENT.PRODUCTION;
    }

    Integer requestCodeInt = requestCode.intValue();

    try {
        FortSdk.getInstance().registerCallback(getReactApplicationContext().getCurrentActivity(),
          fortrequest,
          env,
          requestCodeInt,
          fortCallback,
          showLoading,
          new FortInterfaces.OnTnxProcessed() {
                    @Override
                    public void onCancel(Map requestParamsMap, Map responseMap) {
                        onFailure.invoke(new JSONObject(responseMap).toString());
                    }

                    @Override
                    public void onSuccess(Map requestParamsMap, Map fortResponseMap) {
                        onSuccess.invoke(new JSONObject(fortResponseMap).toString());
                    }

                    @Override
                    public void onFailure(Map requestParamsMap,
                                          Map fortResponseMap) {
                        onFailure.invoke(new JSONObject(fortResponseMap).toString());
                    }

                });
    } catch (Exception e) {
        e.printStackTrace();
    }

  }

  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
      fortCallback.onActivityResult(requestCode, resultCode, data);
  }

  @Override
  public void onNewIntent(Intent intent) {

  }


  @ReactMethod
  public void callDirectPayFortRequest(
      ReadableMap requestObject,
      ReadableMap payButtonProps,
      String environment,
      Callback returnSuccess,
      Callback returnFailure
  ) {

    DirectPayFragment.setRequestObject(requestObject);
    DirectPayFragment.setPayButtonProps(payButtonProps);
    DirectPayFragment.setEnvironment(environment);
    DirectPayFragment.setCallbackOnSuccess(returnSuccess);
    DirectPayFragment.setCallbackOnFailure(returnFailure);
  }

  @ReactMethod
  public void callCustomFortRequest(
          ReadableMap requestObject,
          ReadableMap payButtonProps,
          String environment,
          Callback returnSuccess,
          Callback returnFailure
  ) {

      CustomCheckoutFragment.setRequestObject(requestObject);
      CustomCheckoutFragment.setPayButtonProps(payButtonProps);
      CustomCheckoutFragment.setEnvironment(environment);
      CustomCheckoutFragment.setCallbackOnSuccess(returnSuccess);
      CustomCheckoutFragment.setCallbackOnFailure(returnFailure);
  }
}
