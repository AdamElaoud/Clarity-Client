import moment from "moment";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function useTasksInMonth(user, date) {
    const devmode = useSelector(state => state.data.devmode);
    const url = devmode ? "http://localhost:5001" : "https://detox-server.herokuapp.com"

    const year = moment(date).format("YYYY");
    const month = moment(date).format("MMMM");

    return useQuery(["tasksInMonth", user, month, year], async () => {
        try {
            // get current month data
            const response = await fetch(`${url}/api/task/getTasksInMonth/${user}/${year}/${month}`, {
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