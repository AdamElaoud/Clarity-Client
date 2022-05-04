import { Fragment, useState } from "react";
import TaskInputForm from "./TaskInputForm";
import "./TaskButton.css";
import useLevelState from "../../../../hooks/useLevelState";
import { useSelector } from "react-redux";
import useUpdateLevelState from "../../../../hooks/useUpdateLevelState";
import useAddTask from "../../../../hooks/useAddTask";

/*
    props
    - name          str | name of task type
    - time          str | amount of time to complete task
    - val           int | value of XP granted upon completion
*/
export default function TaskButton(props) {
    const [inputForm, setInputForm] = useState(null);
    const user = useSelector(state => state.user.username);
    const { data: levelState, isLoading, isError } = useLevelState(user);
    const { mutate: updateLevelState } = useUpdateLevelState();
    const { mutate: addTask } = useAddTask();

    const openFormHandler = () => {        
        setInputForm({
            close: closeFormHandler,
            submit: addTaskAndXPHandler,
            title: `${props.name} Task`.toUpperCase(),
            val: props.val,
            buttonText: "Submit"
        });
    };

    const closeFormHandler = () => {
        setInputForm(null);
    };

    // verify issue with inputForm === null
    const addTaskAndXPHandler = (task) => {
        if (isLoading || isError) {
            console.log("cannot submit task, still loading data!");
            
        } else {
            updateLevelState({ user, currentXP: levelState.currentXP, level: levelState.level, edit: task.xp });
            addTask({ user, task });
            setInputForm(null);
        }
    };

    // TaskInputForm needs to be portalled to separate root in index.html
    return (
        <Fragment>
            {inputForm && 
            <TaskInputForm 
                close = {inputForm.close}
                submit = {inputForm.submit}
                title = {inputForm.title} 
                val = {inputForm.val}
                buttonText = {inputForm.buttonText}
            />}

            <div className = "taskButton" onClick = {openFormHandler}>
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
        </Fragment>
    );
}