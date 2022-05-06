import { useSelector } from "react-redux";
import useLevelState from "../../../hooks/useLevelState";
import useUpdateLevelState from "../../../hooks/useUpdateLevelState";
import useUpdateTask from "../../../hooks/useUpdateTask";
import TaskItem from "../../statusbar/tasklist/TaskItem";
import CheckInput from "../../UI/CheckInput";
import "./ToDoItem.css";

/*
    props
    - task       {} | object containing information about task to be displayed
*/
export default function ToDoItem(props) {
    const user = useSelector(state => state.user.username);
    const { data: levelState, isLevelStateLoading, isLevelStateError } = useLevelState(user);
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: updateLevelState } = useUpdateLevelState();

    const onClickHandler = (event) => {
        if (isLevelStateLoading || isLevelStateError) {
            console.log("cannot submit task, still loading data!");
            
        // if checked, mark task as complete
        } else if (event.target.checked) {
            props.task.completed = true;
            updateTask({ user, task: props.task });
            updateLevelState({ user, currentXP: levelState.currentXP, level: levelState.level, edit: props.task.xp });
        }
    }

    return (
        <div className = "todo-item">
            <CheckInput onClick = {onClickHandler}/>
            <TaskItem task = {props.task}/>
        </div>
    );
}