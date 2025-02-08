import { CheckIcon, CopyIcon, ShareIcon } from "lucide-react";
import { useCopy } from "../hooks/use-copy";
import { useShare } from "../hooks/use-share";

interface Props {
  link: string;
}

export const CopyMessageLink = ({ link }: Props) => {
  const [copy, isCopied] = useCopy(link);

  return (
    <button
      onClick={copy}
      className="flex grow cursor-pointer items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-600 active:scale-95"
    >
      {isCopied ? (
        <>
          <CheckIcon className="size-4" />
          Copied{" "}
        </>
      ) : (
        <>
          <CopyIcon className="size-4" />
          Copy Link
        </>
      )}
    </button>
  );
};

export const ShareMessageLink = ({ link }: Props) => {
  const share = useShare(link);

  return (
    <button
      onClick={share}
      className="flex grow cursor-pointer items-center gap-2 rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-pink-600 active:scale-95"
    >
      <ShareIcon className="size-4" />
      Share Link
    </button>
  );
};
