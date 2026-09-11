import Foundation
import UserNotifications

final class VerseNotifications {
    static let shared = VerseNotifications()
    private let identifier = "gita.daily.verse"

    func sync(enabled: Bool, title: String, body: String, hour: Int = 7, minute: Int = 0) {
        if StoreLaunch.UITest.isActive { return }
        let center = UNUserNotificationCenter.current()
        if enabled == false {
            center.removePendingNotificationRequests(withIdentifiers: [identifier])
            return
        }
        center.requestAuthorization(options: [.alert, .sound, .badge]) { [identifier] allowed, _ in
            guard allowed else { return }
            let content = UNMutableNotificationContent()
            content.title = title
            content.body = body
            content.sound = .default
            var date = DateComponents()
            date.hour = hour
            date.minute = minute
            let trigger = UNCalendarNotificationTrigger(dateMatching: date, repeats: true)
            let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)
            center.removePendingNotificationRequests(withIdentifiers: [identifier])
            center.add(request, withCompletionHandler: nil)
        }
    }
}
