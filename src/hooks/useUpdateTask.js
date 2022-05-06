import moment from "moment";
import { useMutation, useQueryClient } from "react-query"

export default function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ user, task }) => {
            console.log(task);

            try {
                // add task to database
                const updateTaskResponse = await fetch(`http://localhost:5001/api/task/updateTask/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        _id: task._id,
                        updates: {
                            proj: task.proj,
                            cat: task.cat,
                            desc: task.desc,
                            date: task.date
                        }
                    })
                });
        
                const updateTaskData = await updateTaskResponse.json();
                console.log("UPDATE TASK RESPONSE:");
                console.log(updateTaskData);
        
            } catch (err) {
                console.log(`an error occurred when trying to update task in database:\n`, err);
            } 
        },
        {
            onMutate: async ({ user, task }) => {                
                const month = moment(task.date).format("MMMM");
                const year = moment(task.date).format("YYYY");

                // cancel any outgoing refetches to avoid optimistic update being overwritten
                await queryClient.cancelQueries(["tasksInMonth", user, month, year]);

                const prevTasks = queryClient.getQueryData(["tasksInMonth", user, month, year]);

                // if query is cached, optimistically update query data before sending out request
                if (prevTasks) {
                    const taskIndex = prevTasks.findIndex((ele) => ele._id === task._id);
                    console.log(task);
                    prevTasks[taskIndex] = task;
                    queryClient.setQueryData(["tasksInMonth", user, month, year], [...prevTasks]);
                }

                return { prevTasks, user, month, year }; // passed as context to onError and onSettled
            },
            onError: (error, values, context) => {
                // if mutation failes, rollback query data to previous level state
                queryClient.setQueryData(["tasksInMonth", context.user, context.month, context.year], context.prevTasks);

                console.log("useUpdateTask mutation failed!", error);
                console.log(`attempted to send the following data:`, values);
            },
            onSuccess: (data, values, context) => {
                // if mutation succeeds, refetch to ensure cache has correct data
                console.log("useUpdateTask");
                console.log(context.user, context.month, context.year);
                queryClient.invalidateQueries(["tasksInMonth", context.user, context.month, context.year]);

                console.log("useUpdateTask mutation succeeded!");
                console.log(`sent with the following data:`);
                console.log(values);
            }
        }
    );
}