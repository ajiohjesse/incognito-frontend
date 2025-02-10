import { useShareMessageStore } from "../stores/share-message-store";

const ShareMessagePage = () => {
  const { message } = useShareMessageStore();

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        <h2 className="bg-gradient-to-br from-pink-500 to-purple-500 p-4 text-center text-2xl font-bold text-white">
          Anonymous Message
        </h2>
        <p className="p-4 text-lg font-medium">{message}</p>
        <p className="p-4 pt-0 text-center text-sm font-medium text-slate-400">
          incognito.rehx.name.ng
        </p>
        <p className="px-4 text-center">1</p>
      </div>
    </div>
  );
};

export default ShareMessagePage;
