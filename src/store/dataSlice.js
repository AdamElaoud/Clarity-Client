import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const data = createSlice({
    name: "data",
    initialState: {
        devmode: true,
        day: moment(), // client // .subtract(1, "weeks").subtract(3, "months").add(1, "day")
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