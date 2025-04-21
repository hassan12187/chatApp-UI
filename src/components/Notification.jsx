import React, { useEffect } from 'react'
import socket from '../services/socket'

const Notification = () => {
    useEffect(()=>{
        socket.on('request_accepted',(user)=>{
            
        })
    },[socket])
  return (
    <div>Notification</div>
  )
}

export default Notification