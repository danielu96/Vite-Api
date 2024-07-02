import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],

};

  const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || defaultState;
  };

//   const getCartFromLocalStorage = () => {
//   try {
//     return JSON.parse(localStorage.getItem('cart')) || []; // Empty array if no valid JSON
//   } catch (error) {
//     console.error('Error parsing cart from localStorage:', error);
//     return [];
//   }
// };


export const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {

   
    
    // addToCart: (state, action) => {
    //   const { appointment } = action.payload;
    //   const existingItem = state.cartItems.find(
    //     (appt) => appt.time === appointment.time && appt.name === appointment.name
    //   );
    
    //   state.cartItems = existingItem ? [...state.cartItems] : [...state.cartItems, appointment];
    
    //   localStorage.setItem('cart', JSON.stringify(state.cartItems));
    //   toast.success('item added to cart');
    // },

    // addToCart: (state, action) => {
    //   const { appointment } = action.payload;
    //   const item = state.cartItems.find(
    //     (appt) => appt.time === appointment.time && appt.name === appointment.name
    //   );
    //   if (!item) {
    //     state.cartItems.push(appointment);
    //     localStorage.setItem('cart', JSON.stringify(state.cartItems)); // Stringify after update
    //     toast.success('item added to cart');
    //   }
    // },


    addToCart: (state, action) => {
      const { appointment } = action.payload;
      state.cartItems.push(appointment); // Make sure this line adds correctly
      localStorage.setItem('cart', JSON.stringify(state.cartItems));   
      toast.success('item added to cart');
    },
 
    removeFromCart: (state, action) => {
      const appointmentId = action.payload;
      state.appointment = state.appointment.filter((appt) => appt.id !== appointmentId);
      toast.error('Item removed from cart');
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;