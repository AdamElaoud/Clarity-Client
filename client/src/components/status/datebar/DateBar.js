import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import DateButton from "./DateButton";
import "./DateBar.css";

/*
    props
    - changeDay     fun | function to change the current day
    - day           obj | Date object for current day
*/
export default function DateBar(props) {
    const month = props.day.toLocaleString("en-US", {month: "long"});
    const day = props.day.getDate();
    const year = props.day.getFullYear();

    return (
        <div id = "dateBar">
            <DateButton icon = {<FontAwesomeIcon icon = {faCaretLeft}/>} effect = "subtract" changeDay = {props.changeDay} day = {props.day}/>
            <div id = "date">
                {`${month} ${day} ${year}`}
            </div>
            <DateButton icon = {<FontAwesomeIcon icon = {faCaretRight}/>} effect = "add" changeDay = {props.changeDay} day = {props.day}/>
        </div>
    );
}