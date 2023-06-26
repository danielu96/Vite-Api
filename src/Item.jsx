import React from 'react'
import Wrapper from './assets/wrappers/App'
// import {  useEffect,useState } from 'react'
import { useParams, useNavigate,useLoaderData } from 'react-router-dom';
import axios from 'axios';
// const url = "https://rickandmortyapi.com/api/character/";
// const localData = "../DATA/data.json" ;
// const CoctailUrl='www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
// 'https://www.thecoctaildb.com/api/json/v1/1/lookup.php?i='
// ;


const Item = ({id,autor,data}) => {
//  const {data,setData} =useState([]);
//  const localData = "../DATA/data.json" ;

//  const CoctailUrl = data.drinks[0];
//  console.log(CoctailUrl)
//  const url = data.character[0];
//  console.log(character)
  const navigate = useNavigate();
  const handleOnClick = () => navigate(-1);
   const {title}=useParams();
  
//          const item = data.find((item) => item.title ===
//  title);
 

  return (
    <>
   
    <div>
      <h5>SHOW</h5>
     <h1>{title}</h1> 
    {/* {title} */}
    <p>{autor}</p>
    </div>   
    <button onClick={handleOnClick}>back</button>
      {/* {
      
      data
        .filter((item) => item.title === title)

        .map((item, id) => (
            <div key={id}>{item.autor} </div>
   
  ))
        } */}
    
  
 </>
  )
}

export default Item