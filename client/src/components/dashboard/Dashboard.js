import { useState, useEffect } from "react";
import StatCard from "./statcard/StatCard";
import TaskRatios from "./taskratios/TaskRatios";
import LineGraph from "./linegraph/LineGraph";
import BarGraph from "./bargraph/BarGraph";
import ScatterPlot from "./scatterplot/ScatterPlot";
import requests from "../../utility/requests";
import tasksManager from "../../utility/tasksManager";
import "./Dashboard.css";

/*
    props
    - day                obj | Date object for current day
    - taskList            [] | array of JSON task objects for the current day
    - monthTaskList       [] | array of JSON task objects for the entire month
    - projects           obj | user's projects and categories
    - dataMonthNames     obj | names of months whose data is cached in monthTaskList
*/
export default function Dashboard(props) {
    const [tasksCompleted, setTasksCompleted] = useState({ val: 0, hasChange: false, change: 0, window: "Today" });
    const [averageXP, setAverageXP] = useState({ val: 0, hasChange: false, change: 0, window: "Week" });
    const [averageTasks, setAverageTasks] = useState({ val: 0, hasChange: false, change: 0, window: "Week" });
    const [daysToDetox, setDaysToDetox] = useState(0);
    const [taskRatios, setTaskRatios] = useState({ quick: "0%", average: "0%", large: "0%", major: "0%", window: "Week" });
    const [tasksInWeek, setTasksInWeek] = useState([]);
    const [projects, setProjects] = useState({ keys: [], data: [], window: "Week" });
    const [categories, setCategories] = useState({ keys: [], data: [], window: "Week" });
    const [taskTimes, setTaskTimes] = useState({ data: [], window: props.day.toLocaleString("en-US", {"month": "long"}) });

    // whenever task list changes, reevaluate cards
    useEffect(() => {
        const tasksCompletedData = tasksManager.getTasksCompleted(props.day, props.monthTaskList, tasksCompleted.window, props.dataMonthNames);
        const averageXPData = tasksManager.getAverageXP(props.day, props.monthTaskList, averageXP.window, props.dataMonthNames);
        const averageTasksData = tasksManager.getAverageTasks(props.day, props.monthTaskList, averageTasks.window, props.dataMonthNames);
        const taskRatiosData = tasksManager.getTaskRatios(props.day, props.monthTaskList, taskRatios.window, props.dataMonthNames);
        const tasksInWeekData = tasksManager.getTasksInWeek(props.day, props.monthTaskList);
        const projectData = tasksManager.getProjectsData(props.projects, props.day, props.monthTaskList, projects.window, props.dataMonthNames);
        const categoriesData = tasksManager.getCategoriesData(props.projects, props.day, props.monthTaskList, projects.window, props.dataMonthNames);
        const taskTimeData = tasksManager.getTaskTimeData(props.monthTaskList, props.day);

        setTasksCompleted(tasksCompletedData);
        setAverageXP(averageXPData);
        setAverageTasks(averageTasksData);
        setTaskRatios(taskRatiosData);
        setTasksInWeek(tasksInWeekData);
        setProjects(projectData);
        setCategories(categoriesData);
        setTaskTimes(taskTimeData);

    }, [props.taskList]);

    // on first load, get days to detox and task ratios
    useEffect(async () => {
        const daysToDetoxResponse = await requests.getDaysToDetox(new Date());
        setDaysToDetox(daysToDetoxResponse);
    }, []);

    const tasksCompletedWindowChangeHandler = (window) => {
        const tasksCompletedData = tasksManager.getTasksCompleted(props.day, props.monthTaskList, window, props.dataMonthNames);
        setTasksCompleted(tasksCompletedData);
    };

    const averageXPWindowChangeHandler = (window) => {
        const averageXPData = tasksManager.getAverageXP(props.day, props.monthTaskList, window, props.dataMonthNames);
        setAverageXP(averageXPData);
    };

    const averageTasksWindowChangeHandler = (window) => {
        const averageTasksData = tasksManager.getAverageTasks(props.day, props.monthTaskList, window, props.dataMonthNames);
        setAverageTasks(averageTasksData);
    };

    const taskRatiosWindowChangeHandler = (window) => {
        const taskRatiosData = tasksManager.getTaskRatios(props.day, props.monthTaskList, window, props.dataMonthNames);
        setTaskRatios(taskRatiosData);
    };

    const projectsWindowChangeHandler = (window) => {
        const projectData = tasksManager.getProjectsData(props.projects, props.day, props.monthTaskList, window, props.dataMonthNames);
        setProjects(projectData);
    };

    const categoriesWindowChangeHandler = (window) => {
        const categoriesData = tasksManager.getCategoriesData(props.projects, props.day, props.monthTaskList, window, props.dataMonthNames);
        setCategories(categoriesData);
    };

    return (
        <div id = "dashboard">
            <div id = "dashboard-title">
                Dashboard
            </div>
            <div id = "statcards">
                <StatCard
                    val = {tasksCompleted.val}
                    change = {tasksCompleted.change}
                    hasChange = {tasksCompleted.hasChange}
                    title = "Tasks Completed"
                    options = {["Today", "Week", "Month"]}
                    action = {tasksCompletedWindowChangeHandler}
                    selected = {tasksCompleted.window}
                />
                <StatCard
                    val = {averageXP.val}
                    change = {averageXP.change}
                    hasChange = {averageXP.hasChange}
                    title = "Avg XP Gained"
                    options = {["Today", "Week", "Month"]}
                    action = {averageXPWindowChangeHandler}
                    selected = {averageXP.window}
                />
                <StatCard
                    val = {averageTasks.val}
                    change = {averageTasks.change}
                    hasChange = {averageTasks.hasChange}
                    title = "Avg Tasks Completed"
                    options = {["Week", "Month"]}
                    action = {averageTasksWindowChangeHandler}
                    selected = {averageTasks.window}
                />
                <StatCard
                    val = {daysToDetox}
                    hasChange = {false}
                    title = "Days Until Detox"
                />
            </div>

            <div id = "task-graphs">
                <LineGraph title = "Gains Per Day" data = {tasksInWeek} yaxis = "Amount" xaxis = "Date"/>
                <TaskRatios
                    title = "Task Ratios"
                    ratios = {taskRatios}
                    options = {["Today", "Week", "Month"]}
                    action = {taskRatiosWindowChangeHandler}
                    selected = {taskRatios.window}
                />
            </div>

            <div id = "misc-stats">
                <BarGraph
                    title = "Projects"
                    data = {projects.data}
                    yaxis = "Amount"
                    xaxis = "Project"
                    keys = {projects.keys}
                    options = {["Today", "Week", "Month"]}
                    action = {projectsWindowChangeHandler}
                    selected = {projects.window}
                />
                <BarGraph
                    title = "Categories"
                    data = {categories.data}
                    yaxis = "Amount"
                    xaxis = "Category"
                    keys = {categories.keys}
                    options = {["Today", "Week", "Month"]}
                    action = {categoriesWindowChangeHandler}
                    selected = {categories.window}
                />
                <ScatterPlot
                    title = "Task Times"
                    data = {taskTimes.data}
                    yaxis = "Time"
                    xaxis = {props.day.toLocaleString("en-US", {month: "long"})}
                    options ={[ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ]}
                />
            </div>
        </div>
    );
}

function test(val) {
    alert(val);
}