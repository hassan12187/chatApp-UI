import { createContext, useContext, useEffect, useState } from "react"
import Axios from "../components/axios";
import checkToken from "../services/checkToken";
import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";

const StoreContext = createContext();
const Store=({children})=>{
    const [token,handlesetToken]=useState(localStorage.getItem("token"));
    const [socket,handleSocket]=useState(null);
    const getToken=()=>{
        return localStorage.getItem('token')
    }
    const setToken=(token)=>{
        handlesetToken(token);
    return localStorage.setItem("token",token);
    }
    const removeToken=()=>{
        handlesetToken("");
        return localStorage.removeItem("token");
    }
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
    };
    const connectToWebSocket=()=>{
        if(socket) return socket;
        console.log("hello ?");
        handleSocket(ioSocket);
        return socket
    }
    return <StoreContext.Provider value={{socket,connectToWebSocket,getUserById,removeToken,token,user:data,isLoading,setToken,getToken}}>
    {children}
    </StoreContext.Provider>
}
const useCustom=()=>{
    return useContext(StoreContext);
}
export {Store,useCustom};