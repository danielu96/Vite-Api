import axios from 'axios';
import {  useEffect,useState } from 'react'
import Wrapper from './assets/wrappers/App'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 
function App() {
  const [data, setData] = useState([]);
  const [title , setTitle] = useState('');  
  
  const url = "https://rickandmortyapi.com/api/character/1,10,15";
  const localData ="../DATA/data.json";
  // const apiGet = () => {
  //   // axios.get((url)
  //     fetch(localData)
  //         .then((response) => response.json())
  //         .then((data) => {
  //             setData(data);
  //         })        
  // }
//   useEffect(() => {
//     apiGet();
// }, [])
const fetchData = async () =>{
  try{
    const response = await axios(localData);
    const data= response.data;
    setData(data);
    // console.log(data);
  } catch (error) {
    console.log(error.response)
  }
}
useEffect(() => {
  fetchData();
}, [])
const handleSubmit = async (e) =>{
  e.preventDefault();
  try{
    const resp = await axios.post(localData, {title:title});
    console.log(resp.data);
   toast.success('Super gut');
    return resp.data;
  } catch(error){
    console.log(error.response)
  }
  
}
  return (
        <Wrapper>
         
    <div>
    <ToastContainer 
    position="top-center"
    />
    <h1>API </h1>
    
    <div className='container'>
    
    <form style={{display:'grid',alignContent:'center', justifyContent:'center'}}
    onSubmit={handleSubmit}>
      <label style={{margin:'auto auto 7px 0px'}} htmlFor='title'>Title</label>
     
      <input 
      style={{background:'#f7f7f7'}}
      type='text'
      id='title'
      value={title}
      onChange={(e)=>setTitle( e.target.value)}
      ></input>
   <button onClick={handleSubmit}>check it</button>
    </form>
    </div>
    
    {data.map((item,id)=>(
      <div key={id}>
        {/* {item.name}
        {item.gender}
        {item.status} */}
        <h3>{item.autor}</h3>
        -{item.title}</div>
    ))}
    
   
    </div>      
      </Wrapper>
   
  )
}
// const Wrapper = styled.div`
//   text-align: center;
// `


export default App
