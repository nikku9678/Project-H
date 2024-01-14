import { createReducer } from "@reduxjs/toolkit";
export const chatReducer = createReducer({
    username: "Rohan",
    socket: "22",
    room: "2"
}, {
    addChat: (state, action) => {
        const data = action.payload;
        state.username = data.username;
        state.socket = data.socket;
        state.room = data.room;
        console.log("addedChat===>", state.username);
    },
});