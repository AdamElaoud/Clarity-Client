import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const data = createSlice({
    name: "data",
    initialState: {
        day: moment().subtract(3, "weeks").subtract(2, "months"), // client
        daysToDetox: 0 // client
    },
    reducers: {
        changeDay(state, action) {
            state.day = action.payload;
        }
    }
});

export default data;
export const dataActions = data.actions;