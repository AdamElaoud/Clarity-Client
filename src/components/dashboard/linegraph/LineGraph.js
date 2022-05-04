import { ResponsiveLine } from "@nivo/line";
import { linearGradientDef } from "@nivo/core";
import Card from "../../UI/Card";
import "./LineGraph.css";
import InfoPopup from "../../UI/InfoPopup";

/*
    props
    - data          []  | array of graph data
    - title         str | title of graph
    - xaxis         str | title of x axis
    - yaxis         str | title of y axis
    - isLoading    bool | boolean to determine if data is still being fetched
    - isError      bool | boolean to determine if an error occurred while fetching
*/
export default function LineGraph(props) {
    let display;
    if (props.isLoading) {
        display = (
            <InfoPopup text = "loading"/>
        );

    } else if (props.isError) {
        display = (
            <InfoPopup text = "error!"/>
        );

    } else {
        display = (
            <div id = "line-graph-chart">
               <ResponsiveLine 
                    data = {props.data}
                    axisBottom = {{
                        legend: props.xaxis,
                        legendPosition: "middle",
                        legendOffset: 37
                    }}
                    axisLeft = {{
                        legend: props.yaxis,
                        legendPosition: "middle",
                        legendOffset: -35
                    }}
                    enableGridX = {false}
                    enableGridY = {false}
                    margin = {{ top: 25, right: 30, bottom: 50, left: 50 }}
                    pointLabelYOffset = {-12}
                    pointSize = {8}
                    curve = "cardinal"
                    lineWidth = {3}
                    enableArea = {true}
                    areaOpacity = {0.3}
                    colors = {{ scheme: "category10" }}
                    defs = {[
                        linearGradientDef("blueGradient", [
                            { offset: 30, color: "#1F77B4", opacity: 0.7 },
                            { offset: 100, color: "#FFFFFF" }
                        ]),
                        linearGradientDef("orangeGradient", [
                            { offset: 30, color: "#FF7F0E", opacity: 0.7 },
                            { offset: 100, color: "#FFFFFF" }
                        ])
                    ]}
                    fill = {[
                        { match: { id: "XP per day" }, id: "blueGradient" },
                        { match: { id: "Tasks per day" }, id: "orangeGradient" }
                    ]}
                    useMesh = {true}
                    legends = {[
                        {
                            anchor: "top-right",
                            direction: "row",
                            symbolShape: "circle",
                            justify: false,
                            symbolSize: 10,
                            itemWidth: 100,
                            itemHeight: 10,
                            translateX: 50,
                            translateY: -20
                        }
                    ]}
                    motionConfig = "slow"
                /> 
            </div>
        );
    }

    return (
        <Card id = "line-graph">
            <div id = "line-graph-title">
                {props.title}
            </div>

            {display}
        </Card>
    );
}