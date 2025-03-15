import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCustom } from '../store/store';
import Axios from '../components/axios';

const UserDetail = () => {
    const {id}=useParams();
    const {getUserById,user,otherUser,verifyTokenHandler} = useCustom();
    useEffect(()=>{
      getUserById(id);
      verifyTokenHandler();
    },[id]);
    const addFriend=async()=>{
      const result = await Axios.post(`/user/addFriend/${otherUser._id}`,{userId:user._id});
      console.log(result);
    }
  return (
    <div className='container'>
            <div className='content d-flex gap-3 align-items-center justify-content-center'>
              <div className='image'>
                <img src={`http://localhost:8000/images/${otherUser.profileImage}`} width={70} height={70} style={{borderRadius:'50%'}} />
              </div>
              <div className='details'>
                <h5 className='title'>{otherUser.username}</h5>
                <div className='d-flex gap-2'>
                  <button className='btn btn-primary' onClick={addFriend}>Add Friend</button>
                  <button className='btn btn-primary'>Send Message</button>
                </div>
              </div>
            </div>
    </div>
  )
}

export default UserDetail