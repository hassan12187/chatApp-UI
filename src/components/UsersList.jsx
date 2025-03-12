import { MDBCol, MDBIcon, MDBInputGroup, MDBTypography } from "mdb-react-ui-kit";
import { useState } from "react";

const UsersList=()=>{
  const [state,setState]=useState('');
  const handleInputChange = async(e)=>{
    const {value}=e.target;
    setState(value);
  };
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
      id="search-addon" onClick={()=>{console.log(state)}}>Search</button>
  </MDBInputGroup>
    <MDBTypography listUnStyled className="mb-0">
      <li className="p-2 border-bottom">
        <a
          href="#!"
          className="d-flex justify-content-between"
        >
          <div className="d-flex flex-row">
            <div>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="avatar"
                className="d-flex align-self-center me-3"
                width="60"
              />
              <span className="badge bg-success badge-dot"></span>
            </div>
            <div className="pt-1">
              <p className="fw-bold mb-0">Marie Horwitz</p>
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
        </a>
      </li>
    </MDBTypography>
</div>
</MDBCol>
}
export default UsersList;