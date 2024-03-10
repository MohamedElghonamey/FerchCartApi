import { useEffect, useState} from "react";
import { createContext } from "react";
import {jwtDecode} from "jwt-decode";

export let AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    
   const [userId, setUserId] = useState(null);
   const token = localStorage.getItem("token");
    
   console.log(userId);
   useEffect(() => {
    if (token) {
        setUserToken(token);
       
    }
   },[]);
 
    return <AuthContext.Provider value={{userToken, setUserToken, userId}} >
    {children}
    </AuthContext.Provider>
}
 
    