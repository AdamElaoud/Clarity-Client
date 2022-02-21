import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faEquals } from "@fortawesome/free-solid-svg-icons";
import Card from "../../UI/Card";
import Dropdown from "../../UI/Dropdown";
import "./StatCard.css";

/*
    props
    - val           int | main value to display
    - hasChange    bool | boolean to indicate if change value is provided
    - change        int | percent change in stat
    - options       []  | array of string dropdown options
    - title         str | stat card title
    - action        fun | function to perform on dropdown change
    - selected      str | dropdown value to be preselected on load
*/
export default function StatCard(props) {
    let caret = <FontAwesomeIcon icon = {faCaretUp}/>;
    let colorClass = "positive";
        
    if (props.hasChange && props.change < 0) {
        caret = <FontAwesomeIcon icon = {faCaretDown}/>
        colorClass = "negative";

    } else if (props.hasChange && props.change == 0) {
        caret = <FontAwesomeIcon icon = {faEquals}/>
        colorClass = "neutral";
    }

    const dropdownHandler = (event) => {
        props.action(event.target.value);
    }

    return (
        <Card className = "statcard">
            {props.options &&   <Dropdown onChange = {dropdownHandler} defaultValue = {props.selected}>
                                    {props.options.map((ele) => <option key = {ele} value = {ele}>{ele}</option>)}
                                </Dropdown>
            }

            <div className = "statcard-val">
                {props.val}
            </div>

            <div className = "statcard-title">
                {props.title}
            </div>
            
            {props.hasChange && 
            <div className = {`statcard-change ${colorClass}`}>
                {caret} {props.change}%
            </div>}
        </Card>
    );
}