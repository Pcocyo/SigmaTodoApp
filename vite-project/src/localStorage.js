import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addTask,editTask, deleteTask} from "./reducer/userReducer";

const listenerMiddleware = createListenerMiddleware();

// Listen for `updateUser` or `clearUser` actions
listenerMiddleware.startListening({
  actionCreator: addTask, 
  effect: async (action, listenerApi) => {
    const userData = listenerApi.getState()
    const userList = JSON.parse(localStorage.getItem('registeredUser'))
    let dateToUpdate = userList[userData.user.localStorageIndex].data[action.payload.month]
    dateToUpdate[action.payload.index] = [...dateToUpdate[action.payload.index],action.payload.data]
    localStorage.setItem('registeredUser',JSON.stringify(userList))
  },
});

listenerMiddleware.startListening({
  actionCreator: editTask, 
  effect: async (action, listenerApi) => {
    const userData = listenerApi.getState()
    const userList = JSON.parse(localStorage.getItem('registeredUser'))
    const taskToEdit = userList[userData.user.localStorageIndex].data[action.payload.dataAttr.currentMonth][action.payload.dataAttr.dataIndex-1][action.payload.taskIndex]
    taskToEdit.taskName=action.payload.newTask.taskName
    taskToEdit.taskDescription=action.payload.newTask.taskDescription
    localStorage.setItem('registeredUser',JSON.stringify(userList))
  },
});
listenerMiddleware.startListening({
  actionCreator:deleteTask,
  effect: async(action,listenerApi)=>{
    const storeData = listenerApi.getState()
    const userList = JSON.parse(localStorage.getItem('registeredUser'))
    const userData = userList[storeData.user.localStorageIndex]
    userData.data[action.payload.dataAttr.currentMonth][action.payload.dataAttr.dataIndex-1].splice(action.payload.taskIndex,1)
    localStorage.setItem('registeredUser',JSON.stringify(userList))
    
  }
})

export default listenerMiddleware;