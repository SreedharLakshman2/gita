import SwiftUI

enum StoreLaunch {
    static var isActive: Bool {
        ProcessInfo.processInfo.arguments.contains("-storeScreenshot")
    }

    static var scene: String? {
        let args = ProcessInfo.processInfo.arguments
        guard let index = args.firstIndex(of: "-storeScreenshot"), args.indices.contains(index + 1) else {
            return nil
        }
        return args[index + 1]
    }

    static func startURL() -> URL {
        var items = [URLQueryItem]()
        if let scene {
            items.append(URLQueryItem(name: "screen", value: scene))
            switch scene {
            case "verse", "audio":
                items.append(URLQueryItem(name: "chapter", value: "2"))
                items.append(URLQueryItem(name: "verse", value: "47"))
            case "chapter":
                items.append(URLQueryItem(name: "chapter", value: "2"))
            default:
                break
            }
            if let tab = tab(for: scene) {
                items.append(URLQueryItem(name: "tab", value: tab))
            }
        }
        var parts = URLComponents(string: "gita://app/index.html")!
        if items.isEmpty == false {
            parts.queryItems = items
        }
        return parts.url!
    }

    static func bootJavaScript(idiom: String) -> String {
        var launch = ""
        if let scene {
            var fields = ["screen:\"\(scene)\""]
            switch scene {
            case "verse", "audio":
                fields.append("chapter:2")
                fields.append("verse:47")
            case "chapter":
                fields.append("chapter:2")
            default:
                break
            }
            if let tab = tab(for: scene) {
                fields.append("tab:\"\(tab)\"")
            }
            launch = "window.__GITA_LAUNCH__ = {\(fields.joined(separator: ","))};"
        } else if UITest.isActive {
            var fields = ["screen:\"\(UITest.screen)\""]
            switch UITest.screen {
            case "verse", "audio":
                fields.append("chapter:2")
                fields.append("verse:47")
            default:
                break
            }
            if let tab = tab(for: UITest.screen) {
                fields.append("tab:\"\(tab)\"")
            }
            launch = "window.__GITA_UITEST__ = {\(fields.joined(separator: ","))};"
        }
        return """
        window.__GITA_NATIVE__ = true;
        document.documentElement.classList.add("native", "\(idiom)");
        document.documentElement.dataset.theme = "dark";
        document.documentElement.style.colorScheme = "dark";
        \(launch)
        """
    }

    enum UITest {
        static var isActive: Bool {
            ProcessInfo.processInfo.arguments.contains("-uiTest")
        }

        static var screen: String {
            let args = ProcessInfo.processInfo.arguments
            guard let index = args.firstIndex(of: "-uiTest"), args.indices.contains(index + 1) else {
                return "home"
            }
            let next = args[index + 1]
            return next.hasPrefix("-") ? "home" : next
        }
    }

    private static func tab(for scene: String) -> String? {
        switch scene {
        case "home": return "home"
        case "chapters", "chapter": return "gita"
        case "daily": return "daily"
        case "bookmarks": return "bookmarks"
        case "language", "profile": return "profile"
        default: return nil
        }
    }
}

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
