import { isNative } from "./native";

export function reportTabBarVisible(visible: boolean) {
  if (!isNative()) return;
  window.webkit?.messageHandlers?.sreeoAds?.postMessage({ visible });
}
