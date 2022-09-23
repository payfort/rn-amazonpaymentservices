package com.rnamazonpaymentservicesdk;

import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.view.Gravity;
import android.widget.LinearLayout;

import androidx.core.content.res.ResourcesCompat;

import com.payfort.fortpaymentsdk.views.PayfortPayButton;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class Utils {

  private static Random rand = new Random();

  // function to generate a random string of length n
  public static String getAlphaNumericString(int n)
  {

    // chose a Character random from this String
    String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      + "0123456789"
      + "abcdefghijklmnopqrstuvxyz";

    // create StringBuffer size of AlphaNumericString
    StringBuilder sb = new StringBuilder(n);

    for (int i = 0; i < n; i++) {

      // generate a random number between
      // 0 to AlphaNumericString variable length
      int index
        = (int)(AlphaNumericString.length()
        * Math.random());

      // add Character one by one in end of sb
      sb.append(AlphaNumericString
        .charAt(index));
    }

    return sb.toString();
  }

  public static int randInt() {

    int randomNum = rand.nextInt((1000 - 1) + 1) + 1;

    return randomNum;
  }

  public static Map collectRequestMap(String sdkToken, String amount) {
    Map requestMap = new HashMap<>();
    requestMap.put("command", "PURCHASE");
    requestMap.put("customer_email", "Sam@gmail.com");
    requestMap.put("phone_number", "Sam@gmail.com");
    requestMap.put("currency", "AED");
    requestMap.put("amount", amount);
    requestMap.put("language", "en");
    requestMap.put("merchant_reference", getAlphaNumericString(10));
    requestMap.put("customer_name", "Sam");
    requestMap.put("customer_ip", "172.150.16.10");
    requestMap.put("token_name", "Op9Vmp");
    requestMap.put("payment_option", "VISA");
    requestMap.put("eci", "ECOMMERCE");
    requestMap.put("order_description", "DESCRIPTION");
    requestMap.put("settlement_reference", "DESCRIPTION");
    requestMap.put("sdk_token", sdkToken);
    return requestMap;
  }

  public static Map collectDirectPayRequestMap(String sdkToken, String tokenName, String amount) {
    Map requestMap = new HashMap<>();
    requestMap.put("command", "AUTHORIZATION");
    requestMap.put("customer_email", "Sam@gmail.com");
    requestMap.put("currency", "AED");
    requestMap.put("amount", amount);
    requestMap.put("language", "en");
    requestMap.put("card_security_code", "123");
    requestMap.put("token_name", tokenName);
    requestMap.put("merchant_reference", getAlphaNumericString(10));
    requestMap.put("sdk_token", sdkToken);
    return requestMap;
  }

  public static PayfortPayButton customizeButton(PayfortPayButton btnPay, HashMap buttonParams) {

    String buttonText = (String) buttonParams.get("text");
    String buttonTextFontFamily = (String) buttonParams.get("textFontFamily");
    String buttonBackgroundColor = (String) buttonParams.get("backgroundColor");
    String buttonTextColor = (String) buttonParams.get("textColor");
    Double buttonTextSizeDouble = (Double) buttonParams.get("textSize");
    Double buttonBorderWidthDouble = (Double) buttonParams.get("borderWidth");
    Double buttonBorderRadiusDouble = (Double) buttonParams.get("borderRadius");
    String buttonBorderColor = (String) buttonParams.get("borderColor");

    assert buttonTextSizeDouble != null;
    float buttonTextSize = buttonTextSizeDouble.floatValue();

    assert buttonBorderWidthDouble != null;
    int buttonBorderWidth = buttonBorderWidthDouble.intValue();
    assert buttonBorderRadiusDouble != null;
    int buttonBorderRadius = buttonBorderRadiusDouble.intValue();

    Typeface typeface = Typeface.create(buttonTextFontFamily, Typeface.NORMAL);

    GradientDrawable btnBackground = new GradientDrawable();
    btnBackground.setColor(Color.parseColor(buttonBackgroundColor));
    btnBackground.setCornerRadius(buttonBorderRadius);
    btnBackground.setStroke(buttonBorderWidth, Color.parseColor(buttonBorderColor));


    btnPay.setText(buttonText);
    btnPay.setTextColor(Color.parseColor(buttonTextColor));
    btnPay.setTextSize(buttonTextSize);
    btnPay.setTypeface(typeface);
    btnPay.setGravity(Gravity.CENTER);
    btnPay.setBackground(btnBackground);


    return btnPay;
  }


  public static LinearLayout.LayoutParams customizeButtonParams(HashMap buttonParams) {

    Double buttonLeftMargin = (Double) buttonParams.get("marginLeft");
    Double buttonTopMargin = (Double) buttonParams.get("marginTop");
    Double buttonHeightDouble = (Double) buttonParams.get("buttonHeight");
    Double buttonWidthDouble = (Double) buttonParams.get("buttonWidth");

    LinearLayout.LayoutParams btnLayoutParams = new LinearLayout.LayoutParams(
      LinearLayout.LayoutParams.WRAP_CONTENT,
      LinearLayout.LayoutParams.WRAP_CONTENT
    );

    assert buttonHeightDouble != null;
    int buttonHeight = buttonHeightDouble.intValue();
    assert buttonWidthDouble != null;
    int buttonWidth = buttonWidthDouble.intValue();

    assert buttonLeftMargin != null;
    btnLayoutParams.leftMargin = buttonLeftMargin.intValue();
    assert buttonTopMargin != null;
    btnLayoutParams.topMargin = buttonTopMargin.intValue();
    btnLayoutParams.width = buttonWidth;
    btnLayoutParams.height = buttonHeight;

    return btnLayoutParams;
  }
}
