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

    const { data: currMonthTasks, isLoading: currIsLoading, isError: currIsError } = useTasksInMonth(user, day);

    // can be optimized to only pull when future data is needed (week has days from next month)
    const nextMonth = moment(day).add(1, "month");
    const { data: nextMonthTasks, isLoading: nextIsLoading, isError: nextIsError } = useTasksInMonth(user, nextMonth);

    const dataIsLoading = currIsLoading || nextIsLoading;
    const dataIsError = currIsError || nextIsError;
    
    const [data, setData] = useState({
        fullTaskList: [],
        dayTaskList: []
    });

    useEffect(() => {
        if (!dataIsLoading && !dataIsError) {
            const fullTaskList = [...currMonthTasks, ...nextMonthTasks];

            setData({
                fullTaskList: fullTaskList,
                dayTaskList: filterCompleted(getDaySlice(day, fullTaskList), false)
            });
        }
    
    }, [dataIsLoading, dataIsError, currMonthTasks, nextMonthTasks, day]);

    let display;
    if (dataIsLoading) {
        display = (
            <InfoPopup text = "loading"/>
        );
    } else if (dataIsError) {
        display = (
            <InfoPopup text = "error!"/>
        );
    } else {
        display = (
            <ul id = "todo-items">
                {data.dayTaskList.map(task => <ToDoItem key = {task.key} task = {task}/>)}
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