import Foundation

import UIKit
import PayFortSDK
import React

class CustomCheckoutView: UIView {
    
    let vc = RCTPresentedViewController()
    
    var environmentString = String()
    var requestDictionary: Dictionary<String, String> = [:]
    var payButtonStyleDictionary: Dictionary<String, Any> = [:]

    @objc var onSuccess: RCTDirectEventBlock?
    @objc var onFailure: RCTDirectEventBlock?
    
    @IBOutlet private var cardNumberView: CardNumberView!
    @IBOutlet private var expiryDateView: ExpiryDateView!
    @IBOutlet private var cvcNumberView: CVCNumberView!
    @IBOutlet private var holderNameView: HolderNameView!
    @IBOutlet private var saveCardSwitch: UISwitch!
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
  
        cardNumberView = CardNumberView()
        expiryDateView = ExpiryDateView()
        cvcNumberView = CVCNumberView()
        holderNameView = HolderNameView()
        saveCardSwitch = UISwitch()
        payButton = PayButton()
 
        saveCardSwitch.isOn = true
        
        payButton = Utils.customizeButton(payButton: payButton, payButtonStyleDictionary: payButtonStyleDictionary)
        
        let builder = PayComponents(cardNumberView: cardNumberView, expiryDateView: expiryDateView, cvcNumberView: cvcNumberView, holderNameView: holderNameView,  rememberMe: saveCardSwitch.isOn, language: "en")
        
        payButton.setup(with: requestDictionary, enviroment: environmentString == "PRODUCTION" ? .production : .sandBox, payButtonBuilder: builder, viewController: vc!) {
            // Process started
              self.payButton.setTitle("...", for: .normal)
            } success: { (requestDic, responeDic) in
            // Process success
              self.payButton.setTitle(" Done ", for: .normal)
              if (self.onSuccess != nil) {
                self.onSuccess!(["response": responeDic])
              }
            } faild: { (requestDic, responeDic, message) in
            // Process faild
              self.payButton.setTitle(" Failed ", for: .normal)
              if (self.onFailure != nil) {
                self.onFailure!(["response": responeDic])
              }
            }
        
        
        cardNumberView.translatesAutoresizingMaskIntoConstraints = false
        expiryDateView.translatesAutoresizingMaskIntoConstraints = false
        cvcNumberView.translatesAutoresizingMaskIntoConstraints = false
        holderNameView.translatesAutoresizingMaskIntoConstraints = false
//        saveCardSwitch.translatesAutoresizingMaskIntoConstraints = false
        payButton.translatesAutoresizingMaskIntoConstraints = false
        
        self.addSubview(cardNumberView)
        self.addSubview(expiryDateView)
        self.addSubview(cvcNumberView)
        self.addSubview(holderNameView)
//        self.addSubview(saveCardSwitch)
        self.addSubview(payButton)
        
        
        let payButtonPaddingVertical: CGFloat = payButtonStyleDictionary["buttonHeight"] as? CGFloat ?? 30
        let payButtonPaddingHorizontal: CGFloat = payButtonStyleDictionary["buttonWidth"] as? CGFloat ?? 40
        
        let payButtonMarginLeft: CGFloat = payButtonStyleDictionary["marginLeft"] as? CGFloat ?? 15
        let payButtonMarginTop: CGFloat = payButtonStyleDictionary["marginTop"] as? CGFloat ?? 15
               


        NSLayoutConstraint.activate([
          cardNumberView.topAnchor.constraint(equalTo: self.topAnchor, constant: 20),
          cardNumberView.leftAnchor.constraint(equalTo: self.leftAnchor),
          cardNumberView.widthAnchor.constraint(equalTo: self.widthAnchor),

          expiryDateView.topAnchor.constraint(equalTo: cardNumberView.bottomAnchor, constant: 20),
          expiryDateView.leftAnchor.constraint(equalTo: self.leftAnchor),
          expiryDateView.widthAnchor.constraint(equalTo: self.widthAnchor),

          cvcNumberView.topAnchor.constraint(equalTo: expiryDateView.bottomAnchor, constant: 20),
          cvcNumberView.leftAnchor.constraint(equalTo: self.leftAnchor),
          cvcNumberView.widthAnchor.constraint(equalTo: self.widthAnchor),

          holderNameView.topAnchor.constraint(equalTo: cvcNumberView.bottomAnchor, constant: 20),
          holderNameView.leftAnchor.constraint(equalTo: self.leftAnchor),
          holderNameView.widthAnchor.constraint(equalTo: self.widthAnchor),

          payButton.topAnchor.constraint(equalTo: holderNameView.bottomAnchor, constant: payButtonMarginTop),
          payButton.leftAnchor.constraint(equalTo: self.leftAnchor, constant: payButtonMarginLeft),
          
          payButton.widthAnchor.constraint(equalToConstant: payButtonPaddingHorizontal * 2),
          payButton.heightAnchor.constraint(equalToConstant: payButtonPaddingVertical * 2),

        ])
    
    }
    
    
    
    
    
    
    
}
