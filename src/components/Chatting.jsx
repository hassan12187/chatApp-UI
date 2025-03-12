import { useEffect, useState } from "react"
import { useCustom } from "../store/store";

const Chatting =()=>{
  const {token,user} = useCustom();
  const [val,setVal]=useState('');
  const [socket,setSocket]=useState(null);
  const [messages,setMessages]=useState([]);
  const handleInputChange = (e)=>{
    const {value}=e.target;
    setVal(value);
  }
  useEffect(()=>{
    const ws = new WebSocket(`ws://localhost:8000?token=${token}`);
    setSocket(ws);
    ws.onmessage=(data)=>{
      const jsonData = JSON.parse(data.data);
      const {senderName,message}=jsonData;
      setMessages((prev)=>{
        return [...prev,{sendBy:'server',message,date:senderName}]
      })
  }
  return ()=>ws.close();
  },[]);
  const handleOnClick = ()=>{
    socket.send(val);
    setMessages((prev)=>{
      return [...prev,{sendBy:'user',message:val}];
    })
    setVal('');
  }
    return <>
                {
                  messages?.map(({sendBy,message,date},index)=>{
                     return  sendBy ==='user' ? <div key={index} className="d-flex flex-row justify-content-start">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
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
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />
                    </div> 
                      })
                    } 
                  
            
                  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
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
                    {/* <a className="ms-1 text-muted" href="#!">
                      
                    </a> */}
                    <button className="btn btn-primary btn-sm" onClick={handleOnClick}>SEND</button>
                  </div>
    </>
}
export default Chatting