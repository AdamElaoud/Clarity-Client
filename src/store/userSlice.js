import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "feelssapman",
        pincode: "8753" // temporary
    },
    reducers: {
        changeUsername(state, action) {
            state.username = action.payload;
        }
    }
});

export default userSlice;
export const userActions = userSlice.actions;