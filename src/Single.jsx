import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from './assets/wrappers/App'

const Single = ({title,autor}) => {
 
  return (
    
    <div style={{width:'30vw',display:'flex',justifyContent:'space-between'}}>
      
        <h6>{title}</h6>
        <p>{autor}</p>
        {/* <p>{autor}</p> */}
        <Link  
        // to='/Item'
         to={`/Item/${title}`} 
          > Zobacz</Link>
       

    </div>
    
  )
}

export default Single