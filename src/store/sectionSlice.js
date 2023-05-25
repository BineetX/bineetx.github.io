import { createSlice } from "@reduxjs/toolkit";


const sectionSlice = createSlice({
    name :"sectionname",
    initialState: {
        name : "aboutme",
    },
    reducers:{
        changename(state,action){
            state.name = action.payload
        }

    }
}) 

export const sectionActions = sectionSlice.actions;

export default sectionSlice
