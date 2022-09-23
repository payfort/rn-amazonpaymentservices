import Foundation

@objc (DirectPay)
class DirectPay: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func view() -> UIView! {
    return DirectPayView()
  }
}
