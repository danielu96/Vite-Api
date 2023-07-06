import React from 'react'
import Form from '../Component/Form'
import Items from '../Component/Items'
import { ToastContainer } from 'react-toastify'

const Api = () => {
  return (
    <div>
         <ToastContainer position='top-center' />
    
      <Form/>
      <Items/> 
        </div>
  )
}

export default Api