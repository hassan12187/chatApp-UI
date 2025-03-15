import React, { useEffect } from 'react'
import { useCustom } from '../store/store'
import Axios from '../components/axios';

const Friends = () => {
    const {user}=useCustom();
    const getAllFriends=async()=>{
        try {
            Axios.get(`/user/`);
        } catch (error) {
            console.log(`error getting all friends ${error}`);
        }
    }
    useEffect(()=>{
        getAllFriends();
    },[])
  return (
    <div>Friends</div>
  )
}

export default Friends