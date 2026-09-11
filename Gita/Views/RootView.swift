import SwiftUI
import UIKit

struct RootView: View {
    @EnvironmentObject private var ads: AdsManager
    @State private var showSplash = StoreLaunch.isActive == false && StoreLaunch.UITest.isActive == false

    /// Matches `html.native .tabbar`: 6 + 52 + 6 content, plus `--safe-bot`.
    private var tabBarLift: CGFloat {
        64 + AdsManager.bottomSafeInset()
    }

    private var bannerBackdrop: Color {
        ads.darkTheme
            ? Color(red: 18 / 255, green: 21 / 255, blue: 28 / 255)
            : Color(red: 251 / 255, green: 246 / 255, blue: 234 / 255)
    }

    var body: some View {
        ZStack {
            WebAppView(adHeight: showSplash ? 0 : ads.reserveHeight)
                .ignoresSafeArea()

            if showSplash == false, ads.shouldShowBanner {
                VStack(spacing: 0) {
                    Spacer()
                        .allowsHitTesting(false)
                    BannerAdView()
                        .frame(height: AdConfig.bannerHeight)
                        .frame(maxWidth: .infinity)
                        .background(bannerBackdrop)
                        .clipped()
                    Color.clear
                        .frame(height: tabBarLift)
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
        .animation(.easeInOut(duration: 0.35), value: showSplash)
        .onAppear {
            if showSplash == false {
                AdsManager.shared.markSplashFinished()
            }
        }
    }
}
