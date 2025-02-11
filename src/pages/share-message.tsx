import { toJpeg } from "html-to-image";
import { useCallback, useMemo, useRef } from "react";
import { Navigate } from "react-router";
import { useShareMessageStore } from "../stores/share-message-store";

const ShareMessagePage = () => {
  const { message } = useShareMessageStore();
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const splitIntoChunks = (text: string): string[] => {
    const CHARS_PER_CHUNK = 300;
    const chunks: string[] = [];
    const words = text.split(" ");
    let currentChunk: string[] = [];
    let currentLength = 0;

    words.forEach((word) => {
      if (currentLength + word.length > CHARS_PER_CHUNK) {
        chunks.push(currentChunk.join(" "));
        currentChunk = [word];
        currentLength = word.length;
      } else {
        currentChunk.push(word);
        currentLength += word.length + 1;
      }
    });

    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(" "));
    }

    return chunks;
  };

  const messageChunks = useMemo(
    () => splitIntoChunks(message || ""),
    [message],
  );

  const onButtonClick = useCallback((index: number) => {
    if (!refs.current[index]) {
      return;
    }

    toJpeg(refs.current[index]!, {
      cacheBust: true,
      quality: 1,
      backgroundColor: "white",
      pixelRatio: 3,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `anonymous-message-${index + 1}.jpeg`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const downloadAllImages = useCallback(async () => {
    for (let i = 0; i < refs.current.length; i++) {
      if (refs.current[i]) {
        try {
          const dataUrl = await toJpeg(refs.current[i]!, {
            cacheBust: true,
            quality: 1,
            backgroundColor: "white",
            pixelRatio: 3,
          });
          const link = document.createElement("a");
          link.download = `anonymous-message-${i + 1}.jpeg`;
          link.href = dataUrl;
          link.click();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, []);

  if (!message) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
      {messageChunks.length > 1 && (
        <div className="mb-6 flex justify-center">
          <button
            className="cursor-pointer rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 px-6 py-3 text-lg font-medium text-white transition-transform hover:scale-105 active:scale-95"
            onClick={downloadAllImages}
          >
            Download All Images
          </button>
        </div>
      )}
      <section className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {messageChunks.map((chunk, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div
              ref={(el) => (refs.current[index] = el)}
              className="w-full p-4"
            >
              <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl">
                <h2 className="bg-gradient-to-br from-pink-500 to-purple-500 p-4 text-center text-2xl font-bold text-white">
                  Anonymous Message
                </h2>
                <p className="px-6 py-4 text-lg text-sm font-medium text-pretty sm:text-base">
                  {messageChunks.length > 1
                    ? index === 0
                      ? chunk + " . . . "
                      : index === messageChunks.length - 1
                        ? " . . . " + chunk
                        : " . . . " + chunk + " . . . "
                    : chunk}
                </p>
                <div className="p-4 pt-0 text-center text-xs font-medium text-slate-400">
                  <p>incognito.rehx.name.ng</p>
                  {messageChunks.length > 1 ? (
                    <p className="pt-2">
                      {index + 1} of {messageChunks.length}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <button
              className="cursor-pointer rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 px-4 py-2 text-white transition-transform hover:scale-105 active:scale-95"
              onClick={() => onButtonClick(index)}
            >
              Download JPEG
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ShareMessagePage;
