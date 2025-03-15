import { createContext, useContext, useEffect, useState } from "react"
import Axios from "../components/axios";
import checkToken from "../services/checkToken";

const StoreContext = createContext();
const Store=({children})=>{
    const [user,setUser]=useState({});
    const [otherUser,setOtherUser]=useState({});
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
    const getUserById=async(uid)=>{
        try {
            const user = await Axios.get(`user/${uid}`);
            setOtherUser(user.data);
        } catch (error) {
            console.log(`error getting user ${error}`);
        }
    }
    return <StoreContext.Provider value={{user,verifyTokenHandler,token,getUserById,otherUser}}>
    {children}
    </StoreContext.Provider>
}
const useCustom=()=>{
    return useContext(StoreContext);
}
export {Store,useCustom};