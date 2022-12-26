import { createSlice } from '@reduxjs/toolkit'

export const personSlice = createSlice({
  name: 'person',
  initialState: {
    ID:"",
    Name:" ",
    Spouse:" ",
    Location:" ",
    Birth_year:" ",
    Present_Address:" ",

  },
  reducers: {
    update: (state,action) => {
    
     return action.payload
    },
    
  }
})

// Action creators are generated for each case reducer function
export const {update} = personSlice.actions

export default personSlice.reducer