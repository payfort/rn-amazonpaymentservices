import Foundation
import UIKit
import PayFortSDK

class Utils {
    
    static func customizeButton(payButton: PayButton, payButtonStyleDictionary: Dictionary<String, Any>) -> PayButton {
        payButton.backgroundColor = UIColor(hex: payButtonStyleDictionary["backgroundColor"] as? String ?? "#026cff")
        
        payButton.setTitle(payButtonStyleDictionary["text"] as? String, for: .normal)
        
        let payButtonTitleColor: String = payButtonStyleDictionary["textColor"] as? String ?? "#ffffff"
        payButton.setTitleColor(UIColor(hex: payButtonTitleColor), for: .normal)
        
        
        let payButtonTitleSize: CGFloat = payButtonStyleDictionary["textSize"] as? CGFloat ?? 20
        let payButtonTitleFont: String = payButtonStyleDictionary["textFontFamily"] as? String ?? ""
        
        payButton.titleLabel?.font = payButtonTitleFont.count > 0 ? UIFont.systemFont(ofSize: payButtonTitleSize) : UIFont(name: payButtonTitleFont, size: payButtonTitleSize)
        
        let payButtonBorderRadius: CGFloat = payButtonStyleDictionary["borderRadius"] as? CGFloat ?? 20
        let payButtonBorderWidth: CGFloat = payButtonStyleDictionary["borderWidth"] as? CGFloat ?? 0
        let payButtonBorderColor: String = payButtonStyleDictionary["borderColor"] as? String ?? ""
        
        payButton.layer.cornerRadius = payButtonBorderRadius
        payButton.layer.borderWidth = payButtonBorderWidth
        payButton.layer.borderColor = UIColor(hex: payButtonBorderColor).cgColor
        
        return payButton
    }
  
}


extension UIColor {
   convenience init(red: Int, green: Int, blue: Int) {
       assert(red >= 0 && red <= 255, "Invalid red component")
       assert(green >= 0 && green <= 255, "Invalid green component")
       assert(blue >= 0 && blue <= 255, "Invalid blue component")

       self.init(red: CGFloat(red) / 255.0, green: CGFloat(green) / 255.0, blue: CGFloat(blue) / 255.0, alpha: 1.0)
   }

   convenience init(rgb: Int) {
       self.init(
           red: (rgb >> 16) & 0xFF,
           green: (rgb >> 8) & 0xFF,
           blue: rgb & 0xFF
       )
   }
    
    convenience init(hex: String) {
        var cString:String = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

        if (cString.hasPrefix("#")) {
            cString.remove(at: cString.startIndex)
        }


        var rgbValue:UInt64 = 0
        Scanner(string: cString).scanHexInt64(&rgbValue)
        
        self.init(
            red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
            green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
            blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
            alpha: CGFloat(1.0)
        )
    }
}

