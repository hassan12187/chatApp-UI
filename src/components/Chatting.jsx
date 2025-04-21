import { useEffect, useState } from "react"
import { useCustom } from "../store/store";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../services/socket";

const Chatting =()=>{
  const queryClient = useQueryClient();
  const [val,setVal]=useState('');
  const {receiverId} = useParams();
  const [messages,setMessages]=useState([]);
  const {user,readMessages,isLoading}=useCustom();
  const handleInputChange = (e)=>{
    const {value}=e.target;
    setVal(value);
  }
  useEffect(()=>{
    console.log("chatting component")
    if(receiverId !== undefined){
      socket.emit('getPreviousMessages',receiverId);
      // const cachedFriends = queryClient.getQueriesData({queryKey:['friends',user]});
      // if(cachedFriends){
      //   console.log(cachedFriends);
      //   const getUnreadMessa = cachedFriends[0][1]?.get(receiverId)?.unreadCount;
      //   if(getUnreadMessa){
        //     readMessages(receiverId,user._id);
      //   }
      // }
    }
    const handlePreviousMessages=(previousMessages)=>{
      console.log(`previous messages ${previousMessages}`)
      setMessages(previousMessages)
    }
    const handleMessageSender=(msg)=>{
      console.log(msg);
      setMessages((prev)=>{
        return [...prev,msg]
      });
    }
    socket.on('previousMessages',handlePreviousMessages)
    socket.on('messageSender',handleMessageSender);
    return ()=>{
      socket.off('messageSender',handleMessageSender);
    socket.off('previousMessages',handlePreviousMessages)
  };
},[receiverId]);
  const handleOnClick = ()=>{
    socket.emit('message',JSON.stringify({receiverId,senderId:user._id,txt:val}));
    setVal("");
    setMessages((prev)=> [...prev,{senderId:user._id,message:val,date:new Date().toLocaleTimeString()}] );
  };
  if(isLoading)return <h1>Loading...</h1>
    return <> 
                {
                  messages?.map(({senderId,message,date},index)=>{
                     return  senderId ===user._id ?   <div key={index} className="d-flex flex-row justify-content-start">
                      <img
                        src={`http://localhost:8000/images/${user.profileImage}`}
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          {message}
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                          {date}
                        </p>
                      </div>
                    </div>
                      :
                     <div key={index} className="d-flex flex-row justify-content-end">
                      <div>
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                          {message}
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                          {date}
                        </p>
                      </div>
                      <img
                        src={`http://localhost:8000/images/${user.profileImage}`}
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                    </div> 
                      })
                    } 
                  
            
                  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2 gap-2">
                    {/* <img
                      src={`http://localhost:8000/images/${user.profileImage}`}
                      alt="avatar 3"
                      style={{ width: "40px", height: "100%" }}
                    /> */}
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput2"
                      onChange={handleInputChange}
                      value={val}
                      name="message"
                      placeholder="Type message"
                    />
                    <Button text={'SEND'} onEvent={handleOnClick} />
                  </div>
    </>
}
export default Chatting