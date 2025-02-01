const keys = {
  deviceIdKey: "incognito-device-id",
  publicKey: "incognito-public-key",
} as const;

function getDeviceId() {
  return localStorage.getItem(keys.deviceIdKey);
}

function setDeviceId(deviceId: string) {
  localStorage.setItem(keys.deviceIdKey, deviceId);
}

function getPublicKey() {
  return localStorage.getItem(keys.publicKey);
}

function setPublicKey(publicKey: string) {
  localStorage.setItem(keys.publicKey, publicKey);
}

export const storage = {
  getDeviceId,
  setDeviceId,
  getPublicKey,
  setPublicKey,
};
