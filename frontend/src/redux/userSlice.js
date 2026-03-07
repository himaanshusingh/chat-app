import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        othersData:null,
        selectedUser:null
    },
    reducers:{
        setUserData : (state,action)=>{
            state.userData = action.payload
        },
        setOthersData:(state,action)=>{
            state.othersData=action.payload
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload
        }
    }
})

export const {setUserData,setOthersData,setSelectedUser} = userSlice.actions
export default userSlice.reducer