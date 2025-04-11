import React, { useState } from 'react'
import Form from './Form'
import Input from './Input'
import Button from './Button'
import Axios from './axios'
import { useCustom } from '../store/store'
import { toast } from 'react-toastify'

const ChangePass = () => {
    const [pass,setPass]=useState({
        currentPass:'',
    newPass:'',
    confirmPass:''
    });
    const {user} = useCustom();
    const handlePassEvent = (e)=>{
        const {value,name}=e.target;
        setPass((prevVal)=>{
            return {...prevVal,[name]:value}
        })
    };
    const handleFormSubmit=async(e)=>{
        e.preventDefault();
        if(pass.newPass !== pass.confirmPass){return toast.error('New Password and Confirm Password not matched.')};
        try {
            const result = await Axios.post(`/email/verifyPassAndSendEmail/${user._id}`,pass,{
             headers:{
                 email:user.email
             }
            });
            if(result.status === 200){
                toast.success(result.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
    <>
        <Form title={'Change Password'} formSubmission={handleFormSubmit}>
            <Input labelTitle={'Current Password'} name={'currentPass'} onEvent={handlePassEvent} placeholder={'Current Password'} type={'text'} value={pass.currentPass} maxLength={15} minLength={6}/>
            <Input labelTitle={'New Password'} name={'newPass'} onEvent={handlePassEvent} placeholder={'New Password'} type={'text'} value={pass.newPass} maxLength={15} minLength={6}/>
            <Input labelTitle={'Confirm Password'} name={'confirmPass'} onEvent={handlePassEvent} placeholder={'Confirm Password'} type={'text'} value={pass.confirmPass} maxLength={15} minLength={6}/>
            <Button text={"Confirm"} type={'submit'} />
        </Form>
    </>
  )
}

export default ChangePass