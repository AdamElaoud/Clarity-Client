import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "feelssapman"
    },
    reducers: {
        changeUsername(state, action) {
            state.username = action.payload;
        }
    }
});

export default userSlice;
export const userActions = userSlice.actions;