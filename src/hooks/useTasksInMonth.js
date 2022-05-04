import moment from "moment";
import { useQuery } from "react-query";

export default function useTasksInMonth(user, date) {
    const year = moment(date).format("YYYY");
    const month = moment(date).format("MMMM");

    return useQuery(["tasksInMonth", user, month, year], async () => {
        try {
            // get current month data
            const response = await fetch(`http://localhost:5001/api/task/getTasksInMonth/${user}/${year}/${month}`, {
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
    });
}