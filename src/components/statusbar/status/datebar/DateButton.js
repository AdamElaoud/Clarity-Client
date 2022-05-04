import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../../../store/dataSlice";
import "./DateButton.css";

/*
    props
    - icon          str | button icon
    - effect        str | indicator whether day should be incremented or decremented
*/
export default function DateButton(props) {
    const day = useSelector(state => state.data.day);
    const dispatch = useDispatch();

    const onClickHandler = () => {
        let newDay = moment(day);

        switch (props.effect) {
            case "add": 
                newDay.add(1, "day");
                break;
            case "subtract": 
                newDay.subtract(1, "day");
                break;
            default:
                throw new Error("invalid effect provided!");
        }

        dispatch(dataActions.changeDay(newDay));
    }

    return (
        <div className = "dateButton" onClick = {onClickHandler}>{props.icon}</div>
    );
}