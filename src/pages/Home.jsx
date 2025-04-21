import {Chat} from '../components/Chat';
import { memo, useEffect } from 'react';
export const Home = memo(()=>{
    useEffect(()=>{
        document.title="Home"
    },[])
    return <div className='container mt-3'>
        <Chat />
    </div>
})