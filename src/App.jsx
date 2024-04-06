import {
  Login,
  Apiks,
  Home,
  Newsletter,
  List,
  Todos,
  ToDo,
  Test,
  Register,
  User,
  Users,
  Coctail,
  Stat
} from './Pages'

import Item from './Item';
import Error from "./Error";
import CoctailList from "./Components/CoctailList";
import { ToastContainer } from 'react-toastify';
import { NewUser } from "./Pages/USERS/NewUser";
import ErrorElement from "./Components/ErrorElement";


// ----------------LOADERS--------------------------------

import {loader as SingleUserLoader} from "./Pages/User";
import {loader as OneItem} from './Pages/Test';
import {loader as SingleCoctaiLoader} from './Pages/Coctail';
import {loader as LocalLoader} from'./Pages/Todos';
import {loader as UserLoader} from'./Pages/Users';
import {loader as SingleTasksLoader} from './Pages/ToDo';
import {loader as ApiLoader} from './Pages/Api';
import {loader as StatLoader} from './Pages/Stat';
import {loader as newsletterLoader} from './Components/NewsletterList';

//--------------Actions----------------------------
import {action as UsersAction} from "./Pages/register";
import {action as newsletterAction} from './Pages/Newsletter'
import {action as tasksAction} from './Pages/Todos'

//----------------------------------------------------------

import { createBrowserRouter ,RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        element:<NewUser/>,
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
        path:'Item/:title',
        element: <Item/>  ,
        // loader:SingleItemLoader(queryClient),       
        
      },
      {
        path:'List',
        element: <List/> ,
        errorElement: ErrorElement,     
        
      },
        {         
        path:'tasks',
        element: <Todos/>  ,
        action:tasksAction(queryClient),
        loader:LocalLoader(queryClient)   , 
        errorElement: ErrorElement,
        
      },
      {
        path:'tasks/:id',
        element: <ToDo />   , 
           loader:SingleTasksLoader(queryClient), 
           errorElement: ErrorElement,
        
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
        path:'Apiks',
        element:<Apiks/>,
        loader: ApiLoader(queryClient),
        errorElement: ErrorElement,
      },
      {
        path:'Newsletter',
        element:<Newsletter/>,
        errorElement: <ErrorElement/>, 
        action:newsletterAction(queryClient),
        loader:newsletterLoader(queryClient),     
       
      },
      {
        path:'Stat',
        element:<Stat/>,    
        loader: StatLoader(queryClient),        
        errorElement: ErrorElement,
      }
     
    ]
  },
  <ToastContainer position='top-center' />
 
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
export default App
