import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import checkToken from "../services/checkToken";

export const Header = ()=>{
    const token = checkToken();
    useEffect(()=>{
        document.title="Signup";
        return;
    },[]);
    return <>
        <header className="d-flex justify-content-end bg bg-dark py-4 px-3">
            <nav className="d-flex gap-3">
            {
                token ? <><NavLink to={'/'}>Home</NavLink> <NavLink to={'/logout'}>logout</NavLink></> :<>
                 <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/signup'}>Signup</NavLink>
                </>
            }
            </nav>
        </header>
    </>
}