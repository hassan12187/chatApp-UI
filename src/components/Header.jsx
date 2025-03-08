import { useEffect } from "react"
import { NavLink } from "react-router-dom"

export const Header = ()=>{
    useEffect(()=>{
        document.title="Signup";
        return;
    },[]);
    return <>
        <header className="d-flex justify-content-end bg bg-dark py-4 px-3">
            <nav className="d-flex gap-3">
            <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/signup'}>Signup</NavLink>
            </nav>
        </header>
    </>
}