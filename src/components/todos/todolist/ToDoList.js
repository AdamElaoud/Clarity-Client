import Card from "../../UI/Card";
import Button from "../../UI/Button";
import "./ToDoList.css";
import { useSelector } from "react-redux";
import moment from "moment";
import useTasksInMonth from "../../../hooks/useTasksInMonth";
import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { getDaySlice, filterCompleted } from "../../../utility/slicer";
import useTaskForm from "../../../hooks/useTaskForm";
import InfoPopup from "../../UI/InfoPopup";
import { taskTypes } from "../../../utility/taskTypes";

export default function ToDoList() {
    const user = useSelector(state => state.user.username);
    const day = useSelector(state => state.data.day);

    const { openTaskForm } = useTaskForm(false, "TO DO", taskTypes.quick.val, null);

    const { data: currMonthTasks, isLoading, isError } = useTasksInMonth(user, day);
    
    const [dayTaskList, setDayTaskList] = useState([]);

    useEffect(() => {
        if (!isLoading && !isError) {
            setDayTaskList(filterCompleted(getDaySlice(day, currMonthTasks), false));
        }
    
    }, [isLoading, isError, currMonthTasks, day]);

    let display;
    if (isLoading) {
        display = (
            <InfoPopup text = "loading"/>
        );
    } else if (isError) {
        display = (
            <InfoPopup text = "error!"/>
        );
    } else {
        display = (
            <ul id = "todo-items">
                {dayTaskList.map(task => {
                        let color;
                        switch (task.matrix) {
                            case "ui":
                                color = "task-item-green";
                                break;
                            case "nui":
                                color = "task-item-blue";
                                break;
                            case "uni":
                                color = "task-item-yellow";
                                break;
                            case "nuni":
                                color = "task-item-red";
                                break;
                            default:
                                throw new Error("invalid matrix type!");
                        }

                        return <ToDoItem className = {color} key = {task.key} task = {task}/>
                    })
                }
            </ul>
        );
    }

    return (
        <Card id = "todolist">
            <div id = "todolist-header">
                <Button onClick = {openTaskForm}>+</Button>
                <div id = "todolist-title">To Do</div>
            </div>

            {display}
        </Card>
    );
}