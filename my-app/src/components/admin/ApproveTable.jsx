import Icon from '@mdi/react';
import { mdiDelete } from "@mdi/js";
import React, { useEffect, useState } from 'react'
import { mdiRestore } from '@mdi/js';

import axios from 'axios'
import Swal from 'sweetalert2'
 import Pagination from "@mui/material/Pagination";
const ApproveTable = () => {
  const [products, setproducts] = useState([]);
  const [FilterDataproducts, setFilterDataproducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
const [category, setCategory] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [photo, setPhoto] = useState("");
const [deletedproducts, setdeletedproducts] = useState([]);
  const [FilterDatadeletedproducts, setFilterDatadeletedproducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/productsAll')
    .then((response) => {
      setproducts(response.data);
      setFilterDataproducts(response.data)
      console.log(response.data)
         
    })
    .catch((error) => console.log(error.message))
}, []);


useEffect(() => {
  axios.get('http://localhost:5000/deletedproducts')
  .then((response) => {
    setdeletedproducts(response.data);
    setFilterDatadeletedproducts(response.data)
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
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
    
              Swal.fire(` ${name} has been removed `, '', 'success');
           
              axios.put('http://localhost:5000/product/'+id)
              .then((response) => {
                  console.log(response.data);
                  axios.get('http://localhost:5000/productsAll')
          .then((response) => {
            setproducts(response.data);
            setFilterDataproducts(response.data);
          })
          .catch((error) => console.log(error.message)); 

          axios.get('http://localhost:5000/deletedproducts')
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
                axios.get('http://localhost:5000/productsAll')
        .then((response) => {
          setproducts(response.data);
          setFilterDataproducts(response.data);
        })
        .catch((error) => console.log(error.message)); 

        axios.get('http://localhost:5000/deletedproducts')
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



    const handleCancel = () => {
      setShowForm(false);
    };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
    
      switch (name) {
        case "name":
          setName(value);
          break;
        case "category":
          setCategory(value);
          break;
        case "price":
          setPrice(value);
          break;
        case "description":
          setDescription(value);
          break;
        case "photo":
          setPhoto(value);
          break;
        default:
          break;
      }
    };
    

    const handleCreatePost = async () => {
    
  console.log(name)
  console.log(description)
  console.log(price)
  axios
  .post("http://localhost:5000/newproduct", {
    name: name,
    category: category,
    price: price,
    description: description,
    photo: photo,
  })
  .then(function (response) {
      console.log(response.data);
      axios.get('http://localhost:5000/productsAll')
          .then((response) => {
            setproducts(response.data);
            setFilterDataproducts(response.data);
          })
          .catch((error) => console.log(error.message));

          axios.get('http://localhost:5000/deletedproducts')
          .then((response) => {
            setdeletedproducts(response.data);
            setFilterDatadeletedproducts(response.data)
            console.log(response.data)
               
          })
          .catch((error) => console.log(error.message))

    }
  )
  .catch((err) => console.log(err.message));
  
      setShowForm(false);
    };
  

  return (
    
<>





<div className='bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)] '>
<div className="relative flex items-center justify-between pt-4">
    <div className="text-xl font-bold text-navy-700 dark:text-white">
    All  products
    </div>
<div className="flex items-center justify-center mt-8">
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-6"
        >
          Add New Product
        </button>
      </div>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md z-50">
            <h2 className="text-2xl font-bold mb-4">Add New Products </h2>
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
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                description
                </label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={50}
                  value={description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2"
                >
                  price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={price}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-bold mb-2"
                >
                  category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-gray-700 font-bold mb-2"
                >
                 photo
                </label>
                <input
                  type="text"
                  id="photo"
                  name="photo"
                  value={photo}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCreatePost}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Post
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
            <p className="text-xs tracking-wide text-gray-600">Category</p>
          </th>
          <th
            colSpan={1}
            role="columnheader"
            title="Toggle SortBy"
            className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
            style={{ cursor: "pointer" }}
          >
            <p className="text-xs tracking-wide text-gray-600">description</p>
          </th>
          <th
            colSpan={1}
            role="columnheader"
            title="Toggle SortBy"
            className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
            style={{ cursor: "pointer" }}
          >
            <p className="text-xs tracking-wide text-gray-600">price</p>
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
{

slicedArrayproducts.map((e)=>{

return(

<tbody role="rowgroup">
<tr role="row">
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {e.name} 
            </p>
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
            <div className="flex items-center gap-2">
              <div className="rounded-full text-xl">
                {e.category}
              </div>
            </div>
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {e.description}
            </p>
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
              {e.price}
            </p>
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
                     <button onClick={() => handleDelete(e.product_id,e.name)}>
                      <Icon color="red" path={mdiDelete} size={1} />
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
          count={totalPagesproducts}
          page={currentPageproducts}
          onChange={handlePageChangeproducts}
        />
      )}
    </div> 
  </div>



  <div className="relative flex items-center justify-between pt-4">
    <div className="text-xl font-bold text-navy-700 dark:text-white">
    Deleted Products
    </div>
  </div>
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
            <p className="text-xs tracking-wide text-gray-600">Category</p>
          </th>
          <th
            colSpan={1}
            role="columnheader"
            title="Toggle SortBy"
            className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
            style={{ cursor: "pointer" }}
          >
            <p className="text-xs tracking-wide text-gray-600">description</p>
          </th>
          <th
            colSpan={1}
            role="columnheader"
            title="Toggle SortBy"
            className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
            style={{ cursor: "pointer" }}
          >
            <p className="text-xs tracking-wide text-gray-600">price</p>
          </th>

         

          <th
            colSpan={1}
            role="columnheader"
            title="Toggle SortBy"
            className="border-b border-gray-200 pr-5 pb-[10px] text-start dark:!border-navy-700"
            style={{ cursor: "pointer" }}
          >
            <p className="text-xs tracking-wide text-gray-600">Recover</p>
          </th>

        </tr>
      </thead>
{

slicedArraydeletedproducts.map((e)=>{

return(

<tbody role="rowgroup">
<tr role="row">
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {e.name} 
            </p>
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
            <div className="flex items-center gap-2">
              <div className="rounded-full text-xl">
                {e.category}
              </div>
            </div>
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {e.description}
            </p>
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
              {e.price}
            </p>
          </td>
          <td className="pt-[14px] pb-[18px] sm:text-[14px]" role="cell">
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

export default ApproveTable