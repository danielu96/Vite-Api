import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from './assets/wrappers/App'

const SingleItem = ({title,autor}) => {
 
  return (
    
    <div style={{width:'30vw',display:'flex',justifyContent:'space-between'}}>
      
        <h4>{title}</h4>
        <Link  
        // to='/Item'
         to={`/Item/${title}`} 
          > Zobacz</Link>
       

    </div>
    
  )
}

export default SingleItem