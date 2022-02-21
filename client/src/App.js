import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Status from "./components/status/Status";
import Dashboard from "./components/dashboard/Dashboard";
import TaskList from "./components/tasklist/TaskList";
import levelCurve from "./utility/levelCurve";
import requests from "./utility/requests";
import tasksManager from "./utility/tasksManager";
import moment from "moment";
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
    const [currentXP, setCurrentXP] = useState(0);    
    const [level, setLevel] = useState(1);
    const [maxXP, setMaxXP] = useState(levelCurve[level]);
    const [taskList, setTaskList] = useState([]);
    const [monthTaskList, setMonthTaskList] = useState([]); // tasks of current and previous months
    const [dataMonthNames, setDataMonthNames] = useState({}); // months that data was pulled for
    const [taskCount, setTaskCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [day, setDay] = useState(new Date());
    const [projects, setProjects] = useState({});

    // on boot up, check if user was previously logged in on browser and load task data for current day
    useEffect(async () => {
        const loginStatus = localStorage.getItem("isLoggedIn");

        // check if logged in
        if (loginStatus === "true")
            setIsLoggedIn(true);

        // get projects data
        const projectsResponse = await requests.getProjects("feelssapman");
        setProjects(projectsResponse);

        // load level state data
        const levelResponse = await requests.getLevelState("feelssapman");

        if (Object.keys(levelResponse.levelState).length > 0) {               
            setCurrentXP(levelResponse.levelState.currentXP);
            setLevel(levelResponse.levelState.level);

            // if Level is at the end of the curve, set MaxXP to 60
            if (levelResponse.levelState.level >= levelCurve[0])
                setMaxXP(60);
            else
                setMaxXP(levelCurve[levelResponse.levelState.level]);

        } else {
            setCurrentXP(0);
            setLevel(1);
            setMaxXP(levelCurve[1]);
        }
        
        // get all tasks in current and previous months
        const tasksInMonthResponse = await requests.getTasksInSurroundingMonths(new Date(), "feelssapman");
        setMonthTaskList(tasksInMonthResponse);

        // save the months which data was acquired for
        const curr = new Date();
        const prev = new Date();
        prev.setMonth((prev.getMonth() - 1 + 12 ) % 12);
        const next = new Date();
        next.setMonth((next.getMonth() + 1) % 12);
        
        setDataMonthNames({
            prev: prev.toLocaleString("en-US", {month: "long"}),
            curr: curr.toLocaleString("en-US", {month: "long"}),
            next: next.toLocaleString("en-US", {month: "long"})
        });
            
        // load task data
        const tasksOnDay = tasksManager.getTasksOnDay(new Date(), tasksInMonthResponse);
        setTaskList(tasksOnDay);
        setTaskCount(tasksOnDay.length);
    }, []);

    const login = () => {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    const changeDay = async (date) => {
        setDay(date);
        const dateMonth = date.toLocaleString("en-US", {month: "long"});

        // if date is in current month, get data from cache
        if (dateMonth === dataMonthNames.curr) {
            // load task data
            const tasksOnDay = tasksManager.getTasksOnDay(date, monthTaskList);

            setTaskList(tasksOnDay);
            setTaskCount(tasksOnDay.length);

        // if date is in previous month or next month, get data from cache and load new task data in background
        } else if (dateMonth === dataMonthNames.prev || dateMonth === dataMonthNames.next) {
            const prev = moment(date).subtract(1, "months").toDate();
            const next = moment(date).add(1, "months").toDate();

            // update data months
            setDataMonthNames({
                prev: prev.toLocaleString("en-US", {month: "long"}),
                curr: dateMonth,
                next: next.toLocaleString("en-US", {month: "long"})
            });

            // load task data
            const tasksOnDay = tasksManager.getTasksOnDay(date, monthTaskList);

            setTaskList(tasksOnDay);
            setTaskCount(tasksOnDay.length);

            // get all tasks in month
            const tasksInMonthResponse = await requests.getTasksInSurroundingMonths(date, "feelssapman");
            setMonthTaskList(tasksInMonthResponse);

        // if date is not in current, previous, or next month, get new task data
        } else {
            // get all tasks in month
            const tasksInMonthResponse = await requests.getTasksInSurroundingMonths(date, "feelssapman");
            setMonthTaskList(tasksInMonthResponse);

            const prev = moment(date).subtract(1, "months").toDate();
            const next = moment(date).add(1, "months").toDate();

            // update data months
            setDataMonthNames({
                prev: prev.toLocaleString("en-US", {month: "long"}),
                curr: dateMonth,
                next: next.toLocaleString("en-US", {month: "long"})
            });


            // load task data
            const tasksOnDay = tasksManager.getTasksOnDay(date, tasksInMonthResponse);

            setTaskList(tasksOnDay);
            setTaskCount(tasksOnDay.length);
        }
    };

    const editXP = (edit) => {
        // use temp variables for loop
        let curr = currentXP + edit;
        let max = maxXP;
        let lvl = level;

        // if a level up has occurred
        while (curr >= max) {
            curr = curr - max;
            lvl++;

            // if xp cap has been reached
            if (lvl >= levelCurve[0])
                max = 60;
            else
                max = levelCurve[lvl];
        }

        // if a level down has occurred
        while (curr < 0) {
            // check that level is greater than 1
            if (lvl > 1) {
                lvl--;
                max = levelCurve[lvl];
                curr = max + curr;

            // else set xp to 0
            } else {
                curr = 0;
            }
        }

        setCurrentXP(curr);
        setLevel(lvl);
        setMaxXP(max);

        // update level and xp in database
        requests.updateLevelState(curr, lvl);
    };

    const addTask = (task) => {
        // if date of new task isn't today, don't add to local cache
        const today = task.date;
        if (today.getDate() == day.getDate() && today.getMonth() == day.getMonth() && today.getYear() == day.getYear()) {
            // update local cache
            setTaskList((prevTaskList) => sortTasks([...prevTaskList, { key: taskCount, ...task }]));
            setTaskCount((prevTaskCount) => prevTaskCount + 1);
        }

        // update month task list
        setMonthTaskList((prevMonthTaskList) => sortTasks([...prevMonthTaskList, { key: taskCount, ...task }]));

        // add task to database
        requests.addTaskToDB(task);
    }

    const sortTasks = (tasks) => {
        return tasks.sort((task1, task2) => {
            const date1 = new Date(task1.date);
            const date2 = new Date(task2.date);
            return date1.getTime() - date2.getTime();
        });
    };

    return (
        <div id = "app">
            {!isLoggedIn && <Login login = {login}/>}
            {isLoggedIn && <Sidebar logout = {logout}/>}
            {isLoggedIn && <Dashboard day = {day} taskList = {taskList} monthTaskList = {monthTaskList} projects = {projects} dataMonthNames = {dataMonthNames}/>}
            <div id = "taskbar">
                {isLoggedIn && <Status 
                                    currentXP = {currentXP} 
                                    maxXP = {maxXP} 
                                    addTask = {addTask} 
                                    changeDay = {changeDay}
                                    day = {day} 
                                    editXP = {editXP} 
                                    level = {level}
                                    projects = {projects}
                                />
                }
                {isLoggedIn && <TaskList taskList = {taskList}/>}
            </div>
            
            {/* {isLoggedIn && <Profile name = "Adam" icon = "https://i.imgur.com/gI9BVhH.png"/>} */}
        </div>
    );
}