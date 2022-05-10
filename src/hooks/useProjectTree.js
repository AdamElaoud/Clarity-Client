import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function useProjectTree(user) {
    const devmode = useSelector(state => state.data.devmode);
    const url = devmode ? "http://localhost:5001" : "https://detox-server.herokuapp.com"

    return useQuery(["projectTree", user], async () => {
        try {
            const response = await fetch(`${url}/api/user/getProjectTree/${user}`, {
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
    });
}