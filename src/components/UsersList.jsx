import { MDBCol, MDBInputGroup, MDBTypography } from "mdb-react-ui-kit";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCustom } from "../store/store";
import Button from "./Button";
import { useQuery } from "@tanstack/react-query";
import Axios from "./axios";

const UsersList=()=>{
  const [state,setState]=useState('');
  const handleInputChange=(e)=>{
    setState(e.target.value);
  }
  const {friendsLoading,friendsData,user}=useCustom();
  const {data:friends,isLoading:friendsLoad}=useQuery({
    queryKey:['userSearch',state],
    queryFn:async()=>{
      const result = await Axios.get(`user/allUsers?q=${state}`)
      return result.data;
    }
  })
if(friendsLoading)return <h1>Loading...</h1>;
return   <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" style={{borderRight:"1px solid gray"}}>
<div className="p-3">
  <MDBInputGroup className="rounded mb-3">
    <input
      className="form-control rounded"
      placeholder="Search"
      onChange={handleInputChange}
      value={state}
      type="search"
    />
    {/* <Button text={'Search'} />  */}
  </MDBInputGroup>
    <MDBTypography listUnStyled className="mb-0">
    { 
      friendsData?.size === 0? <h1>No friends Found</h1>:
       ( (friends === undefined ? Array.from(friendsData.values()) : friends)?.map((friend,index)=>{ 
        return <li key={index} className="p-2 border-bottom"> 
        <NavLink
          to={`/${friend._id}`}
          className="d-flex justify-content-between"
        > 
          <div className="d-flex flex-row">
            <div>
              <img
                src={`http://localhost:8000/images/${friend.profileImage}`}
                alt="avatar"
                className="d-flex align-self-center me-3"
                width="60"
              />
              <span className="badge bg-success badge-dot"></span>
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
       }) )
    }
      
    </MDBTypography>
</div>
</MDBCol>
}
export default UsersList;