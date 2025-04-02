import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useCustom } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import Button from '../components/Button';

const UserDetail = () => {
    const {id}=useParams();
    const {getUserById,getToken,socket} = useCustom();
    const {data,isLoading}=useQuery({
      queryKey:[`userDetail`,id],
      queryFn:()=>getUserById(id),
    });
    const addFriend=()=>{
      socket.emit("add-friend",);
    }
    if (isLoading)return <h1 className='container'>Loading....</h1>
  return (
    <div className='container'>
            <div className='content d-flex gap-3 align-items-center justify-content-center'>
              <div className='image'>
                <img src={`http://localhost:8000/images/${data.user?.profileImage}`} width={70} height={70} style={{borderRadius:'50%'}} />
              </div>
              <div className='details'>
                <h5 className='title'>{data.user?.username}</h5>
                <div className='d-flex gap-2'>
                {
                  data.friends ? <Button text={'Friends'} /> :<Button text={'Add Friend'} onEvent={addFriend} />
                }
                  <NavLink to={`/${id}`}>
                  <Button text={'send message'} />
                  </NavLink>
                </div>
              </div>
            </div>
    </div>
  )
}

export default UserDetail