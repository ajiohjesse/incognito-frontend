class Encrypter {
  async generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"],
    );

    const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await crypto.subtle.exportKey(
      "pkcs8",
      keyPair.privateKey,
    );

    return {
      publicKey: this.arrayBufferToBase64(publicKey),
      privateKey: this.arrayBufferToBase64(privateKey),
    };
  }

  async encryptMessage(
    publicKeyBase64: string,
    message: string,
  ): Promise<string> {
    const publicKey = await this.importPublicKey(publicKeyBase64);
    const encodedMessage = new TextEncoder().encode(message);
    const encryptedMessage = await crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      publicKey,
      encodedMessage,
    );

    return this.arrayBufferToBase64(encryptedMessage);
  }

  async decryptMessage(
    privateKeyBase64: string,
    encryptedMessageBase64: string,
  ): Promise<string> {
    const privateKey = await this.importPrivateKey(privateKeyBase64);
    const encryptedMessage = this.base64ToArrayBuffer(encryptedMessageBase64);
    const decryptedMessage = await crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      privateKey,
      encryptedMessage,
    );

    return new TextDecoder().decode(decryptedMessage);
  }

  private async importPublicKey(publicKeyBase64: string): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
      "spki",
      this.base64ToArrayBuffer(publicKeyBase64),
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["encrypt"],
    );
  }

  private async importPrivateKey(privateKeyBase64: string): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
      "pkcs8",
      this.base64ToArrayBuffer(privateKeyBase64),
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["decrypt"],
    );
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
}

export default Encrypter;
