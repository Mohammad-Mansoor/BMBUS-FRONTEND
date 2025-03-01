import { useEffect } from "react";
import { toast } from "react-toastify";

const NetworkListener = () => {
  useEffect(() => {
    // ✅ Show toast when offline
    const handleOffline = () => {
      toast.error("⚠️ Connection lost!", {
        position: "top-right",
        style: { backgroundColor: "#FF5733", color: "#fff" }, // Red background for error
      });
    };

    // ✅ Show toast when back online
    const handleOnline = () => {
      toast.success("✅ You are back online!", {
        position: "top-right",
        style: { backgroundColor: "#45D483", color: "#fff" }, // Green background for success
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null;
};

export default NetworkListener;
