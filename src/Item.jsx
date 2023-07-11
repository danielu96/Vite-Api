import React from 'react'
import { useParams } from 'react-router-dom';
import {  useEffect,useState } from 'react'
// import { useLoaderData } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Wrapper from './assets/wrappers/App';
// const CoctailUrl='https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
 const localData =
  "http://localhost:5173/DATA/data.json";
// ' http://192.168.1.102:5173/'

// const singleCocktailQuery = (id) => {
//   return {
//     queryKey: ['cocktail', id],
//     queryFn: async () => {
//       const { data } = await axios.get(`${localData}${id}`);
//       return data;
//     },
//   };
// };

// export const loader =
//   (queryClient) =>
//   async ({ params }) => {
//     const { id } = params;
//     await queryClient.ensureQueryData(singleCocktailQuery(id));
//     return { id };
//   };

// export const loader = async ({params})=>{
//   const {id}=params;
//   const {data}= await axios.get(`${CoctailUrl}${id}`);
//   console.log(data)
//   return {id,data}
// };

const Item = ({autor}) => {
  const [data,setData] = useState([]);
  const {title}=useParams();  
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
// const { id}=useLoaderData();
// const { data } = useQuery(singleCocktailQuery(id));
// const singleItem = data.drinks[0];
// const {strDrink:name}=SingleDrink;
// const {
//   title: title,
// } = singleItem;
  return (
<Wrapper>    <h1> {title}</h1> 
<p>{autor}</p>  

{data
// .filter((item)=>(title===item.title))
.map((item,id)=>
(
         <div key={id}>  
     {item.title},{item.autor}
      </div>  
     ) )} 
    

 </Wrapper> 

  
   
       
  
    
  )
}

export default Item



// import React from 'react'
// import Wrapper from './assets/wrappers/App'
// // import {  useEffect,useState } from 'react'
// import { useParams, useNavigate,useLoaderData } from 'react-router-dom';
// import axios from 'axios';
// const url = "https://rickandmortyapi.com/api/character/";
// const localData = "../DATA/data.json" ;
// const CoctailUrl='www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
// 'https://www.thecoctaildb.com/api/json/v1/1/lookup.php?i='
// ;


// const Item = ({id,autor,data}) => {

//   const navigate = useNavigate();
//   const handleOnClick = () => navigate(-1);
//    const {title}=useParams();
  
// //          const item = data.find((item) => item.title ===
// //  title);
 

//   return (
//     <>
   
//     <div>
//       <h5>SHOW</h5>
//      <h1>{title}</h1> 
   
//     <p>{autor}</p>
//     </div>   
//     <button onClick={handleOnClick}>back</button>
   
    
  
//  </>
//   )
// }

// export default Item