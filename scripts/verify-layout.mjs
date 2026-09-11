import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function fail(message) {
  console.error(`FAIL layout ${message}`);
  process.exitCode = 1;
}

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const banner = read("Gita/Views/BannerAdView.swift");
if (!banner.includes("GADAdSizeBanner")) fail("BannerAdView must request GADAdSizeBanner (50pt)");
if (banner.includes("GADCurrentOrientationAnchoredAdaptiveBannerAdSizeWithWidth")) {
  fail("do not use full-width adaptive banners — they cover the tab bar");
}
if (!banner.includes("clipsToBounds = true")) fail("banner container must clip overflow");

const ads = read("Gita/Services/AdConfig.swift");
if (!ads.includes("bannerHeight: CGFloat = 50")) fail("AdConfig.bannerHeight must stay 50");
if (!ads.includes("bannerWidth: CGFloat = 320")) fail("AdConfig.bannerWidth must stay 320");

const rootView = read("Gita/Views/RootView.swift");
if (!rootView.includes("AdConfig.bannerHeight")) fail("RootView must size the banner with AdConfig.bannerHeight");
if (!rootView.includes("bottomSafeInset()")) fail("RootView must lift the banner by the window safe area, not GeometryReader");
if (!rootView.includes(".clipped()")) fail("RootView banner must be clipped");
if (rootView.includes("geo.size.width")) fail("RootView must not size ads to the full screen width");

const css = read("src/styles.css");
const slot = css.match(/html\.native \.ad-slot \{[\s\S]*?\}/);
if (!slot) fail("missing html.native .ad-slot rule");
if (!slot[0].includes("max-height: 50px")) fail("native ad-slot must cap height at 50px");

const ui = read("src/ui.tsx");
const slotAt = ui.indexOf('className="ad-slot"');
const navAt = ui.indexOf("<BottomNav");
if (slotAt < 0 || navAt < 0 || slotAt > navAt) fail("ad-slot must sit above BottomNav in AppShell");
if (!ui.includes("reportTabBarVisible(nav, dark)")) fail("AppShell must tell native the current theme with tab visibility");

const screens = read("src/screens.tsx");

function fnSource(name) {
  const start = screens.indexOf(`export function ${name}`);
  if (start < 0) return "";
  const next = screens.indexOf("\nexport function ", start + 1);
  return next < 0 ? screens.slice(start) : screens.slice(start, next);
}

for (const name of ["VerseReader", "AudioReader", "GitaSplash", "Onboarding"]) {
  const source = fnSource(name);
  if (!source) fail(`missing ${name}`);
  else if (!source.includes("nav={false}")) fail(`${name} must hide the tab bar and banner`);
}

const infoPageAt = screens.indexOf("function InfoPage");
const aboutAt = screens.indexOf("export function AboutScreen");
const infoPage = infoPageAt < 0 || aboutAt < 0 ? "" : screens.slice(infoPageAt, aboutAt);
if (!infoPage.includes("nav={false}")) fail("InfoPage must hide the tab bar and banner");
if (!fnSource("AboutScreen").includes("<InfoPage")) fail("AboutScreen must use InfoPage (no tab bar/banner)");
if (!fnSource("PrivacyScreen").includes("<InfoPage")) fail("PrivacyScreen must use InfoPage (no tab bar/banner)");

const notify = read("src/notify.ts");
if (!notify.includes("window.__GITA_UITEST__")) {
  fail("syncVerseReminder must no-op during UI tests so the permission alert cannot cover the tab bar");
}
if (!notify.includes("isNative()")) {
  fail("native app must not use the web Notification API (it shows a system alert over the tab bar)");
}

const store = read("src/store.tsx");
if (!store.includes("saved.notify ?? false")) {
  fail("notifications must default off so first launch does not cover Home with a permission alert");
}

const verseNotify = read("Gita/Services/VerseNotifications.swift");
if (!verseNotify.includes("StoreLaunch.UITest.isActive")) {
  fail("VerseNotifications must skip authorization during UI tests");
}

if (!process.exitCode) {
  console.log("OK layout: 50pt banner above tab bar, clipped, not adaptive");
}
