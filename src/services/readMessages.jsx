import Axios from "../components/axios"

export const readMessages=async(receiverId,userId)=>{
    const result = await Axios.patch(`/user/readMessages`,{receiverId,userId});
    console.log(result);
    return result;
}