import { ResponsiveBar } from '@nivo/bar'
import Dropdown from "../../UI/Dropdown";
import Card from "../../UI/Card";
import "./BarGraph.css";

/*
    props
    - data          []  | array of graph data
    - keys          []  | array of strings containing bar graph keys
    - title         str | title of graph
    - xaxis         str | title of x axis
    - yaxis         str | title of y axis
    - options       []  | array of string dropdown options
    - action        fun | function to perform on dropdown change
    - selected      str | dropdown value to be preselected on load
*/
export default function BarGraph(props) {
    const dropdownHandler = (event) => {
        props.action(event.target.value);
    }

    return (
        <Card id = "bar-graph">
            <Dropdown onChange = {dropdownHandler} defaultValue = {props.selected}>
                {props.options.map((ele) => <option key = {ele} value = {ele}>{ele}</option>)}
            </Dropdown>

            <div id = "bar-graph-title">
                {props.title}
            </div>

            <div id = "bar-graph-chart">
                <ResponsiveBar
                    data = {props.data}
                    axisLeft = {{
                        legend: props.yaxis,
                        legendPosition: "middle",
                        legendOffset: -35
                    }}
                    keys = {props.keys}
                    groupMode = "grouped"
                    margin = {{ top: 10, right: 30, bottom: 30, left: 50 }}
                    padding = {0}
                    colors = {{ scheme: "spectral" }}
                    enableLabel = {false}
                    enableGridY = {false}
                />
            </div>
        </Card>
    );
}