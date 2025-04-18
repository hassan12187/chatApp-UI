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
    const {data:user,isLoading} = useQuery({
        queryKey:['userDetail',token],
        queryFn:async()=>{
            const result = await Axios.get(`/user/allUsers?q=`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            return result.data;
        },
        staleTime:Infinity,
        cacheTime:Infinity
    });
    
    const getUserById=async(uid)=>{
        try {
            const result = await Axios.get(`/user/${uid}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            return result.data;
        } catch (error) {
            console.log(`error getting user ${error}`);
        }
    };
    const getFriends = async()=>{
        console.log('hassan bhai',result);
        const result = await Axios.get(`/user/userFriends`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        const friendMap = new Map();
        result.data?.map((friend)=>{
          if(!friendMap.has(friend._id)){
            friendMap.set(friend._id,friend);
          }
        });
        return friendMap;
    };
    const {data:friendsData} = useQuery({
        queryKey:['friends',token],
        queryFn:getFriends,
        staleTime:Infinity,
        cacheTime:Infinity
    });
    const confirmFriendRequest=async()=>{
        try {
            await Axios.patch('/user/confirmFriendRequest',null,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const readMessages=async(receiverId,userId)=>{
        const result = await Axios.patch(`/user/readMessages`,{receiverId,userId});
        console.log(result);
        return result;
    }
    
    return <StoreContext.Provider value={{getUserById,readMessages,confirmFriendRequest,removeToken,friendsData,token,user,setToken,getToken}}>
    {children}
    </StoreContext.Provider>
}
const useCustom=()=>{
    return useContext(StoreContext);
}
export {Store,useCustom};