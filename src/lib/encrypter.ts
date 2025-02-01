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

  async generateAESKey(): Promise<string> {
    const aesKey = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"],
    );

    const exportedKey = await crypto.subtle.exportKey("raw", aesKey);
    return this.arrayBufferToBase64(exportedKey);
  }

  async encryptAESKeyWithRSA(
    publicKeyBase64: string,
    aesKeyBase64: string,
  ): Promise<string> {
    const publicKey = await this.importPublicKey(publicKeyBase64);
    const aesKeyBuffer = this.base64ToArrayBuffer(aesKeyBase64);

    const encryptedAESKey = await crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      publicKey,
      aesKeyBuffer,
    );

    return this.arrayBufferToBase64(encryptedAESKey);
  }

  async decryptAESKeyWithRSA(
    privateKeyBase64: string,
    encryptedAESKeyBase64: string,
  ): Promise<string> {
    const privateKey = await this.importPrivateKey(privateKeyBase64);
    const encryptedAESKeyBuffer = this.base64ToArrayBuffer(
      encryptedAESKeyBase64,
    );

    const decryptedAESKeyBuffer = await crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      privateKey,
      encryptedAESKeyBuffer,
    );

    return this.arrayBufferToBase64(decryptedAESKeyBuffer);
  }

  async encryptMessage(
    aesKeyBase64: string,
    message: string,
  ): Promise<{ encryptedData: string; iv: string }> {
    const aesKey = await this.importAESKey(aesKeyBase64);
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate IV for AES-GCM
    const encodedMessage = new TextEncoder().encode(message);

    const encryptedMessage = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      aesKey,
      encodedMessage,
    );

    return {
      encryptedData: this.arrayBufferToBase64(encryptedMessage),
      iv: this.arrayBufferToBase64(iv),
    };
  }

  async decryptMessage(
    aesKeyBase64: string,
    encryptedDataBase64: string,
    ivBase64: string,
  ): Promise<string> {
    const aesKey = await this.importAESKey(aesKeyBase64);
    const encryptedData = this.base64ToArrayBuffer(encryptedDataBase64);
    const iv = this.base64ToArrayBuffer(ivBase64);

    const decryptedMessage = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      aesKey,
      encryptedData,
    );

    return new TextDecoder().decode(decryptedMessage);
  }

  private async importPublicKey(publicKeyBase64: string): Promise<CryptoKey> {
    return crypto.subtle.importKey(
      "spki",
      this.base64ToArrayBuffer(publicKeyBase64),
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["encrypt"],
    );
  }

  private async importPrivateKey(privateKeyBase64: string): Promise<CryptoKey> {
    return crypto.subtle.importKey(
      "pkcs8",
      this.base64ToArrayBuffer(privateKeyBase64),
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["decrypt"],
    );
  }

  private async importAESKey(aesKeyBase64: string): Promise<CryptoKey> {
    return crypto.subtle.importKey(
      "raw",
      this.base64ToArrayBuffer(aesKeyBase64),
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"],
    );
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
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
