import Foundation

import UIKit
import PayFortSDK
import React

class StandardCheckoutView: UIView {
    
    let vc = RCTPresentedViewController()
    
    var payFort = PayFortController.init(enviroment: .sandBox)
    
    var environmentString = String()
    var requestDictionary: Dictionary<String, String> = [:]
    var showLoadingBool = Bool()
    var showResponsePageBool = Bool()

    @objc var requestCode: NSNumber?
    @objc var onSuccess: RCTDirectEventBlock?
    @objc var onFailure: RCTDirectEventBlock?
    @objc var environment: NSString = "" {
      didSet {
        environmentString = String(environment)
        callStandardRequest()
      }
    }
    
    @objc var requestObject: NSDictionary = [:] {
      didSet {
          let request = requestObject as! Dictionary<String, String>
          requestDictionary = request
        callStandardRequest()
      }
    }
    
    @objc var showLoading: NSNumber = 3 {
      didSet {
          showLoadingBool = showLoading == 1 ? true : false
        callStandardRequest()
      }
    }
    
    @objc var showResponsePage: NSNumber = 3 {
      didSet {
          showResponsePageBool = showResponsePage == 1 ? true : false
        callStandardRequest()
      }
    }
    
    override init(frame: CGRect) {
      super.init(frame: frame)
    }
    
    required init?(coder aDecoder: NSCoder) {
      super.init(coder: aDecoder)
    }

    private func callStandardRequest () {
        guard environmentString != "" && requestObject != [:] && showLoading != 3 else { return }
        guard (environmentString == "TEST" || environmentString == "PRODUCTION") else { return }
        
        let request = requestObject as! Dictionary<String, String>
        
        payFort = PayFortController.init(enviroment: environmentString == "PRODUCTION" ? .production : .sandBox)
        
        payFort.hideLoading = !showLoadingBool

        payFort.isShowResponsePage  = showResponsePageBool

        payFort.callPayFort(withRequest: request, currentViewController: vc!,
            success: { (requestDic, responeDic) in
                print("success")
                if (self.onSuccess != nil) {
                  self.onSuccess!(["response": responeDic])
                }
            },
            canceled: { (requestDic, responeDic) in
                print("canceled")
                if (self.onFailure != nil) {
                  self.onFailure!(["response": responeDic])
                }
            },
            faild: { (requestDic, responeDic, message) in
                print("faild")
                if (self.onFailure != nil) {
                  self.onFailure!(["response": responeDic])
                }
        })
    }
}
