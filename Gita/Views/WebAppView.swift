import SwiftUI
import UIKit
import UniformTypeIdentifiers
import WebKit

final class GitaWebView: WKWebView {
    var onSafeAreaChange: ((UIEdgeInsets) -> Void)?
    private var lastInsets = UIEdgeInsets.zero

    override func safeAreaInsetsDidChange() {
        super.safeAreaInsetsDidChange()
        notifySafeArea()
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        notifySafeArea()
    }

    private func notifySafeArea() {
        let insets = safeAreaInsets
        guard insets != lastInsets else { return }
        lastInsets = insets
        onSafeAreaChange?(insets)
    }
}

struct WebAppView: UIViewRepresentable {
    var adHeight: CGFloat

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.setURLSchemeHandler(context.coordinator, forURLScheme: "gita")
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.defaultWebpagePreferences.allowsContentJavaScript = true

        let idiom = UIDevice.current.userInterfaceIdiom == .pad ? "ipad" : "iphone"
        let boot = StoreLaunch.bootJavaScript(idiom: idiom)
        config.userContentController.addUserScript(
            WKUserScript(source: boot, injectionTime: .atDocumentStart, forMainFrameOnly: true)
        )
        config.userContentController.add(context.coordinator, name: "sreeoSpeak")
        config.userContentController.add(context.coordinator, name: "sreeoStopSpeak")
        config.userContentController.add(context.coordinator, name: "sreeoNotify")
        config.userContentController.add(context.coordinator, name: "sreeoAmbient")
        config.userContentController.add(context.coordinator, name: "sreeoAds")

