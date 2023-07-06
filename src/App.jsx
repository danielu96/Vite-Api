 import { createBrowserRouter ,RouterProvider} from "react-router-dom";
 import {loader as OneItem} from './Test';
 import {loader as SingleCoctaiLoader} from './Coctail';
 import {loader as SingleToDoLoader} from './Pages/ToDo'
 import {loader as LocalLoader} from'./Pages/Todos';
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//  import {loader as SingleItemLoader} from '@tanstack/react-query';
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
        path:'Todos',
        element: <Todos/>  ,
        loader:LocalLoader   , 
        
      },
      {
        path:'todo/:id',
        element: <ToDo/>   , 
          loader:SingleToDoLoader(queryClient),
        
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
     
    ]
  },
 
]) ;
 
function App() { 


  return (
    <>
  <QueryClientProvider client={queryClient}>
<RouterProvider router={router}/>
</QueryClientProvider>

</>

  )
}
// const Wrapper = styled.div`
//   text-align: center;
// `


export default App
