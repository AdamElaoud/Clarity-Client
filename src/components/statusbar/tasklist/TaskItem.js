import useTaskForm from "../../../hooks/useTaskForm";
import "./TaskItem.css";

/*
    props
    - task       {} | object containing information about task to be displayed
*/
export default function TaskItem(props) {
    // only open full editor if looking at completed task
    let taskForm;
    if (props.task.completed) {
        taskForm = useTaskForm(true, props.task.type, props.task.xp, props.task);
    } else {
        taskForm = useTaskForm(false, props.task.type, props.task.xp, props.task);
    }

    const date = new Date(props.task.date);
    const hours = date.getHours();
    const min = date.getMinutes();
    const minutes = min < 10 ? `0${min}` : min;

    return (
        <li className = "task-item" onClick = {taskForm.openTaskForm}>
            <div className = "task-xp">
                {props.task.xp}
            </div>

            <div className = "task-data">
                <div className = "task-heading">
                    <div className = "task-project">
                        {props.task.proj}
                    </div>
                    <div className = "task-category">
                        {props.task.cat}
                    </div>
                </div>

                <div className = "task-description">
                    {props.task.desc}
                </div>
            </div>

            <div className = "task-time">
                {hours}:{minutes}
            </div>
        </li>
    );
}