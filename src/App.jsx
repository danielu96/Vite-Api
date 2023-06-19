import axios from 'axios';
import {  useEffect,useState } from 'react'
import Wrapper from './assets/wrappers/App'
 
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
    console.log(resp.data)
    // return resp.data;
  } catch(error){
    console.log(error.response)
  }
}
  return (
        <Wrapper>
    <div>
    <h1>API </h1>
    <div className='container'>
    
    <form style={{display:'grid',alignContent:'center', justifyContent:'center'}}
    onSubmit={handleSubmit}>
      {/* <label style={{marginRight:'5px'}} htmlFor='title'>title</label> */}
     
      <input
      type='text'
      id='title'
      value={title}
      onChange={(e)=>setTitle( e.target.value)}
      ></input>
   <button>check</button>
    </form>
    </div>
    
    {data.map((item,id)=>(
      <div key={id}>
        {/* {item.name}
        {item.gender}
        {item.status} */}
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
