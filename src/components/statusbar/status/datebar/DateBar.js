import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import DateButton from "./DateButton";
import "./DateBar.css";
import { useSelector } from "react-redux";

/*
    props
    - 
*/
export default function DateBar() {
    const day = useSelector(state => state.data.day);

    return (
        <div id = "dateBar">
            <DateButton icon = {<FontAwesomeIcon icon = {faCaretLeft}/>} effect = "subtract" />
            <div id = "date">
                {day.format("MMMM DD YYYY")}
            </div>
            <DateButton icon = {<FontAwesomeIcon icon = {faCaretRight}/>} effect = "add" />
        </div>
    );
}