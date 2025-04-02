import { useState } from "react";
import Axios from '../components/axios';
import { useCustom } from "../store/store";
import { useNavigate } from "react-router-dom";

export const Login = ()=>{
    const navigate = useNavigate();
    const {setToken}=useCustom();
    const [user,setUser]=useState({
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
        const {data,status} = await Axios.post('/user/login',user,{
            withCredentials:"Include"
         });
         if(status==200){
             setToken(data.token);
             return navigate({pathname:'/'});
         }
    }
    return <>
           <div className="container mt-3">
        <h1>Login</h1>
            <form method="post" onSubmit={handleFormSubmit}>
            <div className="row">
                <div className="col-md-12 my-2">
                <label htmlFor="email" className="form-label">email</label>
                    <input type="email" name="email" id="email" onChange={handleInputChange} value={user.email} className="form-control" placeholder="enter email" />
                </div>
                <div className="col-md-12">
                <label htmlFor="password" className="form-label">password</label>
                    <input type="password" name="password" id="password" onChange={handleInputChange} value={user.password} className="form-control" placeholder="enter password" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
        </div>
    </>
}