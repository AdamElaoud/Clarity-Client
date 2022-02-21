import TaskButton from "./TaskButton";
import "./Tasks.css";

/*
    props
    - editXP        fun | function to edit current XP
    - addTask       fun | function to add a new task to the list
    - day           obj | Date object for current day
    - changeDay     fun | function to change the current day
    - projects      obj | user's projects and categories
*/
export default function Tasks(props) {
    return (
        <div id = "tasks">
            <div className = "taskbutton-row">
                <TaskButton name = "Quick" time = "< 10 min" val = {2} editXP = {props.editXP} addTask = {props.addTask} day = {props.day} changeDay = {props.changeDay} projects = {props.projects}/>
                <TaskButton name = "Average" time = "20 - 60 min" val = {4} editXP = {props.editXP} addTask = {props.addTask} day = {props.day} changeDay = {props.changeDay} projects = {props.projects}/>
            </div>
            <div className = "taskbutton-row">
                <TaskButton name = "Large" time = "1 - 2 hours" val = {12} editXP = {props.editXP} addTask = {props.addTask} day = {props.day} changeDay = {props.changeDay} projects = {props.projects}/>
                <TaskButton name = "Major" time = "2+ hours" val = {20} editXP = {props.editXP} addTask = {props.addTask} day = {props.day} changeDay = {props.changeDay} projects = {props.projects}/>
            </div>
        </div>
    );
}