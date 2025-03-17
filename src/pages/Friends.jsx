import { useCustom } from '../store/store'
import Button from '../components/Button';
import {NavLink} from 'react-router-dom';
import { useQuery } from 'react-query';
import Axios from '../components/axios';

const Friends = () => {
    const {token}=useCustom();
    const {isLoading,data} = useQuery({
        queryKey:['friends'],
        queryFn:async()=>{
            const result = await Axios.get("/user/userFriends",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
               return result.data;
        },
    })
    console.log(data);
   if(isLoading)return <h1>Loading....</h1>
  return (
    <div className='container'>
        <div className='content row'>
            <ul>
                {
                    data?.map(({username,email,profileImage,_id},index)=>{
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