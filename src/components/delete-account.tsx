import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../lib/axios";
import { usePusherBeams } from "../lib/pusher";
import { storage } from "../lib/storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import Spinner from "./ui/spinner";

const DeleteAccount = () => {
  const { stopBeams } = usePusherBeams();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await api.delete("/users");
    },
    onSuccess: async () => {
      toast.success("Account deleted successfully!", { id: "delete-account" });
      storage.deleteDeviceFingerprint();
      storage.deletePrivateKey();
      if (stopBeams) {
        stopBeams();
      }
      window.location.href = "/";
    },
  });

  const handleDelete = () => {
    if (isPending) return;
    mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="flex grow cursor-pointer items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-95"
        >
          <Trash2Icon className="size-4" />
          Delete Account
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account. People with your link will no longer be able to send you
            messages. You can always create a new link later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            <Spinner title="Deleting account" loading={isPending}>
              Delete Account
            </Spinner>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccount;
