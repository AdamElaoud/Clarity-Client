import TaskButton from "./TaskButton";
import { taskTypes } from "../../../../utility/taskTypes";
import "./Taskbar.css";

/*
    props
    -
*/
export default function Taskbar() {
    return (
        <div id = "taskbar">
            <div className = "taskbutton-row">
                <TaskButton name = {taskTypes.quick.name} time = {taskTypes.quick.time} val = {taskTypes.quick.val} />
                <TaskButton name = {taskTypes.average.name} time = {taskTypes.average.time} val = {taskTypes.average.val} />
            </div>
            <div className = "taskbutton-row">
                <TaskButton name = {taskTypes.large.name} time = {taskTypes.large.time} val = {taskTypes.large.val} />
                <TaskButton name = {taskTypes.major.name} time = {taskTypes.major.time} val = {taskTypes.major.val} />
            </div>
        </div>
    );
}