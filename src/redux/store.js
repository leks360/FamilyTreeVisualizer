import { configureStore } from '@reduxjs/toolkit'
import personReducer from './person.js'



export default configureStore({
    reducer: {
        person: personReducer
      }
})