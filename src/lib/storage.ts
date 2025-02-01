import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

const keys = {
  deviceFingerprintKey: "incognito-device-fingerprint",
  privateKey: "incognito-private-key",
} as const;

function getDeviceFingerprint() {
  return localStorage.getItem(keys.deviceFingerprintKey);
}

async function setDeviceFingerprint() {
  try {
    const fingerprint = await getFingerprint();
    localStorage.setItem(keys.deviceFingerprintKey, fingerprint);
    return fingerprint;
  } catch (error: unknown) {
    console.log("Fingerprint error:", error);
  }
}

async function deleteDeviceFingerprint() {
  localStorage.removeItem(keys.deviceFingerprintKey);
}

function getPrivateKey() {
  return localStorage.getItem(keys.privateKey);
}

function setPrivateKey(privateKey: string) {
  localStorage.setItem(keys.privateKey, privateKey);
}

function deletePrivateKey() {
  localStorage.removeItem(keys.privateKey);
}

export const storage = {
  getDeviceFingerprint,
  setDeviceFingerprint,
  getPrivateKey,
  setPrivateKey,
  deletePrivateKey,
  deleteDeviceFingerprint,
};