        let webView = GitaWebView(frame: .zero, configuration: config)
        context.coordinator.webView = webView
        DivineVoice.shared.onFinished = { [weak coordinator = context.coordinator] in
            coordinator?.webView?.evaluateJavaScript("window.__gitaSpeechEnded && window.__gitaSpeechEnded()", completionHandler: nil)
        }
        webView.navigationDelegate = context.coordinator
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 18 / 255, green: 21 / 255, blue: 28 / 255, alpha: 1)
        webView.scrollView.backgroundColor = webView.backgroundColor
        webView.scrollView.bounces = false
        webView.scrollView.delaysContentTouches = false
        webView.scrollView.canCancelContentTouches = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.allowsBackForwardNavigationGestures = false
        webView.onSafeAreaChange = { [weak webView] insets in
            guard let webView else { return }
            Coordinator.applySafeArea(webView, insets: insets)
        }
        #if DEBUG
        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }
        #endif
        var start = URLRequest(url: StoreLaunch.startURL())
        start.cachePolicy = .reloadIgnoringLocalCacheData
        webView.load(start)
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        Coordinator.applyAdHeight(uiView, height: adHeight)
    }

    final class Coordinator: NSObject, WKURLSchemeHandler, WKNavigationDelegate, WKScriptMessageHandler {
        weak var webView: WKWebView?

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "sreeoStopSpeak" {
                DivineVoice.shared.stop()
                return
            }
            if message.name == "sreeoNotify" {
                handleNotify(message.body)
                return
            }
            if message.name == "sreeoAmbient" {
                handleAmbient(message.body)
                return
            }
            if message.name == "sreeoAds" {
                handleAds(message.body)
                return
            }
            guard message.name == "sreeoSpeak" else { return }
            let text: String
            var rate: Float = 1
            var lang = "en-IN"
            var pitch: Float = 0.78
            var chapter: Int?
            var verse: Int?
            if let body = message.body as? [String: Any] {
                text = (body["text"] as? String) ?? ""
                if let value = body["rate"] as? Double {
                    rate = Float(value)
                }
                if let spokenLang = body["lang"] as? String, spokenLang.isEmpty == false {
                    lang = spokenLang
                }
                if let pitchValue = body["pitch"] as? Double {
                    pitch = Float(pitchValue)
                }
                if let chapterValue = body["chapter"] as? NSNumber {
                    chapter = chapterValue.intValue
                }
                if let verseValue = body["verse"] as? NSNumber {
                    verse = verseValue.intValue
                }
            } else if let spoken = message.body as? String {
                text = spoken
            } else {
                return
            }
            DivineVoice.shared.speak(text: text, lang: lang, rate: rate, pitch: pitch, chapter: chapter, verse: verse)
        }

        private func handleNotify(_ body: Any) {
            if StoreLaunch.UITest.isActive { return }
            guard let payload = body as? [String: Any] else { return }
            let enabled = payload["enabled"] as? Bool ?? false
            let title = (payload["title"] as? String) ?? "A verse from the Gita"
            let bodyText = (payload["body"] as? String) ?? "A quiet leaf for this morning."
            let hour = payload["hour"] as? Int ?? 7
            let minute = payload["minute"] as? Int ?? 0
            VerseNotifications.shared.sync(enabled: enabled, title: title, body: bodyText, hour: hour, minute: minute)
        }

        private func handleAmbient(_ body: Any) {
            guard let payload = body as? [String: Any] else { return }
            DivineVoice.shared.setAmbient(enabled: flag(payload["enabled"]), ducked: flag(payload["ducked"]))
        }

        private func handleAds(_ body: Any) {
            let visible: Bool
            var dark: Bool?
            if let payload = body as? [String: Any] {
                visible = flag(payload["visible"])
                if payload["dark"] != nil {
                    dark = flag(payload["dark"])
                }
            } else if let flag = body as? Bool {
                visible = flag
            } else {
                return
            }
            DispatchQueue.main.async {
                AdsManager.shared.setTabBarVisible(visible, dark: dark)
            }
        }

        private func flag(_ value: Any?) -> Bool {
            if let flag = value as? Bool { return flag }
            if let number = value as? NSNumber { return number.boolValue }
            if let number = value as? Int { return number != 0 }
            if let number = value as? Double { return number != 0 }
            return false
        }

        func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
            guard let url = urlSchemeTask.request.url else {
                urlSchemeTask.didFailWithError(URLError(.badURL))
                return
            }

            let path = Self.normalizedPath(url)
            guard let fileURL = Self.bundledFile(for: path) else {
                urlSchemeTask.didFailWithError(URLError(.fileDoesNotExist))
                return
            }

            do {
                var data = try Data(contentsOf: fileURL)
                if fileURL.pathExtension.lowercased() == "html" {
                    data = Self.injectBootScript(into: data)
                }
                let mime = Self.mimeType(for: fileURL)
                let response = HTTPURLResponse(
                    url: url,
                    statusCode: 200,
                    httpVersion: "HTTP/1.1",
                    headerFields: [
                        "Content-Type": mime,
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        "Pragma": "no-cache",
                    ]
                )!
                urlSchemeTask.didReceive(response)
                urlSchemeTask.didReceive(data)
                urlSchemeTask.didFinish()
            } catch {
                urlSchemeTask.didFailWithError(error)
            }
        }

        func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            Self.applySafeArea(webView, insets: webView.safeAreaInsets)
            Self.applyAdHeight(webView, height: AdsManager.shared.reserveHeight)
        }

        static func applySafeArea(_ webView: WKWebView, insets: UIEdgeInsets) {
            let top = max(insets.top, 0)
            let bot = max(insets.bottom, 0)
            let js = """
            document.documentElement.style.setProperty('--safe-top', '\(top)px');
            document.documentElement.style.setProperty('--safe-bot', '\(bot)px');
            """
            webView.evaluateJavaScript(js, completionHandler: nil)
        }

        static func applyAdHeight(_ webView: WKWebView, height: CGFloat) {
            let value = min(max(height, 0), AdConfig.bannerHeight)
            let js = """
            document.documentElement.style.setProperty('--ad-banner-h', '\(value)px');
            document.documentElement.classList.toggle('has-ad-banner', \(value > 0 ? "true" : "false"));
            """
            webView.evaluateJavaScript(js, completionHandler: nil)
        }

        func webView(
            _ webView: WKWebView,
            decidePolicyFor navigationAction: WKNavigationAction,
            decisionHandler: @escaping (WKNavigationActionPolicy) -> Void
        ) {
            guard let url = navigationAction.request.url else {
                decisionHandler(.cancel)
                return
            }
            if url.scheme == "gita" || url.scheme == "about" {
                decisionHandler(.allow)
                return
            }
            let scheme = url.scheme?.lowercased() ?? ""
            if ["http", "https", "mailto", "itms-apps", "itms"].contains(scheme) {
                UIApplication.shared.open(url)
                decisionHandler(.cancel)
                return
            }
            decisionHandler(.cancel)
        }

        private static func normalizedPath(_ url: URL) -> String {
            var path = url.path
            if path.hasPrefix("/") {
                path.removeFirst()
            }
            if path.isEmpty || path == "app" {
                return "index.html"
            }
            if path.hasPrefix("app/") {
                path.removeFirst(4)
            }
            if path.isEmpty {
                return "index.html"
            }
            return path
        }

        private static func bundledFile(for path: String) -> URL? {
            guard let www = Bundle.main.resourceURL?.appendingPathComponent("www") else {
                return nil
            }
            let candidate = www.appendingPathComponent(path)
            var isDirectory: ObjCBool = false
            if FileManager.default.fileExists(atPath: candidate.path, isDirectory: &isDirectory) {
                if isDirectory.boolValue {
                    return candidate.appendingPathComponent("index.html")
                }
                return candidate
            }
            return nil
        }

        private static func injectBootScript(into data: Data) -> Data {
            guard var html = String(data: data, encoding: .utf8),
                  html.contains("__GITA_NATIVE__") == false,
                  let range = html.range(of: "<head>")
            else {
                return data
            }
            let idiom = UIDevice.current.userInterfaceIdiom == .pad ? "ipad" : "iphone"
            let boot = StoreLaunch.bootJavaScript(idiom: idiom)
            html.replaceSubrange(range, with: "<head>\n    <script>\(boot)</script>")
            return Data(html.utf8)
        }

        private static func mimeType(for fileURL: URL) -> String {
            if let type = UTType(filenameExtension: fileURL.pathExtension) {
                if let mime = type.preferredMIMEType {
                    return mime
                }
            }
            switch fileURL.pathExtension.lowercased() {
            case "html", "htm": return "text/html"
            case "js", "mjs": return "text/javascript"
            case "css": return "text/css"
            case "json": return "application/json"
            case "svg": return "image/svg+xml"
            case "png": return "image/png"
            case "jpg", "jpeg": return "image/jpeg"
            case "woff2": return "font/woff2"
            case "woff": return "font/woff"
            case "ttf": return "font/ttf"
            case "mp3": return "audio/mpeg"
            case "m4a": return "audio/mp4"
            case "wav": return "audio/wav"
            default: return "application/octet-stream"
            }
        }
    }
}
