import AVFoundation
import Foundation

final class DivineVoice: NSObject, AVSpeechSynthesizerDelegate, AVAudioPlayerDelegate {
    static let shared = DivineVoice()

    var onFinished: (() -> Void)?

    private let speaker = AVSpeechSynthesizer()
    private var clipPlayer: AVAudioPlayer?
    private var askedPersonalVoice = false
    private var utteranceId = 0
    private var currentUtterance: AVSpeechUtterance?

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

    func speak(text: String, lang: String, rate: Float, pitch: Float = 0.78, chapter: Int? = nil, verse: Int? = nil) {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard trimmed.isEmpty == false else { return }
        stop()
        activateSession()
        askPersonalVoiceOnce()
        utteranceId += 1
        let current = utteranceId

        if let chapter, let verse, let file = clipURL(chapter: chapter, verse: verse, lang: lang) {
            playClip(file, rate: rate, token: current)
            return
        }

        let utterance = AVSpeechUtterance(string: trimmed)
        utterance.voice = Self.krishnaVoice(lang: lang)
        let scaled = AVSpeechUtteranceDefaultSpeechRate * rate * 0.9
        utterance.rate = min(max(scaled, AVSpeechUtteranceMinimumSpeechRate), AVSpeechUtteranceMaximumSpeechRate)
        utterance.pitchMultiplier = min(max(pitch, 0.5), 1.2)
        utterance.volume = 1
        currentUtterance = utterance
        speaker.speak(utterance)
    }

    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
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

    private func activateSession() {
        let session = AVAudioSession.sharedInstance()
        try? session.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
        try? session.setActive(true, options: [])
    }

    private func askPersonalVoiceOnce() {
        guard askedPersonalVoice == false else { return }
        askedPersonalVoice = true
        if #available(iOS 17.0, *) {
            AVSpeechSynthesizer.requestPersonalVoiceAuthorization { _ in }
        }
    }

    private static func krishnaVoice(lang: String) -> AVSpeechSynthesisVoice? {
        let voices = AVSpeechSynthesisVoice.speechVoices()
        let ranked = voices.sorted { score($0, lang: lang) > score($1, lang: lang) }
        return ranked.first
            ?? AVSpeechSynthesisVoice(language: lang)
            ?? AVSpeechSynthesisVoice(language: "hi-IN")
            ?? AVSpeechSynthesisVoice(language: "en-IN")
    }

    private static func score(_ voice: AVSpeechSynthesisVoice, lang: String) -> Int {
        var value = 0
        let voiceLang = voice.language.lowercased()
        let want = lang.lowercased()
        let prefix = String(want.prefix(2))
        if #available(iOS 17.0, *), voice.voiceTraits.contains(.isPersonalVoice) {
            value += 120
        }
        if voiceLang == want { value += 50 }
        else if voiceLang.hasPrefix(prefix) { value += 28 }
        if voiceLang.contains("-in") { value += 12 }
        if voice.gender == .male { value += 42 }
        if voice.gender == .female { value -= 40 }
        let name = voice.name.lowercased()
        for token in ["rishi", "kumar", "ravi", "hemant", "suresh", "krishna"] where name.contains(token) {
            value += 24
        }
        for token in ["veena", "lekha", "samantha", "karen", "priya", "meera"] where name.contains(token) {
            value -= 30
        }
        return value
    }
}
