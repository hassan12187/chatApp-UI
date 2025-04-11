import { createContext, useContext, useState } from "react"
import Axios from "../components/axios";
import { useQuery } from "@tanstack/react-query";

const StoreContext = createContext();
const Store=({children})=>{
    const [token,handlesetToken]=useState(localStorage.getItem("token"));
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
    const {data:user,isLoading}=useQuery({
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
    const getFriends = async()=>{
        const result = await Axios.get(`/user/userFriends/${user._id}`);
        console.log(result);
        const friendMap = new Map();
        result.data?.map((friend)=>{
          if(!friendMap.has(friend._id)){
            friendMap.set(friend._id,friend);
          }
        });
        return friendMap;
    };
    const {data:friendsData,isLoading:friendsLoading} = useQuery({
        queryKey:['friends',user],
        queryFn:getFriends,
        staleTime:Infinity,
        cacheTime:Infinity
    });
    
    return <StoreContext.Provider value={{getUserById,removeToken,friendsData,friendsLoading,token,user,isLoading,setToken,getToken}}>
    {children}
    </StoreContext.Provider>
}
const useCustom=()=>{
    return useContext(StoreContext);
}
export {Store,useCustom};