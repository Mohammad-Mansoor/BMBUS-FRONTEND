import { lazy } from "react";

const HomePage = lazy(() => import("../pages/Home/Home"));
const AboutPage = lazy(() => import("../pages/About/About"));
const ContactPage = lazy(() => import("../pages/Contact/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));
import { MdHome } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FiMenu, FiX, FiHome, FiSettings, FiUser } from "react-icons/fi";

const routes = [
  {
    name: "Home",
    icon: <FiHome />,
    path: "/",
    element: <HomePage size={20} />,
    exact: true,
  },
  {
    name: "About",
    icon: <FiSettings size={20} />,
    path: "/about",
    element: <AboutPage />,
  },
  {
    name: "Contact",
    icon: <FiUser size={20} />,
    path: "/contact",
    element: <ContactPage />,
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
