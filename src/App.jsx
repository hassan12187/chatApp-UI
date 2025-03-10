import 'bootstrap/dist/css/bootstrap.css';
import 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
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
                }
            ]
        }
    ])
    return <RouterProvider router={router}/>
}
export default App;