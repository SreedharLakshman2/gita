import SwiftUI

@main
struct GitaApp: App {
    @Environment(\.scenePhase) private var scenePhase
    @StateObject private var ads = AdsManager.shared

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(ads)
                .preferredColorScheme(.dark)
                .onChange(of: scenePhase) { phase in
                    if phase == .active {
                        AdsManager.shared.onAppBecameActive()
                    }
                }
        }
    }
}
