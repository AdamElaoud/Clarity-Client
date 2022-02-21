import "./Ratio.css";

/*
    props
    - type          str | task type
    - val           int | amount of specific task type completed in time window
    - max           int | total tasks completed in time window
    - color         str | color to be used for ratio bar fill
*/
function Ratio(props) {
    let color = "#7150FE";
    switch (props.color) {
        case "orange": 
            color = "#FF7741";
            break;
        case "yellow": 
            color = "#FCBF00";
            break;
        case "red": 
            color = "#EC2622";
            break;
        case "green": 
            color = "#2DD34E";
            break;
    }

    return (
        <div className = "ratio">
            <div className = "ratio-tag">
                {props.type}
            </div>
            
            <div className = "ratio-bar">
                <div className = "ratio-bar-fill" style = {{ width: props.val, background: color }}/>
            </div>
            
            <div className = "ratio-percent">
                {props.val}
            </div>
        </div>
    );
}

export default Ratio;