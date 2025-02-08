import { Trash2Icon } from "lucide-react";

const DeleteAccount = () => {
  return (
    <button
      type="button"
      className="flex grow cursor-pointer items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-95"
    >
      <Trash2Icon className="size-4" />
      Delete Account
    </button>
  );
};

export default DeleteAccount;
