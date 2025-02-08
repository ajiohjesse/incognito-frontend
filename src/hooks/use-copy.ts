import { useState } from "react";
import toast from "react-hot-toast";

export const useCopy = (text: string): [() => void, boolean] => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = () => {
    if (isCopied) return;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(() => {
          toast.error("Failed to copy text to clipboard.", {
            id: "copy-error",
          });
        });
    } else {
      toast.error("Clipboard API not supported in this browser.", {
        id: "copy-error",
      });
    }
  };

  return [copy, isCopied];
};
