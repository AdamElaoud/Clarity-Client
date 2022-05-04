import { useQuery } from "react-query";

export default function useProjectTree(user) {
    return useQuery(["projectTree", user], async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/user/getProjectTree/${user}`, {
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