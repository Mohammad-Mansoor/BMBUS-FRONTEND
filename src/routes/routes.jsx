import { lazy } from "react";

const HomePage = lazy(() => import("../pages/Home/Home"));
const AboutPage = lazy(() => import("../pages/About/About"));
const ContactPage = lazy(() => import("../pages/Contact/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Routes = lazy(() => import("../pages/Operator-routes"));
const CreateRoute = lazy(() => import("../pages/Operator-routes/createRoute"));
import { MdHome } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FaRoute } from "react-icons/fa6";
import { FiMenu, FiX, FiHome, FiSettings, FiUser } from "react-icons/fi";

const routes = [
  {
    name: "Home",
    icon: <FiHome />,
    path: "/",
    element: <HomePage size={15} />,
    exact: true,
  },
  {
    name: "About",
    icon: <FiSettings size={15} />,
    path: "/about",
    element: <AboutPage />,
  },
  {
    name: "Contact",
    icon: <FiUser size={15} />,
    path: "/contact",
    element: <ContactPage />,
  },
  {
    name: "Routes",
    pashto_name: "لارې",
    dari_name: "مسیرها",
    icon: <FaRoute size={15} />,
    path: "/operator-routes",
    element: <Routes />,
  },
  {
    path: "/operator-routes/create-route/:id",
    element: <CreateRoute />,
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
