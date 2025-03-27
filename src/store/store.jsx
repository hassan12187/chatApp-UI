import { createContext, useContext, useState } from "react"
import Axios from "../components/axios";
import checkToken from "../services/checkToken";
import { useQuery } from "@tanstack/react-query";

const StoreContext = createContext();
const Store=({children})=>{
    const token = checkToken();
    const {data,isLoading}=useQuery({
        queryKey:['user',token],
        queryFn:async()=>{
                if(!token)throw new Error('no token available');
                 const {data} = await Axios.get('/validate',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return data;
            },
            staleTime:Infinity,
            cacheTime:Infinity
        });
    const getUserById=async(uid)=>{
        try {
            const user = await Axios.get(`user/${uid}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return user.data;
        } catch (error) {
            console.log(`error getting user ${error}`);
        }
    }
    console.log('store');
    return <StoreContext.Provider value={{getUserById,user:data,isLoading,token}}>
    {children}
    </StoreContext.Provider>
}
const useCustom=()=>{
    return useContext(StoreContext);
}
export {Store,useCustom};