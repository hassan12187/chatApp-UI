import { Navigate } from "react-router-dom"
import checkToken from "../services/checkToken"

const ProtectedRoute=({element})=>{
    return checkToken() ? element : <Navigate to={'/login'} />;
}
export default ProtectedRoute;