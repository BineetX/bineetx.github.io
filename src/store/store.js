import { configureStore } from "@reduxjs/toolkit";
import selectedSlice from "./selectedslice";
const store = configureStore({
    reducer:{
        selectionname: selectedSlice.reducer,
    }
    
})

export default store