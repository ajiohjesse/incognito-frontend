import toast from "react-hot-toast";

export const useShare = (link: string): (() => void) => {
  const share = () => {
    const message = "Send me anonymous messages. Use the link below.";
    const shareData = {
      title: "Anonymous Messages",
      text: message,
      url: link,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        toast.error("Failed to share the link.", {
          id: "share-error",
        });
      });
    } else {
      toast.error("Web Share API not supported in this browser.", {
        id: "share-error",
      });
    }
  };

  return share;
};
