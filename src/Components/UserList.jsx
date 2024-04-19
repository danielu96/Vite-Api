// import { formatPrice } from '../utils';
import { Link, useLoaderData } from 'react-router-dom';

const UserList = () => {
  const { data} = useLoaderData();
  return (
    <div className='mt-12 flex gap-5'>
      {data.map((user) => {  
        // const zlotyAmount = formatPrice(product.price);     
               return (
          <Link
            key={user.id}
            to={`/users/${user._id}`}
            className='p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'
          >
            {/* <img
              src={product.image}
              alt={product.title}
              className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300'
            /> */}
            <div className='ml-0 sm:ml-16'>
              <h3 className='capitalize font-medium text-lg'>{user.name}</h3>
              <h4 className='capitalize text-md text-neutral-content'>
                {user.email}
              </h4>             
            </div>
            
          </Link>
        );
      })} 
    </div>
  );
};

export default UserList;


// import React from 'react'
// import { Link } from 'react-router-dom';
// import UserCard from './UserCard';

// const UserList = ({data}) => {

//     const formattedUsers = data.map((item)=>{
//         const {id,name,password,email}=item
//         return {
//             id,
//             name,
//             password,
//             email
//         }
//         });

//   return (
//     <div style={{marginTop:'4rem',width:"80vw",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px, 1fr))",gap:'2rem' }}>
//         {formattedUsers.map((item) => {
//     return (      
// //   <Link to={`/tasks/${title}`} key={todo.id} style={{marginTop:"1rem"}} ><p>autor{todo.autor}</p><p>title:{todo.title}</p></Link>
       
//         <UserCard key={item.id} {...item}/>
//     )
// })}
//      </div>
//   )
// }

// export default UserList