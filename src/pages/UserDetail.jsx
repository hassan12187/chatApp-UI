import React from 'react'
import { useParams } from 'react-router-dom'
import { useCustom } from '../store/store';
import Axios from '../components/axios';
import { QueryClient, useMutation, useQuery } from 'react-query';
import Button from '../components/Button';

const UserDetail = () => {
    const {id}=useParams();
    const {getUserById,token} = useCustom();
    const {data,isLoading}=useQuery({
      queryKey:[`userDetail`,id],
      queryFn:()=>getUserById(id),
    });
    const QClient = new QueryClient();
    const addFriendMutate = useMutation({
      mutationFn:async()=>{
        const result = await Axios.post(`/user/addFriend/${data.user._id}`,{},{headers:{Authorization:`Bearer ${token}`}});
        return result.data;
      },
    onMutate:async()=>{
      await QClient.cancelQueries([`userDetail`,id]);
      const previousData = await QClient.getQueryData([`userDetail`,id]);
      QClient.setQueryData([`userDetail`,id],(oldData)=>{
        console.log(oldData);
      });
    return {previousData};
    },onError:(err,variables,context)=>{
      if(context?.previousData){
        QClient.setQueryData([`userDetail`,id],context.previousData)
      }
    },onSettled:()=>{
      QClient.invalidateQueries([`userDetail`,id]);
    }})
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
                  data.friends ? <Button text={'Friends'} /> :<button className='btn btn-primary' onClick={()=>addFriendMutate.mutate()}>Add Friend</button>
                }
                  
                  <button className='btn btn-primary'>Send Message</button>
                </div>
              </div>
            </div>
    </div>
  )
}

export default UserDetail