import ProgressBar from "./progressbar/ProgressBar";
import Taskbar from "./tasks/Taskbar";
import DateBar from "./datebar/DateBar";
import "./Status.css";

/*
    props
    - 
*/
export default function Status() {
    return (
        <div id = "status">
            <ProgressBar />
            <DateBar />
            <Taskbar />
        </div>
    );
}