import { useEffect } from 'react';
import Chat from '../components/Chat';
import { useCustom } from '../store/store';
export const Home = ()=>{
    const {verifyTokenHandler} = useCustom();
    
    useEffect(()=>{
        verifyTokenHandler();
        return;
    },[]);
    return <div className='container mt-3'>
        <Chat />
    </div>
}