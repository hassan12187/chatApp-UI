import 'bootstrap/dist/css/bootstrap.css';
import 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import UserDetail from './pages/UserDetail';
import Friends from './pages/Friends';
import MyAccount from './pages/MyAccount';
import VerifyEmail from './components/VerifyEmail';
import { useEffect } from 'react';
import socket from './services/socket';
import { useCustom } from './store/store';

const App = ()=>{
    const {user,setUser,token} = useCustom();

    // useEffect(()=>{
      
    //     data!=undefined?socket.emit('register',data?._id) : null;
    //    return ()=>{
    //     socket.off('register')
    //    } 
    // },[data])
    const router = createBrowserRouter([
        {
            path:"/",
            element:<Layout />,
            children:[
                {
                    index:true,
                    element:<ProtectedRoute element={<Home />} />,
                },
                {
                    path:'/:receiverId',
                    element:<Home />
                },
              
                {
                    path:"/user/:id",
                    element:<ProtectedRoute element={<UserDetail />} />
                },
                {
                    path:'/friends',
                    element:<ProtectedRoute element={<Friends />} />
                },
                {
                    path:"/myaccount",
                    element:<ProtectedRoute element={<MyAccount />} />
                }
            ]
        },
          {
                    path:'/login',
                    element:<Login />
                },
                {
                    path:'/signup',
                    element:<Signup />
                },
                {
                    path:"/email/verifyEmail",
                    element:<VerifyEmail />
                }
    ]);
    return <RouterProvider router={router}/>
}
export default App;