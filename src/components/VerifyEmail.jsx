import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Axios from './axios';

const VerifyEmail = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const postion = async()=>{
        const id = urlParams.get('id');
        const data = urlParams.get("data");
        const url = urlParams.get('url');
        const result = await Axios.post(url,{id,data});
        return result.status;   
    }
    useEffect(()=>{
        window.open('http://localhost:5173/email/verifyEmail?','_blank')
        postion();
        window.close();
    },[])
  return (
    <></>
  )
}

export default VerifyEmail