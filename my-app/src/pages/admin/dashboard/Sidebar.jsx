import "./sidebar.css"
import Icon from '@mdi/react';
import { mdiAccountMultipleOutline } from '@mdi/js';
import { mdiInformationOutline } from '@mdi/js';
import { UserContext } from '../../../UserContext';
import React,{useContext} from "react";
import { mdiBrush } from '@mdi/js';
import { mdiCartCheck } from '@mdi/js';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

  export default function Sidebar() {
    const { SignStatus,updateSignStatus } = useContext(UserContext)

    function handleLogOut() {
      Swal.fire({
        title: 'done',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#00ff00', // Green color for the "OK" button
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#ff0000', // Red color for the "Cancel" button
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          updateSignStatus('signUp');
          localStorage.setItem('SignStatus', 'signUp');
          localStorage.removeItem('auth');
          localStorage.removeItem('roles');
          window.location.href = 'http://localhost:3000/';
        } else {
          Swal.fire('Cancelled', '', 'error');
        }
      });
    }
    

    return (
      <Card className=" min-h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-white-900/5 Sidebar bg-black">
        <div className="mb-2 p-4">
        <Typography className="text-red-500" variant="h5" color="blue-gray">
        <a> Masterpiece </a>
          </Typography>
        </div>
        <List>
          <Link to='/'>
          <ListItem className="hover:bg-red-500">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'white'}}> Statistics </a>
          </ListItem>
          </Link>




           <Link to='/ListUser'>
           <ListItem className="hover:bg-red-500">
            <ListItemPrefix>
            <Icon path={mdiAccountMultipleOutline} size={1} />
            </ListItemPrefix>
            <a style={{color:'white'}}> Users list </a>
          </ListItem>
          </Link>

          <Link to='/ListRestaurant'>
          <ListItem className="hover:bg-red-500">
            <ListItemPrefix>
            <Icon path={mdiBrush} size={1} />
            </ListItemPrefix>
            <a style={{color:'white'}}> Products List </a>
          </ListItem>
          </Link>

          <Link to='/EditAboutContact'>
          <ListItem className="hover:bg-red-500">
            <ListItemPrefix>
            <Icon path={mdiInformationOutline} size={1} />
            </ListItemPrefix>
            <a style={{color:'white'}}> Edit About </a>
          </ListItem>
          </Link>

          <Link to='/AcceptTables'>
          <ListItem className="hover:bg-red-500">
            <ListItemPrefix>
            <Icon path={mdiCartCheck} size={1} />
            </ListItemPrefix>
            <a style={{color:'white'}}> Order list </a>
          </ListItem>
          </Link>

         <Link to='/Chat'>
         <ListItem className="hover:bg-red-500">
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'white'}}> Inbox </a>
           
          </ListItem>
          </Link>
           <button onClick={handleLogOut}>
           <ListItem className="hover:bg-red-500">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <a style={{color:'white'}}> Log Out </a>
          </ListItem>
          </button>
        </List>
      </Card>
    );
  }