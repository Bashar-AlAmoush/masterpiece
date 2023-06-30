
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import { mdiRestore } from '@mdi/js';
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { mdiHumanEdit } from '@mdi/js';
import Swal from 'sweetalert2'
import { mdiShieldCrownOutline } from '@mdi/js'
import { mdiAccountOutline } from '@mdi/js';
import { mdiAccountEdit } from '@mdi/js';
const UsersInfo = () => {

  const [persons, setPersons] = useState([]);
  const [deletepersons, setdeletePersons] = useState([]);
  const [searchTermUsers, setSearchTermUsers] = useState("");
  const [searchTermdeleteUsers, setSearchTermdeleteUsers] = useState("");
  const [FilterDataUsers, setFilterDataUsers] = useState([]);
  const [FilterDatadeleteUsers, setFilterDatadeleteUsers] = useState([]);
  const [HandleP, setHandleP] = useState();

  useEffect(() => {
      axios.get('http://localhost:5000/records')
      .then((response) => {
          setFilterDataUsers(response.data)
          setPersons(response.data);
      })
      .catch((error) => console.log(error.message))
  }, [HandleP]);



  useEffect(() => {
    axios.get('http://localhost:5000/deleterecords')
    .then((response) => {
      setFilterDatadeleteUsers(response.data)
        setdeletePersons(response.data);
    })
    .catch((error) => console.log(error.message))
}, []);

  //-----------------------search------------------------//

  const filterDataByNameUsers = (searchTermUsers) => {

    const filteredDataUsers = persons.filter((item) =>
      item.username.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDataUsers(filteredDataUsers);
    setCurrentPageUsers(1);
  };

  const filterDataByNamedeleteUsers = (searchTermUsers) => {

    const filteredDataUsers = deletepersons.filter((item) =>
      item.username.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDatadeleteUsers(filteredDataUsers);
    setCurrentPagedeleteUsers(1);
  };


  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPagedeleteUsers, setCurrentPagedeleteUsers] = useState(1);


  let totalItemsUsers;
  let totalItemsdeleteUsers;

  let totalPagesUsers;
  let totalPagesdeleteUsers;

  let slicedArrayUsers;
  let slicedArraydeleteUsers;

  const itemsPerPage = 4;

  totalItemsUsers = FilterDataUsers.length;
  totalItemsdeleteUsers = FilterDatadeleteUsers.length;

  totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);
  totalPagesdeleteUsers = Math.ceil(totalItemsdeleteUsers / itemsPerPage);

  const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;
  const startIndexdeleteUsers = (currentPagedeleteUsers - 1) * itemsPerPage;

  const endIndexUsers = startIndexUsers + itemsPerPage;
  const endIndexdeleteUsers = startIndexdeleteUsers + itemsPerPage;

  slicedArrayUsers = FilterDataUsers.slice(startIndexUsers, endIndexUsers);
  slicedArraydeleteUsers = FilterDatadeleteUsers.slice(startIndexdeleteUsers, endIndexdeleteUsers);

  const handlePageChangeUsers = (event, pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  const handlePageChangedeleteUsers = (event, pageNumber) => {
    setCurrentPagedeleteUsers(pageNumber);
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
              axios.get('http://localhost:5000/records')
              .then((response) => {
                  setFilterDataUsers(response.data)
                  setPersons(response.data);
              })
              .catch((error) => console.log(error.message))

              axios.get('http://localhost:5000/deleterecords')
              .then((response) => {
                setFilterDatadeleteUsers(response.data)
                  setdeletePersons(response.data);
              })
              .catch((error) => console.log(error.message))
          })
          .catch((error) => console.log(error.message))
      } else
          Swal.fire(' Cancelled', '', 'error')

  })


}



