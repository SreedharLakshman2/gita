import SwiftUI

struct RootView: View {
    @EnvironmentObject private var ads: AdsManager
    @State private var showSplash = StoreLaunch.isActive == false

    private var tabBarChrome: CGFloat {
        UIDevice.current.userInterfaceIdiom == .pad ? 72 : 64
    }

    var body: some View {
        GeometryReader { geo in
            ZStack {
                WebAppView(adHeight: showSplash ? 0 : ads.reserveHeight)
                    .ignoresSafeArea()

                if showSplash == false, ads.shouldShowBanner {
                    VStack(spacing: 0) {
                        Spacer()
                            .allowsHitTesting(false)
                        BannerAdView(width: geo.size.width)
                            .frame(height: ads.bannerHeight)
                            .frame(maxWidth: .infinity)
                            .background(Color(red: 18 / 255, green: 21 / 255, blue: 28 / 255))
                        Color.clear
                            .frame(height: tabBarChrome + geo.safeAreaInsets.bottom)
                            .allowsHitTesting(false)
                    }
                    .ignoresSafeArea(edges: .bottom)
                }

                if showSplash {
                    LaunchSplashView {
                        withAnimation(.easeOut(duration: 0.35)) {
                            showSplash = false
                        }
                        AdsManager.shared.markSplashFinished()
                    }
                    .transition(.opacity)
                    .zIndex(1)
                }
            }
        }
        .animation(.easeInOut(duration: 0.35), value: showSplash)
    }
}
