import { addToast } from "@heroui/toast";
import { useEffect } from "react";

const NetworkListener = () => {
  useEffect(() => {
    // ✅ Show toast when offline
    const handleOffline = () => {
      addToast({
        title: "Network Connectivity",
        description: "You Lost Network Conectivity",

        variant: "solid",
        color: "danger",
      });
    };

    // ✅ Show toast when back online
    const handleOnline = () => {
      addToast({
        title: "Network Connectivity",
        description: "Network Connection Established",

        variant: "solid",
        color: "success",
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
