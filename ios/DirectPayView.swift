import Foundation

import UIKit
import PayFortSDK
import React

class DirectPayView: UIView {
      
    let vc = RCTPresentedViewController()
    
    var environmentString = String()
    var tokenNameString = String()
    var requestDictionary: Dictionary<String, String> = [:]
    var payButtonStyleDictionary: Dictionary<String, Any> = [:]

    @objc var onSuccess: RCTDirectEventBlock?
    @objc var onFailure: RCTDirectEventBlock?
    
    @IBOutlet private var payButton: PayButton!
    
    @objc var environment: NSString = "" {
      didSet {
        NSLog(environment as String)
        environmentString = String(environment)
          setupView()
      }
    }
    
    @objc var payButtonProps: NSDictionary = [:] {
      didSet {
          let buttonStyle = payButtonProps as! Dictionary<String, Any>
          payButtonStyleDictionary = buttonStyle
          setupView()
      }
    }
    
    @objc var requestObject: NSDictionary = [:] {
      didSet {
          let request = requestObject as! Dictionary<String, String>
          requestDictionary = request
          setupView()
      }
    }
    
    private func setupView() {
    
        
        guard environmentString != "" && requestDictionary != [:] else { return }
        guard (environmentString == "TEST" || environmentString == "PRODUCTION") else { return }
  

        payButton = PayButton()

        payButton = Utils.customizeButton(payButton: payButton, payButtonStyleDictionary: payButtonStyleDictionary)
        
        payButton.setup(with: requestDictionary, enviroment: environmentString == "PRODUCTION" ? .production : .sandBox, viewController: vc!) {
            // Process started
              self.payButton.setTitle("...", for: .normal)
            } success: { (requestDic, responeDic) in
            // Process success
              print("success")
              self.payButton.setTitle(" Done ", for: .normal)
              if (self.onSuccess != nil) {
                self.onSuccess!(["response": responeDic])
              }
            } faild: { (requestDic, responeDic, message) in
            // Process faild
              print("faild")
              self.payButton.setTitle(" Failed ", for: .normal)
              if (self.onFailure != nil) {
                self.onFailure!(["response": responeDic])
              }
            }
        
        payButton.translatesAutoresizingMaskIntoConstraints = false
        
        self.addSubview(payButton)
        
        
        let payButtonPaddingVertical: CGFloat = payButtonStyleDictionary["buttonHeight"] as? CGFloat ?? 30
        let payButtonPaddingHorizontal: CGFloat = payButtonStyleDictionary["buttonWidth"] as? CGFloat ?? 40
        
        
        let payButtonMarginLeft: CGFloat = payButtonStyleDictionary["marginLeft"] as? CGFloat ?? 15
        let payButtonMarginTop: CGFloat = payButtonStyleDictionary["marginTop"] as? CGFloat ?? 15
               
        NSLayoutConstraint.activate([

          payButton.topAnchor.constraint(equalTo: self.topAnchor, constant: payButtonMarginTop),
          payButton.leftAnchor.constraint(equalTo: self.leftAnchor, constant: payButtonMarginLeft),
          
          payButton.widthAnchor.constraint(equalToConstant: payButtonPaddingHorizontal * 2),
          payButton.heightAnchor.constraint(equalToConstant: payButtonPaddingVertical * 2),

        ])
    
    }
    
    
    
    
  
}
