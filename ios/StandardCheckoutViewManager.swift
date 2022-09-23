import Foundation

@objc (StandardCheckout)
class StandardCheckout: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func view() -> UIView! {
    return StandardCheckoutView()
  }
}
