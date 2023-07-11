import React from 'react'
import Wrapper from './assets/wrappers/Test';
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
    <Wrapper>    
        
{formattedDrinks.map((item) => {
    return (
        <CoctailCard key={item.id} {...item}/>
    )
})}    
     </Wrapper>
  )
}

export default CoctailList