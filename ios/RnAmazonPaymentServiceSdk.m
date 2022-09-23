#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <PayFortSDK/PayFortSDK-Swift.h>
#import <React/RCTViewManager.h>

#import "RnAmazonPaymentServiceSdk.h"

@implementation RnAmazonPaymentServiceSdk

RCT_EXPORT_MODULE(RnAmazonPaymentServiceSdk)

RCT_EXPORT_METHOD(getDeviceID: (RCTPromiseResolveBlock)resolve
                      rejecter:(RCTPromiseRejectBlock)reject)
{
  PayFortController *payFort = [[PayFortController alloc]initWithEnviroment: PayFortEnviromentProduction];


  NSString* deviceId = [payFort getUDID];
    if (deviceId) {
       resolve(deviceId);
     } else {
       reject(@"event_failure", @"no event id returned", nil);
     }

}


@end

@interface RCT_EXTERN_MODULE(StandardCheckout, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(environment, NSString)
RCT_EXPORT_VIEW_PROPERTY(requestCode, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(showLoading, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(showResponsePage, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(requestObject, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onSuccess, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFailure, RCTDirectEventBlock)

@end

@interface RCT_EXTERN_MODULE(CustomCheckout, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(environment, NSString)
RCT_EXPORT_VIEW_PROPERTY(payButtonProps, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(requestObject, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onSuccess, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFailure, RCTDirectEventBlock)

@end

@interface RCT_EXTERN_MODULE(DirectPay, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(environment, NSString)
RCT_EXPORT_VIEW_PROPERTY(tokenName, NSString)
RCT_EXPORT_VIEW_PROPERTY(payButtonProps, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(requestObject, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onSuccess, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFailure, RCTDirectEventBlock)

@end


