import { useEffect, useState } from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import moment from "moment";
import Button from "../../../UI/Button";
import "./TaskInputForm.css";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../../../store/dataSlice";
import useProjectTree from "../../../../hooks/useProjectTree";

/*
    props
    - close         fun | function to close modal
    - submit        fun | function to submit & close modal
    - title         str | title of modal
    - val           int | xp value for task
    - buttonText    str | text in close button
*/
export default function TaskInputForm(props) {
    const user = useSelector(state => state.user.username);
    const day = useSelector(state => state.data.day);
    const dispatch = useDispatch();
    const {data: projects, isLoading, isError } = useProjectTree(user);


    const [project, setProject] = useState("");
    const [projectMenuItems, setProjectMenuItems] = useState([]);
    const [category, setCategory] = useState("");
    const [categoryMenuItems, setCategoryMenuItems] = useState([]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(moment());

    useEffect(() => {
        if (!isLoading && !isError) {
            const proj = Object.keys(projects)[0];
            setProjectMenuItems(Object.keys(projects).map((ele) => <MenuItem key = {ele} value = {ele}>{ele}</MenuItem>));
            setProject(proj);
            setCategoryMenuItems(projects[proj].map((ele) => <MenuItem key = {ele} value = {ele}>{ele}</MenuItem>));
            setCategory(projects[proj][0]);
        }
    
    }, [isLoading, isError, projects])

    const submitHandler = (event) => {
        event.preventDefault();

        const task = {
            _id: require("bson-objectid")(),
            proj: project,
            cat: category,
            desc: description,
            date: date,
            xp: props.val,
            completed: true
        };

        props.submit(task);

        // if current day is different than today, change date
        const currentDay = day.format("MMMM DD YYYY");
        const today = moment().format("MMMM DD YYYY");

        if (currentDay !== today)
            dispatch(dataActions.changeDay(moment()));
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

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div id = "backdrop" onClick = {props.close}/>
            <form onSubmit = {submitHandler} id = "modal">
                <header id = "modal-header">
                    <div id = "modal-title">
                        {props.title}
                    </div>
                    <div id = "modal-xp">
                        {props.val} XP
                    </div>
                </header>

                <div id = "modal-center">
                    <div id = "modal-task-data">
                        <div id = "modal-inputs">
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

                        <div id = "modal-time-date">
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
                        </div>
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
                    <Button type = "submit">{props.buttonText}</Button>
                </footer>
            </form>
        </LocalizationProvider>
    );
}