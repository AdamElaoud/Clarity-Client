import StatCard from "../../components/dashboard/statcard/StatCard";
import TaskRatios from "../../components/dashboard/taskratios/TaskRatios";
import LineGraph from "../../components/dashboard/linegraph/LineGraph";
import BarGraph from "../../components/dashboard/bargraph/BarGraph";
import ScatterPlot from "../../components/dashboard/scatterplot/ScatterPlot";
import useDetoxData from "../../hooks/useDetoxData";
import useTasksInMonth from "../../hooks/useTasksInMonth";
import useProjectTree from "../../hooks/useProjectTree";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Calculator from "./calculator";
import moment from "moment";
import "./Dashboard.css";

/*
    props:
    - 
*/
export default function Dashboard() {
    const user = useSelector(state => state.user.username);
    const day = useSelector(state => state.data.day);

    // get project tree
    const { data: projects, isLoading: projectsIsLoading, isError: projectsIsError } = useProjectTree(user);

    // get detox data
    const { data: detoxData, isLoading: detoxIsLoading, isError: detoxIsError } = useDetoxData(user, moment());
    
    let daysToDetox = 0;
    if (!detoxIsLoading && !detoxIsError)
        daysToDetox = detoxData.daysToDetox;

    // get full taskList
    const prevMonth = moment(day).subtract(1, "month");
    const nextMonth = moment(day).add(1, "month");

    const { data: prevMonthTasks, isLoading: prevIsLoading, isError: prevIsError } = useTasksInMonth(user, prevMonth);
    const { data: currMonthTasks, isLoading: currIsLoading, isError: currIsError } = useTasksInMonth(user, day);

    // can be optimized to only pull when future data is needed (week has days from next month)
    const { data: nextMonthTasks, isLoading: nextIsLoading, isError: nextIsError } = useTasksInMonth(user, nextMonth);

    const dataIsLoading = prevIsLoading || currIsLoading || nextIsLoading || projectsIsLoading;
    const dataIsError = prevIsError || currIsError || nextIsError || projectsIsError;
    
    const [data, setData] = useState({
        fullTaskList: [],
        taskCount: { val: 0, hasChange: false, change: 0, window: "Today" },
        averageXP: { val: 0, hasChange: false, change: 0, window: "Week" },
        averageTaskCount: { val: 0, hasChange: false, change: 0, window: "Week" },
        taskRatios: { quick: "0%", average: "0%", large: "0%", major: "0%", window: "Week" },
        taskCountAndXP: [],
        taskCountPerProject: { keys: [], data: [], window: "Week" },
        taskCountPerCategory: { keys: [], data: [], window: "Week" },
        taskTimes: { data: [] }
    });

    useEffect(() => {
        if (!dataIsLoading && !dataIsError) {
            const fullTaskList = [...prevMonthTasks, ...currMonthTasks, ...nextMonthTasks];

            setData({
                fullTaskList: fullTaskList,
                taskCount: Calculator.getTaskCount(data.taskCount.window, day, fullTaskList),
                averageXP: Calculator.getAverageXP(data.averageXP.window, day, fullTaskList),
                averageTaskCount: Calculator.getAverageTaskCount(data.averageTaskCount.window, day, fullTaskList),
                taskRatios: Calculator.getTaskRatios(data.taskRatios.window, day, fullTaskList),
                taskCountAndXP: Calculator.getTaskCountAndXP(day, fullTaskList),
                taskCountPerProject: Calculator.getTaskCountPerProject(data.taskCountPerProject.window, projects, day, fullTaskList),
                taskCountPerCategory: Calculator.getTaskCountPerCategory(data.taskCountPerCategory.window, projects, day, fullTaskList),
                taskTimes: Calculator.getTaskTimes(day, fullTaskList)
            });
        }
    
        // eslint-disable-next-line 
    }, [dataIsLoading, dataIsError, prevMonthTasks, currMonthTasks, nextMonthTasks, day]);

    const taskCountWindowChangeHandler = (window) => {
        setData((prevData) => ({
            ...prevData,
            taskCount: Calculator.getTaskCount(window, day, data.fullTaskList)
        }));
    };

    const averageXPWindowChangeHandler = (window) => {
        setData((prevData) => ({
            ...prevData,
            averageXP: Calculator.getAverageXP(window, day, data.fullTaskList)
        }));
    };

    const averageTaskCountWindowChangeHandler = (window) => {
        setData((prevData) => ({
            ...prevData,
            averageTaskCount: Calculator.getAverageTaskCount(window, day, data.fullTaskList)
        }));
    };

    const taskRatiosWindowChangeHandler = (window) => {
        setData((prevData) => ({
            ...prevData,
            taskRatios: Calculator.getTaskRatios(window, day, data.fullTaskList)
        }));
    };

    const taskCountPerProjectsWindowChangeHandler = (window) => {
        setData((prevData) => ({
            ...prevData,
            taskCountPerProject: Calculator.getTaskCountPerProject(window, projects, day, data.fullTaskList)
        }));
    };

    const taskCountPerCategoryWindowChangeHandler = (window) => {
        setData((prevData) => ({
            ...prevData,
            taskCountPerCategory: Calculator.getTaskCountPerCategory(window, projects, day, data.fullTaskList)
        }));
    };
    
    return (
        <div id = "dashboard">
            <div id = "dashboard-title">
                Dashboard
            </div>
            <div id = "statcards">
                <StatCard
                    val = {data.taskCount.val}
                    change = {data.taskCount.change}
                    hasChange = {data.taskCount.hasChange}
                    title = "Tasks Completed"
                    options = {["Today", "Week", "Month"]}
                    action = {taskCountWindowChangeHandler}
                    selected = {data.taskCount.window}
                    isLoading = {dataIsLoading}
                    isError = {dataIsError}
                />
                <StatCard
                    val = {data.averageXP.val}
                    change = {data.averageXP.change}
                    hasChange = {data.averageXP.hasChange}
                    title = "Avg XP Gained"
                    options = {["Today", "Week", "Month"]}
                    action = {averageXPWindowChangeHandler}
                    selected = {data.averageXP.window}
                    isLoading = {dataIsLoading}
                    isError = {dataIsError}
                />
                <StatCard
                    val = {data.averageTaskCount.val}
                    change = {data.averageTaskCount.change}
                    hasChange = {data.averageTaskCount.hasChange}
                    title = "Avg Tasks Completed"
                    options = {["Week", "Month"]}
                    action = {averageTaskCountWindowChangeHandler}
                    selected = {data.averageTaskCount.window}
                    isLoading = {dataIsLoading}
                    isError = {dataIsError}
                />
                <StatCard
                    val = {daysToDetox}
                    hasChange = {false}
                    title = "Days Until Detox"
                    isLoading = {detoxIsLoading}
                    isError = {detoxIsError}
                />
            </div>

            <div id = "task-graphs">
                <LineGraph
                    title = "Gains Per Day"
                    data = {data.taskCountAndXP}
                    yaxis = "Amount"
                    xaxis = "Date"
                    isLoading = {dataIsLoading}
                    isError = {dataIsError}
                />
                <TaskRatios
                    title = "Task Ratios"
                    ratios = {data.taskRatios}
                    options = {["Today", "Week", "Month"]}
                    action = {taskRatiosWindowChangeHandler}
                    selected = {data.taskRatios.window}
                    isLoading = {dataIsLoading}
                    isError = {dataIsError}
                />
            </div>

            <div id = "misc-stats">
                <BarGraph
                    title = "Projects"
                    data = {data.taskCountPerProject.data}
                    yaxis = "Amount"
                    xaxis = "Project"
                    keys = {data.taskCountPerProject.keys}
                    options = {["Today", "Week", "Month"]}
                    action = {taskCountPerProjectsWindowChangeHandler}
                    selected = {data.taskCountPerProject.window}
                    isLoading = {dataIsLoading}
                    isError = {dataIsError}
                />
                <BarGraph
                    title = "Categories"
                    data = {data.taskCountPerCategory.data}
                    yaxis = "Amount"
                    xaxis = "Category"
                    keys = {data.taskCountPerCategory.keys}
                    options = {["Today", "Week", "Month"]}
                    action = {taskCountPerCategoryWindowChangeHandler}
                    selected = {data.taskCountPerCategory.window}
                    isLoading = {dataIsLoading}
                    isError = {dataIsError}
                />
                <ScatterPlot
                    title = "Task Times"
                    data = {data.taskTimes.data}
                    yaxis = "Time"
                    xaxis = {day.format("MMMM")}
                    options ={[ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ]}
                    isLoading = {dataIsLoading}
                    isError = {dataIsError}
                />
            </div>
        </div>
    );
}