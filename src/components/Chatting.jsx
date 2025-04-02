import { useEffect, useState } from "react"
import { useCustom } from "../store/store";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Chatting =()=>{
  const [val,setVal]=useState('');
  const [socket,setSocket]=useState(null);
  const {receiverId} = useParams();
  const [messages,setMessages]=useState([]);
  const {user}=useCustom();
  const handleInputChange = (e)=>{
    const {value}=e.target;
    setVal(value);
  }
  useEffect(()=>{
    const sk = io('ws://localhost:8000');
    setSocket(sk);
    if(receiverId !== undefined){
      sk.emit('register',user._id,receiverId);
    }
    sk.on('previousMessages',(previousMessages)=>{
      setMessages(previousMessages)
    })
    sk.on('messageSender',(msg)=>{
      console.log(msg);
      setMessages((prev)=>{
        return [...prev,msg]
      });
    });
  return ()=>{
    sk.off('messageSender');
    sk.off('previousMessages')
    sk.disconnect();
  };
  },[]);
  const handleOnClick = ()=>{
    socket.emit('message',JSON.stringify({receiverId,senderId:user._id,txt:val}));
    setMessages((prev)=> [...prev,{senderId:user._id,message:val,date:new Date().toLocaleTimeString()}] );
    setVal("");
  };
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
                    <img
                      src={`http://localhost:8000/images/${user.image}`}
                      alt="avatar 3"
                      style={{ width: "40px", height: "100%" }}
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput2"
                      onChange={handleInputChange}
                      value={val}
                      name="message"
                      placeholder="Type message"
                    />
                    <Button text={'SEND'}  onEvent={handleOnClick} />
                  </div>
    </>
}
export default Chatting