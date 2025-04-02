import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useCustom } from "../store/store";

export const Header = ()=>{
    const {token,removeToken,user} = useCustom();
    useEffect(()=>{
        document.title="Signup";
        return;
    },[]);
    return <>
        <header className="d-flex justify-content-between align-items-center bg bg-dark py-4 px-3">
        <h4 className="text-light">{user?.username}</h4>
            <nav className="d-flex gap-3">
            {
                token ? <><NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/friends'}>Friends</NavLink>  
                 <NavLink onClick={removeToken}>logout</NavLink>
                </> :<>
                 
                 <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/signup'}>Signup</NavLink>
                </>
            }
            </nav>
        </header>
    </>
}