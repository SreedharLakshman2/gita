import AVFoundation
import Foundation

final class DivineVoice: NSObject, AVSpeechSynthesizerDelegate, AVAudioPlayerDelegate {
    static let shared = DivineVoice()

    var onFinished: (() -> Void)?

    private let speaker = AVSpeechSynthesizer()
    private var clipPlayer: AVAudioPlayer?
    private var ambientPlayer: AVAudioPlayer?
    private var utteranceId = 0
    private var currentUtterance: AVSpeechUtterance?
    private var ambientWanted = false

    private override init() {
        super.init()
        speaker.delegate = self
    }

    func stop() {
        currentUtterance = nil
        clipPlayer?.stop()
        clipPlayer = nil
        utteranceId += 1
        if speaker.isSpeaking {
            speaker.stopSpeaking(at: .immediate)
        }
    }

    func speak(text: String, lang: String, rate: Float, pitch: Float = 0.86, chapter: Int? = nil, verse: Int? = nil) {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard trimmed.isEmpty == false else {
            notifyFinished()
            return
        }
        stop()
        activateSession(spoken: true)
        utteranceId += 1
        let current = utteranceId

        if let chapter, let verse, let file = clipURL(chapter: chapter, verse: verse, lang: lang) {
            playClip(file, rate: rate, token: current)
            return
        }

        let utterance = AVSpeechUtterance(string: trimmed)
        utterance.voice = Self.voice(for: lang)
        let scaled = AVSpeechUtteranceDefaultSpeechRate * rate * 0.9
        utterance.rate = min(max(scaled, AVSpeechUtteranceMinimumSpeechRate), AVSpeechUtteranceMaximumSpeechRate)
        utterance.pitchMultiplier = min(max(pitch, 0.5), 1.2)
        utterance.volume = 1
        currentUtterance = utterance
        DispatchQueue.main.async { [weak self] in
            guard let self, self.utteranceId == current else { return }
            self.speaker.speak(utterance)
        }
    }

    func setAmbient(enabled: Bool, ducked: Bool) {
        ambientWanted = enabled
        if enabled == false {
            ambientPlayer?.volume = 0
            ambientPlayer?.stop()
            ambientPlayer?.currentTime = 0
            return
        }
        activateSession(spoken: false)
        if ambientPlayer == nil {
            guard let url = ambientURL() else { return }
            do {
                let player = try AVAudioPlayer(contentsOf: url)
                player.numberOfLoops = -1
                player.volume = 0
                player.prepareToPlay()
                ambientPlayer = player
            } catch {
                ambientPlayer = nil
                return
            }
        }
        ambientPlayer?.play()
        let level: Float = ducked ? 0.045 : 0.16
        ambientPlayer?.setVolume(level, fadeDuration: 0.25)
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        guard utterance === currentUtterance else { return }
        currentUtterance = nil
        notifyFinished()
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didCancel utterance: AVSpeechUtterance) {
        guard utterance === currentUtterance else { return }
        currentUtterance = nil
        notifyFinished()
    }

    func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        if clipPlayer === player {
            clipPlayer = nil
            notifyFinished()
        }
    }

    private func notifyFinished() {
        DispatchQueue.main.async { [weak self] in
            self?.onFinished?()
        }
    }

    private func playClip(_ url: URL, rate: Float, token: Int) {
        do {
            let player = try AVAudioPlayer(contentsOf: url)
            player.delegate = self
            player.enableRate = true
            player.rate = min(max(rate, 0.7), 1.5)
            player.prepareToPlay()
            player.play()
            clipPlayer = player
        } catch {
            clipPlayer = nil
            if token == utteranceId {
                notifyFinished()
            }
        }
    }

    private func clipURL(chapter: Int, verse: Int, lang: String) -> URL? {
        let prefix = String(lang.prefix(2)).lowercased()
        let names = [
            "c\(chapter)-v\(verse)-\(prefix)",
            "\(chapter)-\(verse)-\(prefix)",
            "\(chapter).\(verse).\(prefix)",
        ]
        let exts = ["m4a", "mp3", "wav", "aac", "caf"]
        guard let voiceDir = Bundle.main.resourceURL?.appendingPathComponent("www/voice") else {
            return nil
        }
        for name in names {
            for ext in exts {
                let url = voiceDir.appendingPathComponent("\(name).\(ext)")
                if FileManager.default.fileExists(atPath: url.path) {
                    return url
                }
            }
        }
        return nil
    }

    private func ambientURL() -> URL? {
        guard let www = Bundle.main.resourceURL?.appendingPathComponent("www/music/dhaka.mp3") else {
            return nil
        }
        if FileManager.default.fileExists(atPath: www.path) {
            return www
        }
        return nil
    }

    private func activateSession(spoken: Bool) {
        let session = AVAudioSession.sharedInstance()
        if spoken {
            try? session.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
        } else {
            try? session.setCategory(.playback, mode: .default, options: [.mixWithOthers])
        }
        try? session.setActive(true, options: [])
    }

    private static func voice(for lang: String) -> AVSpeechSynthesisVoice? {
        let voices = AVSpeechSynthesisVoice.speechVoices().filter { languageMatches($0.language, want: lang) }
        if let ranked = voices.sorted(by: { score($0, lang: lang) > score($1, lang: lang) }).first {
            return ranked
        }
        return AVSpeechSynthesisVoice(language: lang)
            ?? AVSpeechSynthesisVoice(language: "hi-IN")
            ?? AVSpeechSynthesisVoice(language: "en-IN")
    }

    private static func languageMatches(_ voiceLang: String, want: String) -> Bool {
        prefix(voiceLang) == prefix(want)
    }

    private static func prefix(_ code: String) -> String {
        code.lowercased().replacingOccurrences(of: "_", with: "-").split(separator: "-").first.map(String.init) ?? code.lowercased()
    }

    private static func score(_ voice: AVSpeechSynthesisVoice, lang: String) -> Int {
        var value = 0
        let voiceLang = voice.language.lowercased().replacingOccurrences(of: "_", with: "-")
        let want = lang.lowercased().replacingOccurrences(of: "_", with: "-")
        if voiceLang == want { value += 80 } else { value += 40 }
        if voiceLang.contains("-in") { value += 12 }
        if voice.quality == .enhanced { value += 8 }
        if voice.gender == .male { value += 16 }
        if #available(iOS 17.0, *), voice.voiceTraits.contains(.isPersonalVoice) {
            value += 20
        }
        let name = voice.name.lowercased()
        for token in ["rishi", "kumar", "ravi", "hemant", "suresh", "krishna", "ramasamy"] where name.contains(token) {
            value += 12
        }
        return value
    }
}
