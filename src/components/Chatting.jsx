import React, {  useEffect, useState } from "react"
import { useCustom } from "../store/store";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import socket from "../services/socket";
import TypingAnimation from '../components/TypingAnimation';

const Chatting =()=>{
  const [val,setVal]=useState('');
  const {receiverId} = useParams();
  const [messages,setMessages]=useState([]);
  const {user,readMessages,isLoading,token,queryClient}=useCustom();
  const mutation = useMutation({
    mutationFn:readMessages,
    onSuccess:(data,variables)=>{
      queryClient.invalidateQueries(['friends',token]);
    },
    
  })
  const handleInputChange = (e)=>{
    const {value}=e.target;
    setVal(value);
  }
  useEffect(()=>{
    // socket.on("chatWindow",(senderId)=>{
    //   if(receiverId == senderId){
    //     socket.emit(`chat`,true);
    //   }
    // })
    const handleMessageSender=({senderId,message,date})=>{
      if(senderId == receiverId){
        console.log("user  message",message);
        setMessages((prev)=>{
          return [...prev,{senderId,message}]
        });
      }
    };
    const handleFriendTyping=(sender)=>{
      if(sender == receiverId){

        setMessages((prev)=>{
          return [...prev,{senderId:user?._id,message: "Typing..." }]
        })
      }
    } 
    const handleFriendNotTyping=(sender)=>{
      if(sender == receiverId){

        setMessages((prev)=>{
          if(prev.length > 0 && prev[prev.length-1].message === "Typing..."){
            const newArray = [...prev];
            newArray.pop();
            return newArray
          }
          if(prev.length > 0 && prev[prev.length-2].message==="Typing..."){
            let temp=prev[prev.length-1];
            prev[prev.length-1]=prev[prev.length-2];
            prev[prev.length-1]=temp;
          }
          return prev;
        })
      }
      }
    if(receiverId && receiverId != user?._id){
      socket.emit('getPreviousMessages',receiverId,(response)=>{
        setMessages(response);
      });
      // socket.on('previousMessages',(messages)=>{
      //   console.log(messages)
      // })
      const cachedFriends = queryClient.getQueriesData({queryKey:['friends',token]});
      if(cachedFriends){
        const getUnreadMessa = cachedFriends[0][1]?.get(receiverId)?.unreadCount;
        if(getUnreadMessa){
            readMessages(receiverId,user._id).then((dat)=>{
              if(dat.status===200){
                mutation.mutate();
              }
            });
            
        }
      }

        socket.on('messageSender',handleMessageSender)
        // socket.on('previousMessages',handlePreviousMessages)
        socket.on('friend-typing',handleFriendTyping);
        socket.on('friend-not-typing',handleFriendNotTyping);
      }
    return ()=>{
      socket.off('messageSender',handleMessageSender);
      // socket.off('previousMessages',handlePreviousMessages);
      socket.off('friend-typing',handleFriendTyping);
      socket.off('friend-not-typing',handleFriendNotTyping);
    };
  },[receiverId]);
  const handleOnClick = ()=>{
    socket.emit('message',JSON.stringify({receiverId,senderId:user._id,txt:val}));
    setVal("");
    setMessages((prev)=> [...prev,{senderId:user._id,message:val,date:new Date().toLocaleTimeString()}] );
  };
  const handleOnFocusTyping=(e)=>{
    if(receiverId){
      socket.emit("typing",receiverId,user?._id);
    }
  }
  const handleOnFocusOut=(e)=>{
    if(receiverId){
      socket.emit('not-typing',receiverId,user?._id);
    }
  }
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
                      {
                      message != String ? <div className="mt-2">{message}</div>:
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          {message}
                        </p>

                      }

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
                      onFocus={handleOnFocusTyping}
                      onBlur={handleOnFocusOut}
                      value={val}
                      name="message"
                      placeholder="Type message"
                    />
                    <Button text={'SEND'} onEvent={handleOnClick} />
                  </div>
    </>
}
export default Chatting