// public/service-worker.js
const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

if (!isSafari()) {
  importScripts('https://js.pusher.com/beams/service-worker.js');
}