import { useSelector } from "react-redux";
import useMarkComplete from "../../../hooks/useMarkComplete";
import TaskItem from "../../statusbar/tasklist/TaskItem";
import CheckInput from "../../UI/CheckInput";
import "./ToDoItem.css";

/*
    props
    - task       {} | object containing information about task to be displayed
*/
export default function ToDoItem(props) {
    const user = useSelector(state => state.user.username);
    const { mutate } = useMarkComplete();

    const onClickHandler = (event) => {
        // if checked, mark task as complete
        if (event.target.checked)
            mutate({ user, task: props.task });
    }

    return (
        <div className = "todo-item">
            <CheckInput onClick = {onClickHandler}/>
            <TaskItem task = {props.task}/>
        </div>
    );
}