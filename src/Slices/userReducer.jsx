import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import userList from "../Mocks/mockData"
const users = localStorage.getItem('users') !== null ? JSON.parse
    (localStorage.getItem('users')) : [];

    export const fetchTasks = createAsyncThunk('users', () => {
      return axios
          // .get("../Data/data.json")
              .get("../Mocks/mockData.js")
          // .get('https://jsonplaceholder.typicode.com/users')
          .then(response => response.data)
      // .then(console.log(data))
    });

const initialState ={   
   users:users,
 
}
const userReducer = createSlice ({
  name:'user',
  initialState,
  reducers:{
// GetTask:(state,action)=>{
//   state.tasks = state.tasks.find((task) => task.id == action.payload.id);

// },


//     AddTask: ( state, action ) => {   
// //       const newTask = {
// //         // id: nanoid(),
// //         id:Date.now(),
// //         // id:Math.random()* 1000,
// //         title: action.payload,
// //         completed:false,
// //       }
// //  state.tasks.push(newTask)  ;
//       state.tasks.push(action.payload)  
     
//       localStorage.setItem('tasks', JSON.stringify(state.tasks.map
//         (item => item)))
//       },
//   //     UpdateTask:(state,action)=>{
//   //       state.name=action.payload.name,
//   // state.value=action.payload.value
//   //       let data = action.payload;
//   //       const UpdateA=[];
//   //       state.tasks.map((task)=>{
//   //         if(task.id===data.id){
//   //           task.id= data.id;
//   //           task.name=data.name;
//   //           task.completed=data.completed;
//   //         }
//   //         UpdateA.push(task)
//   //       })
//   //       UpdateA,
//   //       localStorage.setItem('tasks', JSON.stringify(state.tasks.map
//   //         (item => item)))
//   //     },
    
//       ToggleTask(state, action) {
//         const task = state.tasks.find(task => task.id === action.payload)
//         if (task) {
//           task.completed = !task.completed
//         }
//         localStorage.setItem('tasks', JSON.stringify(state.tasks.map
//           (item => item)))
//       },
     
//       // UpdateTask(state, action) {
//       //   state.tasks = state.tasks((task) =>
//       //  task.id === action.payload.id ? action.payload : task)
       
//       //   localStorage.setItem('tasks', JSON.stringify(state.tasks.map
//       //     (item => item)))
//       // },
//       UpdateTask(state,action) {
//         state.tasks.map((task)=>{
//           if(task.id === action.payload.id) {
//             task.title= action.payload.title
//           }
//         })
//         localStorage.setItem('tasks', JSON.stringify(state.tasks.map
//               (item => item)))
//       },
//       UpdateStatus(state,action) {
//         state.tasks.map((task)=>{
//           if(task.id === action.payload.id) {
//             task.status= action.payload.status
//           }
//         })
//         localStorage.setItem('tasks', JSON.stringify(state.tasks.map
//               (item => item)))
//       },
     
// // update:(state,action)=>{  
// //   const tasks  =   window.localStorage.getItem('tasks')  ;   
// //   if (tasks) {
// //          const tasksListArr = JSON.parse(tasks);            
// //         tasksListArr.forEach((task) => {
// //           if (task.id === action.payload.id) {       
// //             task.title = action.payload.title;
// //           }    });        
// //            window.localStorage.setItem('tasks', JSON.stringify(state.tasks.map
// //         (item => item)))
// //           // window.localStorage.setItem('tasks', JSON.stringify(tasksListArr));
// //           state.tasks= [...tasksListArr];     
// //         }      
// // }, 
//     removeTask:(state,action)  =>{
//        state.tasks =  state.tasks.filter((task) => task.id !== action.payload);
//        localStorage.setItem('tasks', JSON.stringify(state.tasks.map
//         (item => item)))
//        } ,
    
// setFilter:(state,action) =>{
//   state.filter = action.payload;
//   localStorage.setItem('tasks', JSON.stringify(state.tasks.map
//     (item => item)))
// },
//     clearTasks :(state)=> {
//     state.tasks=[]  ;
//     localStorage.setItem('tasks', JSON.stringify(state.tasks.map
//       (item => item)))
//   }   
//     },
//     extraReducers: builder => {
//       builder.addCase(fetchTasks.pending, state => {
//           state.loading = true
//       })
//       builder.addCase(fetchTasks.fulfilled, (state, action) => {
//           state.loading = false
//           state.tasks = action.payload
//           state.error = ''
//       })
//       builder.addCase(fetchTasks.rejected, (state, action) => {
//           state.loading = false
//           state.tasks = []
//           state.error = action.error.message
//       })
//     }
  
  
 

}})



export const {AddTask,removeTask,renameTask,clearTasks,
  handleChange,setEditTask,ToggleTask,changeTask,UpdateTask,update,setFilter,Toggler,GetTask,UpdateStatus} = userReducer.actions;
export default userReducer.reducer