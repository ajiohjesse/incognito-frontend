import toast from "react-hot-toast";

export const useShare = (link: string): (() => void) => {
  const share = () => {
    const message =
      "🎉Let's have an anonymous conversation🎉 Use the link below to send me a message  🙈";
    const shareData = {
      title: "Anonymous Messages",
      text: message,
      url: link,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      toast.error("Web Share API not supported in this browser.", {
        id: "share-error",
      });
    }
  };

  return share;
};
