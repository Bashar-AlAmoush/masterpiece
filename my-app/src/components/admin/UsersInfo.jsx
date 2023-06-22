
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { mdiFileEdit } from "@mdi/js";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { mdiHumanEdit } from '@mdi/js';
import Swal from 'sweetalert2'

import { mdiShieldCrownOutline } from '@mdi/js'
import { mdiAccountOutline } from '@mdi/js';

const UsersInfo = () => {

  const [persons, setPersons] = useState([]);
  const [persons0, setPersons0] = useState([]);

  const [searchTermUsers, setSearchTermUsers] = useState("");
  const [FilterDataUsers, setFilterDataUsers] = useState([]);
  const [HandleP, setHandleP] = useState();

  useEffect(() => {
      axios.get('http://localhost:5000/records')
      .then((response) => {
          setFilterDataUsers(response.data)
      })
      .catch((error) => console.log(error.message))
  }, [HandleP]);

  useEffect(() => {
    axios.get('http://localhost:5000/records')
    .then((response) => {
      setPersons(response.data);
    })
    .catch((error) => console.log(error.message))
});

  //-----------------------search------------------------//

  const filterDataByNameUsers = (searchTermUsers) => {

    const filteredDataUsers = persons.filter((item) =>
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



    Swal.fire({
      title: `Do you want to remove ${name}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
  }
  ).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

          Swal.fire(` ${name} has been removed `, '', 'success');
       
          axios.put('http://localhost:5000/recordss/'+id)
          .then((response) => {
              console.log(response.data);
          })
          .catch((error) => console.log(error.message))
      
          // window.location.reload();



      } else
          Swal.fire(' Cancelled', '', 'error')

  })


}

const handleUpdate = (userid,typeid,name) => {

 let role = typeid == 0 ? "user" : "admin"
 let role2 = typeid == 1 ? "user" : "admin"
 let text1 =""
 let text2 =""
if (role == "user"){

  text1 = `Do you want to switch ${name} to admin `
  text2 = ` ${name} is now an admin `

}else{

  text1 = `Do you want to switch ${name} to user `
  text2 = ` ${name} is now a user `

}
  Swal.fire({
    title: text1,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    icon: 'warning'
}
).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      axios.put('http://localhost:5000/records/' + userid, {
        id: typeid,           
    })
    .then(function (response) {  
      setHandleP(HandleP+1)
    })
    .catch(function (error) {
    });

    
        Swal.fire(text2, '', 'success');
     
        // window.location.reload();
    } else
        Swal.fire(' Cancelled', '', 'error')

})


 }

  return (
    <>
      <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)]   ">
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Users Table
          </div>
        </div>

        <form>
          <div className="relative mt-5">
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

        <div className="mt-8 overflow-x-scroll xl:overflow-hidden " >
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
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">phone</p>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  style={{ cursor: "pointer" }}
                >
                  <p className="text-xs tracking-wide text-gray-600">role</p>
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

            {slicedArrayUsers.map((e) => {
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
                        {e.username}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <div className="flex items-center gap-2">
                        <div className="rounded-full text-xl">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {e.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {e.phone_number}
                      </p>
                    </td>
                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {e.type_id == 0 ?  <div className=" w-10 flex flex-col justify-center items-center" > <Icon path={mdiAccountOutline} size={1} />  <span>user</span> </div> : <div className=" w-10 flex flex-col justify-center items-center"> <Icon path={mdiShieldCrownOutline} size={1} />  <span>Admin</span> </div> }

{/* <Icon path={mdiShieldCrownOutline} size={1} />
<Icon path={mdiAccountOutline} size={1} /> */}


                      </p>
                    </td>

                    <td
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
                      role="cell"
                    >
                      <button onClick={() => handleUpdate(e.userid,e.type_id,e.username)}>
                        
                        
                        {e.type_id == 0 ? <Icon color="blue" path={mdiHumanEdit} size={1} /> : <Icon color="blue" path={mdiHumanEdit} size={1} />}
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


          <div className="flex w-full justify-center mt-5">
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
  );
};

export default UsersInfo;







