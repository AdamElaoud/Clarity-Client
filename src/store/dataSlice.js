import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const data = createSlice({
    name: "data",
    initialState: {
        day: moment(), // client
        daysToDetox: 0, // client
        pincode: "8753" // client (temporary)
    },
    reducers: {
        changeDay(state, action) {
            state.day = action.payload;
        }
    }
});

export default data;
export const dataActions = data.actions;