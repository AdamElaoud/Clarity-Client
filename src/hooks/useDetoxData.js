import { useQuery } from "react-query";

export default function useDetoxData(user, date) {
    return useQuery(["detoxData", user], async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/user/getDetoxData/${user}/${date}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const responseData = await response.json();
            // console.log("GET DAYS TO DETOX RESPONSE:");
            // console.log(responseData);
    
            return responseData.detoxData;
    
        } catch (err) {
            console.log(`an error occurred when trying to get detox data from database:\n`, err);
        }
    });
}