import AppTrackingTransparency
import Combine
import Foundation
import GoogleMobileAds
import UIKit

final class AdsManager: NSObject, ObservableObject {
    static let shared = AdsManager()

    @Published var sdkReady = false
    @Published var tabBarVisible = false
    @Published var bannerHeight: CGFloat = 50
    @Published var bannerFailed = false

    private var splashFinished = false
    private var didStartAds = false
    private var attRequestInFlight = false

    var reserveHeight: CGFloat {
        guard splashFinished, sdkReady, tabBarVisible, bannerFailed == false else { return 0 }
        return bannerHeight
    }

    var shouldShowBanner: Bool { reserveHeight > 0 }

    func markSplashFinished() {
        splashFinished = true
        requestTrackingThenStart()
    }

    func onAppBecameActive() {
        requestTrackingThenStart()
    }

    func setTabBarVisible(_ visible: Bool) {
        tabBarVisible = visible
    }

    func noteBannerLoaded(height: CGFloat) {
        bannerFailed = false
        if height > 0 {
            bannerHeight = height
        }
    }

    func noteBannerFailed() {
        bannerFailed = true
    }

    private func requestTrackingThenStart() {
        guard splashFinished else { return }

        if #available(iOS 14, *) {
            switch ATTrackingManager.trackingAuthorizationStatus {
            case .notDetermined:
                presentATTIfPossible()
            default:
                startAds()
            }
        } else {
            startAds()
        }
    }

    @available(iOS 14, *)
    private func presentATTIfPossible() {
        guard attRequestInFlight == false else { return }
        guard UIApplication.shared.applicationState == .active else { return }

        attRequestInFlight = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) { [weak self] in
            guard let self else { return }
            guard UIApplication.shared.applicationState == .active else {
                self.attRequestInFlight = false
                return
            }
            guard ATTrackingManager.trackingAuthorizationStatus == .notDetermined else {
                self.attRequestInFlight = false
                self.startAds()
                return
            }
            ATTrackingManager.requestTrackingAuthorization { _ in
                DispatchQueue.main.async {
                    self.attRequestInFlight = false
                    self.startAds()
                }
            }
        }
    }

    private func startAds() {
        guard AdConfig.adsEnabled else { return }
        guard didStartAds == false else { return }
        didStartAds = true
        GADMobileAds.sharedInstance().start { [weak self] _ in
            DispatchQueue.main.async {
                self?.sdkReady = true
            }
        }
    }

    static func keyWindowRoot() -> UIViewController? {
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap(\.windows)
            .first { $0.isKeyWindow }?
            .rootViewController
    }
}
