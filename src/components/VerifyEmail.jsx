import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Axios from './axios';

const VerifyEmail = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const postion = async()=>{
      const token = urlParams.get('token');
        const url = urlParams.get('url');
        const result = await Axios.post(url,{},{
          headers:{Authorization:`${token}`}
        });
        return result.status; 
    }
    useEffect(()=>{
        window.open('http://localhost:5173/email/verifyEmail?','_blank')
        postion();
        // if(status===200){
        //   window.close();
        // }else{
        //   window.close();
        // }
    },[])
  return (
    <></>
  )
}

export default VerifyEmail