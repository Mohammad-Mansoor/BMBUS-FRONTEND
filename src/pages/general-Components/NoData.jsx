const NoData = ({ message = "No data available" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500 dark:text-gray-400">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="No Data"
        className="w-24 h-24 opacity-70"
      />
      <p className="mt-4 text-lg font-semibold">{message}</p>
    </div>
  );
};

export default NoData;
