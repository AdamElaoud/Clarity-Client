import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import dataSlice from "./dataSlice";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["data/changeDay"],
            ignoredPaths: ["data.day"]
        }
    }),
    reducer: {
        user: userSlice.reducer,
        data: dataSlice.reducer
    }
});

export default store;