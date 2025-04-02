import { useCustom } from '../store/store'
import Button from '../components/Button';
import {NavLink} from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
// import Axios from '../components/axios';
import { useEffect, useState } from 'react';
const Friends = () => {
    const queryClint = useQueryClient();
    const {user}=useCustom();
  const [friends,setFriends]=useState([]);
    // const getFriends = async()=>{
    //     const result = await Axios.get(`/user/userFriends/${user._id}`);
    //     return result.data.data;
    // }
    // const {data,isLoading} = useQuery({
    //     queryKey:['friends',user],
    //     queryFn:getFriends,
    //     staleTime:Infinity,
    //     cacheTime:Infinity
    // });
    useEffect(()=>{
    const dt = queryClint.getQueryData(['friends',user]);
    setFriends(dt);

    },[])
  return (
    <div className='container'>
        <div className='content row'>
            <ul>
                {
                   friends?.length==0?<h1>No Friends</h1>  : friends?.map(({username,email,profileImage,_id},index)=>{
                        return <li key={index} className='col-lg-10 d-flex align-items-center'>
                            <div className='image'><img src={`http://localhost:8000/images/${profileImage}`} width={70} height={70} style={{borderRadius:'50%'}} /></div>
                            <div className='card-content'>
                                <h5>{username}</h5>
                                <div><NavLink to={`/user/${_id}`}><Button text={'View Profile'} /></NavLink></div>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    </div>
  )
}

export default Friends