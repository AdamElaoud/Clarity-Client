import { useQuery } from "react-query";

export default function useLevelState(user) {
    return useQuery(["levelState", user], async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/user/getLevelState/${user}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET LEVEL STATE RESPONSE:");
            // console.log(responseData);

            return responseData.levelState;          
    
        } catch (err) {
            console.log(`an error occurred when trying to get level state data from database:\n`, err);
        }
    });
}