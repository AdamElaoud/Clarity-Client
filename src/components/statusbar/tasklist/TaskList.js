import TaskItem from "./TaskItem";
import "./TaskList.css";
import Slicer from "../../../pages/dashboard/slicer";
import useTasksInMonth from "../../../hooks/useTasksInMonth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

/*
    props
    -
*/
export default function TaskList() {
    const user = useSelector(state => state.user.username);
    const day = useSelector(state => state.data.day);
    const { data: fullTaskList, isLoading, isError } = useTasksInMonth(user, day);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        if (!isLoading && !isError) {
            setTaskList(Slicer.getDaySlice(day, fullTaskList));
        }

    }, [isLoading, isError, fullTaskList, day])
    
    // if there are no items to display
    if (taskList.length === 0) {
        return (
            <div id = "taskList">
                <div id = "taskList-title">
                    Tasks
                </div>
                <div id = "no-tasks">
                    NO TASKS TO DISPLAY
                </div>
            </div>
        );
    }

    return (
        <div id = "taskList">
            <div id = "taskList-title">
                Tasks
            </div>
            
            <ul>
                {taskList.map((task) => (<TaskItem key = {task.key} task = {task}/>))}
            </ul>
        </div>
    );
}