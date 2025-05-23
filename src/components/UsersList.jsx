import { MDBCol, MDBInputGroup, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useCustom } from "../store/store";
import Input from "./Input";
import socket from "../services/socket";

const UsersList=()=>{
  const [state,setState]=useState('');
  const {friendsLoading,user,friendsData}=useCustom();
  const [onlineFriends,setOnlineFriends]=useState([]);

  const handleInputChange=(e)=>{
    setState(e.target.value);
  }
  useEffect(()=>{
    socket.on("onlineFriends",(onlineUser)=>{
      setOnlineFriends((prev)=>{
        return onlineUser
      })
    })
    socket.on("friendOnline",(id)=>{
      setOnlineFriends((prev)=>{
        if(!prev.includes(id))return [...prev,id];
        return prev;          
      })
    })
    socket.on('friendOffline',(id)=>{
      const value = onlineFriends[onlineFriends.length -1];
      if(value ===id){
      }
      // setOnlineFriends(onlineFriends.filter((val,ind)=>{
      //   return val != id
      // }))
    })
    return ()=>{
      socket.off('onlineFriends')
      socket.off('friendOnline')
      socket.off('friendOffline')
    }
  },[socket]);
  if(friendsLoading)return <h1>Loading...</h1>;
  console.log(friendsData)
return   <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" style={{borderRight:"1px solid gray"}}>
<div className="p-3">
  <MDBInputGroup className="rounded mb-3">
    <Input placeholder={'Search..'} onEvent={handleInputChange} value={state} type={'search'} />
    {/* <input
      className="form-control rounded"
      placeholder="Search"
      onChange={handleInputChange}
      value={state}
      type="search"
    /> */}
    {/* <Button text={'Search'} />  */}
  </MDBInputGroup>
    <MDBTypography listUnStyled className="mb-0">
    { 
      (friendsData?.size === 0)? <h1>No friends Found</h1>: Array.from(friendsData.values())?.map((friend,index)=>{ 
        return <li key={index} className="p-2 border-bottom"> 
        <NavLink
          to={`/${friend._id}`}
          className="d-flex justify-content-between"
        > 
          <div className="user-list d-flex flex-row">
            <div className="image-box">
              <img
                src={`http://localhost:8000/images/${friend.profileImage}`}
                alt="avatar"
                className="d-flex align-self-center me-3"
                width="60"
              />
              <span className={`badge bg-success badge-dot ${onlineFriends?.includes(friend._id) ? 'd-initial':'d-none'}`}>.</span>
            </div>
            <div className="pt-1">
              <p className="fw-bold mb-0">{friend._id === user._id ? `${friend.username} (me)`: friend.username}</p>
              <p className="small text-muted">
             {/* message */}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <p className="small text-muted mb-1">{}</p>
            <span className="badge bg-danger rounded-pill float-end">
              {friend.unreadCount}
            </span>
          </div> 
         </NavLink> 
       </li> 
       }) 
    }
      
    </MDBTypography>
</div>
</MDBCol>
}
export default UsersList;