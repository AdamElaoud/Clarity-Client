import TaskButton from "./TaskButton";
import "./Taskbar.css";

/*
    props
    -
*/
export default function Taskbar() {
    return (
        <div id = "taskbar">
            <div className = "taskbutton-row">
                <TaskButton name = "Quick" time = "< 10 min" val = {2} />
                <TaskButton name = "Average" time = "20 - 60 min" val = {4} />
            </div>
            <div className = "taskbutton-row">
                <TaskButton name = "Large" time = "1 - 2 hours" val = {12} />
                <TaskButton name = "Major" time = "2+ hours" val = {20} />
            </div>
        </div>
    );
}