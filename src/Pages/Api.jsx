import React from 'react'
import Form from '../Components/Form'
import Items from '../Components/Items'
import { ToastContainer } from 'react-toastify'

const Api = () => {
  return (
    <div className='section-center'>
         <ToastContainer position='top-center' />
    
      <Form/>
      <Items/> 
        </div>
  )
}

export default Api