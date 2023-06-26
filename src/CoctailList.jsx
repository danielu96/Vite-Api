import React from 'react'
import CoctailCard from './CoctailCard';

const CoctailList = ({drinks}) => {

const formattedDrinks = drinks.map((item)=>{
const {idDrink,strDrink,strGlass}=item
return {
    id: idDrink,
    name:strDrink,
    glass:strGlass
}
});


  return (
    <div style={{display:"grid"}}>
        <h1>CoctailList</h1>
{formattedDrinks.map((item) => {
    return (
        <CoctailCard key={item.id} {...item}/>
    )
})}
    </div>
  )
}

export default CoctailList