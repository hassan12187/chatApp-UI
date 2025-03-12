import { createContext, useContext, useEffect, useState } from "react"
import Axios from "../components/axios";
import checkToken from "../services/checkToken";

const StoreContext = createContext();
const Store=({children})=>{
    const [user,setUser]=useState({});
    const token = checkToken();
    const verifyTokenHandler=async()=>{
        const {status,data} = await Axios.get('/user/api/protected',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setUser(data.user);
        return;
    };
    return <StoreContext.Provider value={{user,verifyTokenHandler,token}}>
    {children}
    </StoreContext.Provider>
}
const useCustom=()=>{
    return useContext(StoreContext);
}
export {Store,useCustom};