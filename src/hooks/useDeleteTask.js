import moment from "moment";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ user, task }) => {
            try {        
                // add task to database
                const deleteTaskResponse = await fetch("http://localhost:5001/api/task/deleteTask", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ _id: task._id })
                });
        
                // const deleteTaskResponseData = await deleteTaskResponse.json();
                // console.log("DELETE TASK RESPONSE:");
                // console.log(deleteTaskResponseData);
        
            } catch (err) {
                console.log(`an error occurred when trying to add tasks to database:\n`, err);
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
                    const tempTasks = [...prevTasks];
                    const taskIndex = tempTasks.findIndex((ele) => ele._id === task._id);
                    tempTasks.slice(taskIndex, 1);
                    queryClient.setQueryData(["tasksInMonth", user, month, year], [...tempTasks]);
                }

                return { prevTasks, user, month, year }; // passed as context to onError and onSettled
            },
            onError: (error, values, context) => {
                // if mutation failes, rollback query data to previous level state
                queryClient.setQueryData(["tasksInMonth", context.user, context.month, context.year], context.prevTasks);

                console.log("useDeleteTask mutation failed!", error);
                console.log(`attempted to send the following data:`, values);
            },
            onSuccess: (data, values, context) => {
                // if mutation succeeds, refetch to ensure cache has correct data
                console.log("useDeleteTask");
                console.log(context.user, context.month, context.year);
                queryClient.invalidateQueries(["tasksInMonth", context.user, context.month, context.year]);

                console.log("useDeleteTask mutation succeeded!");
                console.log(`sent with the following data:`);
                console.log(values)
            }
        }
    );
}