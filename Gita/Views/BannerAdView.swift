import GoogleMobileAds
import SwiftUI
import UIKit

struct BannerAdView: UIViewRepresentable {
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> UIView {
        let box = UIView()
        box.clipsToBounds = true
        box.backgroundColor = .clear

        let banner = GADBannerView(adSize: GADAdSizeBanner)
        banner.adUnitID = AdConfig.bannerAdUnitId
        banner.rootViewController = AdsManager.keyWindowRoot()
        banner.delegate = context.coordinator
        banner.backgroundColor = .clear
        banner.clipsToBounds = true
        banner.translatesAutoresizingMaskIntoConstraints = false
        box.addSubview(banner)
        NSLayoutConstraint.activate([
            banner.centerXAnchor.constraint(equalTo: box.centerXAnchor),
            banner.centerYAnchor.constraint(equalTo: box.centerYAnchor),
            banner.widthAnchor.constraint(equalToConstant: AdConfig.bannerWidth),
            banner.heightAnchor.constraint(equalToConstant: AdConfig.bannerHeight),
        ])
        banner.load(GADRequest())
        context.coordinator.banner = banner
        return box
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        context.coordinator.banner?.rootViewController = AdsManager.keyWindowRoot()
    }

    final class Coordinator: NSObject, GADBannerViewDelegate {
        weak var banner: GADBannerView?

        func bannerViewDidReceiveAd(_ bannerView: GADBannerView) {
            AdsManager.shared.noteBannerLoaded(height: AdConfig.bannerHeight)
        }

        func bannerView(_ bannerView: GADBannerView, didFailToReceiveAdWithError error: Error) {
            AdsManager.shared.noteBannerFailed()
        }
    }
}
