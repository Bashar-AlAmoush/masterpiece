import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Swal from "sweetalert2";

import {
  Avatar,
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  LifebuoyIcon,
  PowerIcon,
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import logo from "../../images/logo.png";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const colors = {
  blue: "bg-red-50 text-red-500",
  orange: "bg-red-50 text-red-500",
  green: "bg-red-50 text-red-500",
  "red": "bg-red-gray-50 text-red-500",
  purple: "bg-red-50 text-red-500",
  teal: "bg-red-50 text-red-500",
  cyan: "bg-red-50 text-red-500",
  pink: "bg-red-50 text-red-500",
};

const navListMenuItems = [
  {
    color: "red",
    icon: FlagIcon,
    title: "About us",
    description: "Learn about our story and our mission statement.",
    path: "./About",
  },
  {
    color: "red",
    icon: ChatBubbleOvalLeftIcon,
    title: "Contact Us",
    description: "News and writings, press releases, and resources",
    path: "./ContactUs",
  },

  {
    color: "red",
    icon: RocketLaunchIcon,
    title: "User Profile",
    description: "Checkout your profile",
    path: "./UserProfile",
  },
  {
    color: "red",
    icon: FaceSmileIcon,
    title: "Admin",
    description: "Add you recipes",
    path: "./Admin",
  },
  {
    color: "red",
    icon: PuzzlePieceIcon,
    title: "recipes",
    description: "What I can cook",
    path: "./Recipes",
  },
];

function NavListMenu1() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color, path }, key) => (
      <Link to={path} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 bg-red-500`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6 bg-red-500",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="red"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="red" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <React.Fragment>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="red"
        className="font-normal"
      >
       
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="red"
        className="font-normal"
      >
       
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="red"
        className="font-normal"
      >
      
      </Typography>
      <NavListMenu1 />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="red"
        className="font-normal"
      >
     
      </Typography>
    </List>
  );
}

export default function Example() {
  const [openNav, setOpenNav] = React.useState(false);
  const { SignStatus, updateSignStatus } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.SignStatus != null) {
      updateSignStatus(localStorage.SignStatus);
    }
  }, []);

  function handleSign() {
    if (SignStatus == "signUp") {
      window.location.href = "http://localhost:3000/SignUp";
    } else {
      Swal.fire({
        title: ` logout?  `,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "#ea4d24",
        cancelButtonText: "Cancel",
        cancelButtonColor: "#ea4d24",
        icon: "warning",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire(`  done `, "", "success");

          updateSignStatus("signUp");
          localStorage.setItem("SignStatus", "signUp");

          localStorage.removeItem("auth");
          localStorage.removeItem("roles");
          window.location.href = "http://localhost:3000/";
        } else Swal.fire(" Cancelled", "", "error");
      });
    }
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const profileMenuItems = [
    // {
    //   label: "Profile",
    //   icon: LifebuoyIcon,
    // },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

  function ProfileMenu() {
    const { SignStatus, updateSignStatus } = useContext(UserContext);

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = (label) => {
      setIsMenuOpen(false);

      if (label == "Sign Out") {
        updateSignStatus("signUp");
        localStorage.setItem("SignStatus", "signUp");
        localStorage.removeItem("auth");
        localStorage.removeItem("roles");
        window.location.href = "http://localhost:3000/";

        console.log(label);
      } else if (label == "Profile") {
        window.location.href = "http://localhost:3000/ProfilePage";
      }
    };

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="red"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <svg
              xmlns="https://source.unsplash.com/MP0IUfwrn0A"
              className="h-7 w-7 text-red-600 bg-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {" "}
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform text-white ${
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
                onClick={() => {
                  closeMenu(label);
                }}
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

  return (
    <Navbar
      className="w-screen sticky top-0 z-20"
      style={{ backgroundColor: "black", border: "none", borderRadius: "0" }}
    >
      <div className="flex items-center justify-between text-white">
        <Typography
          as="a"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          <Link to="/">
            <img src={logo} alt="logo" width={150} />
          </Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          {SignStatus == "signUp" ? (
            <Button
              onClick={() => handleSign()}
              size="sm"
              className="bg-red-600 hover:shadow-lg-red-600"
            >
              Sign Up
            </Button>
          ) : (
            <ProfileMenu />
          )}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Sign In
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
