import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import routes from "../../routes/routes";
import { useTranslation } from "react-i18next";

export default function Layout({ children }) {
  const { i18n, t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isScreenMd, setIsScreenMd] = useState(false);

  // Detect if the language is RTL
  const isRTL = i18n.language === "ps" || i18n.language === "fa";

  useEffect(() => {
    const handleResize = () => {
      setIsScreenMd(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="light text-foreground bg-background "
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`flex min-h-screen h-auto dark:bg-black ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 z-20 text-white p-4 fixed h-full shadow-xl transition-all duration-300 ${
            isScreenMd
              ? isSidebarOpen
                ? "w-64"
                : "w-16"
              : isSidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-[400px] w-64"
          } md:translate-x-0 ${
            isRTL ? "right-0 left-auto" : "left-0 right-auto"
          }`}
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
                    } hover:bg-gray-700 rounded cursor-pointer flex items-center gap-3 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
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
                        <span className="mx-2">{route.name}</span>
                      )}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </aside>

        {/* Main Content */}
        <div
          className={`flex flex-col flex-1 ml-0 transition-all duration-300 ${
            isScreenMd
              ? isSidebarOpen
                ? isRTL
                  ? "md:mr-64"
                  : "md:ml-64"
                : isRTL
                ? "md:mr-16"
                : "md:ml-16"
              : ""
          }`}
        >
          {/* Navbar */}
          <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            {!isSidebarOpen && (
              <button
                className="text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            )}
            <div className="w-full">
              <Navbar />
            </div>
          </nav>

          {/* Page Content */}
          <main className="p-4 flex-1 bg-gray-100 dark:text-gray-300 dark:bg-gray-700">
            {children}
          </main>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={isRTL}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            limit={3}
          />
        </div>
      </div>
    </div>
  );
}
