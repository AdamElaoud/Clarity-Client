import { useEffect, useState } from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Button from "../../components/UI/Button";
import "./TaskInputForm.css";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../store/dataSlice";
import useProjectTree from "../../hooks/useProjectTree";
import { taskFormActions } from "../../store/taskFormSlice";
import useUpdateLevelState from "../../hooks/useUpdateLevelState";
import useAddTask from "../../hooks/useAddTask";
import useLevelState from "../../hooks/useLevelState";
import { taskTypes, taskTypeVals } from "../../utility/taskTypes";
import useUpdateTask from "../../hooks/useUpdateTask";
import useDeleteTask from "../../hooks/useDeleteTask";

/*
    props
    - 
*/
export default function TaskInputForm() {
    const user = useSelector(state => state.user.username);
    const day = useSelector(state => state.data.day);
    const title = useSelector(state => state.taskForm.title);
    const val = useSelector(state => state.taskForm.val);
    const completeTaskEditor = useSelector(state => state.taskForm.completeTaskEditor);
    const existingTask = useSelector(state => state.taskForm.task);

    const dispatch = useDispatch();

    const { data: projects, isProjectTreeLoading, isProjectTreeError } = useProjectTree(user);
    const { data: levelState, isLevelStateLoading, isLevelStateError } = useLevelState(user);
    const { mutate: updateLevelState } = useUpdateLevelState();
    const { mutate: addTask } = useAddTask();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: deleteTask } = useDeleteTask();

    const [project, setProject] = useState("");
    const [projectMenuItems, setProjectMenuItems] = useState([]);
    const [category, setCategory] = useState("");
    const [categoryMenuItems, setCategoryMenuItems] = useState([]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(day);

    const taskTypeNames = [];
    for (const type in taskTypes) {
        const typeName = taskTypes[type].name;
        taskTypeNames.push(<MenuItem key = {typeName} value = {typeName}>{typeName}</MenuItem>);
    }

    const [taskType, setTaskType] = useState(taskTypes.quick.name);

    useEffect(() => {
        if (!isProjectTreeLoading && !isProjectTreeError) {
            setProjectMenuItems(Object.keys(projects).map((ele) => <MenuItem key = {ele} value = {ele}>{ele}</MenuItem>));

            // if loading pre-existing task
            if (existingTask) {
                setDescription(existingTask.desc);
                setProject(existingTask.proj);
                setCategoryMenuItems(projects[existingTask.proj].map((ele) => <MenuItem key = {ele} value = {ele}>{ele}</MenuItem>));
                setCategory(existingTask.cat);
                setTaskType(existingTask.type);

                // if viewing a full task (not a to do task)
                if (completeTaskEditor)
                    setDate(moment(existingTask.date));
                
            } else {
                const proj = Object.keys(projects)[0];
                setProject(proj);
                setCategoryMenuItems(projects[proj].map((ele) => <MenuItem key = {ele} value = {ele}>{ele}</MenuItem>));
                setCategory(projects[proj][0]);
            }
        }
    
    }, [isProjectTreeLoading, isProjectTreeError, projects])

    const submitHandler = (event) => {
        event.preventDefault();

        let task = {};
        if (completeTaskEditor) {
            task = {
                proj: project,
                cat: category,
                desc: description,
                date: date,
                xp: val,
                type: taskTypeVals[val],
                completed: true
            };
        } else {
            task = {
                proj: project,
                cat: category,
                desc: description,
                xp: taskTypes[taskType.toLowerCase()].val,
                type: taskType,
                completed: false
            };

            // if loading pre-existing task
            if (existingTask)
                task.date = date;
            else
                task.date = moment(day);
        }

        if (isLevelStateLoading || isLevelStateError) {
            console.log("cannot submit task, still loading data!");
            
        } else {
            // if loading pre-existing task
            if (existingTask) {
                task._id = existingTask._id;
                updateTask({ user, task });
                
            } else {
                task._id = require("bson-objectid")();
                addTask({ user, task });

                // if viewing a full task
                if (completeTaskEditor)
                    updateLevelState({ user, currentXP: levelState.currentXP, level: levelState.level, edit: task.xp });
            }

            // if current day is different than task date, change date
            const currentDay = moment(date).format("MMMM DD YYYY");
            const today = moment().format("MMMM DD YYYY");

            if (currentDay !== today)
                dispatch(dataActions.changeDay(moment(date)));

            // hide modal
            dispatch(taskFormActions.showTaskForm(false));
        }
    };

    const onTaskTypeSelectHandler = (event) => {
        setTaskType(event.target.value);
    };

    const onProjectSelectHandler = (event) => {
        const proj = event.target.value;
        setProject(proj);
        setCategory(projects[event.target.value][0]);
        setCategoryMenuItems(projects[proj].map((ele) => <MenuItem key = {ele} value = {ele}>{ele}</MenuItem>));
    };

    const onCategorySelectHandler = (event) => {
        setCategory(event.target.value);
    };

    const onDescriptionInputHandler = (event) => {
        setDescription(event.target.value);
    };

    const changeDateHandler = (newDate) => {
        setDate(moment(newDate));
    };

    const onDeleteHandler = () => {
        deleteTask({ user, task: existingTask });
        updateLevelState({ user, currentXP: levelState.currentXP, level: levelState.level, edit: -existingTask.xp });
        dispatch(taskFormActions.showTaskForm(false));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div id = "backdrop" onClick = {() => dispatch(taskFormActions.showTaskForm(false))}/>
            <form onSubmit = {submitHandler} id = "modal">
                <header id = "modal-header">
                    <div id = "modal-title">
                        {title}
                    </div>
                    <div id = "modal-xp">
                        {val} XP
                    </div>
                </header>

                <div id = "modal-center">
                    <div id = "modal-task-data">
                        <div className = "modal-section">
                            <div className = "task-info-input">
                                <FormControl fullWidth>
                                    <InputLabel id = "project-label">Project</InputLabel>
                                    <Select
                                        label = "Project"
                                        labelId = "project-label"
                                        id = "project-select"
                                        value = {project}
                                        onChange = {onProjectSelectHandler}
                                    >
                                    {projectMenuItems}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className = "task-info-input">
                                <FormControl fullWidth>
                                    <InputLabel id = "category-label">Category</InputLabel>
                                    <Select
                                        label = "Category"
                                        labelId = "category-label"
                                        id = "category-select"
                                        value = {category}
                                        onChange = {onCategorySelectHandler}
                                    >
                                    {categoryMenuItems}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {completeTaskEditor && 
                        <div className = "modal-section">
                            <div className = "date-time-input">
                                <FormControl fullWidth>
                                    <DatePicker
                                        label = "Task Date"
                                        value = {date}
                                        onChange = {changeDateHandler}
                                        renderInput = {(params) => <TextField {...params} />}
                                    />
                                </FormControl>
                            </div>
                            <div className = "date-time-input">
                                <FormControl fullWidth>
                                    <TimePicker
                                        label = "Task Time"
                                        value = {date}
                                        onChange = {changeDateHandler}
                                        renderInput = {(params) => <TextField {...params} />}
                                    />
                                </FormControl>
                            </div>
                        </div>}

                        {!completeTaskEditor &&
                        <div className = "modal-section">
                            <div className = "task-info-input">
                                <FormControl fullWidth>
                                    <InputLabel id = "taskType-label">Task Type</InputLabel>
                                    <Select
                                        label = "Task Type"
                                        labelId = "taskType-label"
                                        id = "taskType-select"
                                        value = {taskType}
                                        onChange = {onTaskTypeSelectHandler}
                                    >
                                    {taskTypeNames}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>}
                    </div>
                    
                    <div id = "task-desc-input">
                        <FormControl fullWidth>
                            <TextField
                                id = "description-input"
                                label = "Description"
                                variant = "outlined"
                                value = {description}
                                onChange = {onDescriptionInputHandler}
                            />
                        </FormControl>
                    </div>
                </div>

                <footer id = "modal-footer">
                    <Button className = "delete" type = "button" disabled = {!existingTask} onClick = {onDeleteHandler}><FontAwesomeIcon icon = {faTrashCan}/></Button>
                    <Button type = "submit">Submit</Button>
                </footer>
            </form>
        </LocalizationProvider>
    );
}