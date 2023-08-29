import React from "react";
import Icon from '@mdi/react';
import { useContext } from "react";
import logo from "../../../images/logo.png";

import { mdiAccountMultipleOutline,mdiOctagramOutline ,mdiCartCheck,mdiSaleOutline,mdiDraw,mdiArtboard,mdiInformationOutline , mdiInbox,mdiBrush } from '@mdi/js';
import { UserContext } from '../../../UserContext';
import './dashboard.css'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";

import {  ChevronDownIcon, PowerIcon, Bars2Icon} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


const profileMenuItems = [
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { SignStatus,updateSignStatus } = useContext(UserContext)

  const  closeMenu = (label) =>{ 
    setIsMenuOpen(false)

if(label == "Sign Out"){
     updateSignStatus("signUp")
    localStorage.setItem("SignStatus","signUp")
    localStorage.removeItem("auth");
    localStorage.removeItem("roles");
    window.location.href = 'http://localhost:3000/';

  console.log(label)
}

};
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={()=>{closeMenu(label)}}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
function NavListMenuD() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };
 
  
 
}
 
// nav list component
const navListItems = [
  {
    label: "Statistics",
    icon: mdiOctagramOutline,
    path: "/"
  },
  {
    label: "Users List",
    icon: mdiAccountMultipleOutline ,
    path: "/ListUser"
  },
  {
    label: "products List ",
    icon: mdiBrush,
    path: "/ListProducts"
  },
  {
    label: "Orders List ",
    icon: mdiCartCheck,
    path: "/ListOrders"
  },
  {
    label: "Sales List ",
    icon: mdiSaleOutline,
    path: "/ListSales"
  },

  {
    label: "Drawing List ",
    icon: mdiDraw,
    path: "/DrawingList"
  },
  {
    label: "Pending Drawing ",
    icon: mdiArtboard,
    path: "/PendingDrawing"
  },

  {
    label: "Inbox",
    icon: mdiInbox ,
    path: "/Chat"
  },

  {
    label: "Edit About ",
    icon: mdiInformationOutline,
    path: "/EditAboutContact"
  },
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center bg-[#f4f7fe]">
      <NavListMenuD />
      {navListItems.map(({ label, icon,path }, key) => (
        <Link to={path}>
        <Typography
          key={label}
          as="a"       
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <Icon path={icon} size={1} />
            {label}
          </MenuItem>
        </Typography>
        </Link>
      ))}
    </ul>
  );
}
 
export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
 
  return (
    <Navbar className=" sticky top-0 z-10 mx-auto max-w-screen p-2 bg-white rounded-full lg:pl-6 h-14 DashboardNav">
      <div className="relative mx-auto flex items-center text-blue-gray-900"> 
      
           <Link to="/">
        <img
          src={logo}
          alt="logo"
          style={{ height: "50px", width: "150px" }}
        />
      </Link>

        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}