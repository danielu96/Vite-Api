import React from 'react'
import { Link,useRouteError } from 'react-router-dom';
import Wrapper from './assets/wrappers/App';


const Error = () => {
    const error =useRouteError();
    console.log(error);
    if(error.status===404){
        return <Wrapper>
            <h1>Ups... sorry </h1>
            <Link to="/">Back</Link>
        </Wrapper>
    }
  return (
    <Wrapper>
    <div>
        <h1>Error... </h1></div>
        </Wrapper>
  )
}

export default Error