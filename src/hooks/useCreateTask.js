import { useDispatch } from "react-redux";
import { taskFormActions } from "../store/taskFormSlice";

export default function useCreateTask(isCompleteTask, title, val) {
    const dispatch = useDispatch();

    const openTaskForm = () => {
        dispatch(taskFormActions.showTaskForm(true));
        dispatch(taskFormActions.setTitle(title));
        dispatch(taskFormActions.setVal(val));
        dispatch(taskFormActions.setCompleteTaskEditor(isCompleteTask));
    };

    const closeTaskForm = () => dispatch(taskFormActions.showTaskForm(false));

    return { openTaskForm, closeTaskForm };
}