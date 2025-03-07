import { useState } from "react"
import axios from 'axios';
import Axios from "../components/axios";

export const Signup = ()=>{
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:""
    });
    const handleInputChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUser((prev)=>{
            return {...prev,[name]:value};
        });
    };
    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const result = await Axios.post('/user/signup',user);
        console.log(result);
    }
    return <>
        <div className="container mt-3">
        <h1>Register</h1>
            <form method="post" onSubmit={handleFormSubmit}>
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
            </div>
            <button type="submit" className="btn btn-primary mt-3">Register</button>
            </form>
        </div>
    </>
}