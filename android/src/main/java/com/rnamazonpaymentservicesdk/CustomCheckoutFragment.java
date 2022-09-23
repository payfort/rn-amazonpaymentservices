package com.rnamazonpaymentservicesdk;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.fragment.app.Fragment;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.payfort.fortpaymentsdk.FortSdk;
import com.payfort.fortpaymentsdk.callbacks.PayFortCallback;
import com.payfort.fortpaymentsdk.domain.model.FortRequest;
import com.payfort.fortpaymentsdk.views.CardCvvView;
import com.payfort.fortpaymentsdk.views.CardExpiryView;
import com.payfort.fortpaymentsdk.views.CardHolderNameView;
import com.payfort.fortpaymentsdk.views.FortCardNumberView;
import com.payfort.fortpaymentsdk.views.PayfortPayButton;
import com.payfort.fortpaymentsdk.views.model.PayComponents;

import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class CustomCheckoutFragment extends Fragment {

    private static ReadableMap requestMap = null;
    private static ReadableMap payButtonProps = null;
    private static String environment = null;
    private static Callback callbackOnSuccess = null;
    private static Callback callbackOnFailure = null;


    public static void setRequestObject (ReadableMap requestObject) {
      CustomCheckoutFragment.requestMap = requestObject;
    }

    public static void setPayButtonProps (ReadableMap payButtonProps) {
      CustomCheckoutFragment.payButtonProps = payButtonProps;
    }

    public static void setEnvironment (String environment) {
      CustomCheckoutFragment.environment = environment;
    }

    public static void setCallbackOnSuccess (Callback callbackOnSuccess) {
        CustomCheckoutFragment.callbackOnSuccess = callbackOnSuccess;
    }

    public static void setCallbackOnFailure (Callback callbackOnFailure) {
        CustomCheckoutFragment.callbackOnFailure = callbackOnFailure;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState) {
        super.onCreateView(inflater, parent, savedInstanceState);

        CardHolderNameView cardHolderNameView = new CardHolderNameView(getContext(), null);
        FortCardNumberView etCardNumberView = new FortCardNumberView(getContext(), null);
        CardCvvView etCardCvv = new CardCvvView(getContext(), null);
        CardExpiryView etCardExpiry = new CardExpiryView(getContext(), null);
        PayfortPayButton btnPay = new PayfortPayButton(getContext(), null);

        // creating LinearLayout
        LinearLayout linLayout = new LinearLayout(getContext());
        // specifying vertical orientation
        linLayout.setOrientation(LinearLayout.VERTICAL);
        // creating LayoutParams
        LinearLayout.LayoutParams linLayoutParam = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
        // set LinearLayout as a root element of the screen

        linLayout.addView(etCardNumberView);
        linLayout.addView(etCardExpiry);
        linLayout.addView(etCardCvv);
        linLayout.addView(cardHolderNameView);

          PayComponents payComponents = new PayComponents(
                  etCardNumberView,
                  etCardCvv,
                  etCardExpiry,
                  cardHolderNameView
          );


        HashMap buttonParams = payButtonProps.toHashMap();

        linLayout.addView(Utils.customizeButton(btnPay, buttonParams), Utils.customizeButtonParams(buttonParams));

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
                btnPay.setText("...");
                btnPay.setEnabled(false);
                btnPay.setClickable(false);
            }
            @Override
            public void onSuccess(@NotNull Map requestParamsMap, @NotNull Map fortResponseMap) {
                CustomCheckoutFragment.callbackOnSuccess.invoke(new JSONObject(fortResponseMap).toString());
                btnPay.setText("Done");
            }
            @Override
            public void onFailure(@NotNull Map requestParamsMap, @NotNull Map fortResponseMap) {
                CustomCheckoutFragment.callbackOnFailure.invoke(new JSONObject(fortResponseMap).toString());
            }
        };

        btnPay.setup(env, fortRequest, payComponents, callback);

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
