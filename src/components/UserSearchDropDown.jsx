import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCustom } from '../store/store'

const UserSearchDropDown = ({data}) => {
  const {user}=useCustom();
  return (
        <div className='drop-down'>
                    <div className='content'>
                      <ul>
                        {data?.map((searchUser,index)=>{return <NavLink key={index} to={`user/${searchUser?._id}`}>
                        <li>{searchUser.username} {searchUser?._id ===user?._id ? "(Me)" : null }</li>
                        </NavLink>
                        })} 
                      </ul>
                    </div>
                </div>
  )
}

export default UserSearchDropDown