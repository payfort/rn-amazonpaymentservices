package com.rnamazonpaymentservicesdk;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.fragment.app.Fragment;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.payfort.fortpaymentsdk.FortSdk;
import com.payfort.fortpaymentsdk.callbacks.PayFortCallback;
import com.payfort.fortpaymentsdk.domain.model.FortRequest;
import com.payfort.fortpaymentsdk.views.PayfortPayButton;


import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class DirectPayFragment extends Fragment {

    private static ReadableMap requestMap = null;
    private static ReadableMap payButtonProps = null;
    private static String environment = null;
    private static Callback callbackOnSuccess = null;
    private static Callback callbackOnFailure = null;

  public static void setRequestObject (ReadableMap requestObject) {
    DirectPayFragment.requestMap = requestObject;
  }

  public static void setPayButtonProps (ReadableMap payButtonProps) {
    DirectPayFragment.payButtonProps = payButtonProps;
  }

  public static void setEnvironment (String environment) {
    DirectPayFragment.environment = environment;
  }

  public static void setCallbackOnSuccess (Callback callbackOnSuccess) {
    DirectPayFragment.callbackOnSuccess = callbackOnSuccess;
  }

  public static void setCallbackOnFailure (Callback callbackOnFailure) {
    DirectPayFragment.callbackOnFailure = callbackOnFailure;
  }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState) {
        super.onCreateView(inflater, parent, savedInstanceState);


        PayfortPayButton btnDirectPay = new PayfortPayButton(getContext(), null);

        // creating LinearLayout
        LinearLayout linLayout = new LinearLayout(getContext());
        // specifying vertical orientation
        linLayout.setOrientation(LinearLayout.VERTICAL);
        // creating LayoutParams
        LinearLayout.LayoutParams linLayoutParam = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
        // set LinearLayout as a root element of the screen

        LinearLayout.LayoutParams lpView = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);


      HashMap buttonParams = payButtonProps.toHashMap();

      linLayout.addView(Utils.customizeButton(btnDirectPay, buttonParams), Utils.customizeButtonParams(buttonParams));

        //then you need to Create FortRequest via FortRequest.class
        FortRequest fortRequest = new FortRequest(); // fill all the parameters required

        fortRequest.setRequestMap(requestMap.toHashMap());

      String env = "";

      if (environment.equals("TEST")) {
        env = FortSdk.ENVIRONMENT.TEST;
      } else if(environment.equals("PRODUCTION")){
        env = FortSdk.ENVIRONMENT.PRODUCTION;
      }


        // Finally you need to declare a PayFortCallback
        PayFortCallback callback = new PayFortCallback() {
            @Override
            public void startLoading() {
                btnDirectPay.setText("...");
                Log.d("Loading", "Loading!!");
            }
            @Override
            public void onSuccess(@NotNull Map requestParamsMap, @NotNull Map fortResponseMap) {
                Log.d("Success", fortResponseMap.toString());
                DirectPayFragment.callbackOnSuccess.invoke(new JSONObject(fortResponseMap).toString());
                btnDirectPay.setText("Done");
            }
            @Override
            public void onFailure(@NotNull Map requestParamsMap, @NotNull Map fortResponseMap) {
                Log.e("Failure", fortResponseMap.toString());
                DirectPayFragment.callbackOnFailure.invoke(new JSONObject(fortResponseMap).toString());
            }
        };

        btnDirectPay.setup(env, fortRequest, callback);


        return linLayout;
    }


    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        // do any logic that should happen in an `onCreate` method, e.g:
        // customView.onCreate(savedInstanceState);
    }

    @Override
    public void onPause() {
        super.onPause();
        // do any logic that should happen in an `onPause` method
        // e.g.: customView.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
        // do any logic that should happen in an `onResume` method
        // e.g.: customView.onResume();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        // do any logic that should happen in an `onDestroy` method
        // e.g.: customView.onDestroy();
    }
}
