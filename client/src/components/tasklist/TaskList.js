import TaskItem from "./TaskItem";
import "./TaskList.css";

/*
    props
    - taskList   [] | array of JSON task objects
*/
export default function TaskList(props) {
    // if there are no items to display
    if (props.taskList.length === 0) {
        return (
            <div id = "taskList">
                <div id = "taskList-title">
                    Tasks
                </div>
                <div id = "no-tasks">
                    NO TASKS TO DISPLAY
                </div>
            </div>
        );
    }

    return (
        <div id = "taskList">
            <div id = "taskList-title">
                Tasks
            </div>
            
            <ul>
                {props.taskList.map((task) => (<TaskItem key = {task.key} task = {task}/>))}
            </ul>
        </div>
    );
}