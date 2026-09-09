export function isNative() {
  return typeof window !== "undefined" && Boolean(window.__GITA_NATIVE__);
}
