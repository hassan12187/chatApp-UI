import { io } from "socket.io-client";
import { useCustom } from "../store/store";
const token = localStorage.getItem("token");
const socket = io('http://localhost:8000',{
    withCredentials:true,
    auth:{token}
});
export default socket;