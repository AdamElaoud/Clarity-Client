import { useDispatch } from "react-redux";
import { taskFormActions } from "../store/taskFormSlice";

export default function useTaskForm(isCompleteTask, title, val, task) {
    const dispatch = useDispatch();

    const openTaskForm = () => {
        dispatch(taskFormActions.showTaskForm(true));
        dispatch(taskFormActions.setCompleteTaskEditor(isCompleteTask));
        dispatch(taskFormActions.setTitle(`${title.toUpperCase()} TASK`));
        dispatch(taskFormActions.setVal(val));
        dispatch(taskFormActions.setTask(task));
    };

    const closeTaskForm = () => dispatch(taskFormActions.showTaskForm(false));

    return { openTaskForm, closeTaskForm };
}