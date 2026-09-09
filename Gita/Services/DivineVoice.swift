import AVFoundation
import Foundation

final class DivineVoice: NSObject {
    static let shared = DivineVoice()

    private let speaker = AVSpeechSynthesizer()

    func stop() {
        if speaker.isSpeaking {
            speaker.stopSpeaking(at: .immediate)
        }
    }

    func speak(text: String, lang: String, rate: Float, pitch: Float = 0.78) {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard trimmed.isEmpty == false else { return }
        stop()
        activateSession()
        let utterance = AVSpeechUtterance(string: trimmed)
        utterance.voice = Self.krishnaVoice(lang: lang)
        let scaled = AVSpeechUtteranceDefaultSpeechRate * rate * 0.9
        utterance.rate = min(max(scaled, AVSpeechUtteranceMinimumSpeechRate), AVSpeechUtteranceMaximumSpeechRate)
        utterance.pitchMultiplier = min(max(pitch, 0.5), 1.2)
        utterance.volume = 1
        speaker.speak(utterance)
    }

    private func activateSession() {
        let session = AVAudioSession.sharedInstance()
        try? session.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
        try? session.setActive(true, options: [])
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
