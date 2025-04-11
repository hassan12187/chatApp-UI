import { MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react'
import ChangePass from '../components/ChangePass';

const links = ['Change Password','Change Profile']
const pageMap = new Map();
pageMap.set('0',<ChangePass />);
const MyAccount = () => {
    const [page,setPage]=useState(null);
    const changeLocation=(index)=>{
    return setPage(pageMap.get(String(index)));
    }
  return (
    <div className='container'>
    <div className='content row'>
            <ul className='col-lg-3 col-md-10 col-sm-10 mt-4'>
                {
                    links.map((link,index)=>{
                        return <li key={index}>
                        <MenuItem onClick={()=>{
                            changeLocation(index)
                        }}>
                            <Typography>{link}</Typography>
                        </MenuItem>
                        </li>
                    })
                }
                </ul>
            <div className='col-lg-9 col-md-12 col-sm-10'>
                {page}
            </div>
        </div>
    </div>
  )
}

export default MyAccount