import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { mdiFileEdit } from "@mdi/js";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { mdiHamburgerPlus } from '@mdi/js';
import Swal from 'sweetalert2'

import { mdiShieldCrownOutline } from '@mdi/js'
import { mdiAccountOutline } from '@mdi/js';

const Tables = () => {

    const [pendingTables, setPendingTables] = useState([]);
    const [names, setNames] = useState([]);
    const [emails, setEmails] = useState([]);
    const [emailSend, setEmailSend] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/pendingTables')
        .then((response) => {
            setPendingTables(response.data.tables);
            setFilterDataUsers(response.data.tables)
            setNames(response.data.names)
            setEmails(response.data.emails)
            console.log(response.data)
        })
        .catch((error) => console.log(error.message))

    }, []);


//-----------------------search------------------------//
const [searchTermUsers, setSearchTermUsers] = useState("");
const [FilterDataUsers, setFilterDataUsers] = useState([]);

const filterDataByNameUsers = (searchTermUsers) => {

  const filteredDataUsers = pendingTables.filter((item) =>
    item.username.toLowerCase().includes(searchTermUsers.toLowerCase())
  );
  setFilterDataUsers(filteredDataUsers);
  setCurrentPageUsers(1);
};

const [currentPageUsers, setCurrentPageUsers] = useState(1);
let totalItemsUsers;

let totalPagesUsers;

let slicedArrayUsers;

const itemsPerPage = 3;

totalItemsUsers = FilterDataUsers.length;

totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);

const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;

const endIndexUsers = startIndexUsers + itemsPerPage;

slicedArrayUsers = FilterDataUsers.slice(startIndexUsers, endIndexUsers);

const handlePageChangeUsers = (event, pageNumber) => {
  setCurrentPageUsers(pageNumber);
};

const handleDelete = (id,name) => {

//     Swal.fire({
//       title: ` do you want to remove ${name}?  `,
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: "OK",
//       cancelButtonText: "Cancel",
//       icon: 'warning'
//   }
//   ).then((result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {

//           Swal.fire(` ${name} has been removed `, '', 'success');
       
//           axios.put('http://localhost:5000/recordss/'+id)
//           .then((response) => {
//               console.log(response.data);
//           })
//           .catch((error) => console.log(error.message))
      
//           window.location.reload();



//       } else
//           Swal.fire(' Cancelled', '', 'error')

//   })


}

const handleUpdate = (table_id,e,i) => {

 let  index =((currentPageUsers - 1) * itemsPerPage + i)
  
 axios.get('http://localhost:5000/pendingTables')
 .then((response) => {
     setPendingTables(response.data.tables);
     setFilterDataUsers(response.data.tables)
     setNames(response.data.names)
 })
 .catch((error) => console.log(error.message))

     Swal.fire({
       title: `accept  table?`,
       showConfirmButton: true,
       showCancelButton: true,
       confirmButtonText: "OK",
       cancelButtonText: "Cancel",
       icon: 'warning'
   }
   ).then((result) => {
       /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) {
         axios.put('http://localhost:5000/pendingTables/' + table_id, {
            table_id: table_id,

          
                     
       })
       .then(function (response) {
       
       })
       .catch(function (error) {
       });
   
 



       sendEmail(index)





       
           Swal.fire("the table has been accepted", '', 'success');
        
           window.location.reload();
       } else
           Swal.fire(' Cancelled', '', 'error')
   
   })
   
   
    }



    const sendEmail = (index) => {




      const recipient = emails[index].email;
      const subject = 'Hello';
      const body = 'your table has been accepted';
  
      const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      window.location.href = mailtoLink;
    }




  return (
   
    <>
    
    
    <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)]">
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Users Table
          </div>
        </div>

        <form>
          <div className="relative mt-5 ">
            <input
              type="text"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required=""
              value={searchTermUsers}
              onChange={(e) => {
                setSearchTermUsers(e.target.value);
                filterDataByNameUsers(e.target.value);
              }}
            />
          </div>
        </form>

        <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
          <table role="table" className="w-full">
            <thead>
              <tr role="row">
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">NAME</p>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">email</p>
                </th>
                {/* <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">phone</p>
                </th> */}
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">status</p>
                </th>

                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">EDIT</p>
                </th>

                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-5 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">DELETE</p>
                </th>
              </tr>
            </thead>

            {slicedArrayUsers.map((e,i) => {
              return (
                <tbody role="rowgroup">
                  <tr role="row">
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px] flex items-center"
                      role="cell"
                    >
                      <div className="h-[30px] w-[30px] rounded-full">
                        <img
                          src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"
                          className="h-full w-full rounded-full"
                          alt=""
                        />
                      </div>

                      <p className="text-sm font-bold text-navy-700 dark:text-white ml-3">
                        {names[i].restaurant_name}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <div className="flex items-center gap-2">
                        <div className="rounded-full text-xl">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {emails[i].email}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {e.table_id}
                      </p>
                    </td> */}
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {e.flags == 0 ? "pending" : "avilable"}
                      </p>
                    </td>

                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >

                      <button onClick={() => {
                        
                        handleUpdate(e.table_id,e,i)
                      }}>

                        {e.type_id == 0 ? <Icon color="blue" path={mdiHamburgerPlus} size={1} /> : <Icon color="blue"  path={mdiHamburgerPlus} size={1} />}
                        
                      </button>
                      
                    </td>

                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <button onClick={() => handleDelete(e.userid,e.username)}>
                        <Icon color="red" path={mdiDelete} size={1} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>


          <div className="flex w-full justify-center mt-5 bg-white">
        {
          <Pagination
            count={totalPagesUsers}
            page={currentPageUsers}
            onChange={handlePageChangeUsers}
          />
        }
      </div>
        </div>
      </div>
 
    </>
    
   
  )
}

export default Tables