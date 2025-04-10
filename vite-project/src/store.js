import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/userReducer'
const store = configureStore({
    reducer: {
        user: userReducer
    }
})
export default store