import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  // cart: {
  //   cartItems: [],   
  //   cartNo: 0   
  // } 
  }

export const userSlice = createSlice({
  name:'user',
    initialState,
  reducers: {
   setUserDetails: (state,action)=>{
    //it pass to frontende
    state.user=action.payload;
    // console.log( "redux tooktit stored dta",action.payload);
   },
     
  // ************ not efficient when page reload it will null **************
  //  addToCart: (state, action) => {
  //   state.cart.cartItems.push(action.payload);  // Add item to cart array
  //   state.cart.cartNo++;  // Increment cart count
  // }, 
  },
  
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer