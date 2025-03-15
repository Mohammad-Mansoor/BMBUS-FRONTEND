const EmptyState = ({
  title = "No records found",
  description = "It looks like there's nothing to display here yet.",
  action,
  illustration: Illustration = DefaultIllustration,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 py-20 mx-auto max-w-xs md:max-w-sm space-y-6">
      <div className="relative w-48 h-48 text-gray-200 animate-fade-in-up">
        <Illustration />
      </div>

      <div className="space-y-3 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-pretty">
          {description}
        </p>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

const DefaultIllustration = () => (
  <svg
    viewBox="0 0 128 128"
    className="w-full h-full"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <path
      d="M64 20C40.147 20 20 40.147 20 64s20.147 44 44 44 44-20.147 44-44S87.853 20 64 20z"
      className="opacity-20"
    />
    <path
      d="M84 56h-8v-8h-8v8h-8v8h8v8h8v-8h8v-8z"
      fill="currentColor"
      className="text-gray-300 dark:text-gray-600"
    />
    <path
      d="M52 44l-4 12 12-4-4-12-4 12z"
      className="text-indigo-500"
      fill="currentColor"
    />
    <path
      d="M76 44l-4 12 12-4-4-12-4 12z"
      className="text-indigo-500"
      fill="currentColor"
    />
  </svg>
);

export default EmptyState;
