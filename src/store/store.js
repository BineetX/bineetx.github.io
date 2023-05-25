import { configureStore } from "@reduxjs/toolkit";
import selectedSlice from "./selectedslice";
import sectionSlice from "./sectionSlice";
const store = configureStore({
    reducer:{
        selectionname: selectedSlice.reducer,
        sectionname: sectionSlice.reducer,

    }
    
})

export default store