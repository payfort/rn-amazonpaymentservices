import Foundation

@objc (CustomCheckout)
class CustomCheckout: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func view() -> UIView! {
    return CustomCheckoutView()
  }
}
