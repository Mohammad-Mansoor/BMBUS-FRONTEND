import { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiSettings, FiUser } from "react-icons/fi";
import routes from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { ToastContainer } from "@heroui/react";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isScreenMd, setIsScreenMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenMd(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="light text-foreground bg-background">
      <div className="flex min-h-screen h-auto">
        <aside
          className={`bg-gray-800 text-white p-4 fixed h-full shadow-xl transition-all duration-300 ${
            isScreenMd
              ? isSidebarOpen
                ? "w-64"
                : "w-16"
              : isSidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-64 w-64"
          } md:translate-x-0`}
        >
          <div className="text-lg font-bold mb-4 flex justify-between items-center">
            <p className={`${isSidebarOpen ? "block" : "hidden md:block"}`}>
              {isSidebarOpen ? "My App" : "logo"}
            </p>
            {isSidebarOpen && (
              <button
                className="text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            )}
          </div>

          <ul className="flex flex-col items-center justify-start w-full">
            {routes.map(
              (route, i) =>
                route.name && (
                  <li
                    key={i}
                    className={`p-2 ${
                      isSidebarOpen ? "w-full" : ""
                    }  hover:bg-gray-700 rounded cursor-pointer flex items-center`}
                  >
                    <NavLink
                      to={route.path}
                      className={({ isActive }) =>
                        `flex items-center w-full p-2 rounded ${
                          isActive ? "bg-gray-700 text-blue-400" : "text-white"
                        }`
                      }
                    >
                      {route.icon}
                      {isSidebarOpen && (
                        <span className="ml-2">{route.name}</span>
                      )}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </aside>

        <div
          className={`flex flex-col flex-1 ml-0 transition-all duration-300 ${
            isScreenMd ? (isSidebarOpen ? "md:ml-64" : "md:ml-16") : ""
          }`}
        >
          <nav className="bg-gray-900 text-white p-4  flex justify-between items-center">
            {!isSidebarOpen && (
              <button
                className="text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            )}
            <div className="text-lg font-bold">Navbar</div>
          </nav>

          <main className="p-4 flex-1 bg-gray-100">{children}</main>
          <ToastContainer
            position="top-right" // Position of the toast
            autoClose={3000} // Time in milliseconds before the toast auto-closes
            hideProgressBar={false} // Show/hide the progress bar
            newestOnTop={false} // Display new toasts on top
            closeOnClick // Close the toast when clicked
            rtl={false} // Right-to-left support
            pauseOnFocusLoss // Pause toast when the window loses focus
            draggable // Allow dragging the toast
            pauseOnHover // Pause the timer when hovering over the toast
            theme="light" // Theme options: 'light', 'dark', 'colored'
            limit={3} // Limit the number of toasts shown at the same time
           
          />
        </div>
      </div>
    </div>
  );
}
