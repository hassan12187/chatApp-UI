import { createContext, useContext, useState } from "react"
import Axios from "../components/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import socket from "../services/socket";

const StoreContext = createContext();
const Store=({children})=>{
    const queryClient = useQueryClient();
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
        localStorage.removeItem("token");
        socket.disconnect();
    }
    const mutation = useMutation({
        mutationFn:async(obj)=>{
            const result = await Axios.patch(`/user/request`,obj,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(result.status===200){
                socket.emit("confirm_request",obj);
            }
            return result;
        },
        onSuccess:()=>{
          queryClient.invalidateQueries([['friendReq',token],['friends',token]]);
        }
      })
    const {data:user,isLoading} = useQuery({
        queryKey:['userDetail',token],
        queryFn:async()=>{
            const result = await Axios.get(`/user?q=`,{
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
            console.log(result);
            return result.data;
        } catch (error) {
            console.log(`error getting user ${error}`);
        }
    };
    const getFriends = async()=>{
        const result = await Axios.get(`/user/friend`,{
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
        console.log('hassan bhai',result);
        return friendMap;
    };
    const {data:friendsData,isLoading:friendsLoading} = useQuery({
        queryKey:['friends',token],
        queryFn:getFriends,
        staleTime:Infinity,
        cacheTime:Infinity
    });
    const confirmFriendRequest=async(obj)=>{
        try {
            mutation.mutate(obj);
        } catch (error) {
            console.log(error);
        }
    }
    const readMessages=async(receiverId,userId)=>{
        const result = await Axios.patch(`/user/messages`,{receiverId,userId},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return result;
    }
    return <StoreContext.Provider value={{isLoading,getUserById,readMessages,confirmFriendRequest,removeToken,friendsData,token,user,setToken,getToken,friendsLoading,queryClient}}>
    {children}
    </StoreContext.Provider>
}
const useCustom=()=>{
    return useContext(StoreContext);
}
export {Store,useCustom};