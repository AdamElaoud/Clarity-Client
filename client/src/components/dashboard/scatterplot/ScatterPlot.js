import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import Dropdown from "../../UI/Dropdown";
import Card from "../../UI/Card";
import "./ScatterPlot.css";

/*
    props
    - data          []  | array of graph data
    - title         str | title of graph
    - xaxis         str | title of x axis
    - yaxis         str | title of y axis
    - options       []  | array of string dropdown options
    - actions       []  | array of functions corresponding to the dropdown options
*/
export default function ScatterPlot(props) {    
    const dropdownHandler = (event) => {
        console.log(event.target.value);
    }

    return (
        <Card id = "scatter-plot">
            <div id = "scatter-plot-title">
                {props.title}
            </div>

            <Dropdown className = "scatter-plot-dropdown" onChange = {dropdownHandler}>
                {props.options.map((ele) => <option key = {ele} value = {ele}>{ele}</option>)}
            </Dropdown>

            <div id = "scatter-plot-chart">
                <ResponsiveScatterPlot
                    data = {props.data}
                    axisBottom = {{
                        legend: props.xaxis,
                        legendPosition: "middle",
                        legendOffset: 37
                    }}
                    axisLeft = {{
                        legend: props.yaxis,
                        legendPosition: "middle",
                        legendOffset: -45
                    }}
                    yScale = {{ type: "linear", min: 0, max: 2400 }}
                    xScale = {{ type: "point", min: 17, max: 23 }}
                    enableGridX = {false}
                    enableGridY = {false}
                    useMesh = {true}
                    colors = "#2A4FFD"
                    margin = {{ top: 10, right: 30, bottom: 50, left: 50 }}
                />
            </div>
        </Card>
    );
}