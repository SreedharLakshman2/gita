import GoogleMobileAds
import SwiftUI
import UIKit

struct BannerAdView: UIViewRepresentable {
    var width: CGFloat

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> GADBannerView {
        let bannerWidth = max(width, 320)
        let size = GADCurrentOrientationAnchoredAdaptiveBannerAdSizeWithWidth(bannerWidth)
        let banner = GADBannerView(adSize: size)
        banner.adUnitID = AdConfig.bannerAdUnitId
        banner.rootViewController = AdsManager.keyWindowRoot()
        banner.delegate = context.coordinator
        banner.backgroundColor = UIColor(red: 18 / 255, green: 21 / 255, blue: 28 / 255, alpha: 1)
        banner.load(GADRequest())
        return banner
    }

    func updateUIView(_ uiView: GADBannerView, context: Context) {
        if uiView.rootViewController == nil {
            uiView.rootViewController = AdsManager.keyWindowRoot()
        }
    }

    final class Coordinator: NSObject, GADBannerViewDelegate {
        func bannerViewDidReceiveAd(_ bannerView: GADBannerView) {
            AdsManager.shared.noteBannerLoaded(height: bannerView.adSize.size.height)
        }

        func bannerView(_ bannerView: GADBannerView, didFailToReceiveAdWithError error: Error) {
            AdsManager.shared.noteBannerFailed()
        }
    }
}
