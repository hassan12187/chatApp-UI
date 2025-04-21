import { Typography } from '@mui/material'
import React, { memo, useEffect } from 'react'
import Button from './Button'
import { useCustom } from '../store/store'

const FriendRequestList = memo(({friendReq}) => {
    const {confirmFriendRequest} = useCustom();
  return (
       <div className='request-dropdown p-2'>
                      <ul className='m-0 p-0'>
                        {
                            !friendReq.length ? <Typography variant='h6'>No Friend Requests</Typography>:
                          friendReq?.map((req,index)=>{
                            return <li key={index}>
                            <div className='d-flex gap-4 align-items-center'>
                                <img src={`http://localhost:8000/images/${req.senderId.profileImage}`} width={50} style={{borderRadius:"50%"}}/>
                                <div className='m-0 p-0 d-flex flex-column'>
                                <Typography variant='h6'>{req.senderId.username}</Typography>
                            <Button text={"Confirm Request"} onEvent={()=>confirmFriendRequest({requestId:req._id,senderId:req.senderId._id,receiverId:req.receiverId})} />
                                </div>
                            </div>
                            </li>
                          })
                        }
                      </ul>
                    </div>
  )
})

export default FriendRequestList