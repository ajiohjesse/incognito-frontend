function isBeamSupported() {
  return (
    "indexedDB" in window &&
    window.isSecureContext &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    !/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  );
}

if (isBeamSupported()) {
  importScripts('https://js.pusher.com/beams/service-worker.js');
}