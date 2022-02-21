import ProgressBar from "./progressbar/ProgressBar";
import Tasks from "./tasks/Tasks";
import DateBar from "./datebar/DateBar";
import "./Status.css";

/*
    props
    - currentXP     int | value of current XP
    - maxXP         int | value of max XP
    - editXP        fun | function to edit current XP
    - addTask       fun | function to add a new task to the list
    - changeDay     fun | function to change the current day
    - day           obj | Date object for current day
    - projects      obj | user's projects and categories
*/
export default function Status(props) {
    return (
        <div id = "status">
            <ProgressBar currentXP = {props.currentXP} maxXP = {props.maxXP} level = {props.level}/>
            <DateBar changeDay = {props.changeDay} day = {props.day}/>
            <Tasks editXP = {props.editXP} addTask = {props.addTask} day = {props.day} changeDay = {props.changeDay} projects = {props.projects}/>
        </div>
    );
}