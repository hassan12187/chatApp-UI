import { useCustom } from '../store/store'
import Button from '../components/Button';
import {NavLink} from 'react-router-dom';
import { useEffect } from 'react';
const Friends = () => {
    const {user,friendsData,friendsLoading}=useCustom();
    if(friendsLoading)return <h1>Loading...</h1>;
    useEffect(()=>{document.title="Friends"},[])
  return (
    <div className='container'>
        <div className='content row'>
            <ul>
                {
                    friendsData?.length==0?<h1>No Friends</h1>  : Array.from(friendsData.values())?.map(({username,email,profileImage,_id},index)=>{
                        return <li key={index} className='col-lg-10 d-flex align-items-center'>
                            <div className='image'><img src={`http://localhost:8000/images/${profileImage}`} width={70} height={70} style={{borderRadius:'50%'}} /></div>
                            <div className='card-content'>
                                <h5>{username}</h5>
                                <div><NavLink to={`/user/${_id}`}><Button text={'View Profile'} /></NavLink></div>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    </div>
  )
}

export default Friends