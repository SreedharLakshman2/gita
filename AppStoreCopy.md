# Gita — App Store Listing Copy

First iOS release. Universal app: **iPhone and iPad**.

Paste these fields into App Store Connect. Bundle ID must stay `com.sreeo.gita`.

---

## App Information

| Field | Value |
|--------|--------|
| **Name** (30 chars max) | Gita |
| **Subtitle** (30 chars max) | Timeless Wisdom for Daily Life |
| **Bundle ID** | `com.sreeo.gita` |
| **SKU** | `sreeo-gita` |
| **Team** | `7DS2M392U2` |
| **Seller** | Sreedhar Lakshmanan / Sai Laksha Technologies |
| **Primary Category** | Books |
| **Secondary Category** | Lifestyle |
| **Copyright** | © 2026 Sai Laksha Technologies |
| **Age Rating** | 4+ (religious / cultural; no violence). Ads: complete the ads questionnaire honestly. |
| **Price** | Free |
| **Version** | 1.0 |
| **Build** | 1 |
| **Devices** | iPhone and iPad, iOS 16+ |

---

## Promotional Text (170 chars, updatable anytime)

Read and hear the Bhagavad Gita in Sanskrit, English, Tamil, Hindi, and more. Daily verse, bookmarks, and on-device recitation — a quiet companion from Sreeo Studio.

---

## Description (4000 chars max)

**Gita** is a calm Bhagavad Gita reading app from Sreeo Studio / Sai Laksha Technologies. Read Krishna’s teaching to Arjuna on iPhone and iPad, hear it recited on your device, and keep a private path of verses.

**THE FULL GITA**
All 18 chapters and 701 verses, with Devanagari Sanskrit, transliteration, and meanings for quiet daily reading.

**LANGUAGES**
Sanskrit is always available. Switch among English, Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, and Gujarati. Recitation uses the language you selected — including from Saved verses.

**LISTEN**
Hear a verse in the language you are reading. Speed controls, chapter verse list, and on-device speech. Optional soft temple music can play under the reading and can be turned off from Home or Profile.

**DAILY PRACTICE**
A verse each day, continue reading, search, and bookmarks kept on this device. Optional morning verse reminder.

**DESIGN**
Ivory, navy, and gold reading surfaces with a dark charcoal default, Krishna–Arjuna artwork, and a layout that suits both iPhone and iPad.

Banner ads may appear above the tab bar so Gita can stay free. Reading language, bookmarks, and progress stay on your device. There is no account.

Made with devotion by **Sai Laksha Technologies**.

---

## Keywords (100 chars max, comma-separated, no spaces after commas)

gita,bhagavad,krishna,arjuna,hindu,sanskrit,tamil,vedic,dharma,verse,yoga,spiritual

---

## URLs (App Store Connect + AdMob)

Use the **developer website / marketing URL** as the GitHub Pages root so AdMob can crawl `app-ads.txt`:

| Field | URL |
|--------|-----|
| **Marketing URL** | https://sreedharlakshman2.github.io/ |
| **Support URL** | https://sreedharlakshman2.github.io/gita/ |
| **Privacy Policy URL** | https://sreedharlakshman2.github.io/gita/privacy.html |
| **app-ads.txt** | https://sreedharlakshman2.github.io/app-ads.txt |

---

## App Privacy (App Store Connect)

Declare only data that **leaves the device**. Language, bookmarks, and streak stay on the device — do **not** list Product Interaction.

**Data Used to Track You**
- Device ID — Third-Party Advertising (AdMob / IDFA if the user allows tracking)

**Data Not Linked to the User**
- Device ID — Third-Party Advertising

**Data Linked to the User:** None (no accounts)

**Tracking:** Yes, via Google AdMob if App Tracking Transparency is allowed. Users can refuse; ads still show.

---

## Screenshot captions

1. Home — “Continue your journey.”
2. Chapters — “Eighteen chapters. 701 verses.”
3. Reader — “Sanskrit, Tamil, Hindi, and more.”
4. Listen — “Hear the Gita in the language you chose.”
5. Language — “Read in the language of your heart.”
6. Daily — “Wisdom for this morning.”

**Required sizes (2026)**
- iPhone **6.9"** (required): `1320×2868` or `1290×2796`
- iPad **13"** (required; this app is universal): `2064×2752` or `2048×2732`

Capture from the simulator (ads off):

```bash
bash scripts/capture_store_screenshots.sh
```

Upload iPhone PNGs to the 6.9-inch slot and iPad PNGs to the 13-inch slot.

---

## Review Notes

Paste `AppStore/review-notes.txt` into App Store Connect.

---

## Export Compliance

- Uses encryption? **Yes**
- Exempt (HTTPS only, including AdMob)? **Yes**
- `ITSAppUsesNonExemptEncryption` is already **NO** in the project.

---

## What’s New (Version 1.0)

The Bhagavad Gita on iPhone and iPad:
• 18 chapters, 701 verses, with Sanskrit and meanings  
• English, Tamil, Hindi, and more — Listen uses the language you chose  
• Daily verse, bookmarks, and on-device recitation  
• Optional morning reminder and temple music you can turn off  

---

## Age rating questionnaire

Answer **None / No** for violence, sexual content, profanity, horror, alcohol, tobacco, drugs, gambling, medical/treatment, unrestricted web access, and user-generated content.

- **Advertising:** Yes (AdMob banners above the tab bar)
- Expected rating: **4+**

---

## AdMob

iOS app ID: `ca-app-pub-9471606055191983~1851426228`  
iOS banner: `ca-app-pub-9471606055191983/4801023196`  

Debug builds use Google test ads. Release uses the Gita units above.

---

## App Store Connect checklist

1. Create the app with bundle ID `com.sreeo.gita` if it does not exist yet.
2. **App Privacy** — save the answers above, then Publish.
3. **Privacy Policy URL** — `https://sreedharlakshman2.github.io/gita/privacy.html`
4. **Support URL** — `https://sreedharlakshman2.github.io/gita/`
5. **Marketing URL** — `https://sreedharlakshman2.github.io/` (required for AdMob `app-ads.txt`)
6. **Pricing** — Free, all countries you want.
7. Paste **subtitle, description, keywords, promotional text, What’s New**.
8. **Category** Books / Lifestyle.
9. **Screenshots** — 6.9" iPhone + 13" iPad from `bash scripts/capture_store_screenshots.sh`.
10. **App icon** — taken from the 1024×1024 asset in the archive (`Gita/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png`). A copy is in `AppStore/AppIcon-1024.png`.
11. **Age rating** — ads = Yes.
12. **Advertising Identifier** — Yes, used by AdMob (not for our own analytics).
13. Archive: Any iOS Device (arm64) → Product → Archive → Distribute App → App Store Connect. Version **1.0**, build **1**.
14. After processing, select the build, encryption **Yes, exempt**, paste review notes, submit.

Content rights: the Bhagavad Gita is a traditional religious text. Meanings in this app are original renderings for quiet reading, with original UI and artwork.
