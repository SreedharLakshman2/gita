import SwiftUI

enum Brand {
    static let name = "Gita"
    static let shortName = "Bhagavad Gita"
    static let studio = "sreeo"
    static let copyright = "© 2026 Sai Laksha Technologies"
    static let tiles: [Color] = [.cyan, .purple, .pink, .orange]
    static let ivory = Color(red: 243 / 255, green: 235 / 255, blue: 218 / 255)
    static let navy = Color(red: 28 / 255, green: 39 / 255, blue: 64 / 255)
    static let gold = Color(red: 184 / 255, green: 149 / 255, blue: 74 / 255)
    static let wordmark = LinearGradient(
        colors: [.cyan, .purple, .pink, .orange],
        startPoint: .leading,
        endPoint: .trailing
    )
}
