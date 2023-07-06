import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const CoctailUrl='https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';


const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${CoctailUrl}${id}`);
    
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

// export const loader = async ({params})=>{
//   const {id}=params;
//   const {data}= await axios.get(`${CoctailUrl}${id}`);
//   console.log(data)
//   return {id,data}
// };

const Coctail = () => {
const { id}=useLoaderData();
const { data } = useQuery(singleCocktailQuery(id));
// const SingleDrink = data.drinks[0];
const singleDrink = data.drinks[0];
// const {strDrink:name}=SingleDrink;
const {
  strDrink: name,
  strDrinkThumb: image,
  strAlcoholic: info,
  strCategory: category,
  strGlass: glass,
  strInstructions: instructions,
} = singleDrink;
  return (
    
    <div>
      <h1> {name}</h1>
      <img style={{width:'50%'}} src={image} alt={name} className='img' />
      <p>{info}</p>
      <p>{instructions}</p>
      <p>{category}</p>
      <span>{glass}</span>

     
    </div>
  )
}

export default Coctail