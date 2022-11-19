import { createSlice } from "@reduxjs/toolkit";


const navSelectedSlice = createSlice({
    name :"navselectionname",
    initialState: {
        name : "",
    },
    reducers:{
        changename(state,action){
            state.name = action.payload
        }

    }
}) 

export const navSelectedActions = navSelectedSlice.actions;

export default navSelectedSlice
