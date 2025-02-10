import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Encrypter from "../lib/encrypter";
import { storage } from "../lib/storage";

export default function useDecryptMessage({
  messageEncrypted,
  sharedKeyEncrypted,
  iv,
}: {
  messageEncrypted: string;
  iv: string;
  sharedKeyEncrypted: string;
}) {
  const [message, setMessage] = useState("Decrypting message...");

  useEffect(() => {
    const encrypter = new Encrypter();

    async function decrypt() {
      const privateKey = storage.getPrivateKey();
      if (!privateKey) {
        return;
      }
      try {
        const sharedKey = await encrypter.decryptAESKeyWithRSA(
          privateKey,
          sharedKeyEncrypted,
        );

        const decryptedMessage = await encrypter.decryptMessage(
          sharedKey,
          messageEncrypted,
          iv,
        );

        setMessage(decryptedMessage);
      } catch (error) {
        console.log("Message decryption error:", error);
        toast.error("Failed to decrypt messages", { id: "decrypt-error" });
        setMessage("###############");
      }
    }

    decrypt();
  }, [sharedKeyEncrypted, messageEncrypted, iv]);

  return message;
}
