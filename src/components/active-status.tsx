const ActiveStatus = () => {
  const isActive = true;
  return (
    <span className="font-medium inline-block w-max">
      <span className="text-sm font-semibold">
        {isActive ? 'Online' : 'Offline'}
      </span>
      {isActive ? (
        <span className="inline-block ml-2 size-2 rounded-full bg-green-600" />
      ) : (
        <span className="inline-block ml-2 size-2 rounded-full bg-rose-600" />
      )}
    </span>
  );
};

export default ActiveStatus;
