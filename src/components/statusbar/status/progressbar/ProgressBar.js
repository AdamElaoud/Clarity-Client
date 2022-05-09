import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from "react-redux";
import useLevelState from "../../../../hooks/useLevelState";
import LevelCurve from "../../../../utility/levelCurve";
import InfoPopup from "../../../UI/InfoPopup";
import "./ProgressBar.css";

/*
    props
    - 
*/
export default function ProgressBar() {
    const user = useSelector(state => state.user.username);
    const [maxXP, setMaxXP] = useState(0);

    const { data: levelState, isLoading, isError } = useLevelState(user);

    useEffect(() => {
        if (!isLoading && !isError) {
            // if xp cap is reached, set maxXP to 60
            if (levelState.level === LevelCurve[0])
                setMaxXP(LevelCurve[LevelCurve.length - 1]) ;
            else
                setMaxXP(LevelCurve[levelState.level]);
        }

    }, [isLoading, isError, levelState])

    let display;
    if (isLoading) {
        display = (
            <InfoPopup text = "loading"/>
        );
    
    } else if (isError) {
        display = (
            <InfoPopup text = "error!"/>
        );
    
    } else  {
        display = (
            <>
                <div id = "xp">
                    {`${levelState.currentXP} / ${maxXP}`}
                </div>
                <div id = "progress-circle">
                    <CircularProgressbar 
                        value = {levelState.currentXP}
                        maxValue = {maxXP} 
                        text = {levelState.level}
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
            </>
        );
    }    

    return (
        <div id = "progressbar">
            {display}            
        </div> 
    );
}