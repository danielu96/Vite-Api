import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {  useEffect,useState } from 'react'
import Wrapper from './assets/wrappers/App'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import SingleItem from './SingleItem';


const List = () => {
    const [data, setData] = useState([]);
    const [title , setTitle] = useState('');  
    const [autor , setAutor] = useState('');  
    // const url = "https://rickandmortyapi.com/api/character/1,10,15";
 
 
  const localData = "../DATA/data.json" ;
const fetchData = async () =>{
  try{
    const response = await axios(localData
    
      );
    const data= response.data;
 setData(data)
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
      const resp = await axios.post (localData, {id:'4',title:title,autor:autor});
    //  setData = JSON.stringify
    const myJSON = JSON.stringify(resp);
      // const resp =JSON.stringify({
      //   id:'4',title:title,autor:autor
      //   }),
      console.log(resp.data);
     toast.success('Super gut'); 
    //  setData(resp.data);
      return myJSON;
    } catch(error){
      console.log(error.response);
      toast.warn('sehr schlecht');
    }    
  }


  return (
    <>
    <Wrapper>   
    
    <ToastContainer 
     position="top-center"
     />
    <div className='container'>Home
    <form style={{display:'grid',alignContent:'center', justifyContent:'center'}}
    onSubmit={handleSubmit}>
      <label style={{margin:'auto auto 7px 0px'}} htmlFor='title'>Title</label>
     
      <input 
      style={{background:'#f7f7f7',border:'solid 1px',borderRadius:"5px"}}
      type='text'
      id='title'
      value={title}
      onChange={(e)=>setTitle( e.target.value)}
      ></input> 
       <label style={{margin:'auto auto 7px 0px'}} htmlFor='autor'>Autor</label>
     <input 
      style={{background:'#f7f7f7',border:'solid 1px',borderRadius:"5px"}}
      type='text'
      id='autor'
      value={autor}
      onChange={(e)=>setAutor( e.target.value)}
      ></input>    
          
   <button onClick={handleSubmit}>check it</button>
     </form>      
    </div>    
    {data.map((item,id)=>(
         <div key={id}>  
    <SingleItem title={item.title}/>
       
        </div>
      ))}    
    
    </Wrapper>
    </>
  )
}

export default List