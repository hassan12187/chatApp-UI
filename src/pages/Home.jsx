import {Chat} from '../components/Chat';
import { useCustom } from '../store/store';
import { memo, useEffect } from 'react';
export const Home = memo(()=>{
    const {isLoading}=useCustom();
    if(isLoading)return <h1>Loading....</h1>;
    useEffect(()=>{
        document.title="Home"
    },[])
    return <div className='container mt-3'>
        <Chat />
    </div>
})