import { lazy } from "react";

const HomePage = lazy(() => import("../pages/Home/Home"));
const AboutPage = lazy(() => import("../pages/About/About"));
const ContactPage = lazy(() => import("../pages/Contact/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));
import { MdHome } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FaRoute } from "react-icons/fa6";
import { FiMenu, FiX, FiHome, FiSettings, FiUser } from "react-icons/fi";
import Routes from "../pages/Operator-routes";

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
  {
    name: "Routes",
    pashto_name: "لارې",
    dari_name: "مسیرها",
    icon: <FaRoute size={20} />,
    path: "/operator-routes",
    element: <Routes />,
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
