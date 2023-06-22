import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditAboutContact = () => {
  const [about, setabout] = useState([]);
  const [about_title, setAbout_title] = useState([]);
  const [about_us, setAbout_us] = useState([]);

// const requestData = {
//   about_title: about[0].about_title , 
//   about_us: about[0].about,
// };
  useEffect(() => {
      axios.get('http://localhost:5000/aboutus')
      .then((response) => {
        setabout(response.data);
         console.log(response.data)
         setAbout_title(response.data.about_title)
          setAbout_us(response.data.about_us)
      })
      .catch((error) => console.log(error.message))
  }, []);

 




  function hndelAboutUs(e){
    e.preventDefault()

    Swal.fire({
      title: "Are you sure",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "orange",
      cancelButtonText: "Cancel",
      cancelButtonColor: "orange",
      icon: 'warning'
  }
  ).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
   
  
        axios.put('http://localhost:5000/contactus00/0', {
          about_title: about_title,
          about_us: about_us,
        })
          .then(function (response) {
            console.log(response);
            // window.location.reload(false);
    
          })
          .catch(function (error) {
            console.log(error);
          });


          Swal.fire("The about us has been updated successfully", '', 'success');
       
          // window.location.reload();
      } else
          Swal.fire(' Cancelled', '', 'error')
  
  })



  }

  return (
    <>
   
    <section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
    Edit  About us page
    </h2>
    <p className=' mb-4 text-2xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white'>
    {/* About us Title :     {about[0].about_title} */}
    </p>
    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
    {/* {about[0].about_us} */}
    </p>
    <form onSubmit={hndelAboutUs} className="space-y-8">
    <div>
              <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">About Us Title</label>
              <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter Here Title For About Us" required 
               value={about_title}
               onChange={(e) => setAbout_title(e.target.value)}
              />
          </div>
   
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          About Us Description :
        </label>
        <textarea
          id="message"
          rows={14}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="enter here  About Us Description ......."
          defaultValue={""}
          value={about_us}
          onChange={(e) => setAbout_us(e.target.value)}
        />
      </div>
      <div className='flex justify-center'>
      <button type='submit'
       
        className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-amber-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
       Update
      </button>

      </div>
  
    </form>
  </div>
</section>

    

    
    </>
  )
}

export default EditAboutContact


// {
//   "about_title": "Make your customers happy by giving the best services",
//   "about_us": "At Ma6a3mkom , we are passionate about connecting food enthusiasts with their favorite dining experiences. Our platform aims to make the process of reserving a table at top restaurants seamless and convenient. We understand the importance of savoring memorable moments with loved ones, and our mission is to enhance the dining experience by providing a user-friendly and efficient reservation service.And our mission is to empower food lovers by offering a hassle-free and reliable platform for restaurant reservations. We strive to bring together diners and restaurants, creating a win-win situation for both parties. With a focus on customer satisfaction, we are dedicated to providing exceptional service, innovative features, and a wide range of culinary options. Our goal is to make every dining occasion special, ensuring that our users can easily discover, book, and enjoy exceptional dining experiences at their preferred restaurants."
// }