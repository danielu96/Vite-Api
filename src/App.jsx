import {
  Login,  
  Home,
  Newsletter,  
  Todos,
  ToDo,
  Test,
  Register,
  User,
  Users,
  Coctail,
  Stat,
  Calendar
  
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
import {loader as StatLoader} from './Pages/Stat';
import {loader as newsletterLoader} from './Components/NewsletterList';
import {loader as AppointmentLoader} from './Pages/RESERVATION/Appointment'
import {loader as AppointmentDetailLoader} from './Pages/RESERVATION/AppointmentDetail'

//--------------Actions----------------------------
import {action as UsersAction} from "./Pages/register";
import {action as newsletterAction} from './Pages/Newsletter'
import {action as tasksAction} from './Pages/Todos'

//----------------------------------------------------------

import { createBrowserRouter ,RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Appointment from './Pages/RESERVATION/Appointment';
import AppointmentDetail from './Pages/RESERVATION/AppointmentDetail';
// import NoAppointment from './Pages/RESERVATION/NoAppointment';
import  Visit  from './Pages/VISITS/visit';

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
        path:'jobs',
        element:<NewUser/>,
        errorElement: <ErrorElement/>,
        // loader:UserLoader   , 
      },     
      {
        path:'calendar',
        element:<Calendar/>,
        errorElement: <ErrorElement/>       
      }, 
      {
        path:'appointments',
        element:<Appointment/>,
        errorElement: <ErrorElement/>  ,
         loader:AppointmentLoader(queryClient)   ,     
      }, 
      {
       
         path:"/appointments/:id" ,
        element:<AppointmentDetail 
        // selectedDate={selectedDate}
         /> ,      
        errorElement: <ErrorElement/>,
           loader:AppointmentDetailLoader(queryClient), 
        
      },
      // {
      //   path: '/appointments/:date',
      //   errorElement: <ErrorElement/>,
      //   element: <NoAppointment />, // Add route for NoAppointment page
      // },
      {
        path:'visits',
        element:<Visit/>,
        errorElement: <ErrorElement/>  ,
        //  loader:AppointmentLoader(queryClient)   ,     
      }, 
      {
        path:'users',
        element:<Users/>,
        errorElement: <ErrorElement/>,
        loader:UserLoader(queryClient)   , 
      },

      {
        path:'users/:id',
        element: <User/>   , 
        errorElement: <ErrorElement/>,
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
