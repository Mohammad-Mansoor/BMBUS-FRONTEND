import { FiMenu, FiX } from "react-icons/fi";
import DarkHandler from "./DarkMode";
import Language from "./language";
import { NotificationIcon } from "./Notification";
import Switch from "./themeSelector";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@heroui/react";

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div className="w-full rounded-md  flex items-center justify-between overflow-hidden py-2 bg-primary-600 px-4">
      {/* <div className="text-white">logo</div> */}
      {!isSidebarOpen && (
        <button
          className="text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}
      <div className="flex items-center gap-4 justify-end w-full">
        <div>
          <Language />
        </div>
        <div className="">
          <DarkHandler />
        </div>

        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-start" variant="solid">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  className: "md:w-8 md:h-8 w-7 h-7", // 24px on mobile (6 * 4px)
                }}
                className="transition-transform"
                description={
                  <span className="max-md:hidden text-[14px]">
                    @tonyreichert
                  </span>
                }
                name={
                  <div className="flex flex-col max-md:hidden">
                    <span className="font-bold text-[14px]">Tony Reichert</span>
                    {/* Add email if needed */}
                  </div>
                }
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User Actions"
              variant="flat"
              className="!flex !flex-col gap-2 max-md:w-full"
            >
              <DropdownItem key="profile" className=" h-14 gap-10 ">
                <p className="font-bold ">Signed in as</p>
                <p className="font-bold ">@tonyreichert</p>
              </DropdownItem>
              <DropdownItem key="settings">Update Password</DropdownItem>

              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
