import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { useEffect } from "react"

export const Layout = ()=>{
    return <>
        <Header />
        <Outlet />
    </>
}