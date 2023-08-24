import Icon from '@mdi/react';
import { mdiDelete } from "@mdi/js";
import React, { useEffect, useState } from 'react'
import { mdiRestore } from '@mdi/js';
import axios from 'axios'
import Swal from 'sweetalert2'
 import Pagination from "@mui/material/Pagination";
function AddSales() {
    const [products, setproducts] = useState([]);
    const [FilterDataproducts, setFilterDataproducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [id, setid] = useState("");
  const [price, setPrice] = useState("");
  const [new_price, setnewPrice] = useState("");
  const [deletedproducts, setdeletedproducts] = useState([]);
    const [FilterDatadeletedproducts, setFilterDatadeletedproducts] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:5000/saleAll')
      .then((response) => {
        setproducts(response.data);
        setFilterDataproducts(response.data)
           
      })
      .catch((error) => console.log(error.message))
  }, []);
  
  
  useEffect(() => {
    axios.get('http://localhost:5000/deletedsales')
    .then((response) => {
      setdeletedproducts(response.data);
      setFilterDatadeletedproducts(response.data) 
    })
    .catch((error) => console.log(error.message))
  }, []);
  
         //-----------------------search------------------------//
         const [searchTermproducts, setSearchTermproducts] = useState('');
         const [searchTermdeletedproducts, setSearchTermdeletedproducts] = useState('');
         
         
         const filterDataByNameproducts = (searchTermproducts) => {
           console.log(searchTermproducts)
           
           const filteredDataRestaurants = products.filter(item =>
         
             item.sales_name.toLowerCase().includes(searchTermproducts.toLowerCase())
           );
           setFilterDataproducts(filteredDataRestaurants);
           setCurrentPageproducts(1)
         }
         
  
         const filterDataByNamedeletedproducts= (searchTermdeletedproducts) => {
          console.log(searchTermproducts)
          
          const filteredDatadeletedproducts = deletedproducts.filter(item =>
        
            item.sales_name.toLowerCase().includes(searchTermdeletedproducts.toLowerCase())
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
  
         const handleDelete = (id,name) => {
          Swal.fire({
            title: ` Do you want to remove ${name}?  `,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {
         
            if (result.isConfirmed) {
      
                Swal.fire(` ${name} has been removed `, '', 'success');
             
                axios.put('http://localhost:5000/sales/'+id)
                .then((response) => {
                    axios.get('http://localhost:5000/saleAll')
            .then((response) => {
              setproducts(response.data);
              setFilterDataproducts(response.data);
            })
            .catch((error) => console.log(error.message)); 
  
            axios.get('http://localhost:5000/deletedsales')
            .then((response) => {
              setdeletedproducts(response.data);
              setFilterDatadeletedproducts(response.data)
                 
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
          title: ` Do you want to recover ${name}?  `,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          icon: 'warning'
      }
      ).then((result) => {
          if (result.isConfirmed) {
              Swal.fire(` ${name} has been recover `, '', 'success');
           
              axios.put('http://localhost:5000/recoversales/'+id)
              .then((response) => {
                  axios.get('http://localhost:5000/saleAll')
          .then((response) => {
            setproducts(response.data);
            setFilterDataproducts(response.data);
          })
          .catch((error) => console.log(error.message)); 
  
          axios.get('http://localhost:5000/deletedsales')
          .then((response) => {
            setdeletedproducts(response.data);
            setFilterDatadeletedproducts(response.data)
               
          })
          .catch((error) => console.log(error.message))
              })
              .catch((error) => console.log(error.message))
              
          } else
              Swal.fire(' Cancelled', '', 'error')
    
      })
  
    }
  
  
  
      const handleCancel = () => {
        setShowForm(false);
      };
      const handleInputChange = (event) => {
        const { name, value } = event.target;
      
        switch (name) {
          case "new_price":
            setnewPrice(value);
            break;
          default:
            break;
        }
      };
      const handleCreatePost = async (id) => {
        try {
          const response = await axios.put(
            `http://localhost:5000/newsale/${id}`,
            {new_price }
          );
          console.log("New sale created successfully:", response.data);
      
          
          axios.get('http://localhost:5000/saleAll')
            .then((response) => {
              setproducts(response.data);
              setFilterDataproducts(response.data);
            })
            .catch((error) => console.log(error.message));
          axios.get('http://localhost:5000/deletedproducts')
            .then((response) => {
              setdeletedproducts(response.data);
              setFilterDatadeletedproducts(response.data);
            })
            .catch((error) => console.log(error.message));
        } catch (error) {
          console.log("Error creating new sale:", error.message);
        }
        setShowForm(false);
      };
    return (
      
  <>
  
  <div className='bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)] '>
  <div className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-bold text-navy-700 dark:text-white">
      All  products
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
    <div className="mt-8 overflow-x-scroll  xl:overflow-hidden">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr  >
    <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
        Category
      </th>
      <th scope="col" className="px-6 py-3">
        Description
      </th>
      <th scope="col" className="px-6 py-3">
        Old price
      </th>
      <th scope="col" className="px-6 py-3">
        New price
      </th>
      <th scope="col" className="px-6 py-3">
      Add Sales
      </th>
      <th scope="col" className="px-6 py-3">
        Delete Sale
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
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {e.new_price}
          </td>

          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          <button
            onClick={() => ( setShowForm(true),setName(e.name) ,setPrice(e.price) ,setid(e.product_id) )}
            className="font-medium text-red-600 dark:text-red-500 hover:underline"
          >
            Add Sales
          </button>
          {showForm && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-md z-50" style={{width:"580px"}}>
              <h2 className="text-2xl font-bold mb-4">Add New Sales </h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Name of products
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name" 
                    value={name}
                disabled readonly
                    className="shadow cursor-not-allowed   appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-bold mb-2"
                  >
                   Old Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={price} 
                   disabled readonly
                    className="shadow appearance-none border cursor-not-allowed   rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="new_price"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    New Price
                  </label>
                  <input
                    type="number"
                    id="new_price"
                    name="new_price"
                    value={new_price}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                <button
  type="button"
  onClick={() => handleCreatePost(id)}
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
  Add Sales
</button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            <button onClick={() => handleDelete(e.product_id, e.name)}>
              <Icon color="red" path={mdiDelete} size={1} />
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
  
  
  
    <div className="relative flex items-center justify-between pt-4">
      <div className="text-xl font-bold text-navy-700 dark:text-white">
      Deleted Sales 
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
       value={searchTermdeletedproducts}
       onChange={(e) =>{
        setSearchTermdeletedproducts(e.target.value);
        filterDataByNamedeletedproducts(e.target.value);
      }}
     />
  
   </div>
  </form>
    <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
      <table role="table" className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
            <th
              scope="col" className="px-6 py-3"
            >
              Name
            </th>
            <th
              scope="col" className="px-6 py-3"
            >
              Category
            </th>
            <th
            scope="col" className="px-6 py-3"
            >
              Description
            </th>
            <th
            
            >
              Old Price
            </th>
  
           
            <th
              scope="col" className="px-6 py-3"
            >
              New Price
            </th>
            <th
             scope="col" className="px-6 py-3"
            >
              Recover
            </th>
  
          </tr>
        </thead>
  {
  
  slicedArraydeletedproducts.map((e)=>{
  return(
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
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {e.new_price}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                       <button onClick={() => handlerecover(e.product_id,e.name)}>
                       <Icon path={mdiRestore} size={1}  color={"green"}/>
                      </button>
            </td>
          </tr>
         
        </tbody>
  )
  })
  }
      </table>
      <div className='flex w-full justify-center mt-5'>   
      {(
          <Pagination
            count={totalPagesdeletedproducts}
            page={currentPagedeletedproducts}
            onChange={handlePageChangedeletedproducts}
          />
        )}
      </div> 
    </div>
  </div>
    </>
  )
}

export default AddSales