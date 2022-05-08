import moment from "moment";

export function getDaySlice(date, fullTaskList) {
    const dayDate = moment(date);

    const day = dayDate.format("DD");
    const month = dayDate.format("MMMM");

    // get tasks for current day
    const tasks = fullTaskList.filter((task) => {
        const taskDate = moment(task.date);
        const taskDateDay = taskDate.format("DD");
        const taskDateMonth = taskDate.format("MMMM");

        if (day === taskDateDay && month === taskDateMonth)
            return true;

        return false;
    });

    return insertKeys(tasks);
}

export function getDaySlicePair(date, fullTaskList) {
    // get tasks for current day
    const currDayTasks = getDaySlice(date, fullTaskList);

    // get tasks for previous day
    let prevDate = moment(date).subtract(1, "days");
    const prevDayTasks = getDaySlice(prevDate, fullTaskList);

    return {
        curr: currDayTasks,
        prev: prevDayTasks
    };
}

export function getWeekSlice(date, fullTaskList) {
    // get start and end dates for the week
    const start = moment(date);
    start.day(0).startOf("day");

    const end = moment(date);
    end.day(6).endOf("day");;

    // current window info
    const tasks = fullTaskList.filter((task) => {
        const taskDate = new Date(task.date);
        const taskMoment = moment(taskDate);

        if (taskMoment.isSameOrAfter(start) && taskMoment.isSameOrBefore(end))
            return true;            

        return false;
    });

    return insertKeys(tasks);
}

export function getWeekSlicePair(date, fullTaskList) {
    // get tasks for current week
    const currWeekTasks = getWeekSlice(date, fullTaskList);

    // get tasks for previous week
    let prevDate = moment(date).subtract(1, "week");
    const prevWeekTasks = getWeekSlice(prevDate, fullTaskList);

    return {
        curr: currWeekTasks,
        prev: prevWeekTasks
    };
}

export function getMonthSlice(date, fullTaskList) {
    const month = moment(date).format("MMMM");

    const tasks = fullTaskList.filter((task) => {
        const taskDate = moment(task.date);
        const taskMonth = taskDate.format("MMMM");

        if (taskMonth === month)
            return true;

        return false;
    });

    return insertKeys(tasks);
}

export function getMonthSlicePair(date, fullTaskList) {
    // get tasks for current month
    const currMonthTasks = getMonthSlice(date, fullTaskList);

    // get tasks for previous month
    let prevDate = moment(date).subtract(1, "month");
    const prevMonthTasks = getMonthSlice(prevDate, fullTaskList);

    return {
        curr: currMonthTasks,
        prev: prevMonthTasks
    };
}

// insert keys for React list rendering
export function insertKeys(tasks) {
    let count = 0;
    const tasksWithKeys = tasks.map(ele => ({
        key: count++,
        ...ele
    }));

    return tasksWithKeys;
}

export function filterCompleted(tasks, completed) {
    const filteredTasks = tasks.filter(task => task.completed === completed);

    return filteredTasks;
}

export function filterMatrixTypes(tasks, type) {
    const filteredTasks = tasks.filter(task => task.matrix === type);

    return filteredTasks;
}

export function windowParser(window, day, fullTaskList) {
    let tasks;

    switch (window) {
        case "Today":
            tasks = getDaySlice(day, fullTaskList);
            break;
        case "Week":
            tasks = getWeekSlice(day, fullTaskList);
            break;
        case "Month":
            tasks = getMonthSlice(day, fullTaskList);
            break;
        default:
            throw new Error("invalid window provided!");
    }

    return tasks
}

export function windowPairParser(window, day, fullTaskList) {
    let currWindow, prevWindow;

    switch (window) {
        case "Today":
            const { curr: currDay, prev: prevDay } = getDaySlicePair(day, fullTaskList);
            currWindow = currDay;
            prevWindow = prevDay;
            break;
        case "Week":
            const { curr: currWeek, prev: prevWeek } = getWeekSlicePair(day, fullTaskList);
            currWindow = currWeek;
            prevWindow = prevWeek;
            break;
        case "Month":
            const { curr: currMonth, prev: prevMonth } = getMonthSlicePair(day, fullTaskList);
            currWindow = currMonth;
            prevWindow = prevMonth;
            break;
        default:
            throw new Error("invalid window provided!");
    }

    return {
        curr: currWindow,
        prev: prevWindow
    };
}