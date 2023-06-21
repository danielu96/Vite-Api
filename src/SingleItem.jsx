import React from 'react'
import { Link } from 'react-router-dom'

const SingleItem = ({autor,title}) => {
  // const {title}=useParams();
  return (
    <div style={{display:'flex',justifyContent:'space-between'}}>
        <h1>{title}</h1>
        <p>{autor}</p>
     {/* <a href='Item' >  <button >details</button> </a> */}
        <Link  
        to='/Item'
        //  to={`/Item/${title}`} 
          > Zobacz</Link>

    </div>
  )
}

export default SingleItem