const handlerecover = (id,name) => {
  Swal.fire({
    title: `Do you want to recover ${name}?  `,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    icon: 'warning'
}
).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

        Swal.fire(` ${name} has been recover `, '', 'success');
     
        axios.put('http://localhost:5000/recoverrecordss/'+id)
        .then((response) => {
            console.log(response.data);
            axios.get('http://localhost:5000/records')
            .then((response) => {
                setFilterDataUsers(response.data)
                setPersons(response.data);
            })
            .catch((error) => console.log(error.message))

            axios.get('http://localhost:5000/deleterecords')
            .then((response) => {
              setFilterDatadeleteUsers(response.data)
                setdeletePersons(response.data);
            })
            .catch((error) => console.log(error.message))


        })
        .catch((error) => console.log(error.message))
    
   



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
      axios.get('http://localhost:5000/records')
      .then((response) => {
          setFilterDataUsers(response.data)
          setPersons(response.data);
      })
      .catch((error) => console.log(error.message))
    })
    .catch(function (error) {
    });

    
        Swal.fire(text2, '', 'success');
     
       
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
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

              <tr>
              <th scope="col" className="px-6 py-3">

                  NAME
                </th>
                <th scope="col" className="px-6 py-3">

                  email
                </th>
                <th scope="col" className="px-6 py-3">

                  phone
                </th>
                <th scope="col" className="px-6 py-3">

                 role
                </th>

                <th scope="col" className="px-6 py-3">

                 EDIT
                </th>

                <th scope="col" className="px-6 py-3">

                  DELETE
                </th>
              </tr>
            </thead>

            {slicedArrayUsers.map((e) => {
              return (
                <tbody >
      <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 `}>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                      
                   

                        {e.username}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                     
                            {e.email}
                         
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                        {e.phone_number}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                        {e.type_id == 0 ?  <div className=" w-10 flex flex-col justify-center items-center" > <Icon path={mdiAccountOutline} size={1} />  <span>user</span> </div> : <div className=" w-10 flex flex-col justify-center items-center"> <Icon path={mdiShieldCrownOutline} size={1} />  <span>Admin</span> </div> }
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                      <button onClick={() => handleUpdate(e.userid,e.type_id,e.username)}>
                        
                        
                        <Icon path={mdiAccountEdit}  color="blue" size={1} />

                      </button>
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

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

        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
          Deleted  Users Table
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
              value={searchTermdeleteUsers}
              onChange={(e) => {
                setSearchTermdeleteUsers(e.target.value);
                filterDataByNamedeleteUsers(e.target.value);
              }}
            />
          </div>
        </form>
        <div className="mt-8 overflow-x-scroll xl:overflow-hidden " >
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr >
              <th scope="col" className="px-6 py-3">

                 NAME
                </th>
                <th scope="col" className="px-6 py-3">

                 email
                </th>
                <th scope="col" className="px-6 py-3">

                phone
                </th>
                <th scope="col" className="px-6 py-3">

                  role
                </th>

             

                <th scope="col" className="px-6 py-3">

                  Recover
                </th>
              </tr>
            </thead>

            {slicedArraydeleteUsers.map((e) => {
              return (
                <tbody  >
      <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 `}>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                     

                        {e.username}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                            {e.email}
                        
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                        {e.phone_number}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                        {e.type_id == 0 ?  <div className=" w-10 flex flex-col justify-center items-center" > <Icon path={mdiAccountOutline} size={1} />  <span>user</span> </div> : <div className=" w-10 flex flex-col justify-center items-center"> <Icon path={mdiShieldCrownOutline} size={1} />  <span>Admin</span> </div> }
                    </td>

                

                    <td className="px-6 py-4">
                      <button onClick={() => handlerecover(e.userid,e.username)}>
                        <Icon color="green" path={mdiRestore} size={1} />
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
            count={totalPagesdeleteUsers}
            page={currentPagedeleteUsers}
            onChange={handlePageChangedeleteUsers}
          />
        }
      </div>

     

        </div>


      </div>
  
    </>
  );
};

export default UsersInfo;







