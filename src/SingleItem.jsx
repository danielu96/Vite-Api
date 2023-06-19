import React from 'react'

const SingleItem = ({autor,title}) => {
  return (
    <div>
        <h1>{autor}</h1>
        <p>{title}</p>
    </div>
  )
}

export default SingleItem