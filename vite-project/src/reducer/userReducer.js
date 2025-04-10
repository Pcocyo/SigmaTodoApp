import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:'',
    password:null,
    data:[],
}
const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        initializeData:(state,action)=>{
            const newState = {...state}
            newState.user = action.username
            newState.password= action.password
            newState.data = action.data
            console.log(newState)
        }
    }
})
export const {initializeData} = userSlice.actions
export default userSlice.reducer 
