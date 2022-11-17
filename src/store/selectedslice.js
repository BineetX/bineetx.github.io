import { createSlice } from "@reduxjs/toolkit";


const selectedSlice = createSlice({
    name :"selectionname",
    initialState: {
        name : "",
    },
    reducers:{
        changename(state,action){
            state.name = action.payload
        }

    }
}) 

export const selectedActions = selectedSlice.actions;

export default selectedSlice
