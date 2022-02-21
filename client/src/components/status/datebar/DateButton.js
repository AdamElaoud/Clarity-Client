import "./DateButton.css";

/*
    props
    - icon          str | button icon
    - effect        str | indicator whether day should be incremented or decremented
    - changeDay     fun | function to change the current day
    - day           obj | Date object for current day
*/
export default function DateButton(props) {
    const onClickHandler = () => {
        let date = new Date(props.day);
        
        switch (props.effect) {
            case "add": 
                date.setDate(date.getDate() + 1);
                break;
            case "subtract": 
                date.setDate(date.getDate() - 1);
                break;
        }

        props.changeDay(date);
    }

    return (
        <div className = "dateButton" onClick = {onClickHandler}>{props.icon}</div>
    );
}