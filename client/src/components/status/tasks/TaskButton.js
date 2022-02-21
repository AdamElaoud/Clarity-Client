import { Fragment, useState } from "react";
import TaskInputForm from "./TaskInputForm";
import "./TaskButton.css";

/*
    props
    - name          str | name of user
    - time          str | amount of time to complete task
    - val           int | value of XP granted upon completion
    - editXP        fun | function to edit current XP
    - addTask       fun | function to add a new task to the list
    - day           obj | Date object for current day
    - changeDay     fun | function to change the current day
    - projects      obj | user's projects and categories
*/
export default function TaskButton(props) {
    const [inputForm, setInputForm] = useState(null);

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
        props.editXP(props.val);
        props.addTask(task);

        setInputForm(null);
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
                day = {props.day}
                changeDay = {props.changeDay}
                projects = {props.projects}
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