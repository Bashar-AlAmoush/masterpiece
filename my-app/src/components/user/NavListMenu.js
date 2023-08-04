import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Icon from '@mdi/react';
import { useNavigate } from 'react-router-dom';
import { mdiPaletteOutline } from '@mdi/js';
import { mdiDraw } from '@mdi/js';

import {
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
  MenuItem
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
  
  ShoppingCartIcon,
  HomeIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import logo from "../../images/logo.png";





export default function NavbarComponent() {







  const [openNav, setOpenNav] = React.useState(false);
  const { SignStatus, updateSignStatus } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.SignStatus != null) {
      updateSignStatus(localStorage.SignStatus);
    }
  },[SignStatus]);

  function handleSign() {
    if (SignStatus ==="signUp") {
      navigate("/SignUp");
    } 
  }

  function handlecart() {
    if (SignStatus ==="signUp") {
      navigate("/cart");
    } 
  }

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);


  const navigate = useNavigate();
  function ProfileMenu() {
    const { SignStatus, updateSignStatus } = useContext(UserContext);

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = (label) => {
      setIsMenuOpen(false);
    
      if (label === "Sign Out") {
        updateSignStatus("signUp");
        localStorage.setItem("SignStatus", "signUp");
        localStorage.removeItem("auth");
        localStorage.removeItem("roles");
        localStorage.removeItem("curruntUser");
        navigate("/");
      } else if (label === "Profile") {
        navigate("/ProfilePage");
      } else if (label === "Cart") {
        navigate("/Cart");
      }
      else if (label === "Wishlist") {
        navigate("/Wishlist");
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
            <svg
              xmlns="https://source.unsplash.com/MP0IUfwrn0A"
              className="h-7 w-7 text-red-600"
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



  const navListMenuItems = [
    {
      color: "blue",
      icon: FlagIcon,
      title: "About us",
      description: "Learn about our story and our mission statement.",
      path: "./About",
    },
    {
      color: "orange",
      icon: ChatBubbleOvalLeftIcon,
      title: "Contact Us",
      description: "News and writings, press releases, and resources",
      path: "./ContactUs",
    },
  
    {
      color: "purple",
      icon: RocketLaunchIcon,
      title: "User Profile",
      description: "Checkout your profile",
      path: "./UserProfile",
    },
    
   
  ];
  
  function NavListMenu() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    
    const renderItems = navListMenuItems.map(
      ({ icon, title, description, color, path }, key) => (
        <Link to={path} key={key}>
          <MenuItem className="flex items-center gap-3 rounded-lg">
            <div className={`rounded-lg p-5 `}>
              {React.createElement(icon, {
                strokeWidth: 2,
                className: "h-6 w-6",
              })}
            </div>
            <div>
              <Typography
                variant="h6"
                
                className="flex items-center text-sm"
              >
                {title}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {description}
              </Typography>
            </div>
          </MenuItem>
        </Link>
      )
    );
  
    return (
      <>
        <div className="block lg:hidden">
          <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
        </div>
      </>
    );
  }
  
  function NavList() {
    return (
      <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
        
          <Link to="/">
            <ListItem className="flex items-center gap-2 py-2 pr-4 text-white hover:bg-black hover:text-red-400 focus:text-red-600">
              <HomeIcon className="h-[18px] w-[18px] text-red-600" />
              Home
            </ListItem>
          </Link>
    
       
          <Link to="/ServicePageAll">
            <ListItem className="flex items-center gap-2 py-2 pr-4 text-white hover:bg-black hover:text-red-400 focus:text-red-600">
           
            <Icon path={mdiPaletteOutline}  color={'red'}  size={1} />
  
            EQUIPMENT
            </ListItem>
          </Link>
          <Link to="/Painting">
            <ListItem className="flex items-center gap-2 py-2 pr-4 text-white hover:bg-black hover:text-red-400 focus:text-red-600">
            <Icon path={mdiDraw}  color={'red'}  size={1} />
            Painting
            </ListItem>
          </Link>
        
          <Link to="/About">
            <ListItem className="flex items-center gap-2 py-2 pr-4 text-white hover:bg-black hover:text-red-400  focus:text-red-600">
              <CubeTransparentIcon className="h-[18px] w-[18px] text-red-600" />
              About Us
            </ListItem>
          </Link>
  
        
        <NavListMenu />
        
          <Link to="/ContactUs">
            <ListItem className="flex items-center gap-2 py-2 pr-4 text-white hover:bg-black  hover:text-red-400  focus:text-red-600">
              <UserCircleIcon className="h-[18px] w-[18px] text-red-600" />
              Contact Us
            </ListItem>
          </Link>
       
      </List>
    );
  }
  
  const profileMenuItems = [
    {
      label: "Profile",
      icon: LifebuoyIcon,
    },
    {
      label: "Cart" ,
      icon: ShoppingCartIcon,
    },
    {
      label: "Wishlist",
      icon: HeartIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];






  return (

    <Navbar
    className="w-full sticky top-0 z-20"
    style={{ backgroundColor: "black", border: "none", borderRadius: "0" }}
  >
    <div className="flex items-center justify-between text-white">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          style={{ height: "50px", width: "150px" }}
        />
      </Link>
      <div className="hidden lg:block">
        <NavList />
      </div>
      <div className={`hidden gap-2 lg:flex ${openNav ? "ml-auto" : ""}`}>
        {SignStatus === "signUp" ? (
          <>
            <Button
              onClick={handleSign}
              size="sm"
              className="bg-red-700 hover:shadow-lg-red-600 px-3 py-2"
            >
              Sign Up
            </Button>
          </>
        ) : (
          <ProfileMenu />
        )}
      </div>
      <IconButton
        variant="text"
        color="blue-gray"
        className="lg:hidden bg-red-700"
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
    <div className="grid grid-cols-2 gap-4">
  <NavList />

  {SignStatus === "signUp" ? (
    <>
      <Button
        onClick={handleSign}
        size="sm"
        className="bg-red-700 hover:shadow-lg-red-600 px-3 py-2 rounded-md text-white"
      >
        Sign Up
      </Button>
    </>
  ) : (
    <div className="flex items-center gap-2 ml-auto">
      <ProfileMenu />
    </div>
  )}
</div>


    </Collapse>
  </Navbar>
  
  );
}
