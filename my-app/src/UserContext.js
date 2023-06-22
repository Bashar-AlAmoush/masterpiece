import React from "react";
import { Children, createContext, useState } from "react";

export const UserContext = createContext();
const UserProvider = ( {children} ) => {






  
  const [routs, setRouts] = useState([false,true,true]);
  const [SignStatus, setSignStatus] = useState("signUp");
  const [currentTable0, setCurrentTable0] = useState({ Name: "  Chicker's", path: "https://images.trvl-media.com/hotels/1000000/30000/23000/22994/8b25298d_z.jpg", describtion: " Enjoy an amazing dining experience at our restaurant. Book your table now and enjoy the most delicious dishes.", price: "12.1044$ " });
  
  const [curruntUser, setCurruntUser] = useState({});


  const updateSetCurruntUser = (newValue) => {
    setCurruntUser(newValue);
  };

  const updateCurrentTable0 = (newValue) => {
    setCurrentTable0(newValue);
  };

  const updateRouts = (newValue) => {
    setRouts(newValue);
  };

  const updateSignStatus = (newValue) => {
    setSignStatus(newValue);
  };

  return (
        <>
            <UserContext.Provider
                value={{
                    routs,updateRouts,SignStatus,updateSignStatus,currentTable0,updateCurrentTable0,curruntUser,updateSetCurruntUser
                }}
            >
                {children}
            </UserContext.Provider>
        </>
    )
};
 export default UserProvider;