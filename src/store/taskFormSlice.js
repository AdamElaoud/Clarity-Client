import { createSlice } from "@reduxjs/toolkit";

const taskForm = createSlice({
    name: "taskForm",
    initialState: {
        title: "N/A",
        val: 0,
        task: null,
        completeTaskEditor: true,
        showTaskForm: false
    },
    reducers: {
        showTaskForm(state, action) {
            state.showTaskForm = action.payload;

            // if closing task form, blank out stored task
            if (!action.payload)
                state.task = null;
        },
        setTitle(state, action) {
            state.title = action.payload;
        },
        setVal(state, action) {
            state.val = action.payload;
        },
        setCompleteTaskEditor(state, action) {
            state.completeTaskEditor = action.payload;
        },
        setTask(state, action) {
            state.task = action.payload;
        }
    }
});

export default taskForm;
export const taskFormActions = taskForm.actions;