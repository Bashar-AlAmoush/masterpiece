import classnames from 'classnames';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';

const LiveChat = () => {
  const [reporters, setReporters] = useState([]);
  const [currentUser,setCurrentUser] = useState({})
  const [avColor,setAvColor] = useState({})
   const [message,setMessage]= useState("")

   useEffect(() => {
    axios.get('http://localhost:5000/reporters')
    .then((response) => {
      setReporters(response.data);
      setCurrentUser(response.data[0])
      setAvColor(

        {
          backgroundColor: Checkcolor(response.data[0]), 
          color: '#fff', 
        }


      )
    })
    .catch((error) => console.log(error.message))
}, []);






 function HandleUser(e){


  setCurrentUser(e)
  setAvColor(
   {

    backgroundColor: Checkcolor(e), // Set the desired color
    color: '#fff', // Set the text color for contrast
    
   } )
   
 }

 function Checkcolor(e){

  let color0=""
  switch (e.name.charAt(0).toLowerCase()) {
    case 'a':
      color0="#4e6fb3ab"
      break;
    case 'b':
      color0="#da5757ab"      
                break;
    case 'c':
      color0="#4e6fb3ab"       
               break;
    case 'd':
      color0="#c6dc37"       
               break;
    case 'e':
      color0="#bd62c8"       
               break;
    case 'f':
      color0="#fff101"       
               break;
    case 'g':
      color0="#5d6cb3"       
               break;
    default:
      color0="#65bb5dab"      
                break;
  }
 return color0
}

  function handleSendMessage(){


    const recipient = currentUser.email;
    const subject = 'Hello';
    const body = message;
    console.log(recipient)
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


    window.location.href = mailtoLink;


  }


  return (
    <>
  {/* component */}
  <div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden">
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">Mail box</div>
        </div>
        {/* <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="Avatar"
              className="h-full w-full"
            />
          </div>
          <div className="text-sm font-semibold mt-2">Aminos Co.</div>
          <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
          <div className="flex flex-row items-center mt-3">
            <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
              <div className="h-3 w-3 bg-white rounded-full self-end mr-1" />
            </div>
            <div className="leading-none ml-1 text-xs">Active</div>
          </div>
        </div> */}
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Active Conversations</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              {reporters.length}
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-auto overflow-y-auto">


           {
           reporters?.map((e)=>{
           let  firstLetter=e.name.charAt(0)
             
           

            const avatarStyle = {
              backgroundColor: Checkcolor(e), // Set the desired color
              color: '#fff', // Set the text color for contrast
            };
          
            
       
       

           return(

            <button onClick={()=>HandleUser(e)} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
         
            <Avatar style={avatarStyle}>{firstLetter}</Avatar>
            <div className="ml-2 text-sm font-semibold">{e.name}</div>
          </button>



           )

           })

          

           }

          </div>


        </div>
      </div>
      <div className="flex flex-col flex-auto h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                  <Avatar style={avColor} >{currentUser.name?.charAt(0)}</Avatar>


                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>{currentUser.message}</div>
                    </div>
                  </div>
                </div>
      
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            {/* <div>
              <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
            </div> */}
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                />
                {/* <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button> */}
              </div>
            </div>
            <div className="ml-4">
                
              
              <button onClick={()=>handleSendMessage()} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              </button>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default LiveChat