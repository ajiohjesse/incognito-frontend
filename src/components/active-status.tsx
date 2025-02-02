const ActiveStatus = ({ online }: { online: boolean }) => {
  return (
    <span className="block w-max font-medium">
      <span className="text-sm font-semibold">
        {online ? "Online" : "Offline"}
      </span>
      {online ? (
        <span className="ml-2 inline-block size-2 rounded-full bg-green-600" />
      ) : (
        <span className="ml-2 inline-block size-2 rounded-full bg-rose-600" />
      )}
    </span>
  );
};

export default ActiveStatus;
