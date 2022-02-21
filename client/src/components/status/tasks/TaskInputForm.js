import { useState } from "react";
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment";
import Button from "../../UI/Button";
import "./TaskInputForm.css";

/*
    props
    - close         fun | function to close modal
    - submit        fun | function to submit & close modal
    - title         str | title of modal
    - val           int | xp value for task
    - buttonText    str | text in close button
    - day           obj | Date object for current day
    - changeDay     fun | function to change the current day
    - projects      obj | user's projects and categories
*/
export default function TaskInputForm(props) {
    const [project, setProject] = useState(Object.keys(props.projects)[0]);
    const [category, setCategory] = useState(props.projects[project][0]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(moment());

    const submitHandler = (event) => {
        event.preventDefault();

        const task = {
            proj: project,
            cat: category,
            desc: description,
            date: date.toDate(), // date is moment object, use toDate to get JavaScript date object back
            xp: props.val
        };

        props.submit(task);

        // if current day is different than today, change date
        const currentDay = props.day.toLocaleString("en-US", {day: "2-digit"});
        const today = new Date().toLocaleString("en-US", {day: "2-digit"});
        if (currentDay != today)
            props.changeDay(date.toDate());
    };

    const onProjectSelectHandler = (event) => {
        setProject(event.target.value);
        setCategory(props.projects[event.target.value][0]);
    };

    const onCategorySelectHandler = (event) => {
        setCategory(event.target.value);
    };

    const onDescriptionInputHandler = (event) => {
        setDescription(event.target.value);
    };

    const changeDateHandler = (newDate) => {
        setDate(newDate);
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
                                    {Object.keys(props.projects).map((proj) => <MenuItem key = {proj} value = {proj}>{proj}</MenuItem>)}
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
                                    {props.projects[project].map((cat) => <MenuItem key = {cat} value = {cat}>{cat}</MenuItem>)}
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