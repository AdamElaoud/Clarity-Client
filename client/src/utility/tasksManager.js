import moment from "moment";

const manager = {
    getTasksOnDay(date, tasks) {
        const todayDay = date.toLocaleString("en-US", {day: "2-digit"});
        const todayMonth = date.toLocaleString("en-US", {"month": "long"});
    
        const tasksOnDay = tasks.filter((task) => {
            const taskDate = new Date(task.date);
            const taskDateDay = taskDate.toLocaleString("en-US", {day: "2-digit"});
            const taskDateMonth = taskDate.toLocaleString("en-US", {"month": "long"});
    
            if (todayDay === taskDateDay && todayMonth === taskDateMonth)
                return true;

            return false;
        });

        let count = 0;
        const tasksOnDayWithKeys = tasksOnDay.map((ele) => ({
            key: count++,
            ...ele
        }));

        // sort by time
        tasksOnDayWithKeys.sort((task1, task2) => {
            const date1 = new Date(task1.date);
            const date2 = new Date(task2.date);
            return date1.getTime() - date2.getTime();
        });
    
        return tasksOnDayWithKeys;
    },
    getTasksCompleted(date, tasks, window, dataMonthNames) {
        let currWindow, prevWindow;

        switch (window) {
            case "Today":
                // get tasks for current and previous day
                const { currDayTasks, prevDayTasks } = getTasksInTwoDays(date, tasks);
                currWindow = currDayTasks;
                prevWindow = prevDayTasks;
                break;

            case "Week":
                // get tasks for current and previous week
                currWindow = getTasksInWeekHelper(date, tasks);

                let prevWeek = moment(date);
                prevWeek.subtract(7, "days");
                prevWindow = getTasksInWeekHelper(prevWeek.toDate(), tasks);
                break;
            case "Month":
                // get tasks for current and previous month
                const { currMonth, prevMonth } = getTasksInTwoMonths(dataMonthNames, tasks);
                currWindow = currMonth;
                prevWindow = prevMonth;
                break;
        }

        const curr = currWindow.length;
        const prev = prevWindow.length;
        
        const hasChange = prev === 0 ? false : true;
        const change = prev === 0 ? 0 : Math.trunc((curr - prev)/ prev * 100);

        return {
            val: curr,
            hasChange: hasChange,
            change: change,
            window: window
        };
    },
    getAverageXP(date, tasks, window, dataMonthNames) {
        let  currWindow, prevWindow;

        switch (window) {
            case "Today":
                // get tasks for current and previous day
                const { currDayTasks, prevDayTasks } = getTasksInTwoDays(date, tasks);
                currWindow = currDayTasks;
                prevWindow = prevDayTasks;
                break;
            case "Week":
                // get tasks for current and previous week
                currWindow = getTasksInWeekHelper(date, tasks);

                let prevWeek = moment(date);
                prevWeek.subtract(7, "days");
                prevWindow = getTasksInWeekHelper(prevWeek.toDate(), tasks);
                break;
            case "Month":
                // get tasks for current and previous month
                const { currMonth, prevMonth } = getTasksInTwoMonths(dataMonthNames, tasks);
                currWindow = currMonth;
                prevWindow = prevMonth;
                break;
        }

        // map tasks to array of XP values
        const currXP = currWindow.map(ele => ele.xp);
        const prevXP = prevWindow.map(ele => ele.xp);

        // calculate XP totals
        let currTotalXP = 0;
        if (currXP.length > 0)
            currTotalXP = currXP.reduce((a, b) => a + b);

        let prevTotalXP = 0;
        if (prevXP.length > 0)
            prevTotalXP = prevXP.reduce((a, b) => a + b);

        // calculate averages
        let currAverage = 0;
        if (currWindow.length > 0) {
            currAverage = currTotalXP / currWindow.length;
            currAverage = currAverage % 1 != 0 ? currAverage.toFixed(1) : currAverage;
        }

        let prevAverage = 0;
        if (prevWindow.length > 0) {
            prevAverage = prevTotalXP / prevWindow.length;
            prevAverage = prevAverage % 1 != 0 ? prevAverage.toFixed(1) : prevAverage;
        }
        
        const hasChange = prevAverage === 0 ? false : true;
        const change = prevAverage === 0 ? 0 : Math.trunc((currAverage - prevAverage)/ prevAverage * 100);

        return {
            val: currAverage,
            hasChange: hasChange,
            change: change,
            window: window
        };
    },
    getAverageTasks(date, tasks, window, dataMonthNames) {
        let  currWindow, prevWindow;

        switch (window) {
            case "Week":
                // get tasks for current and previous week
                currWindow = getTasksInWeekHelper(date, tasks);

                let prevWeek = moment(date);
                prevWeek.subtract(7, "days");
                prevWindow = getTasksInWeekHelper(prevWeek.toDate(), tasks);
                break;
            case "Month":
                // get tasks for current and previous month
                const { currMonth, prevMonth } = getTasksInTwoMonths(dataMonthNames, tasks);
                currWindow = currMonth;
                prevWindow = prevMonth;
                break;
        }

        // calculate window averages
        let currAverage = 0;
        if (currWindow.length > 0) {
            if (window === "Week") {
                currAverage = currWindow.length / 7;
    
            } else {
                // get number of days in month
                const monthLength = moment(new Date(currWindow[0].date)).daysInMonth();
                currAverage = currWindow.length / monthLength;
            }
    
            currAverage = currAverage % 1 != 0 ? currAverage.toFixed(1) : currAverage;
        }

        let prevAverage = 0;
        if (prevWindow.length > 0) {
            if (window === "Week") {
                prevAverage = prevWindow.length / 7;
    
            } else {
                // get number of days in month
                const monthLength = moment(new Date(prevWindow[0].date)).daysInMonth();
                prevAverage = prevWindow.length / monthLength;
            }
    
            prevAverage = prevAverage % 1 != 0 ? prevAverage.toFixed(1) : prevAverage;
        }

        const hasChange = prevAverage === 0 ? false : true;
        const change = prevAverage === 0 ? 0 : Math.trunc((currAverage - prevAverage)/ prevAverage * 100);

        return {
            val: currAverage,
            hasChange: hasChange,
            change: change,
            window: window
        };
    },
    getTaskRatios(date, tasks, window, dataMonthNames) {
        let taskData;

        switch (window) {
            case "Today":
                // get tasks for current day
                taskData = this.getTasksOnDay(date, tasks);
                break;
            case "Week":
                // get tasks for current week
                taskData = getTasksInWeekHelper(date, tasks);
                break;
            case "Month":
                // get tasks for current month
                const { currMonth } = getTasksInTwoMonths(dataMonthNames, tasks);
                taskData = currMonth;
                break;
        }

        // calculate task ratios
        const taskTotal = taskData.length;
        let quickTasks, averageTasks, largeTasks, majorTasks;
        quickTasks = averageTasks = largeTasks = majorTasks = 0;

        taskData.forEach((task) => {
            switch (task.xp) {
                case 2: quickTasks++; break;
                case 4: averageTasks++; break;
                case 12: largeTasks++; break;
                case 20: majorTasks++; break;
            }
        });

        quickTasks = quickTasks > 0 ? `${Math.round((quickTasks / taskTotal) * 100)}%` : "0%"
        averageTasks = averageTasks > 0 ? `${Math.round((averageTasks / taskTotal) * 100)}%` : "0%"
        largeTasks = largeTasks > 0 ? `${Math.round((largeTasks / taskTotal) * 100)}%` : "0%"
        majorTasks = majorTasks > 0 ? `${Math.round((majorTasks / taskTotal) * 100)}%` : "0%"

        return { 
            quick: quickTasks, 
            average: averageTasks, 
            large: largeTasks, 
            major: majorTasks,
            window: window
        };
    },
    getTasksInWeek(date, tasks) {
        const tasksInWeek = getTasksInWeekHelper(date, tasks);

        // get start and end dates for the week
        let start = moment(date);
        start.day(0).startOf("day");

        let end = moment(date);
        end.day(6).endOf("day");

        // build data arrays
        let xpData = [];
        let taskData = [];

        // populate arrays with initial blank data
        while (start.isSameOrBefore(end)) {
            const day =  start.date();
            xpData.push({ x: day, y: 0 });
            taskData.push({ x: day, y: 0 });

            start.add(1, "days");
        }

        // update y values for data
        tasksInWeek.forEach((task) => {
            const taskDay = new Date(task.date).toLocaleString("en-US", {day: "2-digit"});

            // increment task data
            const taskIndex = taskData.findIndex(ele => ele.x == taskDay);
            taskData[taskIndex] = {x: taskData[taskIndex].x, y: taskData[taskIndex].y + 1};

            // increment XP data
            const xpIndex = xpData.findIndex(ele => ele.x == taskDay);
            xpData[xpIndex] = {x: xpData[xpIndex].x, y: xpData[xpIndex].y + task.xp};

        });

        return [
            { id: "XP per day", data: xpData },
            { id: "Tasks per day", data: taskData }
        ];
    },
    getProjectsData(projects, date, tasks, window, dataMonthNames) {
        let taskData;

        switch (window) {
            case "Today":
                // get tasks for current day
                taskData = this.getTasksOnDay(date, tasks);
                break;
            case "Week":
                // get tasks for current week
                taskData = getTasksInWeekHelper(date, tasks);
                break;
            case "Month":
                // get tasks for current month
                const { currMonth } = getTasksInTwoMonths(dataMonthNames, tasks);
                taskData = currMonth;
                break;
        }

        const keys = Object.keys(projects);

        const data = {};

        keys.forEach((proj) => {data[proj] = 0;});

        // add count for each project
        taskData.forEach((task) => {
            data[task.proj]++;
        });

        // remove empty items from data and keys
        for (const proj in data) {
            if (data[proj] === 0) {
                delete data[proj];
                const index = keys.indexOf(proj);
                keys.splice(index, 1);
            }
        }

        data["id"] = "Projects";

        return {
            keys: keys,
            data: [data],
            window: window
        };
    },
    getCategoriesData(projects, date, tasks, window, dataMonthNames) {
        let taskData;

        switch (window) {
            case "Today":
                // get tasks for current day
                taskData = this.getTasksOnDay(date, tasks);
                break;
            case "Week":
                // get tasks for current week
                taskData = getTasksInWeekHelper(date, tasks);
                break;
            case "Month":
                // get tasks for current month
                const { currMonth } = getTasksInTwoMonths(dataMonthNames, tasks);
                taskData = currMonth;
                break;
        }

        // get categories for state initialization
        let keys = [];
        for (const proj in projects) {
            projects[proj].forEach(cat => keys.push(cat));
        }

        const data = {};

        keys.forEach((cat) => {data[cat] = 0;});

        // add count for each category
        taskData.forEach((task) => {
            data[task.cat]++;
        });

        // remove empty items from data and keys
        for (const cat in data) {
            if (data[cat] === 0) {
                delete data[cat];
                const index = keys.indexOf(cat);
                keys.splice(index, 1);
            }
        }

        data["id"] = "Categories";

        return {
            keys: keys,
            data: [data],
            window: window
        };
    },
    getTaskTimeData(tasks, day) {
        const currentMonth = day.toLocaleString("en-US", {"month": "long"});
        const data = [];

        tasks.forEach((task) => {
            const date = new Date(task.date);
            const dateMonth = date.toLocaleString("en-US", {"month": "long"});
            
            // collect tasks in current month
            if (dateMonth === currentMonth) {
                const day = date.getDate();

                let hours = date.getHours();
                hours = hours < 10 ? `0${hours}` : hours;
                let minutes = date.getMinutes();
                minutes = minutes < 10 ? `0${minutes}` : minutes;

                const time = `${hours}${minutes}`;

                data.push({ x: day, y: time });
            }            
        });

        return {
            data: [{
                id: "Task Time",
                data: data
            }]
        };
    }
};

