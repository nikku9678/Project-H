import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./reducers"
const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
})

export default store;   