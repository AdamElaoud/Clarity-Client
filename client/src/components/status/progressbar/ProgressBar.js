import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import "./ProgressBar.css";

/*
    props
    - currentXP     int | value of current XP
    - maxXP         int | value of max XP
    - level         int | value of current level
*/
export default function ProgressBar(props) {
    return (
        <div id = "progressbar">
            <div id = "xp">
                {`${props.currentXP} / ${props.maxXP}`}
            </div>
            <div id = "progress-circle">
                <CircularProgressbar 
                    value = {props.currentXP}
                    maxValue = {props.maxXP} 
                    text = {props.level}
                    counterClockwise = "true"
                    styles = {{
                        path: {
                            strokeLinecap: "round",
                            stroke: "#7150FE"
                        },
                        trail: {
                            stroke: "#DCE0E7"
                        },
                        text: {
                            fill: "#000000",
                            fontSize: "2.5rem"
                        }
                    }}
                />
            </div>
            
        </div> 
    );
}