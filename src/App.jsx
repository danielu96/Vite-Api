 import { createBrowserRouter ,RouterProvider} from "react-router-dom";
import Item from './Item';
import Home from './Home';
import List from './List';

const router = createBrowserRouter([
  {
    path:'/',
    element:   <Home/>  ,
    children:[
      {
        path:'Item',
        element: <Item/>      
        ,
      },
      {
        path:'List',
        element: <List/>      
        ,
      }
    ]
  },
 
]) ;
 
function App() { 


  return (
    <>

<RouterProvider router={router}

/>
</>

  )
}
// const Wrapper = styled.div`
//   text-align: center;
// `


export default App
