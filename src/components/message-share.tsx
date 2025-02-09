import { CornerUpRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const ShareMessage = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="mt-2 flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-200 hover:text-purple-900">
          Share <CornerUpRight className="size-4" />
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
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShareMessage;
