import {Chat} from '../components/Chat';
import { useCustom } from '../store/store';
import { memo } from 'react';
export const Home = memo(()=>{
    const {isLoading}=useCustom();
    if(isLoading)return <h1>Loading....</h1>;
    return <div className='container mt-3'>
        <Chat />
    </div>
})