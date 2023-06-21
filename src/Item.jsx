import React from 'react'
import Wrapper from './assets/wrappers/App'
import { useParams, useNavigate } from 'react-router-dom';
const Item = () => {
  const navigate = useNavigate();
  const handleOnClick = () => navigate(-1);
//     const {title} = useParams();
//      const item = data.find((item) => item.title ===
// title);
  return (
    <>
    <Wrapper>
    <div>
      <h1>SHOW</h1>
    {/* {title} */}
    </div>
    <button onClick={handleOnClick}>back</button>
      {/* {item
        .filter((item) => item.title === title)
        .map((item, id) => (
            <div key={id}>{item.title} </div>
   
  ))
        } */}
    </Wrapper>
  
 </>
  )
}

export default Item