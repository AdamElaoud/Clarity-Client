const requests = {
    async updateLevelState(curr, lvl) {
        try {
            // update level and xp in database
            const levelResponse = await fetch(`https://detox-server.herokuapp.com/api/user/updateLevelState/feelssapman/${curr}/${lvl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const levelResponseData = await levelResponse.json();
            // console.log("POST XP/LEVEL RESPONSE:");
            // console.log(levelResponseData);
    
        } catch (err) {
            console.log(`an error occurred when trying to update XP and level in database:\n`, err);
        }
    },
    async getLevelState(name) {
        try {
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getLevelState/${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET LEVEL STATE RESPONSE:");
            // console.log(responseData);

            return responseData;          
    
        } catch (err) {
            console.log(`an error occurred when trying to get level state data from database:\n`, err);
        }
    },
    async addTaskToDB(task) {
        try {
            const taskMonth = task.date.toLocaleString("en-US", {month: "long"});
            const taskDay = task.date.toLocaleString("en-US", {day: "2-digit"});
            const taskYear = task.date.toLocaleString("en-US", {"year": "numeric"});
    
            // add task to database
            const taskResponse = await fetch("https://detox-server.herokuapp.com/api/user/addTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: "feelssapman",
                    task: {
                        ...task,
                        year: taskYear,
                        month: taskMonth,
                        day: taskDay
                    }
                })
            });
    
            const taskResponseData = await taskResponse.json();
            // console.log("POST TASK RESPONSE:");
            // console.log(taskResponseData);
    
        } catch (err) {
            console.log(`an error occurred when trying to add tasks to database:\n`, err);
        } 
    },
    async getTasksOnDay(date) {
        const year = date.toLocaleString("en-US", {"year": "numeric"});
        const month = date.toLocaleString("en-US", {"month": "long"});
        const day = date.toLocaleString("en-US", {"day": "2-digit"});
    
        try {
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getTasksOnDay/feelssapman/${year}/${month}/${day}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET TASKS ON DAY RESPONSE:");
            // console.log(responseData);
            
            return responseData.tasks;
    
        } catch (err) {
            console.log(`an error occurred when trying to get task data (day) from database:\n`, err);
        }
    },
    async getTasksInMonth(date, username) {
        let year = date.toLocaleString("en-US", {"year": "numeric"});
        let month = date.toLocaleString("en-US", {"month": "long"});
    
        try {
            // get current month data
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getTasksInMonth/${username}/${year}/${month}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            
            // console.log("GET TASKS IN MONTH RESPONSE:");
            // console.log(responseData);
            
            return responseData.tasks;
    
        } catch (err) {
            console.log(`an error occurred when trying to get task data (month) from database:\n`, err);
        }
    },
    async getTasksInSurroundingMonths(date, username) {
        let year = date.toLocaleString("en-US", {"year": "numeric"});
        let month = date.toLocaleString("en-US", {"month": "long"});
    
        try {
            // get current month data
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getTasksInSurroundingMonths/${username}/${year}/${month}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            
            // console.log("GET TASKS IN MONTH RESPONSE:");
            // console.log(responseData);
            
            return responseData.tasks;
    
        } catch (err) {
            console.log(`an error occurred when trying to get task data (month) from database:\n`, err);
        }
    },
    async getProjects(username) {    
        try {
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getProjects/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET PROJECTS RESPONSE:");
            // console.log(responseData);
            
            return responseData.projects;
    
        } catch (err) {
            console.log(`an error occurred when trying to get projects from database:\n`, err);
        }
    },
    async getTaskCountInfo(day) {
        // get current day values
        const currYear = day.toLocaleString("en-US", {"year": "numeric"});
        const currMonth = day.toLocaleString("en-US", {"month": "long"});
        const currDay = day.toLocaleString("en-US", {"day": "2-digit"});
        
        // get previous day values
        let prev = new Date(day);
        prev.setDate(prev.getDate() - 1);
    
        const prevYear = prev.toLocaleString("en-US", {"year": "numeric"});
        const prevMonth = prev.toLocaleString("en-US", {"month": "long"});
        const prevDay = prev.toLocaleString("en-US", {"day": "2-digit"});
    
        try {
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getTaskCountInfo/feelssapman/${currYear}/${currMonth}/${currDay}/${prevYear}/${prevMonth}/${prevDay}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET TASK COUNT INFO RESPONSE:");
            // console.log(responseData);

            const counts = responseData.counts;
    
            const hasChange = counts.prev === 0 ? false : true;
            const change = counts.prev === 0 ? 0 : Math.trunc((counts.curr - counts.prev)/ counts.prev * 100);
    
            return {
                curr: counts.curr,
                prev: counts.prev,
                hasChange: hasChange,
                change: change
            };
    
        } catch (err) {
            console.log(`an error occurred when trying to get task count info from database:\n`, err);
        }
    },
    async getAverageXP(day) {
        // get current day values
        const currYear = day.toLocaleString("en-US", {"year": "numeric"});
        const currMonth = day.toLocaleString("en-US", {"month": "long"});
        const currDay = day.toLocaleString("en-US", {"day": "2-digit"});
        
        // get previous day values
        let prev = new Date(day);
        prev.setDate(prev.getDate() - 1);
    
        const prevYear = prev.toLocaleString("en-US", {"year": "numeric"});
        const prevMonth = prev.toLocaleString("en-US", {"month": "long"});
        const prevDay = prev.toLocaleString("en-US", {"day": "2-digit"});
    
        try {
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getAverageXP/feelssapman/${currYear}/${currMonth}/${currDay}/${prevYear}/${prevMonth}/${prevDay}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET AVERAGE XP RESPONSE:");
            // console.log(responseData);

            const averages = responseData.averages;
    
            const hasChange = averages.prev === 0 ? false : true;
            const change = averages.prev === 0 ? 0 : Math.trunc((averages.curr - averages.prev)/ averages.prev * 100);
    
            return {
                curr: averages.curr,
                prev: averages.prev,
                hasChange: hasChange,
                change: change
            };
    
        } catch (err) {
            console.log(`an error occurred when trying to get average XP from database:\n`, err);
        }
    },
    async getAverageTasks(day) {    
        try {
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getAverageTasks/feelssapman/${day}/week`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET AVERAGE TASKS RESPONSE:");
            // console.log(responseData);

            const averages = responseData.averages;
    
            const hasChange = averages.prev === 0 ? false : true;
            const change = averages.prev === 0 ? 0 : Math.trunc((averages.curr - averages.prev)/ averages.prev * 100);
    
            return {
                curr: averages.curr,
                prev: averages.prev,
                hasChange: hasChange,
                change: change
            };
    
        } catch (err) {
            console.log(`an error occurred when trying to get average tasks from database:\n`, err);
        }
    },
    async getTasksInWeek(day) {    
        try {
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getTasksInWeek/feelssapman/${day}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET TASKS IN WEEK RESPONSE:");
            // console.log(responseData);

            const start = new Date(responseData.data.start);
            let startDay = start.toLocaleString("en-US", {day: "2-digit"});
            const endDay = new Date(responseData.data.end).toLocaleString("en-US", {day: "2-digit"});

            let xpData = [];
            let taskData = [];

            // populate arrays with initial blank data
            while (startDay <= endDay) {
                xpData.push({ x: startDay, y: 0 });
                taskData.push({ x: startDay, y: 0 });

                start.setDate(start.getDate() + 1);
                startDay = start.toLocaleString("en-US", {day: "2-digit"});
            }

            // update y values for data
            responseData.data.tasks.forEach((task) => {
                // increment task data
                const taskIndex = taskData.findIndex(ele => ele.x == task.day);
                taskData[taskIndex] = {x: taskData[taskIndex].x, y: taskData[taskIndex].y + 1};

                // increment XP data
                const xpIndex = xpData.findIndex(ele => ele.x == task.day);
                xpData[xpIndex] = {x: xpData[xpIndex].x, y: xpData[xpIndex].y + task.xp};

            });

            return [
                { id: "XP per day", data: xpData },
                { id: "Tasks per day", data: taskData }
            ];
    
        } catch (err) {
            console.log(`an error occurred when trying to get tasks in week from database:\n`, err);
        }
    },
    async getDaysToDetox(day) {    
        try {
            const response = await fetch(`https://detox-server.herokuapp.com/api/user/getDaysToDetox/feelssapman/${day}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET DAYS TO DETOX RESPONSE:");
            // console.log(responseData);
    
            return responseData.daysToDetox;
    
        } catch (err) {
            console.log(`an error occurred when trying to get days to detox from database:\n`, err);
        }
    }
};

export default requests;