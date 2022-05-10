import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function useDetoxData(user, date) {
    const devmode = useSelector(state => state.data.devmode);
    const url = devmode ? "http://localhost:5001" : "https://detox-server.herokuapp.com"

    return useQuery(["detoxData", user], async () => {
        try {
            const response = await fetch(`${url}/api/user/getDetoxData/${user}/${date}`, {
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