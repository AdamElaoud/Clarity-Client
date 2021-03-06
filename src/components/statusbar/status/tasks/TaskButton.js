import "./TaskButton.css";
import useTaskForm from "../../../../hooks/useTaskForm";

/*
    props
    - name          str | name of task type
    - time          str | amount of time to complete task
    - val           int | value of XP granted upon completion
*/
export default function TaskButton(props) {
    const { openTaskForm } = useTaskForm(true, `${props.name} Task`.toUpperCase(), props.val, null);

    // TaskInputForm needs to be portalled to separate root in index.html
    return (
        <>
            <div className = "taskButton" onClick = {openTaskForm}>
                <div className = "taskButton-title">
                    {props.name}
                </div>
                <div className = "taskButton-xp">
                    {props.val}
                </div>
                <div className = "taskButton-time">
                    {props.time}
                </div>
            </div>
        </>
    );
}