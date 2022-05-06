import moment from "moment";
import { windowPairParser, windowParser, filterCompleted } from "../../utility/slicer";
import { taskTypes } from "../../utility/taskTypes";

const calculator = {
    getTaskCount(window, day, fullTaskList) { // get count of tasks in day|week|month
        let { curr, prev } = windowPairParser(window, day, fullTaskList);
        curr = filterCompleted(curr, true);
        prev = filterCompleted(prev, true);


        const currCount = curr.length;
        const prevCount = prev.length;
        
        const hasChange = prevCount === 0 ? false : true;
        const change = prevCount === 0 ? 0 : Math.trunc((currCount - prevCount)/ prevCount * 100);

        return {
            val: currCount,
            hasChange: hasChange,
            change: change,
            window: window
        };
    },
    getAverageXP(window, day, fullTaskList) { // get average XP in day|week|month
        let { curr, prev } = windowPairParser(window, day, fullTaskList);
        curr = filterCompleted(curr, true);
        prev = filterCompleted(prev, true);

        // map tasks to array of XP values
        const currXP = curr.map(ele => ele.xp);
        const prevXP = prev.map(ele => ele.xp);

        // calculate XP totals
        let currTotalXP = 0;
        if (currXP.length > 0)
            currTotalXP = currXP.reduce((a, b) => a + b);

        let prevTotalXP = 0;
        if (prevXP.length > 0)
            prevTotalXP = prevXP.reduce((a, b) => a + b);

        // calculate averages
        let currAverage = 0;
        if (curr.length > 0) {
            currAverage = currTotalXP / curr.length;
            currAverage = currAverage % 1 !== 0 ? currAverage.toFixed(1) : currAverage;
        }

        let prevAverage = 0;
        if (prev.length > 0) {
            prevAverage = prevTotalXP / prev.length;
            prevAverage = prevAverage % 1 !== 0 ? prevAverage.toFixed(1) : prevAverage;
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
    getAverageTaskCount(window, day, fullTaskList) { // get average of count of tasks in week|month
        let { curr, prev } = windowPairParser(window, day, fullTaskList);
        curr = filterCompleted(curr, true);
        prev = filterCompleted(prev, true);

        // calculate window averages
        let currAverage = 0;
        if (curr.length > 0) {
            if (window === "Week") {
                currAverage = curr.length / 7;
    
            } else {
                // get number of days in month
                const monthLength = moment(new Date(curr[0].date)).daysInMonth();
                currAverage = curr.length / monthLength;
            }
    
            currAverage = currAverage % 1 !== 0 ? currAverage.toFixed(1) : currAverage;
        }

        let prevAverage = 0;
        if (prev.length > 0) {
            if (window === "Week") {
                prevAverage = prev.length / 7;
    
            } else {
                // get number of days in month
                const monthLength = moment(new Date(prev[0].date)).daysInMonth();
                prevAverage = prev.length / monthLength;
            }
    
            prevAverage = prevAverage % 1 !== 0 ? prevAverage.toFixed(1) : prevAverage;
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
    getTaskRatios(window, day, fullTaskList) { // get % ratios of task types in day|week|month
        let tasks = windowParser(window, day, fullTaskList);
        tasks = filterCompleted(tasks, true);

        // calculate task ratios
        const taskTotal = tasks.length;
        let quickTasks, averageTasks, largeTasks, majorTasks;
        quickTasks = averageTasks = largeTasks = majorTasks = 0;

        tasks.forEach((task) => {
            switch (task.xp) {
                case taskTypes.quick.val: quickTasks++; break;
                case taskTypes.average.val: averageTasks++; break;
                case taskTypes.large.val: largeTasks++; break;
                case taskTypes.major.val: majorTasks++; break;
                default: throw new Error(`invalid xp amount listed on task: ${task.xp}`);
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
    getTaskCountAndXP(day, fullTaskList) { // get line graph data set of tasks and XP per day in week
        let tasks = windowParser("Week", day, fullTaskList);
        tasks = filterCompleted(tasks, true);
        
        // get start and end dates for the week
        let start = moment(day);
        start.day(0).startOf("day");

        let end = moment(day);
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
        tasks.forEach((task) => {
            const taskDay = moment(task.date).format("DD");

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
    getTaskCountPerProject(window, projects, day, fullTaskList) { // get count of tasks per project in day|week|month
        let tasks = windowParser(window, day, fullTaskList);
        tasks = filterCompleted(tasks, true);

        const keys = Object.keys(projects);

        const data = {};

        keys.forEach((proj) => {data[proj] = 0;});

        // add count for each project
        tasks.forEach((task) => {
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
    getTaskCountPerCategory(window, projects, day, fullTaskList) { // get count of tasks per category in day|week|month
        let tasks = windowParser(window, day, fullTaskList);
        tasks = filterCompleted(tasks, true);

        // get categories for state initialization
        let keys = [];
        for (const proj in projects) {
            projects[proj].forEach(cat => keys.push(cat));
        }

        const data = {};

        keys.forEach((cat) => {data[cat] = 0;});

        // add count for each category
        tasks.forEach((task) => {
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
    getTaskTimes(day, fullTaskList) { // get scatterplot data set of task times in month
        const currentMonth = moment(day).format("MMMM");
        const data = [];
        const tasks = filterCompleted(fullTaskList, true);

        tasks.forEach((task) => {
            const date = moment(task.date);
            const dateMonth = date.format("MMMM");
            
            // collect tasks in current month
            if (dateMonth === currentMonth) {
                const day = date.format("D");

                let hours = date.format("HH");
                let minutes = date.format("mm");

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

export default calculator;