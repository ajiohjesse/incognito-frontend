import { useMutation } from "@tanstack/react-query";
import { SparklesIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { userQuery } from "../api/queries";
import { ApiTypes } from "../api/types";
import { api } from "../lib/axios";
import Encrypter from "../lib/encrypter";
import { queryClient } from "../lib/react-query";
import { storage } from "../lib/storage";
import { handleQueryError } from "../lib/utils";
import Spinner from "./ui/spinner";

function GetStartedLink() {
  const navigate = useNavigate();
  const fingerprint = storage.getDeviceFingerprint();
  const encrypter = new Encrypter();

  const { isPending, mutate } = useMutation({
    mutationKey: ["generate-link"],
    mutationFn: async () => {
      const fingerprint = await storage.setDeviceFingerprint();
      if (!fingerprint) {
        throw new Error("Failed to generate device fingerprint");
      }
      const { publicKey, privateKey } = await encrypter.generateKeyPair();
      storage.setPrivateKey(privateKey);
      return (
        await api.post<ApiTypes["currentUser"]>("/users", {
          deviceFingerprint: fingerprint,
          publicKey: publicKey,
        })
      ).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(userQuery());
      navigate("/u/messages");
    },
    onError: (error) => {
      handleQueryError(error);
      storage.deletePrivateKey();
      storage.deleteDeviceFingerprint();
    },
  });

  if (fingerprint) {
    return (
      <Link
        to="/u/messages"
        className="flex w-max cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-8 py-4 text-lg text-white shadow-2xl transition-colors transition-transform hover:scale-105 hover:bg-purple-600"
      >
        <SparklesIcon className="h-5 w-5" />
        Retrieve your messages
      </Link>
    );
  }

  const handleGenerateLink = () => {
    if (isPending) {
      return;
    }
    mutate();
  };

  return (
    <button
      onClick={handleGenerateLink}
      disabled={isPending}
      className="flex w-max cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-8 py-4 text-lg text-white shadow-2xl transition-colors transition-transform hover:scale-105 hover:bg-purple-600"
    >
      <Spinner
        loading={isPending}
        title="Generating Link"
        childrenClassName="flex items-center gap-2"
      >
        <SparklesIcon className="h-5 w-5" />
        Create Anonymous Link
      </Spinner>
    </button>
  );
}

export default GetStartedLink;
