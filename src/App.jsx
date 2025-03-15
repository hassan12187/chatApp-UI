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
const App = ()=>{
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
                    path:'/login',
                    element:<Login />
                },
                {
                    path:'/signup',
                    element:<Signup />
                },
                {
                    path:"/user/:id",
                    element:<UserDetail />
                },{
                    path:'/friends',
                    element:<Friends />
                }
            ]
        }
    ])
    return <RouterProvider router={router}/>
}
export default App;