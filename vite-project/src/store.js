import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/userReducer'
import listenerMiddleware from './localStorage'
const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
export default store