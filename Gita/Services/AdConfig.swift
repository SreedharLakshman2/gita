import Foundation

enum AdConfig {
    static let testBannerUnit = "ca-app-pub-3940256099942544/2934735716"

    /// Gita iOS app in AdMob (`com.sreeo.gita`). Must match `GADApplicationIdentifier` in Info.plist.
    static let productionAppID = "ca-app-pub-9471606055191983~1851426228"

    static let productionBannerUnit = "ca-app-pub-9471606055191983/4801023196"

    static var adsEnabled: Bool {
        #if DEBUG
        return true
        #else
        return productionAppID.isEmpty == false && productionBannerUnit.isEmpty == false
        #endif
    }

    static var bannerAdUnitId: String {
        #if DEBUG
        return testBannerUnit
        #else
        return productionBannerUnit
        #endif
    }
}
