import React from 'react'
import { Link } from 'react-router-dom'

const CoctailCard = ({id,name,glass}) => {
  return (
    <div>
       
        <h3>{name}</h3>
        <p>{glass}</p>
<Link to={`/coctail/${id}`}>details</Link>
    </div>
  )
}

export default CoctailCard