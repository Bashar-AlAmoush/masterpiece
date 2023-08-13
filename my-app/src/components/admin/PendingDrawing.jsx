import Icon from '@mdi/react';
import { mdiDelete } from "@mdi/js";
import React, { useEffect, useState } from 'react'
import { mdiRestore } from '@mdi/js';
import './scrollbar.css';
import axios from 'axios'
import Swal from 'sweetalert2'
 import Pagination from "@mui/material/Pagination";
 import { mdiCheckCircle } from '@mdi/js';

function PendingDrawing() {


    
    const [products, setproducts] = useState([]);
  const [FilterDataproducts, setFilterDataproducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
const [category, setCategory] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [file, setFile] = useState(null);
const [deletedproducts, setdeletedproducts] = useState([]);
  const [FilterDatadeletedproducts, setFilterDatadeletedproducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/PendingDrawing')
    .then((response) => {
      setproducts(response.data);
      setFilterDataproducts(response.data)
      console.log(response.data)     
    })
    .catch((error) => console.log(error.message))
}, []);

       //-----------------------search------------------------//
       const [searchTermproducts, setSearchTermproducts] = useState('');
       const [searchTermdeletedproducts, setSearchTermdeletedproducts] = useState('');
       
       
       const filterDataByNameproducts = (searchTermproducts) => {
         console.log(searchTermproducts)
         
         const filteredDataRestaurants = products.filter(item =>
       
           item.name.toLowerCase().includes(searchTermproducts.toLowerCase())
         );
         setFilterDataproducts(filteredDataRestaurants);
         setCurrentPageproducts(1)
       }
       





       const filterDataByNamedeletedproducts= (searchTermdeletedproducts) => {
        console.log(searchTermproducts)
        
        const filteredDatadeletedproducts = products.filter(item =>
      
          item.name.toLowerCase().includes(searchTermproducts.toLowerCase())
        );
        setFilterDatadeletedproducts(filteredDatadeletedproducts);
        setCurrentPagedeletedproducts(1)
      }


       
       const [currentPageproducts, setCurrentPageproducts] = useState(1);
       const [currentPagedeletedproducts, setCurrentPagedeletedproducts] = useState(1);

       let totalItemsproducts;
       let totalItemsdeletedproducts;
       
       let totalPagesproducts;
       let totalPagesdeletedproducts;
       
       let slicedArrayproducts;
       let slicedArraydeletedproducts;
       
       const itemsPerPage = 4;
       
       totalItemsproducts = FilterDataproducts.length;
       totalItemsdeletedproducts = FilterDatadeletedproducts.length;
       
       totalPagesproducts = Math.ceil(totalItemsproducts / itemsPerPage);
       totalPagesdeletedproducts = Math.ceil(totalItemsdeletedproducts / itemsPerPage);
       
       const startIndexproducts = (currentPageproducts - 1) * itemsPerPage;
       const startIndexdeletedproducts = (currentPagedeletedproducts - 1) * itemsPerPage;
       
       const endIndexproducts = startIndexproducts + itemsPerPage;
       const endIndexdeletedproducts = startIndexdeletedproducts + itemsPerPage;
       
       slicedArrayproducts = FilterDataproducts.slice(startIndexproducts, endIndexproducts);
       slicedArraydeletedproducts= FilterDatadeletedproducts.slice(startIndexdeletedproducts, endIndexdeletedproducts);
       
       const handlePageChangeproducts = (event, pageNumber) => {
        setCurrentPageproducts(pageNumber);
       };

       const handlePageChangedeletedproducts = (event, pageNumber) => {
        setCurrentPagedeletedproducts(pageNumber);
       };

       const handleAcept = (id,name) => {
        Swal.fire({
          title: ` Do you want to Accept ${name}?  `,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          icon: 'warning'
      }
      ).then((result) => {
       
          if (result.isConfirmed) {
    
              Swal.fire(` ${name} has been Accept `, '', 'success');
           
              axios.put('http://localhost:5000/Drawing/'+id)
              .then((response) => {
                  console.log(response.data);
                  axios.get('http://localhost:5000/PendingDrawing')
          .then((response) => {
            setproducts(response.data);
            setFilterDataproducts(response.data);
          })
          .catch((error) => console.log(error.message)); 
              })
              .catch((error) => console.log(error.message))
              
          } else
              Swal.fire(' Cancelled', '', 'error')
    
      })

    }


    const handlerecover = (id,name) => {
      Swal.fire({
        title: ` Do you want to recover ${name}?  `,
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
         
            axios.put('http://localhost:5000/recoverproduct/'+id)
            .then((response) => {
                console.log(response.data);
                axios.get('http://localhost:5000/PendingDrawing')
        .then((response) => {
          setproducts(response.data);
          setFilterDataproducts(response.data);
        })
        .catch((error) => console.log(error.message)); 
        axios.get('http://localhost:5000/deleteDrawing')
        .then((response) => {
          setdeletedproducts(response.data);
          setFilterDatadeletedproducts(response.data)
          console.log(response.data)
             
        })
        .catch((error) => console.log(error.message))
            })
            .catch((error) => console.log(error.message))
            
        } else
            Swal.fire(' Cancelled', '', 'error')
    })
  }



  return (
    <div className='bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)] '>
<div className="relative flex items-center justify-between pt-4">
    <div className="text-xl font-bold text-navy-700 dark:text-white">
    All  Drawing 
    </div>
  </div>

  <form>
 
 <div className="relative">

   <input
     type="text"
     id="search"
     className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     placeholder="Search"
     required=""
     value={searchTermproducts}
     onChange={(e) =>{
      setSearchTermproducts(e.target.value);
      filterDataByNameproducts(e.target.value);
    }}
   />

 </div>
</form>

  <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr >
    <th scope="col" className="px-6 py-3">

        NAME
      </th>
      <th scope="col" className="px-6 py-3">

       Category
      </th>
      <th scope="col" className="px-6 py-3">

    Description
      </th>
      <th scope="col" className="px-6 py-3">

       Price
      </th>
      <th scope="col" className="px-6 py-3">

      Accept
      </th>
    </tr>
  </thead>
  {slicedArrayproducts.map((e) => {
    return (
      <tbody key={e.userid}>
      <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 `}>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {e.name} 
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          
                {e.category}
              
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {e.description}
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {e.price}
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px] text-center" role="cell">
            <button onClick={() => handleAcept(e.product_id, e.name)}>
            <Icon color="green" path={mdiCheckCircle} size={1} />

            </button>
          </td>
        </tr>
      </tbody>
    );
  })}
</table>

    <div className='flex w-full justify-center mt-5'>   
    {(
        <Pagination
          count={totalPagesproducts}
          page={currentPageproducts}
          onChange={handlePageChangeproducts}
        />
      )}
    </div> 
  </div>

</div>
  )
}

export default PendingDrawing