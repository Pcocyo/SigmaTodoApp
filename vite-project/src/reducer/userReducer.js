import { createSlice } from "@reduxjs/toolkit";
import EditTaskModal from "../component/EditTaskModal";

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
        },
        editTask:(state,action)=>{
            const dataAttr = action.payload.dataAttr
            const newTask = {...action.payload.newTask}
            state.data[dataAttr.currentMonth][dataAttr.dataIndex - 1] = [newTask]
            console.log(state.data)
        },
        deleteTask:(state,action)=>{
            const dataAttr = action.payload.dataAttr
            state.data[dataAttr.currentMonth][dataAttr.dataIndex - 1] = []
        }
    }
})
export const {initializeData,clearData,addTask, editTask, deleteTask} = userSlice.actions
export default userSlice.reducer 
