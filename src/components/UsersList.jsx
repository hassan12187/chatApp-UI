import { MDBCol, MDBInputGroup, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import Axios from '../components/axios';
import { NavLink } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCustom } from "../store/store";

const UsersList=()=>{
  const queryClint = useQueryClient();
  const [state,setState]=useState('');
  const [friends,setFriends]=useState([]);
  const {token,user}=useCustom();
  const handleInputChange = async(e)=>{
    setState(e.target.value);
  };
  const {data,isLoading}=useQuery({
    queryKey:['userSearching',state],
    queryFn:async()=>{
      if(state==="")return;
      const result = await Axios.get(`/user/allUsers?q=${state}`);
      return result.data;
    },
    keepPreviousData:true
  }); 
  useEffect(()=>{
    const dt = queryClint.getQueryData(['friends',user]);
    setFriends(dt);
  },[]);
return   <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
<div className="p-3">
  <MDBInputGroup className="rounded mb-3">
    <input
      className="form-control rounded"
      placeholder="Search"
      onChange={handleInputChange}
      // value={state}
      type="search"
    />
    {/* <Button text={'Search'} onEvent={handleSearch} /> */}
  </MDBInputGroup>
    <MDBTypography listUnStyled className="mb-0">
    {
        (!data ? friends : data)?.map((user,index)=>{
        return <li key={index} className="p-2 border-bottom">
        <NavLink
          to={`/${user._id}`}
          className="d-flex justify-content-between"
        >
          <div className="d-flex flex-row">
            <div>
              <img
                src={`http://localhost:8000/images/${user.profileImage}`}
                alt="avatar"
                className="d-flex align-self-center me-3"
                width="60"
              />
              <span className="badge bg-success badge-dot"></span>
            </div>
            <div className="pt-1">
              <p className="fw-bold mb-0">{user.username}</p>
              <p className="small text-muted">
                Hello, Are you there?
              </p>
            </div>
          </div>
          <div className="pt-1">
            <p className="small text-muted mb-1">Just now</p>
            <span className="badge bg-danger rounded-pill float-end">
              3
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