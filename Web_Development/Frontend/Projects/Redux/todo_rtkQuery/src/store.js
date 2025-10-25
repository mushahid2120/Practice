import { configureStore } from "@reduxjs/toolkit";
import api from "./apiSlice";

const store=configureStore({
    reducer: {
        [api.reducerPath]:api.reducer
    },
    middleware: (prevmiddleware)=>([...prevmiddleware(),api.middleware])
})

export default store 