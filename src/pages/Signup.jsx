import { useEffect, useState } from "react"
import Axios from "../components/axios";
import Input from "../components/Input";
import Form from "../components/Form";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

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
        if(user.username.replace(/^\s+|\s+$/g, '') === "" || user.email.replace(/^\s+|\s+$/g, '') === "" || user.password.replace(/^\s+|\s+$/g, '') === ""){
            console.log("white space");
        }else{
            // const formData = new FormData();
            // formData.append('username',user.username);
            // formData.append('email',user.email);
            // formData.append('password',user.password);
            // formData.append('profileImage',file);
            // const result = await Axios.post('/user/signup',user);
            // console.log(result);
            try {
                const result = await Axios.post('/email/register',user,{
                    headers:{
                        email:user.email
                    }
                });
                toast.success(result.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }
    const handleFileUpload=(e)=>{
        setFile(e.target.files[0]);
    }
    useEffect(()=>{document.title="Register"},[])
    return  <>
    <Form title="Register" formSubmission={handleFormSubmit} link={<NavLink to={'/login'}>Already have an account ? Login</NavLink>}>
    <Input labelTitle={"Username"} name={'username'} onEvent={handleInputChange} type={'text'} placeholder={'Enter Username'} value={user.username} />
    <Input labelTitle={"Email"} name={'email'} onEvent={handleInputChange} type={'email'} placeholder={'Enter Email'} value={user.email} />
    <Input labelTitle={"Password"} name={'password'} onEvent={handleInputChange} type={'password'} placeholder={'Enter Password'} value={user.password} />
    <Input labelTitle={"Select Profile Image"} name={'profileImage'} onEvent={handleFileUpload} type={'file'} />
    <Button text={"Register"} type={"submit"} />
    </Form>
    </>
}