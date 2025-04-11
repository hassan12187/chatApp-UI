import { useEffect, useState } from "react";
import Axios from '../components/axios';
import { useCustom } from "../store/store";
import { NavLink, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Button from "../components/Button";
import Input from "../components/Input";
import { toast } from "react-toastify";

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
        try {
            const result = await Axios.post('/user/login',user,{
                withCredentials:"Include"
             });
             if(result.status===200){
                setToken(result.data.token);
                return navigate({pathname:'/'});
            }
        } catch (error) {
            if(error.response.status===400){
               toast.error(error.response.data.message)
            }
        }
       
      
        
    }
    useEffect(()=>{document.title="Login"},[]);
    return <>   
    <Form title={"Login"} formSubmission={handleFormSubmit} link={<NavLink to={'/signup'}>Don't have an account ? Register Now</NavLink>}>
    <Input labelTitle={"Email"} name={"email"} placeholder={'Enter Email'} onEvent={handleInputChange} type={"email"} value={user.email} />
    <Input labelTitle={"Password"} name={"password"} placeholder={'Enter Password'} onEvent={handleInputChange} type={"password"} value={user.password} />
         <Button text={"Login"} type={'submit'} />
    </Form>
    </>
}