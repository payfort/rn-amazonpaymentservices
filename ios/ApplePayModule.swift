import Foundation
import PassKit
import React
import PayFortSDK

@objc(ApplePayModule)
class ApplePayModule: NSObject, PKPaymentAuthorizationViewControllerDelegate {
    
    var paymentResolver: RCTPromiseResolveBlock?
    var paymentRejecter: RCTPromiseRejectBlock?
    var transactionDetails: [String: String]?
    var environment: String?


    @objc
    func isApplePayAvailable(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        let canMakePayments = PKPaymentAuthorizationController.canMakePayments()
        resolve(canMakePayments)
    }
    
    @objc
    func startPayment(_ paymentDetails: NSDictionary, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        
        guard PKPaymentAuthorizationViewController.canMakePayments() else {
            rejecter("APPLE_PAY_UNAVAILABLE", "Apple Pay is not available", nil)
            return
        }

        guard (paymentDetails["environment"] as! String == "TEST" || paymentDetails["environment"] as! String == "PRODUCTION") else { 
            rejecter("INVALID_ENVIRONMENT", "Environment not valid", nil)
            return 
        }

        self.environment = paymentDetails["environment"] as? String
        
        // Extract values safely
        guard let amountString = paymentDetails["displayAmount"] as? String, !amountString.isEmpty else {
            rejecter("INVALID_AMOUNT", "Display amount is required", nil)
            return
        }
        let amount = NSDecimalNumber(string: amountString)
        
        let merchantIdentifier = paymentDetails["merchantIdentifier"] as? String ?? ""
        let countryCode = paymentDetails["countryCode"] as? String ?? "US"
        let currencyCode = paymentDetails["currencyCode"] as? String ?? "USD"
        
        let supportedNetworksRaw = (paymentDetails["supportedNetworks"] as? [String]) ?? []
        
        
        let merchantCapabilities: PKMerchantCapability = .capability3DS
        
        // Create payment request
        let paymentRequest = PKPaymentRequest()
        paymentRequest.merchantIdentifier = merchantIdentifier
        paymentRequest.merchantCapabilities = merchantCapabilities
        paymentRequest.countryCode = countryCode
        paymentRequest.currencyCode = currencyCode
        paymentRequest.supportedNetworks = supportedNetworksRaw.compactMap { network in
            switch network.lowercased() {
                case "visa": return .visa
                case "mastercard": return .masterCard
                case "amex": return .amex
                case "mada": return .mada
                default: return nil
            }
        }
        
        if let transactionDetails = paymentDetails["transactionDetails"] as? [String: String] {
            self.transactionDetails = transactionDetails
        } else {
            rejecter("MISSING_TRANSACTION_DETAILS", "Transaction details missing", nil)
            return
        }
        
        // Set Payment Total
        paymentRequest.paymentSummaryItems = [
            PKPaymentSummaryItem(label: "Total", amount: amount)
        ]

        if !PKPaymentAuthorizationViewController.canMakePayments(usingNetworks: paymentRequest.supportedNetworks) {
            rejecter("APPLE_PAY_UNAVAILABLE", "Apple Pay not supported with the provided networks", nil)
            return
        }
        
        // Present Apple Pay
        DispatchQueue.main.async {
            if let paymentController = PKPaymentAuthorizationViewController(paymentRequest: paymentRequest) {
                paymentController.delegate = self
                if let rootViewController = UIApplication.shared.keyWindow?.rootViewController {
                    self.paymentResolver = resolver
                    self.paymentRejecter = rejecter
                    rootViewController.present(paymentController, animated: true, completion: nil)
                }
            } else {
                rejecter("APPLE_PAY_UNAVAILABLE", "Unable to present Apple Pay", nil)
            }
        }
        
    }
    
    // Handle Payment Authorization
    func paymentAuthorizationViewController(_ controller: PKPaymentAuthorizationViewController, didAuthorizePayment payment: PKPayment, completion: @escaping (PKPaymentAuthorizationStatus) -> Void) {
        
        let tokenData = String(data: payment.token.paymentData, encoding: .utf8) ?? ""
        
        let payFort = PayFortController.init(enviroment: self.environment == "PRODUCTION" ? .production : .sandBox)

         if (tokenData.count != 0) {
             if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
                let window = scene.windows.first,
                let viewController = window.rootViewController {
                payFort.callPayFortForApplePay(
                    withRequest: self.transactionDetails!,
                    applePayPayment: payment,
                    currentViewController: viewController
                ) { (requestDic, responseDic) in
                                
                    self.paymentResolver?(responseDic)
                    self.paymentResolver = nil
                    self.paymentRejecter = nil
                    completion(.success)
                    
                } faild: { (requestDic, responseDic, message) in
                
                    self.paymentRejecter?("PAYMENT_FAILED", message, nil)
                    self.paymentResolver = nil
                    self.paymentRejecter = nil
                
                    completion(.failure)
                }
            } else {
                self.paymentRejecter?("PAYMENT_FAILED", "Unable to find root view controller", nil)
                self.paymentResolver = nil
                self.paymentRejecter = nil
                completion(.failure)
            }
         } else {
                self.paymentRejecter?("PAYMENT_FAILED", "Authentication Failed", nil)
                self.paymentResolver = nil
                self.paymentRejecter = nil
             completion(.failure)
         }
    }
    
    // Handle Payment Cancellation
    func paymentAuthorizationViewControllerDidFinish(_ controller: PKPaymentAuthorizationViewController) {
        controller.dismiss(animated: true) {
            self.paymentRejecter?("PAYMENT_CANCELLED", "User cancelled payment", nil)
            self.paymentResolver = nil
            self.paymentRejecter = nil
        }
    }
}
