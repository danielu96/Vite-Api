import React from 'react'
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CoctailList from '../Components/CoctailList';

// import Wrapper from './assets/wrappers/App';



const CoctailFullUrl="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
   


export const loader = async ()=>{
    const searchTerm="";
    const response= await axios.get(`${CoctailFullUrl}${searchTerm}`);
    console.log(response)
    return {drinks:response.data.drinks, searchTerm}
  };

const Test = () => {
  const {drinks,searchTerm}=useLoaderData();
  console.log(drinks);
  return (
    // <Wrapper>
   
      <CoctailList drinks={drinks}/>
        
    
    //  </Wrapper>
 
  )

}



export default Test