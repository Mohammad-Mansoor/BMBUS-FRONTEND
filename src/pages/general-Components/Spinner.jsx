import { Spinner } from "@heroui/react";

const SpinnerOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <Spinner size="lg" color="white" />
    </div>
  );
};

export default SpinnerOverlay;
