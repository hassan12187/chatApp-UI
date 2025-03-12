import { useEffect, useState } from 'react';
import Axios from '../components/axios';
import Chat from '../components/Chat';
import checkToken from '../services/checkToken';
export const Home = ()=>{
    const [message,setMessage]=useState('');
    const [socket,setSocket]=useState(null);
    const token = checkToken();
    const verifyTokenHandler=async()=>{
        const data = await Axios.get('/user/api/protected',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
    };
    useEffect(()=>{
        verifyTokenHandler();
        const ws = new WebSocket(`ws://localhost:8000?token=${token}`);
        setSocket(ws);
        ws.onmessage=(data)=>{
            console.log(`${data.data}`)
        }
        return;
    },[])
    const sendMessage=(val)=>{
        socket.send(val);
    }
    
    return <div className='container mt-3'>
        <Chat setMessage={sendMessage} />
    </div>
}