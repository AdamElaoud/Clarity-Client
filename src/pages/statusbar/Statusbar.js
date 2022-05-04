import Status from "../../components/statusbar/status/Status";
import TaskList from "../../components/statusbar/tasklist/TaskList";
import "./Statusbar.css";

export default function Statusbar() {
    return (
        <div id = "statusbar">
            <Status />
            <TaskList />
        </div>
    );
}