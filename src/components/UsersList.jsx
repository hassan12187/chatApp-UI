import { MDBCol, MDBIcon, MDBInputGroup, MDBTypography } from "mdb-react-ui-kit";
import { useState } from "react";
import Axios from '../components/axios';
import { NavLink } from "react-router-dom";

const UsersList=()=>{
  const [state,setState]=useState('');
  const [users,setUsers]=useState([]);
  const handleInputChange = async(e)=>{
    const {value}=e.target;
    setState(value);
  };
  const handleSearch=async()=>{
    try {
      const data = await Axios.get(`/user/allUsers?q=${state}`);
      setUsers(data.data);
    } catch (error) { 
      console.log(`Error Searching User ${error}`);
    }
    setState('');
  }
return   <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
<div className="p-3">
  <MDBInputGroup className="rounded mb-3">
    <input
      className="form-control rounded"
      placeholder="Search"
      onChange={handleInputChange}
      value={state}
      type="search"
    />
   <button  className="input-group-text border-0"
      id="search-addon" onClick={handleSearch} >Search</button>
  </MDBInputGroup>
    <MDBTypography listUnStyled className="mb-0">
    {
      users.map((user,index)=>{
        return <li key={index} className="p-2 border-bottom">
        <NavLink
          to={`user/${user._id}`}
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