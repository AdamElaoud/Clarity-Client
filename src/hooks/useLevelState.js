import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function useLevelState(user) {
    const devmode = useSelector(state => state.data.devmode);
    const url = devmode ? "http://localhost:5001" : "https://detox-server.herokuapp.com"

    return useQuery(["levelState", user], async () => {
        try {
            const response = await fetch(`${url}/api/user/getLevelState/${user}`, {
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