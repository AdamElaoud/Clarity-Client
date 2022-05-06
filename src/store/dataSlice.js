import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const data = createSlice({
    name: "data",
    initialState: {
        day: moment().subtract(1, "weeks").subtract(3, "months").add(1, "day"), // client
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