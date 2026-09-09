# Gita

A premium Bhagavad Gita reading experience from **Sreeo Studio** / Sai Laksha Technologies.

**Bhagavad Gita — Timeless Wisdom for Everyday Life**

High-fidelity iOS-style product design: a Figma-like board of every screen, plus a live prototype you can tap through.

## Features

- Sreeo splash in a divine parchment theme, then the Gita emblem
- 18 chapters with book-cover collection
- Verse reader with Sanskrit, transliteration, English, Tamil, and Hindi
- Ten languages (Sanskrit always available)
- Daily verse, continue reading, search, bookmarks, audio recitation
- Light and dark reading surfaces

## Run locally

```bash
npm install
npm run dev
```

Open the design board on a wide window. Tap any phone to enter the live prototype. On a phone-sized window the app opens full screen.

## Run on iPhone with Xcode

```bash
npm install
npm run ios:sync
open Gita.xcodeproj
```

In Xcode: choose your iPhone (or a simulator) in the device menu, then press **Run** (⌘R). The first time, trust the developer certificate on the phone under **Settings → General → VPN & Device Management**.

Rebuild the web UI into the iOS app after UI changes with `npm run ios:sync`, then Run again in Xcode.

Bundle ID: `com.sreeo.gita` · Team: Sai Laksha Technologies.

## Sanskrit and meaning

Devanagari verses follow the traditional recension. English, Tamil, Hindi, and other meanings are original renderings for this app, written for quiet reading rather than as a scholarly edition.

## Privacy

See [public/privacy.html](public/privacy.html). Reading data stays on the device.
