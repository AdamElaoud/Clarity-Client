import Card from "../../UI/Card";
import Dropdown from "../../UI/Dropdown";
import InfoPopup from "../../UI/InfoPopup";
import Ratio from "./Ratio";
import "./TaskRatios.css";

/*
    props
    - options       []  | array of string dropdown options
    - title         str | stat card title
    - action        fun | function to perform on dropdown change
    - ratios        {}  | JSON containing ratio data for each task
    - selected      str | dropdown value to be preselected on load
    - isLoading    bool | boolean to determine if data is still being fetched
    - isError      bool | boolean to determine if an error occurred while fetching
*/
function TaskRatios(props) {
    const dropdownHandler = (event) => {
        props.action(event.target.value);
    }

    let display;
    if (props.isLoading) {
        display = (
            <InfoPopup text = "loading"/>
        );

    } else if (props.isError) {
        display = (
            <InfoPopup text = "error!"/>
        );

    } else {
        display = (
            <div id = "task-ratio-list">
                <Ratio type = "Quick" val = {props.ratios.quick} color = "red"/>
                <div className = "divider" />
                <Ratio type = "Average" val = {props.ratios.average} color = "orange" />
                <div className = "divider" />
                <Ratio type = "Large" val = {props.ratios.large} color = "yellow" />
                <div className = "divider" />
                <Ratio type = "Major" val = {props.ratios.major} color = "green" />
            </div>
        );
    }

    return (
        <Card id = "task-ratios">
            <Dropdown onChange = {dropdownHandler} defaultValue = {props.selected}>
                {props.options.map((ele) => <option key = {ele} value = {ele}>{ele}</option>)}
            </Dropdown>

            <div id = "task-ratio-title">
                {props.title}
            </div>

            {display}
        </Card>
    );
}

export default TaskRatios;