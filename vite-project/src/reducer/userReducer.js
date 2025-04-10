import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:'',
    password:'',
    localStorageIndex:null,
    data:{},
}
const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        initializeData:(state,action)=>{
            state.user = action.payload.username
            state.password= action.payload.password
            state.data = action.payload.data
            state.localStorageIndex = action.payload.localStorageIndex
        },
        clearData:(state)=>{
            state.user = ''
            state.password=''
            state.data={}
            state.localStorageIndex = null
        },
        addTask:(state,action)=>{
            state.data[action.payload.month][action.payload.index].push({...action.payload.data})
        }
    }
})
export const {initializeData,clearData,addTask} = userSlice.actions
export default userSlice.reducer 
