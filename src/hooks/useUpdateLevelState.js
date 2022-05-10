import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import LevelCurve from "../utility/levelCurve";

export default function useUpdateLevelState() {
    const devmode = useSelector(state => state.data.devmode);
    const queryClient = useQueryClient();
    const url = devmode ? "http://localhost:5001" : "https://detox-server.herokuapp.com"

    return useMutation(
        async ({ user, currentXP, level, edit }) => {
            currentXP = currentXP + edit;
            let max = LevelCurve[level];

            // if a level up has occurred
            while (currentXP >= max) {
                currentXP = currentXP - max;
                level++;

                // if xp cap has been reached
                if (level >= LevelCurve[0])
                    max = 60;
                else
                    max = LevelCurve[level];
            }

            // if a level down has occurred
            while (currentXP < 0) {
                // check that level is greater than 1
                if (level > 1) {
                    level--;
                    max = LevelCurve[level];
                    currentXP = max + currentXP;

                // else set xp to 0
                } else {
                    currentXP = 0;
                }
            }

            try {
                // update level and xp in database
                const levelResponse = await fetch(`${url}/api/user/updateLevelState/${user}/${currentXP}/${level}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        
                // const levelResponseData = await levelResponse.json();
                // console.log("POST XP/LEVEL RESPONSE:");
                // console.log(levelResponseData);
        
            } catch (err) {
                console.log(`an error occurred when trying to update XP and level in database:\n`, err);
            }
        },
        {
            onMutate: async ({ user, currentXP, level }) => {
                // cancel any outgoing refetches to avoid optimistic update being overwritten
                await queryClient.cancelQueries(["levelState", user]);

                const prevLevelState = queryClient.getQueryData(["levelState", user]);

                // calculate total xp
                const totalXP = LevelCurve[parseInt(level)] + parseInt(currentXP);
                
                // if query is cached, optimistically update query data before sending out request
                if (prevLevelState)
                    queryClient.setQueryData(["levelState", user], { currentXP, totalXP, level });

                return { prevLevelState, user }; // passed as context to onError and onSettled
            },
            onError: (error, values, context) => {
                // if mutation failes, rollback query data to previous level state
                queryClient.setQueryData(["levelState", context.user], context.prevLevelState);

                console.log("useUpdateLevelState mutation failed!", error);
                console.log(`attempted to send the following data:`);
                console.log(values);
            },
            onSuccess: (data, values, context) => {
                // if mutation succeeds, refetch to ensure cache has correct data
                queryClient.invalidateQueries(["levelState", context.user]);

                console.log("useUpdateLevelState mutation succeeded!");
                console.log(`sent with the following data:`);
                console.log(values);
            }
        }
    );
}