function getTasksInTwoDays(date, tasks) {
    // get previous day values
    let prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);

    const currDay = date.toLocaleString("en-US", {"day": "2-digit"});
    const currMonth = date.toLocaleString("en-US", {"month": "long"});
    const prevDay = prevDate.toLocaleString("en-US", {"day": "2-digit"});
    const prevMonth = prevDate.toLocaleString("en-US", {"month": "long"});

    // get tasks for current day
    const currDayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        const taskDateDay = taskDate.toLocaleString("en-US", {day: "2-digit"});
        const taskDateMonth = taskDate.toLocaleString("en-US", {"month": "long"});

        if (currDay === taskDateDay && currMonth === taskDateMonth)
            return true;

        return false;
    });

    // get tasks for previous day
    const prevDayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        const taskDateDay = taskDate.toLocaleString("en-US", {day: "2-digit"});
        const taskDateMonth = taskDate.toLocaleString("en-US", {"month": "long"});

        if (prevDay === taskDateDay && prevMonth === taskDateMonth)
            return true;

        return false;
    });

    return {
        currDayTasks: currDayTasks,
        prevDayTasks: prevDayTasks
    };
}

function getTasksInWeekHelper(date, tasks) {
    // get start and end dates for the week
    let start = moment(date);
    start.day(0).startOf("day");

    let end = moment(date);
    end.day(6).endOf("day");;

    // current window info
    const result = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        const taskMoment = moment(taskDate);

        if (taskMoment.isSameOrAfter(start) && taskMoment.isSameOrBefore(end))
            return true;            

        return false;
    });

    return result;
}

function getTasksInTwoMonths(dataMonthNames, tasks) {
    console.log(dataMonthNames);
    const currMonth = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        const taskMonth = taskDate.toLocaleString("en-US", {"month": "long"});

        if (dataMonthNames.curr === taskMonth)
            return true;

        return false;
    });

    const prevMonth = tasks.filter((task) => {
        const taskDate = new Date(task.date);
        const taskMonth = taskDate.toLocaleString("en-US", {"month": "long"});

        if (dataMonthNames.prev === taskMonth)
            return true;

        return false;
    });

    return {
        currMonth: currMonth,
        prevMonth: prevMonth
    };
}

export default manager;