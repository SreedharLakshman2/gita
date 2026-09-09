import SwiftUI

struct LaunchSplashView: View {
    var onFinished: () -> Void
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var appear = false

    var body: some View {
        ZStack {
            Brand.navy.ignoresSafeArea()
            Circle()
                .stroke(Brand.gold.opacity(0.28), lineWidth: 1)
                .frame(width: 280, height: 280)
            Circle()
                .stroke(Brand.gold.opacity(0.16), lineWidth: 1)
                .frame(width: 236, height: 236)

            VStack(spacing: 14) {
                sreeoTiles(size: 26, spacing: 6, dropIn: true)
                Text(Brand.studio)
                    .font(.system(size: 46, weight: .black, design: .rounded))
                    .foregroundStyle(Brand.wordmark)
                    .scaleEffect(appear ? 1 : 0.5)
                    .opacity(appear ? 1 : 0)
                    .animation(
                        reduceMotion ? nil : .spring(response: 0.6, dampingFraction: 0.7).delay(0.35),
                        value: appear
                    )
                Text(Brand.shortName)
                    .font(.system(.title3, design: .serif).weight(.semibold))
                    .foregroundStyle(Color.white.opacity(0.88))
                    .opacity(appear ? 1 : 0)
                Text("Divine reading · inner quiet")
                    .font(.system(size: 12, weight: .semibold, design: .rounded))
                    .tracking(1.4)
                    .textCase(.uppercase)
                    .foregroundStyle(Color.white.opacity(0.48))
                    .opacity(appear ? 1 : 0)
            }

            VStack(spacing: 6) {
                sreeoTiles(size: 10, spacing: 3, dropIn: false)
                Text(Brand.copyright)
                    .font(.system(.caption, design: .rounded).weight(.semibold))
                    .foregroundStyle(Color.white.opacity(0.45))
                    .accessibilityLabel("Copyright 2026 Sai Laksha Technologies")
            }
            .opacity(appear ? 1 : 0)
            .animation(reduceMotion ? nil : .easeOut(duration: 0.45).delay(0.45), value: appear)
            .padding(.bottom, 40)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottom)
        }
        .onAppear {
            appear = true
            let delay = reduceMotion ? 0.8 : 1.9
            DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
                onFinished()
            }
        }
    }

    private func sreeoTiles(size: CGFloat, spacing: CGFloat, dropIn: Bool) -> some View {
        HStack(spacing: spacing) {
            ForEach(0..<4, id: \.self) { i in
                RoundedRectangle(cornerRadius: size * 0.23, style: .continuous)
                    .fill(Brand.tiles[i])
                    .frame(width: size, height: size)
                    .offset(y: dropIn && !appear && reduceMotion == false ? -60 : 0)
                    .opacity(dropIn ? (appear ? 1 : 0) : 1)
                    .animation(
                        dropIn && reduceMotion == false
                            ? .spring(response: 0.5, dampingFraction: 0.6).delay(Double(i) * 0.1)
                            : nil,
                        value: appear
                    )
            }
        }
    }
}
