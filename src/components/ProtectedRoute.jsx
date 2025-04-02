import { Navigate } from "react-router-dom"
import { useCustom } from "../store/store";
import { memo } from "react";

const ProtectedRoute=memo(({element})=>{
    const {token}=useCustom();
    return token ? element : <Navigate to={'/login'} />;
})
export default ProtectedRoute;