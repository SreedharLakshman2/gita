import AppTrackingTransparency
import Combine
import Foundation
import GoogleMobileAds
import UIKit

final class AdsManager: NSObject, ObservableObject {
    static let shared = AdsManager()

    @Published var sdkReady = false
    @Published var tabBarVisible = false
    @Published var bannerHeight: CGFloat = AdConfig.bannerHeight
    @Published var bannerFailed = false
    @Published var darkTheme = true

    private var splashFinished = false
    private var didStartAds = false
    private var attRequestInFlight = false

    var reserveHeight: CGFloat {
        guard splashFinished, sdkReady, tabBarVisible, bannerFailed == false else { return 0 }
        return AdConfig.bannerHeight
    }

    var shouldShowBanner: Bool { reserveHeight > 0 }

    func markSplashFinished() {
        guard StoreLaunch.isActive == false else { return }
        splashFinished = true
        requestTrackingThenStart()
    }

    func onAppBecameActive() {
        requestTrackingThenStart()
    }

    func setTabBarVisible(_ visible: Bool, dark: Bool? = nil) {
        tabBarVisible = visible
        if let dark {
            darkTheme = dark
        }
    }

    func noteBannerLoaded(height: CGFloat) {
        bannerFailed = false
        bannerHeight = min(max(height, 0), AdConfig.bannerHeight)
    }

    func noteBannerFailed() {
        bannerFailed = true
    }

    private func requestTrackingThenStart() {
        guard splashFinished else { return }

        if #available(iOS 14, *) {
            if StoreLaunch.UITest.isActive {
                startAds()
                return
            }
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
        guard StoreLaunch.isActive == false else { return }
        guard AdConfig.adsEnabled else { return }
        guard didStartAds == false else { return }
        didStartAds = true
        GADMobileAds.sharedInstance().start { [weak self] _ in
            DispatchQueue.main.async {
                self?.sdkReady = true
            }
        }
    }

    static func keyWindow() -> UIWindow? {
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap(\.windows)
            .first { $0.isKeyWindow }
    }

    static func keyWindowRoot() -> UIViewController? {
        keyWindow()?.rootViewController
    }

    static func bottomSafeInset() -> CGFloat {
        let inset = keyWindow()?.safeAreaInsets.bottom ?? 0
        return max(inset, 0)
    }
}
