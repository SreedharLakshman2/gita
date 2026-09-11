import { isNative } from "./native";

export function reportTabBarVisible(visible: boolean, dark = true) {
  if (!isNative()) return;
  window.webkit?.messageHandlers?.sreeoAds?.postMessage({ visible, dark });
}
