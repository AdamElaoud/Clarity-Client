import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTasksInMonth from "../../../hooks/useTasksInMonth";
import { filterCompleted, filterMatrixTypes, getDaySlice } from "../../../utility/slicer";
import TaskItem from "../../statusbar/tasklist/TaskItem";
import InfoPopup from "../../UI/InfoPopup";
import "./MatrixQuadrant.css";

/*
    props:
    - top       str | title to display on the top of the quadrant
    - left      str | title to display on the left of the quadrant
    - type      str | type of matrix quadrant (for filtering tasks)
*/
export default function MatrixQuadrant(props) {
    const user = useSelector(state => state.user.username);
    const day = useSelector(state => state.data.day);

    const { data: currMonthTasks, isLoading, isError } = useTasksInMonth(user, day);
    
    const [dayTaskList, setDayTaskList] = useState([]);

    useEffect(() => {
        if (!isLoading && !isError) {
            setDayTaskList(filterMatrixTypes(filterCompleted(getDaySlice(day, currMonthTasks), false), props.type));
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
            <div className = "quadrant-items">
                {dayTaskList.map(task => <TaskItem key = {task.key} task = {task}/>)}
            </div>
        );
    }
    
    return (
        <div className = {`matrixquadrant ${props.className}`}>
            {props.top && <div className = "quadrant-top">{props.top}</div>}
            {props.left && <div className = "quadrant-left">{props.left}</div>}

            <div className = "quadrant-list">
                {display}
            </div>
        </div>
    );
}