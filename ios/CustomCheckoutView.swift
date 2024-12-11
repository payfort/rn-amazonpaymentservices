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
    
    @IBOutlet public weak var numberErrorLabel: UILabel!
    @IBOutlet public weak var expiryErrorLabel: UILabel!
    @IBOutlet public weak var cvcErrorLabel: UILabel!
    @IBOutlet public weak var holderErrorLabel: UILabel!
    
    
    
    
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
        
        let builder = PayComponents(cardNumberView: cardNumberView, expiryDateView: expiryDateView, cvcNumberView: cvcNumberView, holderNameView: holderNameView,  rememberMe: saveCardSwitch.isOn, language: requestDictionary["language"] ?? "en")
        
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
        
        numberErrorLabel = cardNumberView.errorLabel
        expiryErrorLabel = expiryDateView.errorLabel
        cvcErrorLabel = cvcNumberView.errorLabel
        holderErrorLabel = holderNameView.errorLabel
        
        cardNumberView.translatesAutoresizingMaskIntoConstraints = false
        numberErrorLabel.translatesAutoresizingMaskIntoConstraints = false
        expiryDateView.translatesAutoresizingMaskIntoConstraints = false
        expiryErrorLabel.translatesAutoresizingMaskIntoConstraints = false
        cvcNumberView.translatesAutoresizingMaskIntoConstraints = false
        cvcErrorLabel.translatesAutoresizingMaskIntoConstraints = false
        holderNameView.translatesAutoresizingMaskIntoConstraints = false
        holderNameView.translatesAutoresizingMaskIntoConstraints = false
        saveCardSwitch.translatesAutoresizingMaskIntoConstraints = false
        payButton.translatesAutoresizingMaskIntoConstraints = false
        
        //cardNumberView.frame = CGRect(x: 0, y: 0, width: cardNumberView.frame.width, height: cardNumberView.frame.height + 40.0)
        //cardNumberView.layoutIfNeeded()
        
        
        self.addSubview(cardNumberView)
        self.addSubview(numberErrorLabel)
        self.addSubview(expiryDateView)
        self.addSubview(expiryErrorLabel)
        self.addSubview(cvcNumberView)
        self.addSubview(cvcErrorLabel)
        self.addSubview(holderNameView)
        self.addSubview(holderErrorLabel)
        //self.addSubview(saveCardSwitch)
        self.addSubview(payButton)
        
        
        let payButtonPaddingVertical: CGFloat = payButtonStyleDictionary["buttonHeight"] as? CGFloat ?? 30
        let payButtonPaddingHorizontal: CGFloat = payButtonStyleDictionary["buttonWidth"] as? CGFloat ?? 40
        
        let payButtonMarginLeft: CGFloat = payButtonStyleDictionary["marginLeft"] as? CGFloat ?? 15
        let payButtonMarginTop: CGFloat = payButtonStyleDictionary["marginTop"] as? CGFloat ?? 15
               


        NSLayoutConstraint.activate([
          cardNumberView.topAnchor.constraint(equalTo: self.topAnchor, constant: 20),
          cardNumberView.leftAnchor.constraint(equalTo: self.leftAnchor),
          cardNumberView.widthAnchor.constraint(equalTo: self.widthAnchor),
          
          numberErrorLabel.topAnchor.constraint(equalTo: cardNumberView.topAnchor, constant: 20),
          numberErrorLabel.leftAnchor.constraint(equalTo: self.leftAnchor),
          numberErrorLabel.widthAnchor.constraint(equalTo: self.widthAnchor),
          
          expiryDateView.topAnchor.constraint(equalTo: cardNumberView.bottomAnchor, constant: 30),
          expiryDateView.leftAnchor.constraint(equalTo: self.leftAnchor),
          expiryDateView.widthAnchor.constraint(equalTo: self.widthAnchor),
          
          expiryErrorLabel.topAnchor.constraint(equalTo: expiryDateView.topAnchor, constant: 20),
          expiryErrorLabel.leftAnchor.constraint(equalTo: self.leftAnchor),
          expiryErrorLabel.widthAnchor.constraint(equalTo: self.widthAnchor),

          cvcNumberView.topAnchor.constraint(equalTo: expiryErrorLabel.bottomAnchor, constant: 20),
          cvcNumberView.leftAnchor.constraint(equalTo: self.leftAnchor),
          cvcNumberView.widthAnchor.constraint(equalTo: self.widthAnchor),
          
          cvcErrorLabel.topAnchor.constraint(equalTo: cvcNumberView.topAnchor, constant: 20),
          cvcErrorLabel.leftAnchor.constraint(equalTo: self.leftAnchor),
          cvcErrorLabel.widthAnchor.constraint(equalTo: self.widthAnchor),

          holderNameView.topAnchor.constraint(equalTo: cvcErrorLabel.bottomAnchor, constant: 20),
          holderNameView.leftAnchor.constraint(equalTo: self.leftAnchor),
          holderNameView.widthAnchor.constraint(equalTo: self.widthAnchor),
          
          holderErrorLabel.topAnchor.constraint(equalTo: holderNameView.topAnchor, constant: 20),
          holderErrorLabel.leftAnchor.constraint(equalTo: self.leftAnchor),
          holderErrorLabel.widthAnchor.constraint(equalTo: self.widthAnchor),

          payButton.topAnchor.constraint(equalTo: holderNameView.bottomAnchor, constant: payButtonMarginTop),
          payButton.leftAnchor.constraint(equalTo: self.leftAnchor, constant: payButtonMarginLeft),
          
          payButton.widthAnchor.constraint(equalToConstant: payButtonPaddingHorizontal * 2),
          payButton.heightAnchor.constraint(equalToConstant: payButtonPaddingVertical * 2),

        ])
    
    }
    
    
    
    
    
    
    
}
