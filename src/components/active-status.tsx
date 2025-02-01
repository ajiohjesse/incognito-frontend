const ActiveStatus = () => {
  const isActive = true;
  return (
    <span className="inline-block w-max font-medium">
      <span className="text-sm font-semibold">
        {isActive ? "Online" : "Offline"}
      </span>
      {isActive ? (
        <span className="ml-2 inline-block size-2 rounded-full bg-green-600" />
      ) : (
        <span className="ml-2 inline-block size-2 rounded-full bg-rose-600" />
      )}
    </span>
  );
};

export default ActiveStatus;
