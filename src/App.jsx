 import { createBrowserRouter ,RouterProvider} from "react-router-dom";
 import {loader as OneItem} from './Test';
 import {loader as SingleCoctaiLoader} from './Coctail';
 import {loader as LocalLoader} from'./Pages/Todos';
 import {loader as UserLoader} from'./Pages/Users';
//  import {loader as todoDetailLoader} from './Pages/ToDo'
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 import {loader as SingleTasksLoader} from './Pages/ToDo';
import Login from "./Pages/login";
import Item from './Item';
import Home from './Home';
import List from './List';
import Error from "./Error";
import Test from "./Test";
import CoctailList from "./CoctailList";
import Coctail from "./Coctail";
import Todos from "./Pages/Todos";
import ToDo from "./Pages/ToDo";
import Api from "./Pages/Api";
import Newsletter from "./Pages/Newsletter";
import {action as newsletterAction} from './Pages/Newsletter'
import Register from "./Pages/register";
import Users from "./Pages/Users";
import { action as UsersAction} from "./Pages/register";
import Dashboard from "./Components/Dashboard";
import User from "./Pages/User";
import { loader as SingleUserLoader} from "./Pages/User";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Posts } from "./Pages/POSTS/Posts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path:'/',
    element:   <Home/>  ,
    errorElement:<Error/>,
    children:[
      {
        path:'comments',
        element:<Posts/>,
        // loader:UserLoader   , 
      },
      {
        path:'users',
        element:<Users/>,
        loader:UserLoader   , 
      },
      {
        path:'users/:id',
        element: <User/>   , 
           loader:SingleUserLoader(queryClient), 
        
      },
      {
        path:'login',
        element:<Login/>,
      },
      {
        path:'register',
        element:<Register/>,
        action:UsersAction
      },
      {
        path:'dashboard',
        element:<Dashboard/>,
        // action:UsersAction
      },
      {
        path:'Item/:title',
        element: <Item/>  ,
        // loader:SingleItemLoader(queryClient),       
        
      },
      {
        path:'List',
        element: <List/>      
        ,
      },
        {
          index:true,
        path:'tasks',
        element: <Todos/>  ,
        loader:LocalLoader   , 
        
      },
      {
        path:'tasks/:id',
        element: <ToDo />   , 
           loader:SingleTasksLoader(queryClient), 
        
      },
      {
        path:'Test',
        element: <Test/>   , 
         loader: OneItem,    
        
      },
      {
        path:'CoctailList',
        element: <CoctailList/>   ,          
        
      },
      {
        path:'coctail/:id',
        element: <Coctail/>   , 
          loader:SingleCoctaiLoader(queryClient),
        
      },   
      {
        path:'Api',
        element:<Api/>
      },
      {
        path:'Newsletter',
        element:<Newsletter/>,
        action:newsletterAction
      }
     
    ]
  },
 
]) ;
 
function App() { 


  return (
    <>
  <QueryClientProvider client={queryClient}>
<RouterProvider router={router}/>
<ReactQueryDevtools/>
</QueryClientProvider>

</>

  )
}
// const Wrapper = styled.div`
//   text-align: center;
// `


export default App
