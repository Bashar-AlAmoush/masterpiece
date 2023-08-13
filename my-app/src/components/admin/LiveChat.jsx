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
      console.log(response.data)
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
    backgroundColor: Checkcolor(e), 
    color: '#fff', 
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

  function handleSendMessage(email){


    const recipient = email;
    const subject = 'hello from Masterpiece';
    const body = message;
    console.log(recipient)
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


    window.location.href = mailtoLink;


  }


  return (
    <>
  
  <div className="flex h-screen antialiased text-gray-800">
  <div className="flex flex-row h-full w-full overflow-x-hidden">
    {reporters.map((e) => {
      return (
        <div className="mx-5 min-h-screen w-68  grid place-content-center">
          <div className="bg-white py-8 px-10 w-72  text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
            <div className="flex flex-row items-center">
              <Avatar style={avColor}>{e.name?.charAt(0)}</Avatar>
              <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                <div>{e.name}</div>
              </div>
            </div>
            <p className="capitalize text-xl mt-1  max-h-24 whitespace-pre-wrap	 break-words ">
              {e.message}
            
            </p>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div className="flex-grow"></div>
              <div className="ml-4">
                <button
                  onClick={() => handleSendMessage(e.email)}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
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
      );
    })}
  </div>
</div>

</>

  )
}

export default LiveChat