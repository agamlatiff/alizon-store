const Loading = () => {
  return (
    <div className="relative bottom-20 flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div
        className="w-16 h-16 border-4 border-blue-600 border-solid rounded-full animate-spin border-t-transparent"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
