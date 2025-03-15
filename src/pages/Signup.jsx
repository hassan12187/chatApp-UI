import { useState } from "react"
import axios from 'axios';
import Axios from "../components/axios";

export const Signup = ()=>{
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:""
    });
    const [file,setFile]=useState();
    const handleInputChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUser((prev)=>{
            return {...prev,[name]:value};
        });
    };
    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('username',user.username);
        formData.append('email',user.email);
        formData.append('password',user.password);
        formData.append('profileImage',file);
        const result = await Axios.post('/user/signup',formData);
        console.log(result);
    }
    const handleFileUpload=(e)=>{
        setFile(e.target.files[0]);
    }
    return <>
        <div className="container mt-3">
        <h1>Register</h1>
            <form method="post" id="myForm" onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="row">
                <div className="col-md-12">
                <label className="form-label" htmlFor="username">username</label>
                    <input type="text" name="username" onChange={handleInputChange} value={user.username} className="form-control" id="username" placeholder="enter username" />
                </div>
                <div className="col-md-12 my-2">
                <label htmlFor="email" className="form-label">email</label>
                    <input type="email" name="email" id="email" onChange={handleInputChange} value={user.email} className="form-control" placeholder="enter email" />
                </div>
                <div className="col-md-12">
                <label htmlFor="password" className="form-label">password</label>
                    <input type="password" name="password" id="password" onChange={handleInputChange} value={user.password} className="form-control" placeholder="enter password" />
                </div>
                <div className="col-md-12 mt-2">
                <label htmlFor="profileImage" className="form-label">Select Profile Image</label>
                <input type="file" id="profileImage" name="profileImage" onChange={handleFileUpload} className="form-control" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Register</button>
            </form>
        </div>
    </>
}