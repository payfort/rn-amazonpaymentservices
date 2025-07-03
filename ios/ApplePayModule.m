#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ApplePayModule, NSObject)
RCT_EXTERN_METHOD(isApplePayAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(startPayment:(NSDictionary *)paymentDetails resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
