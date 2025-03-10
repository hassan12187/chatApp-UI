import { useEffect } from 'react';
import Axios from '../components/axios';
import Chat from '../components/Chat';
import checkToken from '../services/checkToken';
export const Home = ()=>{
    const token = checkToken();
    const verifyTokenHandler=async()=>{
        const data = await Axios.get('/user/api/protected',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log(data);  
    };
    useEffect(()=>{
        verifyTokenHandler();
    },[])
    
    return <div className='container mt-3'>
        <Chat/>
    </div>
}